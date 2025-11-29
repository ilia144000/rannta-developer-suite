#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const sdk_1 = require("@rannta/sdk");
const program = new commander_1.Command();
program
    .name("rannta")
    .description("RANNTA CLI tools")
    .version("0.1.0");
program
    .command("ping")
    .description("Check SDK status")
    .action(async () => {
    const client = new sdk_1.RANNTA({ apiKey: "demo", network: "mainnet" });
    const res = await client.ping();
    console.log(res);
});
program.parse(process.argv);
