import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui';
import { healthQuery } from '@/features/health/api';
import { toApiError } from '@/lib/api-client';

export function HomePage() {
  const health = useQuery(healthQuery);
  const detail = health.isPending
    ? 'Checking the API…'
    : health.isError
      ? toApiError(health.error).message
      : 'The API is up.';

  return (
    <main className="mx-auto flex min-h-page max-w-3xl flex-col justify-center gap-6 px-(--gutter) py-16">
      <p className="u-eyebrow">One Kawayan</p>
      <h1 className="u-display text-5xl text-ink">One Kawayan</h1>
      <p className="max-w-prose text-md text-ink-muted">{detail}</p>
      <div>
        <Button type="button" onClick={() => void health.refetch()} loading={health.isFetching}>
          Check again
        </Button>
      </div>
    </main>
  );
}
