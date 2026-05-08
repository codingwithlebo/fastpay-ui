import { useState } from "react";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { PublicKey, LAMPORTS_PER_SOL, SystemProgram } from "@solana/web3.js";
import { BN } from "@coral-xyz/anchor";
import { getProgram } from "../lib/anchor";

export const useRecordTip = () => {
    const {connection} = useConnection();
    const wallet = useAnchorWallet();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const recordTip = async (receiver: PublicKey, amountInSol: number, message: string) => {
        if (!wallet) {
            setError("Wallet not connected");
            return { success: false };
        }

        setLoading(true);
        setError(null);

        try {
            const program = getProgram(wallet);

            const amountInLamports = new BN(amountInSol * LAMPORTS_PER_SOL);
            const timestamp = new BN(Math.floor(Date.now() / 1000));

            const [tipRecord] = PublicKey.findProgramAddressSync(
                [
                    Buffer.from("tip"),
                    wallet.publicKey.toBuffer(),
                    receiver.toBuffer(),
                    timestamp.toArrayLike(Buffer, "le", 8),
                ],
                program.programId
            );

            const txSignature = await program.methods
                .recordTip(amountInLamports, message, timestamp)
                .accounts({
                    sender: wallet.publicKey,
                    receiver: receiver,
                    tipRecord: tipRecord,
                    systemProgram : SystemProgram.programId,
                })
                .rpc();
            
            const latestBlockHash = await connection.getLatestBlockhash();
            await connection .confirmTransaction({
                blockhash: latestBlockHash.blockhash,
                lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
                signature: txSignature,
            }, "confirmed");

            setLoading(false);
            return { success: true, txSignature };
        } catch (err: any) {
            setError(err?.message || "Failed to record tip");
            setLoading(false);
            return { success: false, error: err?.message };
        }
    };

    return { recordTip, loading, error };
};