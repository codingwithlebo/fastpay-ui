import { IconCheck, IconExternalLink } from '@tabler/icons-react'

export default function SuccessOverlay({ show, message, hash, onClose }) {
    if (!show) return null

    const cleanHash = hash ? hash.replace('tx:', '').trim() : '';

    const solscanUrl = `https://solscan.io/tx/${cleanHash}?cluster=devnet`;

    return (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-3.5" style={{ background: 'rgba(12,15,14,0.93)' }}>
            <div className="w-16 h-16 rounded-fp flex items-center justify-center" style={{ background: 'rgba(0,255,135,0.08)', border: '1px solid rgba(0,255,135,0.27)' }}>
                <IconCheck size={28} className="text-green" />
            </div>

            <h2 className="font-head font-extrabold text-xl text-t1">Tip Sent</h2>

            <p className="font-mono text-xs text-t2 text-center max-w-xs leading-relaxed">
                {message}
            </p>

            <a
                href={solscanUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-1.5 font-mono text-[10px] text-blue hover:text-blue/80 transition-colors"
            >
                {hash?.slice(0, 8)}...{hash?.slice(-8)}
                <IconExternalLink size={12} className="opacity-70 group-hover:opacity-100" />
                <span className="underline decoration-blue/30 underline-offset-2">View on Solscan</span>
            </a>

            <button onClick={onClose} className="fp-btn-green mt-1">
                <IconCheck size={13} /> Done
            </button>
        </div>
    )
}