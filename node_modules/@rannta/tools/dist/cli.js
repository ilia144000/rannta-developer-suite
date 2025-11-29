"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const sdk_1 = require("@rannta/sdk");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
// Single shared client – config can be extended later if needed
const client = new sdk_1.RANNTA({});
async function handleJettonBalance(address) {
    if (!address) {
        console.error("Usage: rannta jetton:balance <walletAddress>");
        process.exit(1);
    }
    const balance = await client.jetton.getBalance(address);
    if (balance === 0n) {
        console.log("No RANNTA balance for this address.");
        return;
    }
    // RANNTA has 9 decimals on-chain
    const decimals = 9n;
    const divisor = 10n ** decimals;
    const whole = balance / divisor;
    const frac = balance % divisor;
    const fracStr = frac.toString().padStart(Number(decimals), "0");
    console.log(`RANNTA balance for ${address}`);
    console.log(`Raw: ${balance.toString()}`);
    console.log(`Human (decimals 9): ${whole.toString()}.${fracStr} RANNTA`);
}
async function handleExportHolders(limitArg) {
    const limit = limitArg ? parseInt(limitArg, 10) : 500;
    const safeLimit = Number.isFinite(limit) && limit > 0 ? limit : 500;
    const holders = await client.jetton.getHolders(safeLimit);
    const outPath = path.join(process.cwd(), "holders.csv");
    const header = "address,balance_raw\n";
    const lines = header +
        holders
            .map((h) => `${h.address},${h.balance.toString()}`)
            .join("\n") +
        "\n";
    fs.writeFileSync(outPath, lines, { encoding: "utf8" });
    console.log(`Exported holders to: ${outPath}`);
    console.log(`Count: ${holders.length}`);
}
async function main() {
    const [command, arg1, arg2] = process.argv.slice(2);
    switch (command) {
        case "jetton:balance":
            await handleJettonBalance(arg1);
            break;
        case "export:holders":
            await handleExportHolders(arg1);
            break;
        default:
            console.log("RANNTA CLI");
            console.log("Usage:");
            console.log("  rannta jetton:balance <walletAddress>");
            console.log("  rannta export:holders [limit]");
            process.exit(1);
    }
}
main().catch((err) => {
    console.error("Unexpected error in RANNTA CLI:", err);
    process.exit(1);
});
