🔧 RANNTA CLI Tools

Local command-line utilities for interacting with the RANNTA Jetton using the compiled cli.js script.

Designed for developers, analysts, indexers, and service integrators.

🛠 Build

Run from the repository root:

npm run build --workspaces

🧰 Commands (Local Only)
🔹 1. Jetton Balance
node .\packages\tools\dist\cli.js jetton:balance <TON_ADDRESS>


Example:

node .\packages\tools\dist\cli.js jetton:balance UQDKJfVh5jnM0eGlOanDXWl6d8fleIZjoc7SHakWuxS6m4bL

🔹 2. Export Jetton Holders
node .\packages\tools\dist\cli.js export:holders 500


Generates:

holders.csv


in the repository root.

🪙 Jetton Master
EQBCY5Yj9G6VAQibTe6hz53j8vBNO234n0fzHUP3lUBBYbeR

📄 License

MIT
