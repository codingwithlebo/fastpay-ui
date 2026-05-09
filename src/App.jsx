import { useState, useEffect } from 'react'
import { useWallet, useConnection } from '@solana/wallet-adapter-react'
import { LAMPORTS_PER_SOL } from '@solana/web3.js'

import Topbar from './components/Topbar'
import Sidebar from './components/Sidebar'
import PhantomModal from './components/PhantomModal'
import SuccessOverlay from './components/SuccessOverlay'
import TipPage from './pages/TipPage'

export default function App() {
    const { publicKey, connected, disconnect } = useWallet()
    const { connection } = useConnection()

    const [page, setPage] = useState('tip')
    const [modal, setModal] = useState(false)
    const [success, setSuccess] = useState(null)
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const [walletInfo, setWalletInfo] = useState({ addr: '', sol: '0.00', usd: '≈ $0.00' })

    useEffect(() => {
        if (connected && publicKey) {
            connection.getBalance(publicKey).then(balance => {
                const sol = balance / LAMPORTS_PER_SOL

                const fullAddress = publicKey.toBase58();
                const shortAddress = `${fullAddress.slice(0, 6)}...${fullAddress.slice(-6)}`;
                setWalletInfo({
                    addr: shortAddress,
                    sol: sol.toFixed(2),
                    usd: `≈ $${(sol * 146.4).toLocaleString()} USD`
                });
            });
        }
    }, [connected, publicKey, connection]);

    const handleConnectClick = () => {
        if (connected) disconnect()
        else setModal(true)
    }

    const handleNav = (id) => {
        setPage(id)
        setIsMenuOpen(false)
    }

    return (
        <div className="h-screen bg-bg0 text-t1 font-mono flex flex-col overflow-hidden">
            <Topbar
                connected={connected}
                onConnect={handleConnectClick}
                onMenuToggle={() => setIsMenuOpen(true)}
            />

            <div className="flex flex-1 overflow-hidden relative">
                <Sidebar
                    active={page}
                    onNav={handleNav}
                    connected={connected}
                    onConnect={handleConnectClick}
                    wallet={walletInfo}
                    isOpen={isMenuOpen}
                    onClose={() => setIsMenuOpen(false)}
                />
                <main className="flex-1 bg-bg0 p-4 lg:p-6 overflow-y-auto">
                    <TipPage onSuccess={(m, h) => setSuccess({ m, h })} onQR={() => handleNav('qr')} />
                </main>
            </div>

            <PhantomModal
                open={modal}
                onDone={() => setModal(false)}
                onCancel={() => setModal(false)}
            />
            {success && <SuccessOverlay show message={success.m} hash={success.h} onClose={() => setSuccess(null)} />}
        </div>
    )
} 