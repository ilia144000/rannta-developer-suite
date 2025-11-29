// RANNTA SDK – minimal real implementation for Tonapi

const JETTON_MASTER = "EQBCY5Yj9G6VAQibTe6hz53j8vBNO234n0fzHUP3lUBBYbeR";

export interface RANNTAConfig {
  tonapiBaseUrl?: string;
}

export class RANNTA {
  private tonapi: TonapiClient;

  constructor(config: RANNTAConfig = {}) {
    this.tonapi = new TonapiClient(config.tonapiBaseUrl);
  }

  public jetton = {
    getBalance: (address: string) => this.tonapi.getJettonBalance(address),
    getHolders: (limit: number) => this.tonapi.getJettonHolders(limit),
  };
}

class TonapiClient {
  private baseUrl: string;

  constructor(baseUrl?: string) {
    // Official Tonapi endpoint
    this.baseUrl = baseUrl ?? "https://tonapi.io";
  }

  private async request(path: string): Promise<any> {
    const url = `${this.baseUrl}${path}`;
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    // 404 or other error with JSON body
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`${res.status} ${text}`);
    }

    return res.json();
  }

  /**
   * Get RANNTA balance for a wallet.
   * Uses /v2/accounts/{address}/jettons and matches by symbol/name "RANNTA"
   * so it works even if master address format differs (raw vs base64).
   */
  async getJettonBalance(owner: string): Promise<bigint> {
    try {
      const data = await this.request(
        `/v2/accounts/${encodeURIComponent(owner)}/jettons?currencies=ton`
      );

      const list: any[] =
        (data && (data.balances || data.jettons || data.items)) || [];

      const target = list.find((entry) => {
        const jetton = entry.jetton || entry.jetton_info || entry.token || {};
        const symbol = String(jetton.symbol || "").toUpperCase();
        const name = String(jetton.name || "").toUpperCase();
        const addr =
          jetton.address ||
          (jetton.master && jetton.master.address) ||
          jetton.master;

        return (
          symbol === "RANNTA" ||
          name.includes("RANNTA") ||
          addr === JETTON_MASTER
        );
      });

      if (!target) {
        return 0n;
      }

      const raw =
        target.balance ||
        target.raw_balance ||
        target.amount ||
        target.quantity ||
        "0";

      const rawStr = typeof raw === "string" ? raw : String(raw);
      return BigInt(rawStr);
    } catch (err) {
      console.error("Tonapi error in getJettonBalance:", err);
      return 0n;
    }
  }

  /**
   * Get RANNTA holders list using /v2/jettons/{jetton_id}/holders
   */
  async getJettonHolders(
    limit: number
  ): Promise<{ address: string; balance: bigint }[]> {
    const safeLimit = Math.min(Math.max(limit, 1), 1000);

    try {
      const data = await this.request(
        `/v2/jettons/${encodeURIComponent(
          JETTON_MASTER
        )}/holders?limit=${safeLimit}`
      );

      const list: any[] =
        (data && (data.addresses || data.holders || data.items)) || [];

      return list.map((h) => {
        const addr =
          (h.owner && h.owner.address) ||
          (h.address && h.address.address) ||
          h.address ||
          "";

        const bal =
          h.balance ||
          h.raw_balance ||
          h.amount ||
          h.quantity ||
          "0";

        const balStr = typeof bal === "string" ? bal : String(bal);

        return {
          address: addr,
          balance: BigInt(balStr),
        };
      });
    } catch (err) {
      console.error("Tonapi error in getJettonHolders:", err);
      return [];
    }
  }
}
