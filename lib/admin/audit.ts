/**
 * Audit Logging System
 *
 * Système de logging pour tracer toutes les actions admin :
 * - Qui a fait quoi et quand
 * - Sur quelle ressource
 * - Avec quelles métadonnées
 * - Depuis quelle IP
 */

import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { NextRequest } from 'next/server'

// ========================================
// TYPES
// ========================================

export type AuditAction =
  // Authentication
  | 'LOGIN'
  | 'LOGOUT'
  | 'LOGOUT_ALL'
  | 'LOGIN_FAILED'
  | 'PASSWORD_CHANGED'
  // Contacts
  | 'CREATE_CONTACT'
  | 'UPDATE_CONTACT'
  | 'DELETE_CONTACT'
  | 'BULK_DELETE_CONTACTS'
  | 'EXPORT_CONTACTS'
  | 'ADD_CONTACT_NOTE'
  | 'UPDATE_CONTACT_STATUS'
  | 'ASSIGN_CONTACT'
  | 'TAG_CONTACT'
  // Products
  | 'CREATE_PRODUCT'
  | 'UPDATE_PRODUCT'
  | 'DELETE_PRODUCT'
  | 'TOGGLE_PRODUCT_STATUS'
  | 'SYNC_STRIPE_PRODUCTS'
  // Orders
  | 'VIEW_ORDER'
  | 'REFUND_ORDER'
  | 'UPDATE_ORDER_STATUS'
  // Campaigns
  | 'CREATE_CAMPAIGN'
  | 'UPDATE_CAMPAIGN'
  | 'DELETE_CAMPAIGN'
  | 'SEND_CAMPAIGN'
  | 'SCHEDULE_CAMPAIGN'
  // Admin Management
  | 'CREATE_ADMIN'
  | 'UPDATE_ADMIN'
  | 'DELETE_ADMIN'
  | 'DEACTIVATE_ADMIN'
  // System
  | 'EXPORT_DATA'
  | 'IMPORT_DATA'
  | 'UPDATE_SETTINGS'

export type AuditResource =
  | 'Session'
  | 'AdminUser'
  | 'Contact'
  | 'WaitlistContact'
  | 'ContactForm'
  | 'Note'
  | 'Campaign'
  | 'Settings'

export interface AuditLogParams {
  adminId: string
  action: AuditAction
  resource: AuditResource
  resourceId?: string
  metadata?: Record<string, any>
  ipAddress?: string | null
  userAgent?: string | null
}

// ========================================
// AUDIT LOGGING
// ========================================

/**
 * Crée une entrée d'audit log
 */
export async function logAudit(params: AuditLogParams): Promise<void> {
  try {
    await prisma.auditLog.create({
      data: {
        adminId: params.adminId,
        action: params.action,
        resource: params.resource,
        resourceId: params.resourceId,
        metadata: (params.metadata as Prisma.InputJsonValue) ?? Prisma.JsonNull,
        ipAddress: params.ipAddress,
        userAgent: params.userAgent,
      },
    })
  } catch (error) {
    // Ne pas bloquer l'opération si le logging échoue
    console.error('Failed to log audit:', error)
  }
}

/**
 * Helper pour extraire les infos de la requête
 */
export function getRequestInfo(request: NextRequest) {
  return {
    ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || null,
    userAgent: request.headers.get('user-agent') || null,
  }
}

/**
 * Récupère l'historique d'audit avec filtres
 */
