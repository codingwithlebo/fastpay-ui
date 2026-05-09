import { useState, useEffect } from 'react'
import { useWallet, useConnection } from '@solana/wallet-adapter-react'
import { LAMPORTS_PER_SOL } from '@solana/web3.js'
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation, useParams } from 'react-router-dom'

import Topbar from "./components/Topbar"
import Sidebar from "./components/Sidebar"
import PhantomModal from "./components/PhantomModal"
import SuccessOverlay from "./components/SuccessOverlay"
import TipPage from "./pages/TipPage"
import QRPage from "./pages/QRPage"
import NotFound from "./pages/NotFound"

import { USERS } from "./data/users"
import { saveRecentTip } from "./components/RecentTips"

const ProfileWrapper = ({ onSuccess, onQR, walletInfo }) => {
    const { user } = useParams()
    const location = useLocation()

    const handle = user?.startsWith('@') ? user.toLowerCase() : `@${user?.toLowerCase()}`

    if (!USERS[handle]) {
        return <NotFound />
    }

    const amount = new URLSearchParams(location.search).get('amount')
    const parsedAmount = parseFloat(amount)
    const validAmount = !isNaN(parsedAmount) && parsedAmount > 0 ? parsedAmount : null

    return (
        <TipPage
            onSuccess={onSuccess}
            onQR={onQR}
            initialHandle={handle}
            initialAmount={validAmount}
            walletInfo={walletInfo}
        />
    )
}

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

    const handleSuccess = ({ message, hash, handle: tipHandle, amount: tipAmount }) => {
        saveRecentTip({ handle: tipHandle, amount: tipAmount, hash })
        setSuccess({ m: message, h: hash })
    }

    const activePage = location.pathname === '/qr' ? 'qr' : 'tip'

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
                                    walletInfo={walletInfo}
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
                                <ProfileWrapper
                                    onSuccess={handleSuccess}
                                    onQR={() => navigate('/qr')}
                                    walletInfo={walletInfo}
                                />
                            }
                        />

                        <Route path="*" element={<NotFound />} />
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