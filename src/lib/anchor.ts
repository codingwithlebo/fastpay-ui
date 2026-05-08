import { AnchorProvider, Program, Idl } from "@coral-xyz/anchor";
import { Connection, clusterApiUrl } from "@solana/web3.js";
import { IDL, Fastpay, PROGRAM_ID_STR } from "../anchor/idl";

type Mutable<T> = {
    -readonly [K in keyof T]: Mutable<T[K]>;
};

type FastpayIdl = Fastpay & Idl;

const idl: FastpayIdl = {
    ...(IDL as unknown as Mutable<Fastpay>),
    address: PROGRAM_ID_STR,
} as FastpayIdl;

export const getProgram = (wallet: any) => {
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    const provider = new AnchorProvider(connection, wallet, {
        preflightCommitment: "confirmed",
    });

    return new Program<FastpayIdl>(idl, provider);
};