import { queryOptions } from '@tanstack/react-query';
import type { HealthResponse } from '@contracts/health';
import { apiClient } from '@/lib/api-client';

export const healthKeys = {
  all: ['health'] as const,
};

export const healthQuery = queryOptions({
  queryKey: healthKeys.all,
  queryFn: async (): Promise<HealthResponse> => {
    const { data } = await apiClient.get<HealthResponse>('/health');
    return data;
  },
  staleTime: Infinity,
});
