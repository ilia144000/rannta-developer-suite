Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

Write-Host "Scaffolding RANNTA Developer Suite..." 

# 1. Create directory structure
$dirs = @(
  "packages\sdk\src",
  "packages\react\src",
  "packages\tools\src",
  "docs-site",
  "docker\nginx",
  "playground\src",
  "tests",
  "examples",
  "tools"
)

foreach ($d in $dirs) {
  if (-not (Test-Path $d)) {
    New-Item -ItemType Directory -Path $d | Out-Null
  }
}

# 2. Root README
$rootReadme = @"
# RANNTA Developer Suite

This repository contains the complete developer tooling for the RANNTA ecosystem:

- \`@rannta/sdk\`: Core TypeScript/JavaScript SDK
- \`@rannta/react\`: React hooks and provider
- \`@rannta/tools\`: CLI utilities
- Documentation site
- API playground
- Docker environment
- Integration tests and examples

All packages are designed to treat RANNTA as a protocol-entity on the TON network and integrate with the RANNTAverse marketplace and NexusBridge.

"@
$rootReadme | Out-File -FilePath "README.md" -Encoding utf8 -Force

# 3. Root package.json (monorepo)
$rootPackage = @"
{
  "name": "rannta-developer-suite",
  "version": "1.0.0",
  "private": true,
  "workspaces": [
    "packages/sdk",
    "packages/react",
    "packages/tools"
  ],
  "scripts": {
    "build": "npm run build --workspaces",
    "test": "npm run test --workspaces",
    "lint": "npm run lint --workspaces"
  }
}
"@
$rootPackage | Out-File -FilePath "package.json" -Encoding utf8 -Force

# 4. SDK package
$sdkPackage = @"
{
  "name": "@rannta/sdk",
  "version": "0.1.0",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "scripts": {
    "build": "tsc -p .",
    "test": "echo \"no tests yet\"",
    "lint": "eslint src --ext .ts"
  },
  "dependencies": {
    "axios": "^1.7.0"
  },
  "devDependencies": {
    "typescript": "^5.6.0"
  }
}
"@
$sdkPackage | Out-File -FilePath "packages/sdk/package.json" -Encoding utf8 -Force

$sdkIndex = @"
export class RANNTA {
  constructor(public config: { apiKey: string; network: string }) {}

  async ping(): Promise<string> {
    return "RANNTA SDK online";
  }
}
"@
$sdkIndex | Out-File -FilePath "packages/sdk/src/index.ts" -Encoding utf8 -Force

# 5. React package
$reactPackage = @"
{
  "name": "@rannta/react",
  "version": "0.1.0",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "peerDependencies": {
    "react": "^18.0.0"
  },
  "dependencies": {
    "@rannta/sdk": "0.1.0"
  },
  "scripts": {
    'build': 'tsc -p .',
    'test': 'echo \"no tests yet\"',
    'lint': 'eslint src --ext .tsx,.ts'
  }
}
"@
# Fix single quotes to double (PowerShell trick)
$reactPackage = $reactPackage -replace "'", '"'
$reactPackage | Out-File -FilePath "packages/react/package.json" -Encoding utf8 -Force

$reactIndex = @"
import React, { createContext, useContext, useMemo } from "react";
import { RANNTA } from "@rannta/sdk";

type Config = { apiKey: string; network: string };
type Ctx = { client: RANNTA };

const RANNTAContext = createContext<Ctx | null>(null);

export const RANNTAProvider: React.FC<{ config: Config; children: React.ReactNode }> = ({
  config,
  children
}) => {
  const client = useMemo(() => new RANNTA(config), [config.apiKey, config.network]);
  return <RANNTAContext.Provider value={{ client }}>{children}</RANNTAContext.Provider>;
};

export function useRANNTA() {
  const ctx = useContext(RANNTAContext);
  if (!ctx) throw new Error("useRANNTA must be used inside RANNTAProvider");
  return ctx.client;
}
"@
$reactIndex | Out-File -FilePath "packages/react/src/index.tsx" -Encoding utf8 -Force

# 6. CLI package
$cliPackage = @"
{
  "name": "@rannta/tools",
  "version": "0.1.0",
  "bin": {
    "rannta": "dist/cli.js"
  },
  "scripts": {
    "build": "tsc -p .",
    "test": "echo \"no tests yet\""
  },
  "dependencies": {
    "@rannta/sdk": "0.1.0",
    "commander": "^12.1.0"
  }
}
"@
$cliPackage | Out-File -FilePath "packages/tools/package.json" -Encoding utf8 -Force

$cliIndex = @"
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
"@
$cliIndex | Out-File -FilePath "packages/tools/src/cli.ts" -Encoding utf8 -Force

# 7. Docs placeholder
$docsReadme = @"
# RANNTA Developer Documentation

This folder will host the documentation site (Docusaurus or similar) for the RANNTA ecosystem.
"@
$docsReadme | Out-File -FilePath "docs-site/README.md" -Encoding utf8 -Force

Write-Host "Scaffold complete."
