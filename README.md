📘 RANNTA Developer Suite

The official developer toolkit for the RANNTA Protocol-Entity (RANNTA Jetton) on The Open Network (TON).

This monorepo provides the canonical SDKs, CLI tools, and upcoming React bindings powering wallet integrations, analytics services, marketplaces, and automated systems across the RANNTA ecosystem.

📦 Packages Included
rannta-sdk

Typed JavaScript/TypeScript SDK for interacting with the RANNTA Jetton using TonAPI.

rannta-tools

Local CLI utilities for on-chain analytics:

Jetton balance lookups

Holder exports

CSV generation

Developer diagnostics

@rannta/react (planned)

React hooks and provider utilities for integrating RANNTA into web apps, dashboards, and marketplace components.

🪙 Jetton Master (RANNTA)
EQBCY5Yj9G6VAQibTe6hz53j8vBNO234n0fzHUP3lUBBYbeR


This is the canonical master address of the RANNTA Protocol-Entity on the TON blockchain.

🚀 Installation

Install the SDK:

npm install rannta-sdk

🛠 Build All Packages
npm run build --workspaces


This compiles all workspace packages (sdk, tools, react).

⚡ Quick Example (JavaScript / TypeScript)
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

🔧 Local CLI Tools

After building:

1. Jetton balance
node .\packages\tools\dist\cli.js jetton:balance <TON_ADDRESS>

2. Export holders
node .\packages\tools\dist\cli.js export:holders 500


Creates:

holders.csv


in the root directory.

🔍 Features Provided by This Monorepo

Full TonAPI-powered analytics

Zero-dependency Jetton data access

Lightweight, strongly typed SDK

CLI mode for backend jobs and cron tasks

Ready for marketplace, explorer, and wallet integration

Designed for extension into multi-chain environments

Clean developer ergonomics with workspaces

📄 License

MIT

🔗 About RANNTA

RANNTA is a TON-native Protocol-Entity powering creative economies, marketplaces, and AI-driven symbolic ecosystems.
This repository is the canonical entry point for developers building on top of RANNTA.