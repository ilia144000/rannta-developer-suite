#!/usr/bin/env node
import { Command } from "commander";
import { RANNTA } from "@rannta/sdk";

const program = new Command();

program
  .name("rannta")
  .description("RANNTA CLI tools")
  .version("0.1.0");

program
  .command("ping")
  .description("Check SDK status")
  .action(async () => {
    const client = new RANNTA({ apiKey: "demo", network: "mainnet" });
    const res = await client.ping();
    console.log(res);
  });

program.parse(process.argv);
