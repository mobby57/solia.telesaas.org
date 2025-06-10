import { Prisma } from '@prisma/client';

export default function prismaMultiTenant(tenantId: string) {
  return async (params: Prisma.MiddlewareParams, next: (params: Prisma.MiddlewareParams) => Promise<any>): Promise<any> => {
    // Only apply tenant filtering for models that have tenantId field
    const modelsWithTenantId = [
      'User', 'Organization', 'Mission', 'Donation', 'Document',
      'Task', 'Comment', 'Tag', 'AuditLog', 'Tenant'
    ];

    if (!modelsWithTenantId.includes(params.model)) {
      return next(params);
    }

    // For read operations, add tenantId filter
    if (params.action === 'findUnique' || params.action === 'findFirst' || params.action === 'findMany') {
      if (!params.args) {
        params.args = {};
      }
      if (!params.args.where) {
        params.args.where = {};
      }
      // Add tenantId filter
      params.args.where = {
        ...params.args.where,
        tenantId,
      };
    }

    // For create operations, set tenantId
    if (params.action === 'create' || params.action === 'createMany') {
      if (!params.args) {
        params.args = {};
      }
      if (params.action === 'create') {
        params.args.data = {
          ...params.args.data,
          tenantId,
        };
      } else if (params.action === 'createMany') {
        if (Array.isArray(params.args.data)) {
          params.args.data = params.args.data.map((item: any) => ({
            ...item,
            tenantId,
          }));
        }
      }
    }

    // For update and delete operations, ensure tenantId filter is applied
    if (params.action === 'update' || params.action === 'updateMany' || params.action === 'delete' || params.action === 'deleteMany') {
      if (!params.args) {
        params.args = {};
      }
      if (!params.args.where) {
        params.args.where = {};
      }
      params.args.where = {
        ...params.args.where,
        tenantId,
      };
    }

    return next(params);
  };
}
