import { useNavigate } from 'react-router-dom'
import { IconSearchOff, IconArrowLeft } from '@tabler/icons-react'

export default function NotFound() {
    const navigate = useNavigate()

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
            <div className="bg-bg3 p-6 rounded-full mb-6 border border-white/5">
                <IconSearchOff size={48} className="text-t3" />
            </div>

            <h1 className="font-head font-extrabold text-2xl text-t1 mb-2">
                User Not Found
            </h1>

            <p className="font-mono text-sm text-t2 max-w-xs mb-8 leading-relaxed">
                The profile you are looking for hasn't joined the FastPay economy yet.
            </p>

            <button
                onClick={() => navigate('/')}
                className="fp-btn-green flex items-center gap-2"
            >
                <IconArrowLeft size={16} />
                Back to Dashboard
            </button>
        </div>
    )
}