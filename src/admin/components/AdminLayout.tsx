import { Outlet } from 'react-router-dom'
import { useEventContent } from '../../content/ContentContext'
import { AdminHeader } from './AdminHeader'
import { AdminSidebar } from './AdminSidebar'

export function AdminLayout() {
  const { isLoading, error } = useEventContent()

  return (
    <div className="min-h-screen bg-base">
      <AdminHeader />
      <div className="mx-auto flex w-full max-w-7xl flex-col lg:flex-row">
        <AdminSidebar />
        <main className="flex-1 p-4 sm:p-6">
          {isLoading ? <p className="mb-3 text-sm text-muted">Loading content bundle...</p> : null}
          {error ? <p className="mb-3 rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">{error}</p> : null}
          <Outlet />
        </main>
      </div>
    </div>
  )
}
