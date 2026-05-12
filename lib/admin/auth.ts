/**
 * Admin Authentication System
 *
 * Système d'authentification sécurisé pour le dashboard admin :
 * - JWT avec httpOnly cookies (protection XSS)
 * - Session management en DB (révocation possible)
 * - bcrypt pour les passwords
 * - Rate limiting
 * - Audit logging des connexions
 */

import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { AdminRole } from '@prisma/client'

// ========================================
// CONFIGURATION
// ========================================

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production'
)
const SESSION_DURATION = 7 * 24 * 60 * 60 // 7 jours en secondes
const COOKIE_NAME = 'admin-session'

// ========================================
// TYPES
// ========================================

export interface AdminSession {
  adminId: string
  email: string
  name: string
  role: AdminRole
  sessionId: string
}

export interface LoginCredentials {
  email: string
  password: string
}

// ========================================
// SESSION MANAGEMENT
// ========================================

/**
 * Crée une nouvelle session admin
 */
export async function createSession(
  adminId: string,
  email: string,
  name: string,
  role: AdminRole,
  request?: NextRequest
): Promise<string> {
  // Générer le JWT
  const token = await new SignJWT({
    adminId,
    email,
    name,
    role,
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(JWT_SECRET)

  // Stocker la session en DB pour permettre la révocation
  const expiresAt = new Date(Date.now() + SESSION_DURATION * 1000)
  const session = await prisma.session.create({
    data: {
      adminId,
      token,
      expiresAt,
    },
  })

  // Mettre à jour lastLoginAt
  await prisma.adminUser.update({
    where: { id: adminId },
    data: { lastLoginAt: new Date() },
  })

  // Logger la connexion
  if (request) {
    await prisma.auditLog.create({
      data: {
        adminId,
        action: 'LOGIN',
        resource: 'Session',
        resourceId: session.id,
        ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip'),
        userAgent: request.headers.get('user-agent'),
      },
    })
  }

  // Set httpOnly cookie
  const cookieStore = await cookies()
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: SESSION_DURATION,
    path: '/admin',
  })

  return token
}

/**
 * Vérifie et récupère la session active
 */
export async function verifySession(
  request: NextRequest
): Promise<AdminSession | null> {
  try {
    // Récupérer le token du cookie
    const token = request.cookies.get(COOKIE_NAME)?.value

    if (!token) {
      return null
    }

    // Vérifier le JWT
    const { payload } = await jwtVerify(token, JWT_SECRET)

    // Vérifier que la session existe toujours en DB (pas révoquée)
    const session = await prisma.session.findUnique({
      where: { token },
      include: {
        admin: {
          select: {
            id: true,
            email: true,
            name: true,
            role: true,
            isActive: true,
          },
        },
      },
    })

    // Session expirée ou admin désactivé
    if (
      !session ||
      session.expiresAt < new Date() ||
      !session.admin.isActive
    ) {
      return null
    }

    return {
      adminId: session.admin.id,
      email: session.admin.email,
      name: session.admin.name,
      role: session.admin.role,
      sessionId: session.id,
    }
  } catch (error) {
    console.error('Session verification error:', error)
    return null
  }
}

/**
 * Révoque une session (logout)
 */
export async function revokeSession(
  request: NextRequest,
  adminId: string
): Promise<void> {
  const token = request.cookies.get(COOKIE_NAME)?.value

  if (token) {
    // Supprimer la session de la DB
    await prisma.session.deleteMany({
      where: {
        token,
        adminId,
      },
    })

    // Logger la déconnexion
    await prisma.auditLog.create({
      data: {
        adminId,
        action: 'LOGOUT',
        resource: 'Session',
        ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip'),
        userAgent: request.headers.get('user-agent'),
      },
    })
  }

  // Supprimer le cookie
  const cookieStore = await cookies()
  cookieStore.delete(COOKIE_NAME)
}

/**
 * Révoque toutes les sessions d'un admin (utile pour "logout all devices")
 */
export async function revokeAllSessions(adminId: string): Promise<void> {
  await prisma.session.deleteMany({
    where: { adminId },
  })

  await prisma.auditLog.create({
    data: {
      adminId,
      action: 'LOGOUT_ALL',
      resource: 'Session',
    },
  })
}

// ========================================
// AUTHENTICATION
// ========================================

/**
 * Authentifie un admin avec email/password
 */
export async function login(
  credentials: LoginCredentials,
  request: NextRequest
): Promise<{ success: true; session: AdminSession } | { success: false; error: string }> {
  try {
    // Récupérer l'admin
    const admin = await prisma.adminUser.findUnique({
      where: { email: credentials.email.toLowerCase() },
    })

    if (!admin) {
      return { success: false, error: 'Email ou mot de passe incorrect' }
    }

    // Vérifier que l'admin est actif
    if (!admin.isActive) {
      return { success: false, error: 'Compte désactivé' }
    }

    // Vérifier le password
    const isValid = await bcrypt.compare(credentials.password, admin.passwordHash)

    if (!isValid) {
      // Logger la tentative échouée
      await prisma.auditLog.create({
        data: {
          adminId: admin.id,
          action: 'LOGIN_FAILED',
          resource: 'Session',
          metadata: { reason: 'Invalid password' },
          ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip'),
          userAgent: request.headers.get('user-agent'),
        },
      })

      return { success: false, error: 'Email ou mot de passe incorrect' }
    }

    // Créer la session
    await createSession(admin.id, admin.email, admin.name, admin.role, request)

    return {
      success: true,
      session: {
        adminId: admin.id,
        email: admin.email,
        name: admin.name,
        role: admin.role,
        sessionId: '', // Will be set by createSession
      },
    }
  } catch (error) {
    console.error('Login error:', error)
    return { success: false, error: 'Erreur serveur' }
  }
}

