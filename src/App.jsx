import { useState } from 'react'
import Topbar         from './components/Topbar'
import Sidebar        from './components/Sidebar'
import PhantomModal   from './components/PhantomModal'
import SuccessOverlay from './components/SuccessOverlay'
import TipPage        from './pages/TipPage'
import Dashboard      from './pages/Dashboard'
import History        from './pages/History'
import Profile        from './pages/Profile'
import QRPage         from './pages/QRPage'

export default function App() {
  const [page,      setPage]      = useState('tip')
  const [modal,     setModal]     = useState(false)
  const [success,   setSuccess]   = useState(null)
  const [connected, setConnected] = useState(false)

  const wallet = { addr: '7xKp...3mNq', sol: '12.45', usd: '≈ $1,820.34 USD' }

  const renderPage = () => {
    switch(page) {
      case 'tip':       return <TipPage onSuccess={(m,h) => setSuccess({m,h})} onQR={() => setPage('qr')} />
      case 'dashboard': return <Dashboard />
      case 'history':   return <History />
      case 'profile':   return <Profile />
      case 'qr':        return <QRPage />
      default:          return <TipPage onSuccess={(m,h) => setSuccess({m,h})} onQR={() => setPage('qr')} />
    }
  }

  return (
    <div className="min-h-screen bg-bg0 text-t1 font-mono">
      <Topbar connected={connected} onConnect={() => setModal(true)} />
      <div className="grid" style={{ gridTemplateColumns: '210px 1fr', minHeight: 'calc(100vh - 48px)' }}>
        <Sidebar active={page} onNav={setPage} connected={connected} onConnect={() => setModal(true)} wallet={wallet} />
        <main className="bg-bg0 p-6 overflow-y-auto">{renderPage()}</main>
      </div>
      <PhantomModal open={modal} onDone={() => { setConnected(true); setModal(false) }} onCancel={() => setModal(false)} />
      {success && <SuccessOverlay show message={success.m} hash={success.h} onClose={() => setSuccess(null)} />}
    </div>
  )
}
