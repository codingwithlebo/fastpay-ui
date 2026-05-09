import { useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { SystemProgram, Transaction, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { Program, AnchorProvider, BN } from "@coral-xyz/anchor";

const PROGRAM_ID = new PublicKey(import.meta.env.VITE_PROGRAM_ID)

export function useFastPay() {
    const { connection } = useConnection();
    const wallet = useWallet();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const sendTip = async (receiverAddr: string, amountSol: number, message: string): Promise<string> => {
        if (!wallet.publicKey) throw new Error("Wallet not connected");
        if (!wallet.signTransaction) throw new Error("Wallet does not support signing");
        if (amountSol <= 0) throw new Error("Amount must be positive");

        setLoading(true);
        setError(null);

        try {
            const provider = new AnchorProvider(connection, wallet as any, {
                preflightCommitment: "processed"
            });
            const program = await Program.at(PROGRAM_ID, provider);

            const receiverPubkey = new PublicKey(receiverAddr);
            const lamports = amountSol * LAMPORTS_PER_SOL;
            const timestamp = new BN(Math.floor(Date.now() / 1000));

            const [tipRecordPda] = PublicKey.findProgramAddressSync(
                [
                    Buffer.from("tip"),
                    wallet.publicKey.toBuffer(),
                    receiverPubkey.toBuffer(),
                    timestamp.toArrayLike(Buffer, "le", 8),
                ],
                program.programId
            );

            const transaction = new Transaction();

            transaction.add(
                SystemProgram.transfer({
                    fromPubkey: wallet.publicKey,
                    toPubkey: receiverPubkey,
                    lamports: lamports,
                })
            );

            transaction.add(
                await program.methods
                    .recordTip(new BN(lamports), message, timestamp)
                    .accounts({
                        tipRecord: tipRecordPda,
                        sender: wallet.publicKey,
                        receiver: receiverPubkey,
                        systemProgram: SystemProgram.programId,
                    })
                    .instruction()
            );

            const signature = await wallet.sendTransaction(transaction, connection);
            await connection.confirmTransaction(signature, "processed");

            setLoading(false);
            return signature;

        } catch (err) {
            const message = err instanceof Error ? err.message : String(err);
            setError(message);
            setLoading(false);
            throw err;
        }
    };

    return { sendTip, loading, error };
}