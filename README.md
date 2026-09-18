# Gracious Living Church

A responsive Gracious Living Church website built with React, TanStack Start, and Vite.

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:8081.

## Netlify deployment

Netlify uses `netlify.toml` to run the production build and publish the generated site. Configure the required Supabase environment variables in Netlify before deploying:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`
- `SUPABASE_URL`
- `SUPABASE_PUBLISHABLE_KEY`
