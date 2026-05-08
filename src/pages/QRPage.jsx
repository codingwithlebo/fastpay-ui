import { useState } from 'react'
import { IconDownload, IconCopy, IconCheck } from '@tabler/icons-react'

export default function QRPage() {
  const [copied, setCopied] = useState(false)

  function copy() {
    navigator.clipboard.writeText('https://fastpay.id/@malebo').catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div>
      <div className="mb-5">
        <h2 className="font-head font-extrabold text-lg text-t1 mb-1">My QR Code</h2>
        <p className="font-mono text-xs text-t2">Share to receive tips instantly — resolves to your wallet automatically.</p>
      </div>

      <div className="fp-card green-top p-5 flex gap-6 items-start mb-3">
        {/* QR */}
        <div className="bg-white rounded-fp p-2.5 flex-shrink-0" style={{ width: 120, height: 120 }}>
          <svg viewBox="0 0 110 110" width="100" height="100" xmlns="http://www.w3.org/2000/svg">
            <rect x="6" y="6" width="38" height="38" rx="2" fill="none" stroke="#0c0f0e" strokeWidth="3.5"/>
            <rect x="13" y="13" width="24" height="24" rx="1" fill="#0c0f0e"/>
            <rect x="66" y="6" width="38" height="38" rx="2" fill="none" stroke="#0c0f0e" strokeWidth="3.5"/>
            <rect x="73" y="13" width="24" height="24" rx="1" fill="#0c0f0e"/>
            <rect x="6" y="66" width="38" height="38" rx="2" fill="none" stroke="#0c0f0e" strokeWidth="3.5"/>
            <rect x="13" y="73" width="24" height="24" rx="1" fill="#0c0f0e"/>
            <rect x="50" y="6" width="9" height="9" fill="#0c0f0e"/>
            <rect x="50" y="17" width="6" height="6" fill="#0c0f0e"/>
            <rect x="58" y="17" width="8" height="6" fill="#0c0f0e"/>
            <rect x="50" y="25" width="9" height="6" fill="#0c0f0e"/>
            <rect x="50" y="50" width="9" height="9" fill="#00ff87"/>
            <rect x="61" y="50" width="9" height="9" fill="#00ff87"/>
            <rect x="72" y="50" width="9" height="9" fill="#0c0f0e"/>
            <rect x="83" y="50" width="9" height="9" fill="#0c0f0e"/>
            <rect x="94" y="50" width="10" height="9" fill="#00ff87"/>
            <rect x="50" y="61" width="6" height="6" fill="#0c0f0e"/>
            <rect x="58" y="61" width="9" height="6" fill="#00ff87"/>
            <rect x="69" y="61" width="6" height="6" fill="#0c0f0e"/>
            <rect x="77" y="61" width="9" height="6" fill="#0c0f0e"/>
            <rect x="88" y="61" width="16" height="6" fill="#00ff87"/>
            <rect x="50" y="69" width="9" height="9" fill="#00ff87"/>
            <rect x="61" y="69" width="6" height="9" fill="#0c0f0e"/>
            <rect x="69" y="69" width="11" height="9" fill="#00ff87"/>
            <rect x="50" y="80" width="6" height="9" fill="#0c0f0e"/>
            <rect x="58" y="80" width="9" height="9" fill="#00ff87"/>
            <rect x="69" y="80" width="9" height="9" fill="#0c0f0e"/>
            <rect x="80" y="80" width="9" height="9" fill="#00ff87"/>
            <rect x="50" y="91" width="9" height="13" fill="#0c0f0e"/>
            <rect x="61" y="94" width="6" height="10" fill="#00ff87"/>
            <rect x="69" y="91" width="9" height="13" fill="#0c0f0e"/>
            <rect x="80" y="94" width="9" height="10" fill="#00ff87"/>
          </svg>
        </div>

        {/* Details */}
        <div className="flex-1">
          <p className="fp-slash mb-2">YOUR PAYMENT LINK</p>
          <div className="font-mono text-xs text-green bg-bg3 rounded-fp px-2.5 py-2 mb-2.5" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
            fastpay.id/@malebo
          </div>
          <p className="font-mono text-xs text-t2 mb-4 leading-relaxed">
            Anyone who scans this can tip you in SOL via Phantom — no wallet address, no errors, one tap.
          </p>
          <div className="flex gap-2">
            <button className="fp-btn-green"><IconDownload size={13} /> Download</button>
            <button className="fp-btn-ghost" onClick={copy}>
              {copied ? <IconCheck size={13} /> : <IconCopy size={13} />}
              {copied ? 'Copied!' : 'Copy Link'}
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
          <input className="fp-input" placeholder="Amount in SOL — leave blank for open" type="number" />
          <button className="fp-btn-green">Update QR</button>
        </div>
      </div>
    </div>
  )
}
