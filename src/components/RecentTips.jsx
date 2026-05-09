import {
    IconHistory,
    IconExternalLink,
} from "@tabler/icons-react"

const STORAGE_KEY = "fp_recent_tips"

export function saveRecentTip({
    handle,
    amount,
    hash,
}) {
    try {
        const existing = JSON.parse(
            localStorage.getItem(STORAGE_KEY) || "[]"
        )

        const newEntry = {
            handle,
            amount,
            hash,
            date: new Date().toISOString(),
        }

        const updated = [newEntry, ...existing].slice(0, 5)

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(updated)
        )
    } catch {
        // localStorage unavailable — fail silently
    }
}

function formatDate(iso) {
    return new Date(iso).toLocaleDateString(
        undefined,
        {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        }
    )
}

export default function RecentTips() {
    let tips = []

    try {
        tips = JSON.parse(
            localStorage.getItem(STORAGE_KEY) || "[]"
        )
    } catch {
        return null
    }

    if (!tips.length)
        return (
            <section
                className="fp-card p-6 mt-3 flex flex-col items-center text-center gap-3"
                aria-labelledby="recent-activity-empty"
            >
                <svg
                    width="52"
                    height="52"
                    viewBox="0 0 52 52"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                >
                    <circle
                        cx="26"
                        cy="26"
                        r="18"
                        stroke="rgba(255,255,255,0.08)"
                        strokeWidth="1.5"
                    />

                    <circle
                        cx="26"
                        cy="26"
                        r="12"
                        stroke="rgba(255,255,255,0.15)"
                        strokeWidth="1.5"
                    />

                    <line
                        x1="26"
                        y1="26"
                        x2="26"
                        y2="18"
                        stroke="var(--color-green, #4ade80)"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                    />

                    <line
                        x1="26"
                        y1="26"
                        x2="31"
                        y2="29"
                        stroke="rgba(255,255,255,0.35)"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                    />

                    <line
                        x1="26"
                        y1="44"
                        x2="26"
                        y2="37"
                        stroke="var(--color-green, #4ade80)"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                    />

                    <polyline
                        points="23,40 26,37 29,40"
                        stroke="var(--color-green, #4ade80)"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>

                <div>
                    <p
                        id="recent-activity-empty"
                        className="font-head font-extrabold text-sm text-t1 mb-1"
                    >
                        No recent activity yet
                    </p>

                    <p className="font-mono text-xs text-t3 leading-relaxed max-w-[220px]">
                        Start the economy by sending your
                        first tip!
                    </p>
                </div>

                <span className="fp-badge-green font-mono text-[10px] tracking-wider">
                    READY TO SEND
                </span>
            </section>
        )

    return (
        <section
            className="fp-card p-4 mt-3"
            aria-labelledby="recent-activity-title"
        >
            <h2
                id="recent-activity-title"
                className="fp-slash mb-3 flex items-center gap-1.5"
            >
                <IconHistory
                    size={11}
                    aria-hidden="true"
                />

                RECENT ACTIVITY
            </h2>

            <ul className="flex flex-col gap-2">
                {tips.map((tip, i) => {
                    const cleanHash =
                        tip.hash?.replace(/^tx:\s*/, "") ??
                        ""

                    const solscanUrl = `https://solscan.io/tx/${cleanHash}?cluster=devnet`

                    return (
                        <li
                            key={i}
                            className="flex items-center justify-between gap-3 py-2 border-t"
                            style={{
                                borderColor:
                                    "rgba(255,255,255,0.07)",
                            }}
                        >
                            <div className="flex flex-col min-w-0">
                                <span className="font-mono text-xs text-green truncate">
                                    {tip.handle}
                                </span>

                                <time
                                    dateTime={tip.date}
                                    className="font-mono text-[10px] text-t3 truncate"
                                >
                                    {formatDate(tip.date)}
                                </time>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                                <span className="font-mono text-xs text-t1 font-medium">
                                    {Number(
                                        tip.amount
                                    ).toFixed(2)}{" "}
                                    SOL
                                </span>

                                {cleanHash && (
                                    <a
                                        href={solscanUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-t3 hover:text-green transition-colors"
                                        title="View on Solscan"
                                        aria-label={`View transaction for ${tip.handle} on Solscan`}
                                    >
                                        <IconExternalLink
                                            size={12}
                                            aria-hidden="true"
                                        />
                                    </a>
                                )}
                            </div>
                        </li>
                    )
                })}
            </ul>
        </section>
    )
}