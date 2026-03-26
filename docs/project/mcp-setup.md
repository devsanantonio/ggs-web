# MCP Setup For VS Code

This workspace is configured to use MCPs for the Greater Gaming Society website project.

## What is configured

The VS Code workspace MCP config lives at [`.vscode/mcp.json`](/Users/zaq/Documents/projects/working/ggs-web/.vscode/mcp.json).

Configured servers:

- `playwright`: local MCP server started with `npx @playwright/mcp@latest`
- `next-devtools`: local MCP server started with `npx -y next-devtools-mcp@latest`
- `context7`: remote HTTP MCP endpoint at `https://mcp.context7.com/mcp`

## MCP responsibilities

- Codex edits the code in this workspace.
- Playwright MCP opens the running local site and validates rendering and interactions.
- Next DevTools MCP provides Next.js-specific docs, route/runtime diagnostics, and dev-server insight.
- Context7 provides current library and framework documentation.

Use that split for this project:

- hero section and page layout: Codex + Playwright MCP
- organization content and structure: Codex
- Next.js app structure and runtime debugging: Next DevTools MCP
- framework and library questions: Context7
- events and contact section verification in browser: Playwright MCP

## VS Code setup steps

1. Open this folder in VS Code.
2. Ensure the workspace contains [`.vscode/mcp.json`](/Users/zaq/Documents/projects/working/ggs-web/.vscode/mcp.json).
3. Make sure these tools are installed and available on your machine:
   - Node.js
   - npm
   - VS Code
   - Codex
4. When the website exists later, run the local Next.js dev server before using Playwright MCP to inspect it.
5. Use Next DevTools MCP after `npm run dev` so it can discover the local Next.js dev server.

## What to expect

- Playwright MCP does not build the app; it validates a running site such as `http://localhost:3000`.
- Next DevTools MCP is most useful on a running Next.js app, and its runtime tools become much more useful with Next.js 16+.
- Context7 can be used without changing your codebase. An API key is optional but useful later if you want higher rate limits.
- The current repo only contains workspace docs/config so far. The website app still needs to be scaffolded separately.

## Recommended usage

Use the MCPs in this order:

1. `context7` for current docs and setup guidance
2. `next-devtools` for Next.js-specific understanding and runtime diagnostics
3. `playwright` for browser-level verification

Prompt examples:

- `Use Context7 to look up the current Next.js App Router guidance for metadata.`
- `Use the init tool from next-devtools to set up Next.js context for this project.`
- `Use Playwright MCP to open localhost:3000 and verify the hero, events, and contact sections render correctly.`

## Local verification performed here

The current shell could confirm:

- `codex` is available

The current shell could not confirm because they were not present on `PATH`:

- `node`
- `npm`
- `code`

If those are installed on your machine but unavailable in terminal, fix your shell `PATH` before trying to run the app or launch Playwright through `npx`.
