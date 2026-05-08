import { useState, useEffect } from 'react'
import { IconX, IconCheck } from '@tabler/icons-react'

export default function PhantomModal({ open, onDone, onCancel }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!open) { setProgress(0); return }
    const t = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(t); setTimeout(onDone, 400); return 100 }
        return p + 2
      })
    }, 40)
    return () => clearInterval(t)
  }, [open])

  if (!open) return null

  const steps = [
    { label: 'Detecting Phantom', done: progress >= 30 },
    { label: 'Requesting approval', done: progress >= 65 },
    { label: 'Loading devnet balance', done: progress >= 100 },
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(12,15,14,0.90)' }}>
      <div className="bg-bg1 rounded-fp p-7 w-72 text-center" style={{ border: '1px solid rgba(255,255,255,0.10)', borderTop: '1px solid rgba(0,255,135,0.30)' }}>
        <div className="text-4xl mb-3">👻</div>
        <h3 className="font-head font-extrabold text-base text-t1 mb-1.5">Connecting Phantom</h3>
        <p className="font-mono text-xs text-t2 mb-4 leading-relaxed">
          Approve the connection in your Phantom wallet to continue.
        </p>

        {/* Progress bar */}
        <div className="w-full h-0.5 bg-bg3 rounded-full overflow-hidden mb-4">
          <div
            className="h-full bg-green rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Steps */}
        <div className="text-left flex flex-col gap-2 mb-5">
          {steps.map(({ label, done }, i) => (
            <div key={i} className={`flex items-center gap-2.5 text-xs ${done ? 'text-t1' : 'text-t2'}`}>
              <div className={`w-5 h-5 rounded-sm flex items-center justify-center text-xs flex-shrink-0 ${done ? 'text-green' : 'text-t3'}`}
                style={{ border: done ? '1px solid rgba(0,255,135,0.30)' : '1px solid rgba(255,255,255,0.10)', background: done ? 'rgba(0,255,135,0.09)' : '#222b27' }}>
                {done ? <IconCheck size={10} /> : i + 1}
              </div>
              {label}
            </div>
          ))}
        </div>

        <button onClick={onCancel} className="fp-btn-ghost w-full justify-center">
          <IconX size={12} /> Cancel
        </button>
      </div>
    </div>
  )
}
