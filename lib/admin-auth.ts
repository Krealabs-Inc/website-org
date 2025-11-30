import { NextRequest } from 'next/server';

export function isAdminAuthenticated(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization');

  if (!authHeader) {
    return false;
  }

  // Simple Bearer token authentication
  // In production, use a more secure method
  const token = authHeader.replace('Bearer ', '');
  const adminToken = process.env.ADMIN_TOKEN;

  return token === adminToken;
}

export function getAdminAuthError() {
  return Response.json(
    { error: 'Non autorisé' },
    { status: 401 }
  );
}
