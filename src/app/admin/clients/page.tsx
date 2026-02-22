import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export const revalidate = 0

export default async function ClientsPage() {
  const { data: clients } = await supabase
    .from('clients')
    .select('client_id, client_full_name, client_email, client_location, client_source, created_at')
    .order('created_at', { ascending: false })

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Clients</h1>
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left p-3 font-medium">Name</th>
              <th className="text-left p-3 font-medium">Email</th>
              <th className="text-left p-3 font-medium">Location</th>
              <th className="text-left p-3 font-medium">Source</th>
            </tr>
          </thead>
          <tbody>
            {clients?.map(c => (
              <tr key={c.client_id} className="border-b last:border-0 hover:bg-gray-50">
                <td className="p-3">
                  <Link href={`/admin/clients/${c.client_id}`} className="text-brand-600 hover:underline">
                    {c.client_full_name || 'Unnamed'}
                  </Link>
                </td>
                <td className="p-3 text-gray-500">{c.client_email || '-'}</td>
                <td className="p-3 text-gray-500">{c.client_location || '-'}</td>
                <td className="p-3 text-gray-500">{c.client_source || '-'}</td>
              </tr>
            ))}
            {(!clients || clients.length === 0) && (
              <tr><td colSpan={4} className="p-6 text-center text-gray-400">No clients yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}