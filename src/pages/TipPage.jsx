import { useState } from 'react'
import { IconSearch, IconSend, IconQrcode, IconCheck } from '@tabler/icons-react'
import { USERS } from '../data/users'

const AMOUNTS = [0.1, 0.5, 1, 5, 10]
const SOL_USD = 146.4

export default function TipPage({ onSuccess, onQR }) {
  const [query, setQuery]       = useState('')
  const [user, setUser]         = useState(null)
  const [notFound, setNotFound] = useState(false)
  const [selAmt, setSelAmt]     = useState(0.5)
  const [custom, setCustom]     = useState('')

  function search() {
    const key = query.trim().toLowerCase()
    const k   = key.startsWith('@') ? key : '@' + key.replace('fastpay.id/', '').replace('@', '')
    const u   = USERS[k]
    setUser(u || null)
    setNotFound(!u)
  }

  function send() {
    const amt = parseFloat(custom) > 0 ? parseFloat(custom) : selAmt
    const hash = Math.random().toString(36).substr(2, 4) + '...' + Math.random().toString(36).substr(2, 4)
    onSuccess(`${amt.toFixed(2)} SOL sent to ${user.handle} on Solana devnet`, `tx: ${hash}`)
  }

  const displayAmt = parseFloat(custom) > 0 ? parseFloat(custom) : selAmt

  return (
    <div>
      <div className="mb-5">
        <h2 className="font-head font-extrabold text-lg text-t1 mb-1">Send a Tip</h2>
        <p className="font-mono text-xs text-t2">Search by username — no wallet address required.</p>
      </div>

      {/* Search */}
      <p className="fp-slash mb-2.5">RECIPIENT LOOKUP</p>
      <div className="flex gap-2 mb-4">
        <input
          className="fp-input"
          placeholder="@username or fastpay.id/handle"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && search()}
        />
        <button className="fp-btn-green" onClick={search}>
          <IconSearch size={13} /> Find
        </button>
      </div>

      {/* Not found */}
      {notFound && !user && (
        <p className="font-mono text-xs text-danger mb-4">
          No user found for "{query}" — try @malebo, @dev_rizky, @jacob_codes
        </p>
      )}

      {/* User result */}
      {user && (
        <>
          {/* Profile card */}
          <div className="bg-bg2 rounded-fp p-4 flex items-center gap-4 mb-3" style={{ border: '1px solid rgba(255,255,255,0.10)' }}>
            <div className="w-12 h-12 rounded-fp flex items-center justify-center font-head font-extrabold text-base flex-shrink-0"
              style={{ background: user.avatarBg, color: user.avatarColor, border: `1px solid ${user.avatarColor}44` }}>
              {user.initials}
            </div>
            <div className="flex-1">
              <p className="font-head font-extrabold text-base text-t1">{user.name}</p>
              <p className="font-mono text-xs text-green mb-1">{user.handle}</p>
              <p className="font-mono text-xs text-t2 mb-1.5">{user.bio}</p>
              <span className="fp-badge-green"><IconCheck size={10} /> Verified on Solana</span>
            </div>
            <div className="text-right ml-auto">
              <p className="fp-slash mb-1 text-right">TRUST SCORE</p>
              <p className="font-mono text-3xl font-medium text-green">{user.score}</p>
              <p className="font-mono text-xs text-t3">/ 10.0</p>
            </div>
          </div>

          {/* Amount selector */}
          <div className="fp-card green-top p-4 mb-3">
            <p className="fp-slash mb-3">SELECT AMOUNT</p>
            <div className="flex gap-2 flex-wrap mb-3">
              {AMOUNTS.map(a => (
                <button
                  key={a}
                  onClick={() => { setSelAmt(a); setCustom('') }}
                  className={`fp-chip ${selAmt === a && !custom ? 'active' : ''}`}
                >
                  {a} SOL
                </button>
              ))}
            </div>
            <div className="flex gap-2 items-center mb-4">
              <input
                className="fp-input"
                placeholder="Custom SOL amount"
                type="number"
                min="0.01"
                step="0.01"
                value={custom}
                onChange={e => { setCustom(e.target.value); setSelAmt(0) }}
              />
              <span className="font-mono text-xs text-t3 whitespace-nowrap">
                ≈ ${Math.round(displayAmt * SOL_USD).toLocaleString()} USD
              </span>
            </div>
            <div className="flex gap-2">
              <button className="fp-btn-green flex-1 justify-center" onClick={send}>
                <IconSend size={13} /> Send via Phantom
              </button>
              <button className="fp-btn-ghost" onClick={onQR}>
                <IconQrcode size={13} />
              </button>
            </div>
          </div>
        </>
      )}

      {/* Hint */}
      {!user && !notFound && (
        <div className="text-center py-10 font-mono text-xs text-t3">
          Try{' '}
          {['@malebo', '@dev_rizky', '@jacob_codes'].map((h, i) => (
            <span key={h}>
              <span
                className="text-green cursor-pointer"
                onClick={() => { setQuery(h); setNotFound(false); const k=h; const u=USERS[k]; setUser(u||null); }}
              >{h}</span>
              {i < 2 && ' · '}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
