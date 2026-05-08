import { TRANSACTIONS } from '../data/users'

export default function History() {
  return (
    <div>
      <div className="mb-5">
        <h2 className="font-head font-extrabold text-lg text-t1 mb-1">Transaction History</h2>
        <p className="font-mono text-xs text-t2">Full on-chain payment record · Solana devnet</p>
      </div>

      <div className="flex gap-2 mb-4">
        <input className="fp-input" placeholder="Search handle, tx hash..." />
        <select className="fp-input" style={{ width: 110 }}>
          <option>ALL</option>
          <option>SENT</option>
          <option>RECEIVED</option>
        </select>
        <button className="fp-btn-green">Filter</button>
      </div>

      <div className="fp-card overflow-hidden">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              {['TIME', 'TYPE', 'COUNTERPARTY', 'AMOUNT', 'TX HASH', 'STATUS'].map(h => (
                <th key={h} className="text-left px-3 py-2.5 font-mono text-t3 font-normal" style={{ fontSize: 10, letterSpacing: '0.1em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TRANSACTIONS.map((tx, i) => {
              const isIn = tx.type === 'RECEIVED'
              const c = isIn ? '#00ff87' : '#ff4060'
              return (
                <tr key={i} className="hover:bg-bg2 transition-colors" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <td className="px-3 py-2.5 font-mono text-t3">{tx.time}</td>
                  <td className="px-3 py-2.5 font-mono" style={{ color: c, fontSize: 10 }}>{tx.type}</td>
                  <td className="px-3 py-2.5 font-mono text-blue">{tx.party}</td>
                  <td className="px-3 py-2.5 font-mono font-medium" style={{ color: c }}>{tx.amount}</td>
                  <td className="px-3 py-2.5 font-mono text-t3" style={{ fontSize: 10 }}>{tx.hash}</td>
                  <td className="px-3 py-2.5">
                    <span className={isIn ? 'fp-badge-green' : 'fp-badge-red'}>
                      {isIn ? 'CONFIRMED' : 'SENT'}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
