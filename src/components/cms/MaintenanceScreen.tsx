type MaintenanceScreenProps = {
  title: string
  subtitle: string
}

export function MaintenanceScreen({ title, subtitle }: MaintenanceScreenProps) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-16">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(16,183,198,0.22),transparent_28%),radial-gradient(circle_at_bottom,rgba(255,221,166,0.24),transparent_30%)]" />
      <div className="w-full max-w-3xl rounded-[32px] border border-black/10 bg-white/80 p-10 text-center shadow-[0_24px_90px_rgba(6,50,71,0.14)] backdrop-blur">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-accentSoft">Maintenance</p>
        <h1 className="mt-5 font-heading text-4xl text-[#063247] sm:text-6xl">{title || 'Service under maintenance'}</h1>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-muted sm:text-lg">
          {subtitle || 'The site is temporarily unavailable while updates are in progress. Please check back shortly.'}
        </p>
      </div>
    </div>
  )
}
