
rannta-sdk
Official TypeScript/JavaScript SDK for the RANNTA Jetton on TON.

Install
bash
Copy code
npm install rannta-sdk
Quick Start
ts
Copy code
import { RANNTA } from "rannta-sdk";

const client = new RANNTA({
  jettonMaster: "EQBCY5Yj9G6VAQibTe6hz53j8vBNO234n0fzHUP3lUBBYbeR",
  tonapiBaseUrl: "https://tonapi.io"
});

async function main() {
  const address = "UQDKJfVh5jnM0eGlOanDXWl6d8fleIZjoc7SHakWuxS6m4bL";
  const balance = await client.getJettonBalance(address);

  console.log("Raw:", balance.rawBalance);
  console.log("Human:", balance.humanReadable, "RANNTA");
}

main().catch(console.error);
Jetton
Name: RANNTA

Network: TON

Jetton master: EQBCY5Yj9G6VAQibTe6hz53j8vBNO234n0fzHUP3lUBBYbeR

License
MIT
