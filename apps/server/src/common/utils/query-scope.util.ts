export function scopeQueryByTenant<T extends { tenantId: string }>(
  query: any,
  tenantId: string,
) {
  return query.findMany({
    where: {
      tenantId,
    },
  }) as Promise<T[]>
}
