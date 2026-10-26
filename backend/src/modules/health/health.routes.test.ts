import { createServer } from 'node:http';
import type { AddressInfo } from 'node:net';
import { afterAll, describe, expect, it } from 'vitest';
import { createApp } from '../../app.js';

describe('GET /api/v1/health', () => {
  const server = createServer(createApp());
  const ready = new Promise<void>((resolve) => {
    server.listen(0, '127.0.0.1', () => resolve());
  });

  afterAll(
    () =>
      new Promise<void>((resolve, reject) => {
        server.close((error) => (error ? reject(error) : resolve()));
      }),
  );

  it('answers ok', async () => {
    await ready;
    const { port } = server.address() as AddressInfo;
    const response = await fetch(`http://127.0.0.1:${port}/api/v1/health`);
    expect(response.status).toBe(200);
    const body = (await response.json()) as { status: string };
    expect(body.status).toBe('ok');
  });
});
