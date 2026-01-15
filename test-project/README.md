# Seafood SKU Lookup API - Test Project

Simple API to lookup seafood SKUs by fish name or alias.

## Two Ways to Run

### 1. Local Development (Express Server)
Use `server.js` for local testing:

```bash
npm install
npm run dev
```

Visit: `http://localhost:3000/api/sku/salmon`

### 2. Production (Vercel Serverless)
The `api/` folder contains Vercel serverless functions:

```bash
npm install -g vercel
vercel
```

Vercel will deploy the serverless functions automatically.

## API Endpoints

### GET /api/sku/{fishName}

Returns the SKU for a given fish name or alias.

**Example:**
```bash
curl https://your-app.vercel.app/api/sku/salmon
```

**Response:**
```json
{
  "fishName": "salmon",
  "sku": "SAL-001",
  "found": true
}
```

**Not found:**
```json
{
  "fishName": "lobster",
  "sku": null,
  "found": false,
  "message": "Fish not found in database"
}
```

## Available Fish

- Salmon: atlantic salmon, king salmon, coho salmon
- Tuna: yellowfin/ahi, bluefin
- Shrimp: white shrimp, tiger shrimp, pink shrimp
- Others: cod, halibut, swordfish, snapper, mahi mahi

## Files

- `server.js` - Express server for local development
- `data.json` - Fish database (used by server.js)
- `api/sku/[fishName].js` - Vercel serverless function (includes data inline)
- `api/index.js` - Home page
- `vercel.json` - Vercel configuration

## Deploying to Vercel

1. Install Vercel CLI: `npm install -g vercel`
2. Run: `vercel`
3. Follow prompts
4. Get your URL: `https://your-project.vercel.app`

That's it! The serverless functions in the `api/` folder will be automatically deployed.
