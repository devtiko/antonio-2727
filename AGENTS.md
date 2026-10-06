# Agent Notes

## Repo layout

- Root is **not** a pnpm workspace. `backend/` and `frontend/` are independent packages with their own `pnpm-lock.yaml`, `package.json`, and `pnpm-workspace.yaml`.
- Use `pnpm` and Node 24 (both packages have `.node-version` = `24` and `packageManager` = `pnpm@10.33.2`).
- Install dependencies in each package directory:
  - `cd backend && pnpm i`
  - `cd frontend && pnpm i`

## Backend (`backend/`)

- Stack: Express 5, TypeScript compiled to CommonJS, Vitest.
- Entry: `src/main.ts`. Build output: `dist/main.js`.
- Dev: `pnpm dev` (uses `tsx watch --env-file=.env src/main.ts`). Requires `.env`.
- Build: `pnpm build` (`rimraf dist && tsc && tsc-alias`). `tsc-alias` resolves path aliases at build time.
- Start prod: `pnpm start` (`node --env-file=.env dist/main.js`).
- Typecheck: `pnpm typecheck` (`tsc --noEmit`). There is no lint script.
- Tests: `pnpm test` runs `vitest run`. Only files matching `src/**/__test__/**/*.test.ts` are included. Run a single test with `pnpm vitest run <path>`.
- Path aliases (mirrored in `vitest.config.mts`): `@app`, `@common`, `@config`, `@security`, `@server`.
- Env vars (validated by `valibot-env` in `src/config/env.ts`): `PORT`, `CORS_ORIGIN` (optional URL), `API_KEY`. Copy `.env.template` to `.env`.
- API: all routes under `/api/v1` require the `x-api-key` header to match `API_KEY`. Currently only `POST /api/v1/top-up`. Uses in-memory mock data.
- API tests: Bruno collection in `backend/bruno/`; `environments/dev.bru` points to `http://localhost:3000/api/v1`.

## Frontend (`frontend/`)

- Stack: React 19 + Vite + TypeScript, Tailwind CSS v4, shadcn/ui base-vega, React Compiler.
- Entry: `src/main.tsx`. Routes in `src/router/AppRouter.tsx` (react-router v8). Public routes: `/` (auth) and `*`; private: `/dashboard`.
- Dev: `pnpm dev`. Build: `pnpm build` (`tsc -b && vite build`). Preview: `pnpm preview`.
- Lint: `pnpm lint` (`eslint .`). Typechecking is part of build via `tsc -b`.
- Tests: `pnpm test` (`vitest run`, jsdom env). Run a single test with `pnpm vitest run <path>`.
- Path alias: `@/` → `src/`.
- Env vars (validated by `valibot-env`, public prefix `VITE_`): `VITE_API_BASE_URL`, `VITE_API_KEY`. Copy `.env.template` to `.env`.
- React Compiler is enabled via `@rolldown/plugin-babel` + `reactCompilerPreset()` in `vite.config.ts`.
- Tailwind v4 is configured in CSS (`src/index.css`) using `@import "tailwindcss"`; there is no `tailwind.config.js`.
- shadcn aliases in `components.json`: components → `@/common/components`, ui → `@/common/ui`, utils → `@/common/lib/utils`, lib → `@/common/lib`, hooks → `@/common/hooks`.

## Shared conventions

- Tests live in `__test__` folders next to the code, named `*.test.ts`.
- Environment files are gitignored; templates live at `backend/.env.template` and `frontend/.env.template`.
- `.secrets/` at repo root is gitignored and holds `context7-key.md` used by `opencode.json` for the Context7 MCP.
