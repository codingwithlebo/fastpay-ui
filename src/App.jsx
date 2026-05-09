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

    return (
        <div className="min-h-screen bg-bg0 text-t1 font-mono">
            <Topbar connected={connected} onConnect={handleConnectClick} />

            <div className="grid" style={{ gridTemplateColumns: '210px 1fr', minHeight: 'calc(100vh - 48px)' }}>
                <Sidebar
                    active={page}
                    onNav={setPage}
                    connected={connected}
                    onConnect={handleConnectClick}
                    wallet={walletInfo}
                />
                <main className="bg-bg0 p-6 overflow-y-auto">
                    <TipPage onSuccess={(m, h) => setSuccess({ m, h })} onQR={() => setPage('qr')} />
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