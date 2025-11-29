Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

Write-Host "Creating TypeScript configs..." 

# 1) Root base tsconfig
$baseTsconfig = @"
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS",
    "declaration": true,
    "outDir": "dist",
    "strict": true,
    "esModuleInterop": true,
    "moduleResolution": "Node",
    "skipLibCheck": true
  },
  "include": ["src"]
}
"@

$baseTsconfig | Out-File -FilePath "tsconfig.base.json" -Encoding utf8 -Force

# Helper function to create per-package tsconfig
function New-PackageTsconfig {
  param(
    [Parameter(Mandatory = $true)]
    [string]$PackageDir
  )

  $pkgTsconfig = @"
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "outDir": "dist"
  },
  "include": ["src"]
}
"@

  $path = Join-Path $PackageDir "tsconfig.json"
  $pkgTsconfig | Out-File -FilePath $path -Encoding utf8 -Force
  Write-Host "Created tsconfig.json in $PackageDir"
}

# 2) Per-package configs
New-PackageTsconfig -PackageDir "packages/sdk"
New-PackageTsconfig -PackageDir "packages/react"
New-PackageTsconfig -PackageDir "packages/tools"

Write-Host "TypeScript configs created."
