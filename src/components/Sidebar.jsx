import {
  IconSend, IconLayoutDashboard, IconListCheck,
  IconUser, IconQrcode, IconAddressBook, IconChartLine, IconWallet, IconCheck
} from '@tabler/icons-react'

const NAV = [
  { group: 'PAYMENTS', items: [
    { id: 'tip',       label: 'Send Tip',   Icon: IconSend },
    { id: 'dashboard', label: 'Dashboard',  Icon: IconLayoutDashboard },
    { id: 'history',   label: 'History',    Icon: IconListCheck },
  ]},
  { group: 'IDENTITY', items: [
    { id: 'profile', label: 'My Profile', Icon: IconUser },
    { id: 'qr',      label: 'QR Code',    Icon: IconQrcode },
  ]},
  { group: 'NETWORK', items: [
    { id: 'contacts',  label: 'Contacts',  Icon: IconAddressBook },
    { id: 'analytics', label: 'Analytics', Icon: IconChartLine },
  ]},
]

export default function Sidebar({ active, onNav, connected, onConnect, wallet }) {
  return (
    <aside className="bg-bg1 flex flex-col py-3.5 px-2.5" style={{ borderRight: '1px solid rgba(255,255,255,0.06)', minHeight: '100%' }}>
      {NAV.map(({ group, items }) => (
        <div key={group}>
          <p className="fp-slash text-t3 px-2 pb-1.5 pt-2.5">{group}</p>
          {items.map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => onNav(id)}
              className={`fp-nav ${active === id ? 'active' : ''}`}
            >
              <Icon size={14} />
              {label}
            </button>
          ))}
        </div>
      ))}

      <div className="flex-1" />

      {/* Wallet card */}
      <div className="mt-3 bg-bg2 rounded-fp p-3.5" style={{ border: '1px solid rgba(255,255,255,0.06)', borderTop: '1px solid rgba(0,255,135,0.27)' }}>
        <p className="fp-slash text-t3 mb-2">PHANTOM WALLET</p>
        {connected ? (
          <>
            <p className="font-mono text-xs text-green mb-1 break-all">{wallet.addr}</p>
            <p className="font-mono text-xl font-medium text-t1 tracking-tight">{wallet.sol} SOL</p>
            <p className="font-mono text-xs text-t2 mt-0.5">{wallet.usd}</p>
            <div className="flex items-center gap-1.5 mt-2.5 text-xs text-t2">
              <span className="w-1.5 h-1.5 rounded-full bg-green inline-block" />
              Connected
            </div>
          </>
        ) : (
          <p className="font-mono text-xs text-t3 mb-3">Not connected</p>
        )}
        <button onClick={onConnect} className="fp-btn-green w-full justify-center mt-2.5">
          {connected ? <IconCheck size={13} /> : <IconWallet size={13} />}
          {connected ? 'Connected' : 'Connect Phantom'}
        </button>
      </div>
    </aside>
  )
}
