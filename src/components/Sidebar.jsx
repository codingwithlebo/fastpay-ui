import {
    IconSend, IconQrcode, IconWallet, IconCheck, IconX, IconBell, IconSettings
} from '@tabler/icons-react'

const NAV = [
    {
        group: 'Payments',
        items: [
            { id: 'tip', label: 'Send Tip', Icon: IconSend },
        ],
    },
    {
        group: 'Identity',
        items: [
            // { id: 'profile', label: 'My Profile', Icon: IconUser },
            { id: 'qr', label: 'QR Code', Icon: IconQrcode },
        ],
    },
]

export default function Sidebar({ active, onNav, connected, onConnect, wallet, isOpen, onClose }) {
    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm"
                    onClick={onClose}
                    aria-hidden="true"
                />
            )}

            <aside aria-label="Sidebar"
                className={`fixed inset-y-0 left-0 z-50 w-64 bg-bg1 flex flex-col px-3 py-4 border-r transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 overflow-y-auto sidebar-scroll-desktop ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
                style={{ borderRightColor: 'rgba(255,255,255,0.06)' }}>

                <div className="flex items-center justify-between mb-4 lg:hidden px-2">
                    <span className="font-head font-extrabold text-sm tracking-tight text-t1">Menu</span>
                    <button onClick={onClose} className="text-t3 hover:text-t1 transition-colors">
                        <IconX size={20} />
                    </button>
                </div>

                <nav aria-label="Main navigation" className="flex flex-col gap-4">
                    {NAV.map(({ group, items }) => (
                        <section key={group} aria-label={group}>
                            <p className="fp-slash text-t3 px-2 pb-2 pt-1 text-xs tracking-widest">
                                {group}
                            </p>

                            <div className="flex flex-col gap-1">
                                {items.map(({ id, label, Icon }) => {
                                    const isActive = active === id
                                    return (
                                        <button key={id} type="button" onClick={() => onNav(id)}
                                            aria-current={isActive ? 'page' : undefined}
                                            className={`fp-nav ${isActive ? 'active' : ''} flex items-center gap-2`}
                                        >
                                            <Icon size={14} aria-hidden="true" />
                                            <span>{label}</span>
                                        </button>
                                    )
                                })}
                            </div>
                        </section>
                    ))}
                </nav>

                <div className="flex-1 min-h-[20px]" />

                <section aria-label="Wallet status" className="mt-4 rounded-fp bg-bg2 p-3.5 shrink-0"
                    style={{
                        border: '1px solid rgba(255,255,255,0.06)',
                        borderTop: '1px solid rgba(0,255,135,0.27)',
                    }}
                >
                    <p className="fp-slash text-t3 mb-2 text-xs tracking-widest">
                        PHANTOM WALLET
                    </p>

                    {connected ? (
                        <div className="overflow-hidden">
                            <p className="font-mono text-xs text-green mb-1 truncate">
                                {wallet.addr}
                            </p>
                            <p className="font-mono text-xl font-medium text-t1 tracking-tight truncate">
                                {wallet.sol} SOL
                            </p>
                            <p className="font-mono text-xs text-t2 mt-0.5 truncate">
                                {wallet.usd}
                            </p>
                            <div className="flex items-center gap-1.5 mt-2.5 text-xs text-t2">
                                <span className="w-1.5 h-1.5 rounded-full bg-green inline-block shrink-0" />
                                Connected
                            </div>
                        </div>
                    ) : (
                        <p className="font-mono text-xs text-t3 mb-3">Not connected</p>
                    )}

                    <button
                        type="button"
                        onClick={onConnect}
                        className="fp-btn-green w-full justify-center mt-2.5 min-h-10"
                    >
                        {connected ? <IconCheck size={13} /> : <IconWallet size={13} />}
                        <span>{connected ? 'Connected' : 'Connect Phantom'}</span>
                    </button>
                </section>
            </aside>
        </>
    )
}