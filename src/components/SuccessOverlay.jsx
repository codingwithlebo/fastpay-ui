import { IconCheck } from '@tabler/icons-react'

export default function SuccessOverlay({ show, message, hash, onClose }) {
  if (!show) return null
  return (
    <div className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-3.5" style={{ background: 'rgba(12,15,14,0.93)' }}>
      <div className="w-16 h-16 rounded-fp flex items-center justify-center" style={{ background: 'rgba(0,255,135,0.08)', border: '1px solid rgba(0,255,135,0.27)' }}>
        <IconCheck size={28} className="text-green" />
      </div>
      <h2 className="font-head font-extrabold text-xl text-t1">Tip Sent</h2>
      <p className="font-mono text-xs text-t2 text-center max-w-xs leading-relaxed">{message}</p>
      <p className="font-mono text-xs text-blue">{hash} · Solscan ↗</p>
      <button onClick={onClose} className="fp-btn-green mt-1">
        <IconCheck size={13} /> Done
      </button>
    </div>
  )
}
