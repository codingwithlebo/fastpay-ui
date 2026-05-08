import { useEffect, useRef } from 'react'
import { TRANSACTIONS } from '../data/users'

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const RECV = [2.1, 3.4, 1.8, 4.2, 5.0, 3.7, 4.1]
const TIPS = [4, 7, 3, 9, 12, 8, 10]

function MiniBar({ data, color }) {
  const max = Math.max(...data)
  return (
    <div className="flex items-end gap-1 h-24 mt-3">
      {data.map((v, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1">
          <div
            className="w-full rounded-sm transition-all"
            style={{ height: `${(v / max) * 80}px`, background: color + 'cc', minHeight: 3 }}
          />
          <span className="font-mono text-t3" style={{ fontSize: 9 }}>{DAYS[i]}</span>
        </div>
      ))}
    </div>
  )
}

function MiniLine({ data, color }) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const H = 80, W = 100
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * W
    const y = H - ((v - min) / (max - min || 1)) * H
    return `${x},${y}`
  }).join(' ')

  return (
    <div className="mt-3">
      <svg viewBox={`0 0 100 ${H}`} className="w-full" style={{ height: 80 }} preserveAspectRatio="none">
        <defs>
          <linearGradient id="lg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.3" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" />
      </svg>
      <div className="flex justify-between mt-1">
        {DAYS.map(d => <span key={d} className="font-mono text-t3" style={{ fontSize: 9 }}>{d}</span>)}
      </div>
    </div>
  )
}

export default function Dashboard() {
  return (
    <div>
      <div className="mb-5">
        <h2 className="font-head font-extrabold text-lg text-t1 mb-1">Dashboard</h2>
        <p className="font-mono text-xs text-t2">Your on-chain payment activity and earnings.</p>
      </div>

      {/* KPI grid */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        {[
          { label: 'TOTAL RECEIVED', val: '24.3 SOL', sub: '↑ +3.2 this week', color: '#00ff87', top: '#00ff87' },
          { label: 'TOTAL SENT',     val: '8.5 SOL',  sub: '↓ -0.4 this week', color: '#4d9fff', top: '#4d9fff' },
          { label: 'TIPS RECEIVED',  val: '47',        sub: '↑ +8 this week',   color: '#e8efe8', top: '#8fa88f' },
          { label: 'TOP TIPPER',     val: '@dev_rizky', sub: '5.0 SOL total',   color: '#f5a623', top: '#f5a623' },
        ].map(({ label, val, sub, color, top }) => (
          <div key={label} className="bg-bg1 rounded-fp p-3.5 relative overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
            <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg,transparent,${top}55,transparent)` }} />
            <p className="font-mono text-t3 mb-2" style={{ fontSize: 10, letterSpacing: '0.1em' }}>{label}</p>
            <p className="font-mono text-2xl font-medium tracking-tight" style={{ color, fontSize: val.startsWith('@') ? 13 : undefined }}>{val}</p>
            <p className="font-mono text-t2 mt-1" style={{ fontSize: 10 }}>{sub}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="fp-card green-top p-4">
          <p className="fp-slash">SOL RECEIVED · 7 DAYS</p>
          <MiniBar data={RECV} color="#00ff87" />
        </div>
        <div className="fp-card blue-top p-4">
          <p className="fp-slash">TIP FREQUENCY · 7 DAYS</p>
          <MiniLine data={TIPS} color="#4d9fff" />
        </div>
      </div>

      {/* Recent */}
      <p className="fp-slash mb-2.5">RECENT ACTIVITY</p>
      <div className="flex flex-col gap-1.5">
        {TRANSACTIONS.map((tx, i) => {
          const isIn = tx.type === 'RECEIVED'
          const color = isIn ? '#00ff87' : '#ff4060'
          return (
            <div key={i} className="flex items-center gap-2.5 px-3 py-2.5 bg-bg1 rounded-fp"
              style={{ border: '1px solid rgba(255,255,255,0.06)', borderLeft: `2px solid ${color}` }}>
              <div className="w-8 h-8 rounded-fp flex items-center justify-center font-mono text-xs font-bold flex-shrink-0"
                style={{ background: color + '12', color, border: `1px solid ${color}33` }}>
                {isIn ? tx.party.slice(1, 3).toUpperCase() : '↑'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-mono text-xs text-t1 truncate">
                  {isIn ? `${tx.party} tipped you` : `You tipped ${tx.party}`}
                </p>
                <p className="font-mono text-t3" style={{ fontSize: 10 }}>{tx.time} · devnet · {tx.hash}</p>
              </div>
              <span className="font-mono text-sm font-medium" style={{ color }}>{tx.amount}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
