# Kexin Personal Homepage (Single Page)

Notion-like minimal layout + modern monoline illustration style.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:5173/`.

## Deploy (public, shareable link)

### Option A: GitHub Pages (recommended, free)

This repo includes a workflow at `.github/workflows/deploy.yml` that auto-deploys on every push to `main`.

1. Create a GitHub repository and push this project to the `main` branch.
2. In GitHub repo settings:
   - **Settings → Pages**
   - **Build and deployment → Source**: select **GitHub Actions**
3. Push again (or run the workflow manually via **Actions** tab).
4. Your public URL will be:
   - `https://<your-username>.github.io/<your-repo-name>/`

### Option B: Vercel (fastest)

1. Import the GitHub repo in Vercel.
2. Framework preset: **Vite**
3. Build command: `npm run build`
4. Output directory: `dist`

Vercel will give you a public URL immediately.

