---
description: How to deploy the VigiVerse application to Vercel for global access
---

# Deploying VigiVerse to the World 🌍

To make your application accessible to everyone, you need to "deploy" it to a cloud server. The best and easiest way for a Next.js application like VigiVerse is using **Vercel**.

## Prerequisites

1.  **GitHub Account**: You need to push your code to a GitHub repository.
2.  **Vercel Account**: Sign up at [vercel.com](https://vercel.com) (you can use your GitHub login).

## Step 1: Push Code to GitHub

If you haven't already, you need to put your code on GitHub.

1.  Create a new repository on GitHub.
2.  Run these commands in your terminal (replace `YOUR_REPO_URL` with your actual repository URL):

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin YOUR_REPO_URL
git push -u origin main
```

## Step 2: Deploy on Vercel

1.  Go to your [Vercel Dashboard](https://vercel.com/dashboard).
2.  Click **"Add New..."** -> **"Project"**.
3.  Import your `vigiverse` repository from GitHub.
4.  **Configure Project**:
    *   **Framework Preset**: Next.js (should be auto-detected)
    *   **Environment Variables**: You need to add your API keys here!
        *   `NEXT_PUBLIC_GEMINI_API_KEY`: Your Gemini API key
        *   Any other keys you are using.
5.  Click **"Deploy"**.

## Step 3: Verification

Vercel will build your project. Once finished (usually 1-2 minutes), you will get a live URL (e.g., `vigiverse.vercel.app`).

**Everyone in the world can now access this URL!** 🚀

## Optional: Custom Domain

If you want a professional look (like `www.vigiverse.com`), you can buy a domain and connect it in the Vercel project settings under "Domains".
