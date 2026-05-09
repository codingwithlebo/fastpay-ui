export interface User {
    name: string;
    handle: string;
    bio: string;
    initials: string;
    avatarBg: string;
    avatarColor: string;
    score: string;
    address: string;
}

export interface Transaction {
    time: string;
    type: 'SENT' | 'RECEIVED';
    party: string;
    amount: string;
    hash: string;
}

export const USERS: Record<string, User>;
export const TRANSACTIONS: Transaction[];
