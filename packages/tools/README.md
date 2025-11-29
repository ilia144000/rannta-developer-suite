
RANNTA CLI (local tools)
Local CLI utilities for working with the RANNTA Jetton using the built cli.js file.

Build
From the repo root:

bash
Copy code
npm run build --workspaces
Commands (local)
Run from the repo root:

1. Jetton balance
bash
Copy code
node .\packages\tools\dist\cli.js jetton:balance <TON_ADDRESS>
Example:

bash
Copy code
node .\packages\tools\dist\cli.js jetton:balance UQDKJfVh5jnM0eGlOanDXWl6d8fleIZjoc7SHakWuxS6m4bL
2. Export holders
bash
Copy code
node .\packages\tools\dist\cli.js export:holders 500
This will create holders.csv in the repo root.

Jetton master
EQBCY5Yj9G6VAQibTe6hz53j8vBNO234n0fzHUP3lUBBYbeR
