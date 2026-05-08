import { useState, useEffect, useCallback } from "react";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { getProgram } from "../lib/anchor";

export interface TipHistoryItem {
    sender: string;
    receiver: string;
    amount: number;
    message: string;
    timestamp: number;
    txId: string;
}

export const useTipHistory = (walletAddress: string | undefined) => {
    const wallet = useAnchorWallet();
    const [history, setHistory] = useState<{ received: TipHistoryItem[], sent: TipHistoryItem[]}>({
        received: [],
        sent: []
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchHistory = useCallback(async () => {
        if (!wallet || !walletAddress) return;
        setLoading(true);

        try {
            const program = getProgram(wallet);

            const allRecords = await (program.account as any).tipRecord.all();

            const formatted: TipHistoryItem[] = allRecords.map((record: any) => ({
                sender: record.account.sender.toBase58(),
                receiver: record.account.receiver.toBase58(),
                amount: record.account.amount.toNumber() / LAMPORTS_PER_SOL,
                message: record.account.message,
                timestamp: record.account.timestamp.toNumber() * 1000,
                txId: record.publicKey.toBase58(),
            }));

            const received = formatted
                .filter(r => r.receiver === walletAddress)
                .sort((a, b) => b.timestamp - a.timestamp);

            const sent = formatted
                .filter(r => r.sender === walletAddress)
                .sort((a, b) => b.timestamp - a.timestamp);

            setHistory({ received, sent });
        } catch (err: any) {
            setError("The history could not be loaded");
        } finally {
            setLoading(false);
        }
    }, [wallet, walletAddress]);

    useEffect(() => {
        fetchHistory();
    }, [fetchHistory]);

    return { ...history, loading, error, refresh: fetchHistory };
}