/**
 * Crée un nouvel admin (réservé aux SUPER_ADMIN)
 */
export async function createAdmin(
  email: string,
  password: string,
  name: string,
  role: AdminRole = 'VIEWER'
): Promise<{ id: string; email: string }> {
  // Hash du password
  const passwordHash = await bcrypt.hash(password, 10)

  const admin = await prisma.adminUser.create({
    data: {
      email: email.toLowerCase(),
      name,
      role,
      passwordHash,
    },
  })

  return {
    id: admin.id,
    email: admin.email,
  }
}

/**
 * Change le password d'un admin
 */
export async function changePassword(
  adminId: string,
  currentPassword: string,
  newPassword: string
): Promise<{ success: boolean; error?: string }> {
  const admin = await prisma.adminUser.findUnique({
    where: { id: adminId },
  })

  if (!admin) {
    return { success: false, error: 'Admin non trouvé' }
  }

  // Vérifier le password actuel
  const isValid = await bcrypt.compare(currentPassword, admin.passwordHash)

  if (!isValid) {
    return { success: false, error: 'Mot de passe actuel incorrect' }
  }

  // Hash du nouveau password
  const passwordHash = await bcrypt.hash(newPassword, 10)

  await prisma.adminUser.update({
    where: { id: adminId },
    data: { passwordHash },
  })

  // Révoquer toutes les autres sessions
  await prisma.session.deleteMany({
    where: { adminId },
  })

  await prisma.auditLog.create({
    data: {
      adminId,
      action: 'PASSWORD_CHANGED',
      resource: 'AdminUser',
      resourceId: adminId,
    },
  })

  return { success: true }
}

// ========================================
// MIDDLEWARE HELPERS
// ========================================

/**
 * Middleware pour protéger une route admin
 * Retourne la session ou une Response d'erreur
 */
export async function requireAdmin(
  request: NextRequest,
  minRole: AdminRole = 'VIEWER'
): Promise<AdminSession | NextResponse> {
  const session = await verifySession(request)

  if (!session) {
    return NextResponse.json(
      { error: 'Non authentifié' },
      { status: 401 }
    )
  }

  // Vérifier les permissions (hiérarchie des rôles)
  const roleHierarchy: Record<AdminRole, number> = {
    SUPER_ADMIN: 4,
    ADMIN: 3,
    EDITOR: 2,
    VIEWER: 1,
  }

  if (roleHierarchy[session.role] < roleHierarchy[minRole]) {
    return NextResponse.json(
      { error: 'Permissions insuffisantes' },
      { status: 403 }
    )
  }

  return session
}

/**
 * Vérifie si un admin a une permission spécifique
 */
export function hasPermission(
  session: AdminSession,
  action: 'read' | 'create' | 'update' | 'delete',
  resource?: string
): boolean {
  // SUPER_ADMIN a tous les droits
  if (session.role === 'SUPER_ADMIN') return true

  // ADMIN a tous les droits sauf gérer les admins
  if (session.role === 'ADMIN') {
    if (resource === 'AdminUser' && action !== 'read') return false
    return true
  }

  // EDITOR peut lire, créer et modifier (mais pas supprimer)
  if (session.role === 'EDITOR') {
    return action !== 'delete'
  }

  // VIEWER peut uniquement lire
  return action === 'read'
}

// ========================================
// RATE LIMITING (simple in-memory)
// ========================================

const loginAttempts = new Map<string, { count: number; resetAt: number }>()

export async function checkLoginRateLimit(
  identifier: string, // IP ou email
  maxAttempts: number = 5,
  windowMinutes: number = 15
): Promise<{ allowed: boolean; remainingAttempts?: number }> {
  const now = Date.now()
  const windowMs = windowMinutes * 60 * 1000

  const attempt = loginAttempts.get(identifier)

  // Première tentative ou fenêtre expirée
  if (!attempt || attempt.resetAt < now) {
    loginAttempts.set(identifier, {
      count: 1,
      resetAt: now + windowMs,
    })
    return { allowed: true, remainingAttempts: maxAttempts - 1 }
  }

  // Trop de tentatives
  if (attempt.count >= maxAttempts) {
    return { allowed: false }
  }

  // Incrémenter le compteur
  attempt.count++
  return {
    allowed: true,
    remainingAttempts: maxAttempts - attempt.count,
  }
}

export function resetLoginRateLimit(identifier: string): void {
  loginAttempts.delete(identifier)
}
