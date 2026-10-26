import axios, { AxiosError } from 'axios';

export interface ApiErrorBody {
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
}

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? '/api/v1',
  timeout: 15_000,
  // Sessions are cookie-based. Sending credentials from the start avoids a
  // confusing "works in dev, 401s in prod" moment once auth lands.
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

/** An API answer, keeping the status and code alongside the message. */
export class ApiError extends Error {
  readonly status: number;
  readonly code: string;
  readonly details: unknown;

  constructor(message: string, status: number, code: string, details?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

/**
 * Normalises everything the UI might catch into an Error with a message worth
 * showing. Timeouts and dropped connections get their own wording.
 */
export function toApiError(error: unknown): Error {
  if (error instanceof AxiosError) {
    if (error.code === 'ECONNABORTED') {
      return new Error('The request timed out. Please check your connection and try again.');
    }
    if (!error.response) {
      return new Error('Cannot reach the server. Please check your connection.');
    }
    const body = error.response.data as ApiErrorBody | undefined;
    const code = body?.error?.code ?? 'UNKNOWN';
    const message = body?.error?.message ?? `Request failed with status ${error.response.status}`;
    return new ApiError(message, error.response.status, code, body?.error?.details);
  }
  return error instanceof Error ? error : new Error('An unexpected error occurred');
}
