export declare class RANNTA {
    config: {
        apiKey: string;
        network: string;
    };
    constructor(config: {
        apiKey: string;
        network: string;
    });
    ping(): Promise<string>;
}
