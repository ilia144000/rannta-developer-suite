export interface RANNTAConfig {
    tonapiBaseUrl?: string;
}
export declare class RANNTA {
    private tonapi;
    constructor(config?: RANNTAConfig);
    jetton: {
        getBalance: (address: string) => Promise<bigint>;
        getHolders: (limit: number) => Promise<{
            address: string;
            balance: bigint;
        }[]>;
    };
}
