# Vite Flare Starter Setup Pattern

Reference for the operations Claude performs when scaffolding a new project from
vite-flare-starter. Adapt to the user's environment.

## Step 1: Clone and Clean

```bash
git clone https://github.com/jezweb/vite-flare-starter.git PROJECT_DIR --depth 1
cd PROJECT_DIR
rm -rf .git
git init
```

## Step 2: Find-Replace Targets

Replace `vite-flare-starter` with the project name in these locations:

| File | Target | Replace with | Notes |
|------|--------|-------------|-------|
| `wrangler.jsonc` | `"vite-flare-starter"` (worker name) | `"PROJECT_NAME"` | |
| `wrangler.jsonc` | `vite-flare-starter-db` | `PROJECT_NAME-db` | Database name |
| `wrangler.jsonc` | `vite-flare-starter-avatars` | `PROJECT_NAME-avatars` | R2 bucket |
| `wrangler.jsonc` | `vite-flare-starter-files` | `PROJECT_NAME-files` | R2 bucket |
| `package.json` | `"name": "vite-flare-starter"` | `"name": "PROJECT_NAME"` | |
| `package.json` | `vite-flare-starter-db` | `PROJECT_NAME-db` | In scripts |
| `index.html` | `<title>` content | App display name | Title Case |

Also in `wrangler.jsonc`:
- **Remove** hardcoded `account_id` line (let wrangler prompt or use env var)
- **Replace** `database_id` value with `REPLACE_WITH_YOUR_DATABASE_ID`
- **Reset** `package.json` version to `"0.1.0"`

## Step 3: Generate Auth Secret

```bash
# Prefer openssl, fall back to Python
BETTER_AUTH_SECRET=$(openssl rand -hex 32 2>/dev/null || python3 -c "import secrets; print(secrets.token_hex(32))")
```

## Step 4: Create .dev.vars

Convert kebab-case project name to display name and app ID:
- `my-cool-app` → Display: `My Cool App`, ID: `my_cool_app`

```
# Local Development Environment Variables
# DO NOT COMMIT THIS FILE TO GIT

# Authentication (better-auth)
BETTER_AUTH_SECRET=<generated>
BETTER_AUTH_URL=http://localhost:5173

# Google OAuth (optional)
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Email Auth Control (disabled by default)
# ENABLE_EMAIL_LOGIN=true
# ENABLE_EMAIL_SIGNUP=true

# Application Configuration
APP_NAME=<Display Name>
VITE_APP_NAME=<Display Name>
VITE_APP_ID=<app_id>
VITE_TOKEN_PREFIX=<app_id>_
VITE_GITHUB_URL=
VITE_FOOTER_TEXT=

NODE_ENV=development
```

## Step 5: Update index.html

Replace `<title>` and meta description content with the display name.

## Step 6: Create Cloudflare Resources (Optional)

```bash
# D1 database
npx wrangler d1 create PROJECT_NAME-db
# Extract database_id from output, update wrangler.jsonc

# R2 buckets
npx wrangler r2 bucket create PROJECT_NAME-avatars
npx wrangler r2 bucket create PROJECT_NAME-files
```

## Step 7: Install and Migrate

```bash
pnpm install
pnpm run db:migrate:local
```

## Step 8: Initial Commit

```bash
git add -A
git commit -m "Initial commit from vite-flare-starter"
```

## macOS sed Note

macOS `sed -i` requires an extension argument: `sed -i '' 's/old/new/g' file`.
GNU `sed -i` does not. Claude should detect the platform and adjust, or use
the Edit tool directly (preferred — avoids sed entirely).
