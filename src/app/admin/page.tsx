import { supabase } from '@/lib/supabase'

export const revalidate = 0

export default async function AdminOverview() {
  const [{ count: clientCount }, { count: scriptCount }, { count: channelCount }] = await Promise.all([
    supabase.from('clients').select('*', { count: 'exact', head: true }),
    supabase.from('scripts').select('*', { count: 'exact', head: true }),
    supabase.from('youtube_channels').select('*', { count: 'exact', head: true }),
  ])

  const stats = [
    { label: 'Clients', value: clientCount ?? 0 },
    { label: 'Scripts', value: scriptCount ?? 0 },
    { label: 'Channels', value: channelCount ?? 0 },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-3 gap-6">
        {stats.map(s => (
          <div key={s.label} className="bg-white rounded-xl shadow-sm border p-6">
            <p className="text-sm text-gray-500">{s.label}</p>
            <p className="text-3xl font-bold mt-1">{s.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}