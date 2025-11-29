📘 rannta-sdk

Official TypeScript/JavaScript SDK for interacting with the RANNTA Protocol-Entity (RANNTA Jetton) on The Open Network (TON).

This SDK provides simple and typed access to Jetton balances, metadata, holders, and TonAPI-powered analytics.

🚀 Install
npm install rannta-sdk

⚡ Quick Start
import { RANNTA } from "rannta-sdk";

const client = new RANNTA({
  jettonMaster: "EQBCY5Yj9G6VAQibTe6hz53j8vBNO234n0fzHUP3lUBBYbeR",
  tonapiBaseUrl: "https://tonapi.io"
});

async function main() {
  const wallet = "UQDKJfVh5jnM0eGlOanDXWl6d8fleIZjoc7SHakWuxS6m4bL";
  const balance = await client.getJettonBalance(wallet);

  console.log("Raw balance:", balance.rawBalance);
  console.log("Human readable:", balance.humanReadable, "RANNTA");
}

main().catch(console.error);

🧩 Features

Fetch Jetton balances for any TON wallet

TonAPI-powered metadata access

Strong TypeScript typings

Zero dependencies on TON client libraries

Designed for marketplace, wallet, and backend use cases

🪙 Jetton Information

Name: RANNTA

Network: TON

Jetton Master Address:

EQBCY5Yj9G6VAQibTe6hz53j8vBNO234n0fzHUP3lUBBYbeR

📄 License

MIT