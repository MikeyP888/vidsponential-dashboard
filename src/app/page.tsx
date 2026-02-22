import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-brand-700">Vidsponential</h1>
        <p className="text-gray-500">YouTube Script Writing &amp; Analytics</p>
        <div className="flex gap-4 justify-center">
          <Link href="/admin" className="px-6 py-3 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition">Admin Panel</Link>
          <Link href="/client" className="px-6 py-3 border border-brand-600 text-brand-600 rounded-lg hover:bg-brand-50 transition">Client Portal</Link>
        </div>
      </div>
    </div>
  )
}