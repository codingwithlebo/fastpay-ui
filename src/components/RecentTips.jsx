import { IconHistory, IconExternalLink } from '@tabler/icons-react'

const STORAGE_KEY = 'fp_recent_tips'

export function saveRecentTip({ handle, amount, hash }) {
    try {
        const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
        const newEntry = {
            handle,
            amount,
            hash,
            date: new Date().toISOString(),
        }
        const updated = [newEntry, ...existing].slice(0, 5)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    } catch {
        // localStorage unavailable — fail silently
    }
}

function formatDate(iso) {
    return new Date(iso).toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    })
}

export default function RecentTips() {
    let tips = []
    try {
        tips = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    } catch {
        return null
    }

    if (!tips.length) return null

    return (
        <div className="fp-card p-4 mt-3">
            <p className="fp-slash mb-3 flex items-center gap-1.5">
                <IconHistory size={11} />
                RECENT ACTIVITY
            </p>

            <div className="flex flex-col gap-2">
                {tips.map((tip, i) => {
                    // Strip "tx: " prefix if present (legacy entries)
                    const cleanHash = tip.hash?.replace(/^tx:\s*/, '') ?? ''
                    const solscanUrl = `https://solscan.io/tx/${cleanHash}?cluster=devnet`

                    return (
                        <div
                            key={i}
                            className="flex items-center justify-between gap-3 py-2 border-t"
                            style={{ borderColor: 'rgba(255,255,255,0.07)' }}
                        >
                            {/* Left — recipient + date */}
                            <div className="flex flex-col min-w-0">
                                <span className="font-mono text-xs text-green truncate">
                                    {tip.handle}
                                </span>
                                <span className="font-mono text-[10px] text-t3 truncate">
                                    {formatDate(tip.date)}
                                </span>
                            </div>

                            {/* Right — amount + Solscan link */}
                            <div className="flex items-center gap-2 shrink-0">
                                <span className="font-mono text-xs text-t1 font-medium">
                                    {Number(tip.amount).toFixed(2)} SOL
                                </span>
                                {cleanHash && (
                                    <a
                                        href={solscanUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-t3 hover:text-green transition-colors"
                                        title="View on Solscan"
                                    >
                                        <IconExternalLink size={12} />
                                    </a>
                                )}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}