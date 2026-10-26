/** Liveness payload from GET /api/v1/health. */
export interface HealthResponse {
  status: 'ok';
  uptime: number;
  timestamp: string;
}
