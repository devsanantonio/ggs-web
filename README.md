# GGS Web

This repository contains the Greater Gaming Society of San Antonio website build.

## Current status

Phase 1 is scaffolded:

- Next.js App Router is installed in the repo root
- Tailwind is configured
- Biome is the lint and format tool
- VS Code MCP config lives in [`.vscode/mcp.json`](/Users/zaq/Documents/projects/working/ggs-web/.vscode/mcp.json)
- steering docs live under [`docs/`](/Users/zaq/Documents/projects/working/ggs-web/docs)

## Getting Started

Run the development server:

```bash
npm run dev
```

Run code-quality commands:

```bash
npm run lint
npm run format
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Project docs

- [Docs index](/Users/zaq/Documents/projects/working/ggs-web/docs/README.md)
- [Spec](/Users/zaq/Documents/projects/working/ggs-web/docs/project/spec.md)
- [Implementation path](/Users/zaq/Documents/projects/working/ggs-web/docs/project/implementation-path.md)
- [MCP setup](/Users/zaq/Documents/projects/working/ggs-web/docs/project/mcp-setup.md)

## MCP workflow

Use the MCPs in this order while developing:

- `context7` for current framework and library documentation
- `next-devtools` for Next.js-specific diagnostics and runtime insight
- `playwright` for browser verification on the running app

Start Next DevTools work by calling the `init` tool after the dev server is up.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
