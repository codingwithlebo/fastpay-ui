import { useRef, useState } from 'react'
import { QRCode } from 'react-qr-code'
import { IconDownload, IconCopy, IconCheck, IconWallet, IconRefresh } from '@tabler/icons-react'
import { useQRGeneration } from '../hooks/useQRGeneration'

export default function QRPage() {
    const qrWrapperRef = useRef(null)
    const [amount, setAmount] = useState('')

    const {
        shortAddress,
        qrUrl,
        connected,
        copied,
        downloading,
        copyAddress,
        downloadQRImage,
    } = useQRGeneration(parseFloat(amount) > 0 ? parseFloat(amount) : undefined)

    const handleDownload = () => {
        const svg = qrWrapperRef.current?.querySelector('svg') ?? null
        downloadQRImage(svg)
    }

    return (
        <div>
            <div className="mb-5">
                <h2 className="font-head font-extrabold text-lg text-t1 mb-1">My QR Code</h2>
                <p className="font-mono text-xs text-t2">
                    Share to receive tips instantly — resolves to your wallet automatically.
                </p>
            </div>

            <div className="fp-card green-top p-5 flex gap-6 items-start mb-3">
                {/* QR live */}
                <div
                    ref={qrWrapperRef}
                    className="bg-white rounded-fp p-2.5 flex-shrink-0 flex items-center justify-center"
                    style={{ width: 120, height: 120 }}
                >
                    {connected && qrUrl ? (
                        <QRCode
                            value={qrUrl}
                            size={100}
                            fgColor="#0c0f0e"
                            bgColor="#ffffff"
                        />
                    ) : (
                        <div className="flex flex-col items-center gap-1 text-center">
                            <IconWallet size={28} style={{ color: '#b0b8b4' }} />
                            <span className="font-mono text-t3" style={{ fontSize: 9 }}>
                                Connect wallet
                            </span>
                        </div>
                    )}
                </div>

                {/* Details */}
                <div className="flex-1">
                    <p className="fp-slash mb-2">YOUR PAYMENT LINK</p>

                    {connected && shortAddress ? (
                        <>
                            <div
                                className="font-mono text-xs text-green bg-bg3 rounded-fp px-2.5 py-2 mb-2.5"
                                style={{ border: '1px solid rgba(255,255,255,0.08)', wordBreak: 'break-all' }}
                            >
                                {shortAddress}
                            </div>
                            <p className="font-mono text-xs text-t2 mb-4 leading-relaxed">
                                Anyone who scans this can tip you in SOL via Phantom — no wallet address, no errors, one tap.
                            </p>
                        </>
                    ) : (
                        <p className="font-mono text-xs text-t2 mb-4 leading-relaxed">
                            Connect your Phantom wallet to generate your personal QR code.
                        </p>
                    )}

                    <div className="flex gap-2">
                        <button
                            className="fp-btn-green"
                            onClick={handleDownload}
                            disabled={!connected || downloading}
                        >
                            {downloading
                                ? <IconRefresh size={13} className="animate-spin" />
                                : <IconDownload size={13} />}
                            {downloading ? 'Saving…' : 'Download'}
                        </button>
                        <button
                            className="fp-btn-ghost"
                            onClick={copyAddress}
                            disabled={!connected}
                        >
                            {copied ? <IconCheck size={13} /> : <IconCopy size={13} />}
                            {copied ? 'Copied!' : 'Copy Address'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Dynamic amount */}
            <div className="fp-card p-4">
                <p className="fp-slash mb-2">DYNAMIC AMOUNT — FREELANCE INVOICE</p>
                <p className="font-mono text-xs text-t2 mb-3 leading-relaxed">
                    Pre-set a SOL amount on your QR for fixed-rate work or services.
                </p>
                <div className="flex gap-2">
                    <input
                        className="fp-input"
                        placeholder="Amount in SOL — leave blank for open"
                        type="number"
                        min="0"
                        step="0.01"
                        value={amount}
                        onChange={e => setAmount(e.target.value)}
                    />
                    <button className="fp-btn-green" disabled={!connected}>
                        Update QR
                    </button>
                </div>
                {amount && parseFloat(amount) > 0 && (
                    <p className="font-mono text-xs text-green mt-2">
                        QR updated — encoded {amount} SOL
                    </p>
                )}
            </div>
        </div>
    )
}