export async function getAuditLogs(params: {
  adminId?: string
  action?: AuditAction
  resource?: AuditResource
  resourceId?: string
  startDate?: Date
  endDate?: Date
  page?: number
  perPage?: number
}) {
  const {
    adminId,
    action,
    resource,
    resourceId,
    startDate,
    endDate,
    page = 1,
    perPage = 50,
  } = params

  const where: any = {}

  if (adminId) where.adminId = adminId
  if (action) where.action = action
  if (resource) where.resource = resource
  if (resourceId) where.resourceId = resourceId
  if (startDate || endDate) {
    where.createdAt = {}
    if (startDate) where.createdAt.gte = startDate
    if (endDate) where.createdAt.lte = endDate
  }

  const [logs, total] = await Promise.all([
    prisma.auditLog.findMany({
      where,
      include: {
        admin: {
          select: {
            id: true,
            email: true,
            name: true,
            role: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: perPage,
      skip: (page - 1) * perPage,
    }),
    prisma.auditLog.count({ where }),
  ])

  return {
    logs,
    total,
    page,
    perPage,
    totalPages: Math.ceil(total / perPage),
  }
}

/**
 * Récupère l'historique d'une ressource spécifique
 */
export async function getResourceHistory(
  resource: AuditResource,
  resourceId: string
) {
  return prisma.auditLog.findMany({
    where: {
      resource,
      resourceId,
    },
    include: {
      admin: {
        select: {
          id: true,
          email: true,
          name: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
    take: 20,
  })
}

/**
 * Récupère les statistiques d'activité admin
 */
export async function getAdminActivityStats(adminId: string, days: number = 30) {
  const startDate = new Date()
  startDate.setDate(startDate.getDate() - days)

  const [totalActions, actionsByType, recentActions] = await Promise.all([
    // Total d'actions
    prisma.auditLog.count({
      where: {
        adminId,
        createdAt: { gte: startDate },
      },
    }),

    // Actions par type
    prisma.auditLog.groupBy({
      by: ['action'],
      where: {
        adminId,
        createdAt: { gte: startDate },
      },
      _count: true,
      orderBy: {
        _count: {
          action: 'desc',
        },
      },
    }),

    // Actions récentes
    prisma.auditLog.findMany({
      where: {
        adminId,
      },
      orderBy: { createdAt: 'desc' },
      take: 10,
    }),
  ])

  return {
    totalActions,
    actionsByType,
    recentActions,
  }
}

/**
 * Nettoie les vieux logs (GDPR compliance)
 */
export async function cleanupOldAuditLogs(olderThanDays: number = 365) {
  const cutoffDate = new Date()
  cutoffDate.setDate(cutoffDate.getDate() - olderThanDays)

  const result = await prisma.auditLog.deleteMany({
    where: {
      createdAt: {
        lt: cutoffDate,
      },
    },
  })

  console.log(`Cleaned up ${result.count} audit logs older than ${olderThanDays} days`)

  return result.count
}

// ========================================
// HELPERS POUR ACTIONS COMMUNES
// ========================================

/**
 * Log une action CRUD standard
 */
export async function logCRUD(params: {
  adminId: string
  operation: 'create' | 'update' | 'delete'
  resource: AuditResource
  resourceId: string
  changes?: Record<string, any>
  request?: NextRequest
}) {
  const actionMap = {
    create: 'CREATE',
    update: 'UPDATE',
    delete: 'DELETE',
  }

  const action = `${actionMap[params.operation]}_${params.resource.toUpperCase()}` as AuditAction

  const requestInfo = params.request ? getRequestInfo(params.request) : {}

  await logAudit({
    adminId: params.adminId,
    action,
    resource: params.resource,
    resourceId: params.resourceId,
    metadata: params.changes,
    ...requestInfo,
  })
}

/**
 * Log une exportation de données
 */
export async function logExport(params: {
  adminId: string
  resource: AuditResource
  format: 'csv' | 'json' | 'excel'
  filters?: Record<string, any>
  count: number
  request?: NextRequest
}) {
  const requestInfo = params.request ? getRequestInfo(params.request) : {}

  await logAudit({
    adminId: params.adminId,
    action: 'EXPORT_DATA',
    resource: params.resource,
    metadata: {
      format: params.format,
      filters: params.filters,
      count: params.count,
    },
    ...requestInfo,
  })
}

/**
 * Log une action bulk (suppression multiple, etc.)
 */
export async function logBulkAction(params: {
  adminId: string
  action: AuditAction
  resource: AuditResource
  resourceIds: string[]
  metadata?: Record<string, any>
  request?: NextRequest
}) {
  const requestInfo = params.request ? getRequestInfo(params.request) : {}

  await logAudit({
    adminId: params.adminId,
    action: params.action,
    resource: params.resource,
    metadata: {
      ...params.metadata,
      resourceIds: params.resourceIds,
      count: params.resourceIds.length,
    },
    ...requestInfo,
  })
}
