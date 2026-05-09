import { useState, useCallback, useMemo } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { generateSolanaPayUrl, formatWalletAddress, convertSvgToPngBlob } from "../utils/qr";
import { USERS } from "../data/users";

function findHandleByAddress(address: string): string | null {
    const entry = Object.values(USERS).find(u => u.address === address)
    return entry?.handle ?? null
}

export function useQRGeneration(amount?: number) {
    const { publicKey, connected } = useWallet()
    const [copied, setCopied] = useState(false)
    const [downloading, setDownloading] = useState(false)

    const address = publicKey?.toBase58() ?? ""
    const shortAddress = address ? formatWalletAddress(address) : ""

    const handle = useMemo(() => findHandleByAddress(address), [address])
    const qrUrl = address ? generateSolanaPayUrl(handle ?? address, amount) : ""

    const copyAddress = useCallback(async () => {
        if (!address) return
        await navigator.clipboard.writeText(address).catch(() => { })
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }, [address])

    const downloadQRImage = useCallback(async (qrRef: SVGSVGElement | null) => {
        if (!qrRef || !shortAddress) return
        setDownloading(true)
        try {
            const blob = await convertSvgToPngBlob(qrRef, 400)
            const url = URL.createObjectURL(blob)
            const a = document.createElement("a")
            a.href = url
            a.download = `fastpay-${shortAddress.replace("...", "-")}.png`
            a.click()
            URL.revokeObjectURL(url)
        } finally {
            setDownloading(false)
        }
    }, [shortAddress])

    return { address, shortAddress, qrUrl, handle, connected, copied, downloading, copyAddress, downloadQRImage }
}