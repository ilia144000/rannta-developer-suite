const { RANNTA } = require("./packages/sdk/dist/index.js");

(async () => {
  const client = new RANNTA({ apiKey: "demo", network: "mainnet" });
  const res = await client.ping();
  console.log("SDK ping:", res);
})();
