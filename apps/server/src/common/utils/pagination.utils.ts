// src/common/utils/pagination.utils.ts
export interface PaginationParams {
  page: number
  limit: number
}

export interface PaginatedResult<T> {
  data: T[]
  total: number
  page: number
  limit: number
}

export const paginate = <T>(
  data: T[],
  total: number,
  page: number,
  limit: number,
): PaginatedResult<T> => {
  return {
    data,
    total,
    page,
    limit,
  }
}

export const calculateOffset = (page: number, limit: number): number => {
  return (page - 1) * limit
}
