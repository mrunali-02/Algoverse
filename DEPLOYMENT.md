# AlgoVerse Deployment Guide

This guide details how to deploy **AlgoVerse** to production using **Vercel** for Frontend, **Render** for Backend, and **Neon PostgreSQL** for Database.

---

## 🐘 1. Database Deployment (Neon PostgreSQL)

1. Sign up for a free PostgreSQL database at [neon.tech](https://neon.tech).
2. Create a new project named `algoverse-production`.
3. Copy your database connection string:
   ```env
   postgres://<user>:<password>@ep-example-12345.us-east-2.aws.neon.tech/algoverse_db?sslmode=require
   ```

---

## 🐍 2. Backend Deployment (Render)

1. Sign up or log in to [render.com](https://render.com).
2. Create a **New Web Service** and link your Git repository.
3. Configure settings:
   - **Root Directory**: `backend`
   - **Environment**: `Python 3`
   - **Build Command**:
     ```bash
     pip install -r requirements.txt && python manage.py collectstatic --noinput
     ```
   - **Start Command**:
     ```bash
     python manage.py migrate && gunicorn config.wsgi:application
     ```

4. Set Environment Variables in Render Dashboard:
   ```env
   SECRET_KEY=generate-a-strong-random-production-secret-key
   DEBUG=False
   ALLOWED_HOSTS=.onrender.com,yourdomain.com
   CORS_ALLOWED_ORIGINS=https://algoverse-green.vercel.app

   CLERK_SECRET_KEY=sk_test_...

   DATABASE_URL=postgres://<user>:<password>@ep-example-12345.us-east-2.aws.neon.tech/algoverse_db?sslmode=require
   USE_POSTGRES=True
   ```

---

## 🎨 3. Frontend Deployment (Vercel)

1. Log in to [vercel.com](https://vercel.com) and click **Add New Project**.
2. Import your Git repository and set **Root Directory** to `frontend`.
3. Framework Preset: **Next.js**.
4. Set Environment Variables in Vercel Dashboard:
   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
   CLERK_SECRET_KEY=sk_test_...
   NEXT_PUBLIC_API_BASE_URL=https://algoverse-backend.onrender.com/api
   ```
5. Click **Deploy**.

---

## 🔍 Verification

1. Navigate to your Vercel production URL: `https://algoverse-green.vercel.app`.

2. Test user login via Clerk.
3. Open Dijkstra Visualizer, interact with the graph editor, run the simulation, save a custom graph, and take the quiz to verify production API connectivity.
