'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { href: '/admin', label: 'Overview' },
  { href: '/admin/clients', label: 'Clients' },
  { href: '/admin/scripts', label: 'Scripts' },
  { href: '/admin/channels', label: 'Channels' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  return (
    <div className="min-h-screen flex">
      <aside className="w-56 bg-brand-900 text-white flex flex-col">
        <div className="p-4 border-b border-brand-700">
          <Link href="/admin" className="text-lg font-bold">Vidsponential</Link>
          <p className="text-xs text-brand-100/60 mt-0.5">Admin</p>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-3 py-2 rounded text-sm transition ${
                pathname === item.href
                  ? 'bg-brand-700 text-white'
                  : 'text-brand-100/70 hover:bg-brand-700/50 hover:text-white'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-8 overflow-auto">{children}</main>
    </div>
  )
}