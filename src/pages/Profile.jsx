import { IconCheck } from '@tabler/icons-react'

export default function Profile() {
  return (
    <div>
      <div className="mb-5">
        <h2 className="font-head font-extrabold text-lg text-t1 mb-1">My Profile</h2>
        <p className="font-mono text-xs text-t2">Your public FastPay identity — linked to your Phantom wallet.</p>
      </div>

      <div className="fp-card p-4 mb-3">
        <p className="fp-slash mb-4">IDENTITY</p>
        {[
          { label: 'DISPLAY NAME', val: 'Malebo Nkuna', mono: false },
          { label: 'USERNAME',     val: '@malebo',      mono: false },
          { label: 'BIO',          val: 'Designer · Developer · Builder 🇿🇦', mono: false },
        ].map(({ label, val, mono }) => (
          <div key={label} className="mb-3">
            <p className="font-mono text-t3 mb-1.5" style={{ fontSize: 10, letterSpacing: '0.08em' }}>{label}</p>
            <input defaultValue={val} className={`fp-input ${mono ? 'text-green' : ''}`} />
          </div>
        ))}
        <div className="mb-3">
          <p className="font-mono text-t3 mb-1.5" style={{ fontSize: 10, letterSpacing: '0.08em' }}>CATEGORY</p>
          <select className="fp-input">
            {['Creator', 'Freelancer', 'Developer', 'Artist'].map(o => <option key={o}>{o}</option>)}
          </select>
        </div>
      </div>

      <div className="fp-card p-4 mb-4">
        <p className="fp-slash mb-4">LINKED WALLET</p>
        <div className="mb-3">
          <p className="font-mono text-t3 mb-1.5" style={{ fontSize: 10, letterSpacing: '0.08em' }}>PHANTOM ADDRESS</p>
          <input
            defaultValue="7xKp3mNqRs8vBtWzYeLdFgHjKoMnPqRs3mNq"
            readOnly
            className="fp-input text-green"
            style={{ fontSize: 11 }}
          />
        </div>
        <div className="flex gap-2">
          <span className="fp-badge-green"><IconCheck size={10} /> Wallet verified</span>
          <span className="fp-badge-blue">Devnet</span>
        </div>
      </div>

      <button className="fp-btn-green">
        <IconCheck size={13} /> Save Changes
      </button>
    </div>
  )
}
