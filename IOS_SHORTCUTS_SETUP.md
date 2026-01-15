# iOS Shortcuts & Siri Setup Guide

This guide will help you integrate the Seafood SKU Lookup API with Siri and iOS Shortcuts.

## Prerequisites

- iPhone with iOS 13 or later
- Shortcuts app (pre-installed on iOS)
- Your API deployed to Vercel or Railway (see deployment section below)

## Setting Up the Shortcut

### Step 1: Create a New Shortcut

1. Open the **Shortcuts** app on your iPhone
2. Tap the **+** button in the top right to create a new shortcut
3. Tap **Add Action**

### Step 2: Add Ask for Input

1. Search for "Ask for Input"
2. Tap it to add the action
3. Configure it:
   - Prompt: "What fish do you need the SKU for?"
   - Input Type: Text

### Step 3: Add Get Contents of URL

1. Tap the **+** button to add another action
2. Search for "Get Contents of URL"
3. Tap it to add the action
4. Configure it:
   - URL: `https://your-app-name.vercel.app/api/sku/` (replace with your deployed URL)
   - Tap "Show More"
   - Method: GET

### Step 4: Add URL Text Variable

1. Tap the URL field you just created
2. Tap the end of the URL after `/sku/`
3. Tap "Select Variable"
4. Choose "Provided Input" (this is the text from Step 2)

Your final URL should look like:
```
https://your-app-name.vercel.app/api/sku/[Provided Input]
```

### Step 5: Show Result

1. Tap **+** to add another action
2. Search for "Get Dictionary Value"
3. Configure it:
   - Get: `sku`
   - From: Contents of URL

4. Add one more action: "Show Result"
5. Configure it to show the "Dictionary Value"

### Step 6: Name Your Shortcut

1. Tap "Done" in the top right
2. Long press on your new shortcut
3. Tap "Rename"
4. Name it: "Get Fish SKU" or "Lookup Seafood"

### Step 7: Enable Siri

1. Long press on your shortcut
2. Tap "Details"
3. Tap "Add to Siri"
4. Record a phrase like: "Get fish SKU" or "Lookup seafood"
5. Tap "Done"

## Using Your Shortcut

### With Siri:
1. Say: "Hey Siri, Get fish SKU"
2. Siri will ask: "What fish do you need the SKU for?"
3. Say: "Salmon" or "Tiger Shrimp" or "Ahi"
4. Siri will display the SKU

### From Shortcuts App:
1. Open Shortcuts app
2. Tap your "Get Fish SKU" shortcut
3. Type the fish name
4. Tap "Done"
5. View the SKU result

## Deployment Instructions

### Option 1: Deploy to Vercel (Easiest)

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. From your project directory:
   ```bash
   vercel login
   vercel
   ```

3. Follow the prompts:
   - Set up and deploy? **Y**
   - Which scope? Choose your account
   - Link to existing project? **N**
   - Project name? Press enter (uses folder name)
   - Directory? Press enter (current directory)
   - Override settings? **N**

4. Vercel will give you a URL like: `https://your-project.vercel.app`

5. Test it:
   ```bash
   curl https://your-project.vercel.app/api/sku/salmon
   ```

### Option 2: Deploy to Railway

1. Go to [railway.app](https://railway.app)
2. Sign up/Login with GitHub
3. Click "New Project"
4. Choose "Deploy from GitHub repo"
5. Select your repository (or create one first)
6. Railway will auto-detect Node.js and deploy
7. Go to Settings > Generate Domain
8. Your API will be at: `https://your-project.railway.app`

### Option 3: Quick Deploy via Railway (No GitHub)

1. Install Railway CLI:
   ```bash
   npm install -g @railway/cli
   ```

2. From your project directory:
   ```bash
   railway login
   railway init
   railway up
   ```

3. Get your URL:
   ```bash
   railway domain
   ```

## Updating Your Shortcut with Production URL

After deploying:

1. Open Shortcuts app
2. Tap your shortcut to edit
3. Tap the "Get Contents of URL" action
4. Update the URL to your production URL:
   - Vercel: `https://your-project.vercel.app/api/sku/`
   - Railway: `https://your-project.railway.app/api/sku/`
5. Keep the `[Provided Input]` variable at the end
6. Tap "Done"

## Troubleshooting

### "Could not connect to server"
- Make sure your API is deployed and running
- Test the URL in a browser first
- Check that CORS is enabled (already configured in server.js)

### "Fish not found"
- Check spelling of fish name
- View available fish names in data.json
- Names are case-insensitive but must match exactly

### Siri doesn't understand fish names
- Speak clearly and slowly
- Try using common names (salmon, tuna, shrimp)
- You can also type the name instead of speaking it

## Example Fish Names to Try

- salmon, king salmon, atlantic salmon
- tuna, ahi, yellowfin
- white shrimp, tiger shrimp, pink shrimp
- cod, halibut, swordfish
- snapper, mahi mahi

## Adding More Fish

To add more fish to your database:

1. Edit `data.json` in your project
2. Add new entries with SKU and name aliases
3. Redeploy:
   - Vercel: `vercel --prod`
   - Railway: `railway up`
