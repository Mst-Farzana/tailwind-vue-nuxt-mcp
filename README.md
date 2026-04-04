# Nuxt Admin Dashboard

A full-stack, production-ready SaaS admin dashboard built with **Nuxt 3**, **Tailwind CSS**, **BetterAuth**, and **Drizzle ORM** on PostgreSQL. Includes multi-tenant organization management, AI chat, subscription billing, profile management, and dark mode.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Nuxt 3](https://nuxt.com) + [Vue 3](https://vuejs.org) |
| Styling | [Tailwind CSS](https://tailwindcss.com) · [DaisyUI](https://daisyui.com) · [@nuxt/ui](https://ui.nuxt.com) |
| Authentication | [BetterAuth](https://better-auth.com) (email/password) |
| Database | PostgreSQL + [Drizzle ORM](https://orm.drizzle.team) |
| State Management | [Pinia](https://pinia.vuejs.org) |
| Charts | [Chart.js](https://www.chartjs.org) · [ApexCharts](https://apexcharts.com) |
| Image Uploads | [Cloudinary](https://cloudinary.com) + [@nuxt/image](https://image.nuxt.com) |
| AI / LLM | [OpenAI API](https://platform.openai.com) · Ollama (local) |
| Payment | [SSLCommerz](https://www.sslcommerz.com) |
| MCP | [@modelcontextprotocol/sdk](https://modelcontextprotocol.io) |
| Testing | [Vitest](https://vitest.dev) + [@nuxt/test-utils](https://nuxt.com/docs/getting-started/testing) |
| Linting | ESLint · Prettier · Stylelint · Husky + lint-staged |

---

## Features

- **Authentication** — Sign up, sign in, sign out, forgot password, email verification (production)
- **Multi-tenant Organizations** — Create and switch organizations; role-based access (owner / admin / member / viewer)
- **Subscription & Billing** — Free / Beginner / Standard / Pro / Enterprise plans via SSLCommerz
- **Dashboard** — Analytics cards, finance tables, transaction lists, trend charts
- **User Management** — View, manage, and filter users
- **Profile** — Edit profile, upload avatar (Cloudinary), manage payment methods, security settings
- **AI Chat** — Integrated chat powered by OpenAI or a local Ollama instance
- **Dark Mode** — System-preference aware with manual toggle
- **MCP Server** — Model Context Protocol integration for AI tooling
- **Form Validation** — Zod schemas with vee-validate
- **Fully Typed** — TypeScript strict mode throughout

---

## Project Structure

```
├── server/
│   ├── auth.ts              # BetterAuth configuration
│   ├── db/                  # Drizzle schema, migrations, validators
│   └── api/                 # REST API routes (auth, dashboard, profile, payment…)
├── pages/
│   ├── auth/                # Login, Signup, Forgot Password
│   ├── dashboard/           # Main dashboard, users, messages, settings
│   ├── profile/             # Profile edit & add
│   └── sidebar/             # Overview, pricing, tables, UI demos
├── components/              # Reusable Vue components
├── composables/             # useAuth, useProfile, useOrganization, useChat…
├── stores/                  # Pinia stores
├── middleware/              # Auth & organization route guards
└── tests/                   # Unit, integration, and e2e tests
```

---

## Getting Started

### Prerequisites

- Node.js ≥ 20
- pnpm ≥ 9
- PostgreSQL database

### 1. Clone & Install

```bash
git clone https://github.com/Mst-Farzana/tailwind-vue-nuxt-mcp.git
cd tailwind-vue-nuxt-mcp
pnpm install
```

### 2. Environment Variables

Copy the example file and fill in your values:

```bash
cp .env.example .env
```

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `BETTER_AUTH_SECRET` | Random 64-character secret |
| `BETTER_AUTH_URL` | Public base URL of your app |
| `NUXT_PUBLIC_SITE_URL` | Production domain (used for payment redirects) |
| `GITHUB_CLIENT_ID` | GitHub OAuth app client ID |
| `GITHUB_CLIENT_SECRET` | GitHub OAuth app client secret |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |
| `OPENAI_API_KEY` | OpenAI API key |
| `SSLC_STORE_ID` | SSLCommerz store ID |
| `SSLC_STORE_PASS` | SSLCommerz store password |
| `OLLAMA_URL` | Ollama endpoint (default: `http://127.0.0.1:11434/v1/chat/completions`) |

### 3. Database Setup

Run migrations to create all tables:

```bash
pnpm drizzle-kit generate
pnpm drizzle-kit migrate
```

### 4. Start Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm preview` | Preview production build locally |
| `pnpm lint` | Run ESLint |
| `pnpm lint:fix` | Auto-fix lint errors |
| `pnpm format` | Format with Prettier |
| `pnpm nuxi typecheck` | TypeScript type check |
| `pnpm test` | Run all tests |
| `pnpm test:unit` | Run unit tests only |
| `pnpm test:e2e` | Run end-to-end tests only |
| `pnpm test:coverage` | Run tests with coverage report |
| `pnpm check` | Lint + format + typecheck + test (full CI check) |

---

## Production Deployment

```bash
pnpm build
node .output/server/index.mjs
```

> **Note:** Set all environment variables on your hosting platform before deploying. The `DATABASE_URL`, `BETTER_AUTH_SECRET`, and `NUXT_PUBLIC_SITE_URL` are required for the app to function correctly in production.

For containerised deployment, the build output in `.output/` is self-contained and can be copied into any Node.js Docker image.

---

## Testing

```bash
pnpm test            # Run all tests
pnpm test:watch      # Watch mode
pnpm test:unit       # Unit tests only
pnpm test:e2e        # End-to-end tests only
pnpm test:coverage   # With coverage report
```

---

## License

MIT

