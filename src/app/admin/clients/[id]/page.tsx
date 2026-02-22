import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export const revalidate = 0

export default async function ClientDetail({ params }: { params: { id: string } }) {
  const { data: client } = await supabase
    .from('clients')
    .select('*')
    .eq('client_id', params.id)
    .single()

  const { data: channels } = await supabase
    .from('youtube_channels')
    .select('youtube_channel_id, channel_display_name, youtube_channel_name')
    .eq('client_id', params.id)

  const { data: scripts } = await supabase
    .from('scripts')
    .select('script_id, script_headline, created_at, target_word_count')
    .eq('client_id', params.id)
    .order('created_at', { ascending: false })
    .limit(20)

  if (!client) return <div className="p-8 text-gray-500">Client not found</div>

  return (
    <div>
      <Link href="/admin/clients" className="text-sm text-brand-600 hover:underline">Back to clients</Link>
      <h1 className="text-2xl font-bold mt-3 mb-6">{client.client_full_name || 'Unnamed Client'}</h1>
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border p-5">
          <h2 className="font-semibold mb-3">Details</h2>
          <dl className="space-y-2 text-sm">
            <div className="flex"><dt className="w-24 text-gray-500">Email</dt><dd>{client.client_email || '-'}</dd></div>
            <div className="flex"><dt className="w-24 text-gray-500">Location</dt><dd>{client.client_location || '-'}</dd></div>
            <div className="flex"><dt className="w-24 text-gray-500">Source</dt><dd>{client.client_source || '-'}</dd></div>
            <div className="flex"><dt className="w-24 text-gray-500">Company</dt><dd>{client.company_name || '-'}</dd></div>
          </dl>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-5">
          <h2 className="font-semibold mb-3">Channels ({channels?.length ?? 0})</h2>
          {channels && channels.length > 0 ? (
            <ul className="space-y-2 text-sm">
              {channels.map(ch => (
                <li key={ch.youtube_channel_id}>
                  <Link href={`/admin/channels/${ch.youtube_channel_id}`} className="text-brand-600 hover:underline">
                    {ch.channel_display_name || ch.youtube_channel_name || 'Unnamed'}
                  </Link>
                </li>
              ))}
            </ul>
          ) : <p className="text-sm text-gray-400">No channels linked</p>}
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="p-5 border-b"><h2 className="font-semibold">Recent Scripts</h2></div>
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b"><tr>
            <th className="text-left p-3 font-medium">Headline</th>
            <th className="text-left p-3 font-medium">Words</th>
            <th className="text-left p-3 font-medium">Date</th>
          </tr></thead>
          <tbody>
            {scripts?.map(s => (
              <tr key={s.script_id} className="border-b last:border-0 hover:bg-gray-50">
                <td className="p-3">{s.script_headline || 'Untitled'}</td>
                <td className="p-3 text-gray-500">{s.target_word_count || '-'}</td>
                <td className="p-3 text-gray-500">{s.created_at ? new Date(s.created_at).toLocaleDateString() : '-'}</td>
              </tr>
            ))}
            {(!scripts || scripts.length === 0) && (
              <tr><td colSpan={3} className="p-6 text-center text-gray-400">No scripts yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}