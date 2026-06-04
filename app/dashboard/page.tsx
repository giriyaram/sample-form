'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getLeads, isLoggedIn, logout, type Lead } from '@/lib/store'

export default function DashboardPage() {
  const router = useRouter()
  const [leads, setLeads] = useState<Lead[]>([])
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!isLoggedIn()) { router.replace('/login'); return }
    setLeads(getLeads())
    setReady(true)
  }, [router])

  function handleLogout() {
    logout()
    router.push('/')
  }

  const today = leads.filter(l => new Date(l.submittedAt).toDateString() === new Date().toDateString()).length
  const thisWeek = leads.filter(l => Date.now() - new Date(l.submittedAt).getTime() < 7 * 86400000).length
  const complete = leads.filter(l => l.aadharFile && l.panFile && l.chequeFile).length

  if (!ready) return null

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
          <div className="flex items-center gap-3">
            <a href="/" className="font-bold text-lg text-gray-900">
              EOI<span className="text-red-500">.</span>
            </a>
            <span className="text-gray-300">|</span>
            <h1 className="font-semibold text-gray-700 text-sm">Leads Dashboard</h1>
          </div>
          <button
            onClick={handleLogout}
            className="text-xs text-gray-500 hover:text-red-600 transition-colors font-medium"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Total Leads', value: leads.length, color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'Today', value: today, color: 'text-green-600', bg: 'bg-green-50' },
            { label: 'This Week', value: thisWeek, color: 'text-purple-600', bg: 'bg-purple-50' },
            { label: 'Docs Complete', value: complete, color: 'text-red-600', bg: 'bg-red-50' },
          ].map(({ label, value, color, bg }) => (
            <div key={label} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
              <div className={`inline-flex items-center justify-center w-8 h-8 rounded-lg ${bg} mb-2`}>
                <span className={`text-sm font-bold ${color}`}>{value}</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-semibold text-gray-800">All Submissions</h2>
            <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">{leads.length} total</span>
          </div>

          {leads.length === 0 ? (
            <div className="py-20 text-center">
              <div className="text-5xl mb-4">📋</div>
              <p className="font-semibold text-gray-600">No leads yet</p>
              <p className="text-sm text-gray-400 mt-1">Submitted forms will appear here</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    {['#', 'Name', 'Mobile', 'Email', 'Size', 'Floor', 'Tower', 'Facing', 'Documents', 'Date'].map(h => (
                      <th key={h} className="text-left text-xs font-semibold text-gray-500 px-4 py-3 whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {leads.map((lead, i) => (
                    <tr key={lead.id} className="hover:bg-gray-50/60 transition-colors">
                      <td className="px-4 py-3 text-gray-400 text-xs">{i + 1}</td>

                      <td className="px-4 py-3 whitespace-nowrap">
                        <p className="font-semibold text-gray-900">{lead.firstName} {lead.lastName}</p>
                        {lead.alternateName && (
                          <p className="text-xs text-gray-400">{lead.alternateName}</p>
                        )}
                      </td>

                      <td className="px-4 py-3 whitespace-nowrap">
                        <p className="text-gray-700">{lead.mobile}</p>
                        {lead.alternateNumber && (
                          <p className="text-xs text-gray-400">{lead.alternateNumber}</p>
                        )}
                      </td>

                      <td className="px-4 py-3 text-gray-600 max-w-[160px] truncate">
                        {lead.email || <span className="text-gray-300">—</span>}
                      </td>

                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="bg-blue-50 text-blue-700 text-xs font-semibold px-2 py-1 rounded-md">
                          {lead.size} sq ft
                        </span>
                      </td>

                      <td className="px-4 py-3 text-gray-600 whitespace-nowrap text-xs">
                        Floor {lead.floorSize}
                      </td>

                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="bg-slate-100 text-slate-700 text-xs font-medium px-2 py-1 rounded-md">
                          {lead.tower}
                        </span>
                      </td>

                      <td className="px-4 py-3 text-gray-600 text-xs whitespace-nowrap">
                        {lead.facing}
                      </td>

                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-1">
                          {lead.aadharFile && <DocBadge label="Aadhar" />}
                          {lead.panFile && <DocBadge label="PAN" />}
                          {lead.chequeFile && <DocBadge label="Cheque" />}
                        </div>
                      </td>

                      <td className="px-4 py-3 text-gray-400 text-xs whitespace-nowrap">
                        {new Date(lead.submittedAt).toLocaleDateString('en-IN', {
                          day: '2-digit', month: 'short', year: 'numeric',
                        })}
                        <br />
                        {new Date(lead.submittedAt).toLocaleTimeString('en-IN', {
                          hour: '2-digit', minute: '2-digit',
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

function DocBadge({ label }: { label: string }) {
  return (
    <span className="bg-green-50 text-green-700 text-xs font-medium px-2 py-0.5 rounded-md border border-green-100">
      ✓ {label}
    </span>
  )
}
