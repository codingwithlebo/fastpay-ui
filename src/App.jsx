import { useState, useEffect } from 'react'
import { useWallet, useConnection } from '@solana/wallet-adapter-react'
import { LAMPORTS_PER_SOL } from '@solana/web3.js'
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom'

import Topbar from './components/Topbar'
import Sidebar from './components/Sidebar'
import PhantomModal from './components/PhantomModal'
import SuccessOverlay from './components/SuccessOverlay'
import TipPage from './pages/TipPage'
import QRPage from './pages/QRPage'
import { saveRecentTip } from './components/RecentTips'

function AppContent() {
    const { publicKey, connected, disconnect } = useWallet()
    const { connection } = useConnection()
    const navigate = useNavigate()
    const location = useLocation()

    const [modal, setModal] = useState(false)
    const [success, setSuccess] = useState(null)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [walletInfo, setWalletInfo] = useState({ addr: '', sol: '0.00', usd: '≈ $0.00' })

    useEffect(() => {
        if (connected && publicKey) {
            connection.getBalance(publicKey).then(balance => {
                const sol = balance / LAMPORTS_PER_SOL
                const fullAddress = publicKey.toBase58()
                const shortAddress = `${fullAddress.slice(0, 4)}...${fullAddress.slice(-4)}`
                setWalletInfo({
                    addr: shortAddress,
                    sol: sol.toFixed(2),
                    usd: `≈ $${(sol * 146.4).toLocaleString()} USD`
                })
            })
        }
    }, [connected, publicKey, connection])

    const handleConnectClick = () => {
        if (connected) disconnect()
        else setModal(true)
    }

    const getDeepLinkParams = () => {
        const match = location.pathname.match(/^\/@([\w.]+)\/?$/)
        if (!match) return { handle: null, amount: null }
        const handle = `@${match[1].toLowerCase()}`
        const amount = new URLSearchParams(location.search).get('amount')
        const parsed = parseFloat(amount)
        return {
            handle,
            amount: !isNaN(parsed) && parsed > 0 ? parsed : null,
        }
    }

    const { handle, amount } = getDeepLinkParams()
    const activePage = location.pathname === '/qr' ? 'qr' : 'tip'

    const handleSuccess = ({ message, hash, handle: tipHandle, amount: tipAmount }) => {
        saveRecentTip({ handle: tipHandle, amount: tipAmount, hash })
        setSuccess({ m: message, h: `tx: ${hash}` })
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
                    active={activePage}
                    onNav={(id) => {
                        navigate(id === 'qr' ? '/qr' : '/')
                        setIsMenuOpen(false)
                    }}
                    connected={connected}
                    onConnect={handleConnectClick}
                    wallet={walletInfo}
                    isOpen={isMenuOpen}
                    onClose={() => setIsMenuOpen(false)}
                />
                <main className="flex-1 bg-bg0 p-4 lg:p-6 overflow-y-auto">
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <TipPage
                                    onSuccess={handleSuccess}
                                    onQR={() => navigate('/qr')}
                                    initialHandle={null}
                                    initialAmount={null}
                                />
                            }
                        />
                        <Route
                            path="/qr"
                            element={<QRPage />}
                        />
                        <Route
                            path="/:user"
                            element={
                                <TipPage
                                    onSuccess={handleSuccess}
                                    onQR={() => navigate('/qr')}
                                    initialHandle={handle}
                                    initialAmount={amount}
                                />
                            }
                        />
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </main>
            </div>

            <PhantomModal
                open={modal}
                onDone={() => setModal(false)}
                onCancel={() => setModal(false)}
            />
            {success && (
                <SuccessOverlay
                    show
                    message={success.m}
                    hash={success.h}
                    onClose={() => setSuccess(null)}
                />
            )}
        </div>
    )
}

export default function App() {
    return (
        <Router>
            <AppContent />
        </Router>
    )
}