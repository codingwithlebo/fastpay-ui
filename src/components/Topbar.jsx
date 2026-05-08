import { IconWallet, IconBell, IconSettings, IconCheck } from '@tabler/icons-react'

export default function Topbar({ connected, onConnect }) {
  return (
    <header className="bg-bg1 flex items-center justify-between px-5 h-12" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
      {/* Logo */}
      <div className="flex items-center gap-3.5">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-green rounded-fp flex items-center justify-center">
            <svg viewBox="0 0 14 14" width="13" height="13" fill="none">
              <polygon points="7,1 13,4.5 13,10.5 7,14 1,10.5 1,4.5" stroke="#0c0f0e" strokeWidth="1.5" />
              <circle cx="7" cy="7" r="2" fill="#0c0f0e" />
            </svg>
          </div>
          <span className="font-head font-extrabold text-base tracking-tight text-t1">
            Fast<span className="text-green">Pay</span>
          </span>
        </div>
        <div className="flex items-center gap-1.5 bg-bg2 rounded-fp px-2.5 py-1 text-t2 text-xs fp-border2">
          <span className="w-1.5 h-1.5 rounded-full bg-green inline-block" />
          Solana Devnet
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2.5">
        <span className="text-t3 text-xs hidden sm:block" id="clock">
          {new Date().toUTCString().split(' ')[4]} UTC
        </span>
        <button
          onClick={onConnect}
          className={connected ? 'fp-btn-green' : 'fp-btn-ghost'}
        >
          {connected ? <IconCheck size={13} /> : <IconWallet size={13} />}
          {connected ? 'Phantom Connected' : 'Connect Phantom'}
        </button>
        <button className="fp-btn-ghost px-2"><IconBell size={13} /></button>
        <button className="fp-btn-ghost px-2"><IconSettings size={13} /></button>
      </div>
    </header>
  )
}
