import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-void px-6">
      {/* Glow effects */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 h-[300px] w-[300px] rounded-full bg-ignite/5 blur-[120px]" />
      </div>

      <div className="relative text-center">
        {/* 404 number */}
        <h1 className="font-pixel text-[120px] font-bold leading-none text-ignite/20 sm:text-[180px]">
          404
        </h1>

        {/* Message */}
        <div className="-mt-6 sm:-mt-10">
          <h2 className="font-pixel text-2xl font-bold text-chalk sm:text-3xl">
            Page not found
          </h2>
          <p className="mt-3 max-w-md text-base text-blush">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
            Check the URL or head back to explore our components.
          </p>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-flex h-10 items-center gap-2 rounded-lg bg-ignite px-5 text-sm font-medium text-void transition-colors hover:bg-ignite/90"
          >
            Go home
          </Link>
          <Link
            href="/docs"
            className="inline-flex h-10 items-center gap-2 rounded-lg border border-border px-5 text-sm font-medium text-blush transition-colors hover:border-border-light hover:text-chalk"
          >
            Browse docs
          </Link>
          <Link
            href="/templates"
            className="inline-flex h-10 items-center gap-2 rounded-lg border border-border px-5 text-sm font-medium text-blush transition-colors hover:border-border-light hover:text-chalk"
          >
            View templates
          </Link>
        </div>

        {/* Subtle hint */}
        <p className="mt-12 text-xs text-text-faint">
          Praxys UI &mdash; 44 components, 8 templates, infinite possibilities.
        </p>
      </div>
    </div>
  )
}
