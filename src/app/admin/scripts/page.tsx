import { supabase } from '@/lib/supabase'

export const revalidate = 0

export default async function ScriptsPage() {
  const { data: scripts } = await supabase
    .from('scripts')
    .select('script_id, script_headline, target_word_count, actual_word_count, created_at, due_date, clients(client_full_name)')
    .order('created_at', { ascending: false })
    .limit(50)

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Scripts</h1>
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b"><tr>
            <th className="text-left p-3 font-medium">Headline</th>
            <th className="text-left p-3 font-medium">Client</th>
            <th className="text-left p-3 font-medium">Target</th>
            <th className="text-left p-3 font-medium">Actual</th>
            <th className="text-left p-3 font-medium">Due</th>
            <th className="text-left p-3 font-medium">Created</th>
          </tr></thead>
          <tbody>
            {scripts?.map((s: any) => (
              <tr key={s.script_id} className="border-b last:border-0 hover:bg-gray-50">
                <td className="p-3 max-w-xs truncate">{s.script_headline || 'Untitled'}</td>
                <td className="p-3 text-gray-500">{s.clients?.client_full_name || '-'}</td>
                <td className="p-3 text-gray-500">{s.target_word_count || '-'}</td>
                <td className="p-3 text-gray-500">{s.actual_word_count || '-'}</td>
                <td className="p-3 text-gray-500">{s.due_date || '-'}</td>
                <td className="p-3 text-gray-500">{s.created_at ? new Date(s.created_at).toLocaleDateString() : '-'}</td>
              </tr>
            ))}
            {(!scripts || scripts.length === 0) && (
              <tr><td colSpan={6} className="p-6 text-center text-gray-400">No scripts yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}