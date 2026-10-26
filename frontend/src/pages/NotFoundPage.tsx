import { ButtonLink } from '@/components/ui';

export function NotFoundPage() {
  return (
    <main className="mx-auto flex min-h-page max-w-3xl flex-col justify-center gap-6 px-(--gutter) py-16">
      <p className="u-eyebrow">404</p>
      <h1 className="u-display text-4xl text-ink">That page is not here</h1>
      <div>
        <ButtonLink to="/">Back home</ButtonLink>
      </div>
    </main>
  );
}
