# GGS Website Implementation Path

This document translates the current spec into a build sequence that can be followed while developing the site.

The intent is to make the MCP usage explicit during each phase instead of treating the MCPs as optional afterthoughts.

## Working assumptions

- first milestone is a polished single-page public site
- events are rendered from structured local content from day one
- future admin and backend planning stays at the content-contract level only
- MCP baseline during implementation:
  - `context7`
  - `next-devtools`
  - `playwright`

## Phase 1: Scaffold and tooling baseline

Goal:

Get a working Next.js project running locally with the agreed tooling and folder structure.

Build tasks:

- scaffold the app with Next.js App Router, TypeScript, Tailwind, and `src/`
- add Biome as the single lint and format tool
- keep [`.vscode/mcp.json`](/Users/zaq/Documents/projects/working/ggs-web/.vscode/mcp.json) as the MCP source of truth
- create the core folders:
  - `src/app`
  - `src/components`
  - `src/content`
  - `src/lib`
- add a minimal homepage shell so `npm run dev` works immediately

MCP callouts:

- use `context7` for current setup questions around Next.js App Router, Tailwind, and Biome
- use `next-devtools` `init` once the app exists and the dev server is running
- use `next-devtools` to confirm the route structure and inspect boot errors
- use `playwright` only after the first render is available on `http://localhost:3000`

Exit criteria:

- app boots locally
- Biome scripts are present
- repo structure is in place
- Next DevTools can see the project once the dev server is up

## Phase 2: Content model and page composition

Goal:

Turn the homepage into a real organization site with reusable sections and structured event data.

Build tasks:

- define a typed event model in `src/content/events.ts`
- create reusable components for:
  - header
  - hero
  - about
  - events
  - contact
  - footer
- compose the sections in `src/app/page.tsx`
- render the events section from typed local content, not inline hardcoded cards
- use [content.md](/Users/zaq/Documents/projects/working/ggs-web/docs/reference/content.md) as the source for the initial organization copy direction

Frontend requirements:

- header includes anchor navigation for about, events, and contact
- hero clearly states what the Greater Gaming Society is
- about section explains who the organization serves and its San Antonio context
- events section supports title, date, time, location, description, external link, and status
- contact section surfaces Instagram, Meetup, and Facebook

MCP callouts:

- use `context7` if a current Next.js server/client boundary pattern needs to be checked
- use `next-devtools` to inspect route metadata and confirm there are no obvious runtime issues
- use `playwright` to verify section order, visible text, anchor navigation, and data-driven event rendering

Exit criteria:

- homepage renders all required sections
- event cards render from typed data
- anchor links work
- no obvious runtime errors appear through Next.js diagnostics

## Phase 3: Visual polish and responsive refinement

Goal:

Push the public site from functional to polished.

Build tasks:

- refine spacing, typography, and section rhythm
- make the design feel community-oriented instead of generic SaaS
- tune the layout for mobile, tablet, and desktop
- improve the visual treatment of:
  - navigation
  - hero
  - event cards
  - contact/community links
- keep the experience single-page and focused

MCP callouts:

- use `playwright` as the primary tool for layout verification across viewport sizes
- use `playwright` to inspect CTA placement, section spacing, and card readability
- use `next-devtools` if hydration, runtime, or metadata issues appear during refinement
- use `context7` only when a framework or styling behavior needs current docs

Exit criteria:

- mobile and desktop layouts both hold up
- hero, events, and contact sections remain readable and balanced
- no obvious spacing or alignment issues remain in primary viewports

## Phase 4: Content hardening and readiness pass

Goal:

Tighten the copy and basic site metadata so the project is a credible baseline for future expansion.

Build tasks:

- replace weak placeholder phrasing with stronger organization-specific messaging
- verify social/community links and CTA destinations
- add basic metadata such as title and description
- ensure the page structure is stable enough for future additions

MCP callouts:

- use `next-devtools` for metadata and Next.js-specific implementation checks
- use `playwright` for final interaction and content verification on the running app
- use `context7` for any final API or metadata-reference lookups

Exit criteria:

- copy matches the organization references
- metadata is present
- external links and CTA targets are coherent

## Frontend implementation breakdown

### Header

- organization name or logo treatment
- anchor navigation to about, events, and contact
- mobile-safe layout from the first pass

### Hero

- clear identity statement for the organization
- supporting community-focused copy
- one primary CTA that points to a community/contact destination

### About

- short explanation of who the group serves
- mention collaboration, connection, monthly activity, and the San Antonio context

### Events

- render from typed local data
- support at least upcoming events immediately
- preserve a clean interface so the storage layer can be replaced later

### Contact and community

- Instagram
- Meetup
- Facebook
- short invitation to connect or join

### Footer

- repeat key navigation and organization identity
- stay lightweight and functional

## Future admin contract

Do not build backend or admin infrastructure in the first milestone.

Keep the future-facing event shape stable with these fields:

- `title`
- `date`
- `time`
- `location`
- `description`
- `externalUrl`
- `status`

Assumed future admin capabilities:

- list events
- create event
- edit event
- archive or cancel event
- optionally publish or unpublish event

Current boundary:

- no auth plan yet
- no database choice yet
- no hosting-specific backend plan yet
- public event rendering must stay decoupled from storage

## Validation workflow

Validation should happen during every phase, not only at the end.

- scaffold validation:
  - app starts
  - scripts exist
  - MCP config is recognized
- composition validation:
  - all sections render
  - events are data-driven
  - navigation anchors work
- polish validation:
  - mobile and desktop layouts are stable
  - key sections read clearly
- readiness validation:
  - content matches references
  - metadata exists
  - links and CTA flows are coherent

## Suggested development prompts

- `Use Context7 to confirm the current Next.js App Router guidance for this implementation step.`
- `Use the init tool from next-devtools before we continue with this Next.js task.`
- `Use Playwright MCP to verify the current homepage layout at localhost:3000.`
- `Refactor the events section so it renders from structured local content and stays reusable for a future admin source.`
