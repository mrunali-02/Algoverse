# AlgoVerse Installation & Setup Guide 🛠️

This guide walks you through setting up both the **Frontend (Next.js 15)** and **Backend (Django REST Framework)** locally.

---

## 📋 Prerequisites

- **Node.js**: v18.0.0 or higher
- **Python**: v3.10 or higher
- **PostgreSQL**: v14.0 or higher (or SQLite for quick local development)
- **Clerk Account**: Free account at [clerk.com](https://clerk.com)

---

## 🎨 1. Frontend Setup (`frontend/`)

1. **Navigate to the frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env.local` file in `frontend/`:
   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_Y2VydGFpbi1saW9uLTE5LmNsZXJrLmFjY291bnRzLmRldiQ
   CLERK_SECRET_KEY=sk_test_zPVmUDtBkfpxKU0yGW91svAOaERC2gha6bkvLFrdIm
   NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
   ```

4. **Run the Next.js Development Server**:
   ```bash
   npm run dev
   ```
   The frontend will run on `http://localhost:3000`.

---

## 🐍 2. Backend Setup (`backend/`)

1. **Navigate to the backend directory**:
   ```bash
   cd backend
   ```

2. **Create and Activate a Python Virtual Environment**:
   - **Windows**:
     ```powershell
     python -m venv venv
     .\venv\Scripts\activate
     ```
   - **macOS/Linux**:
     ```bash
     python3 -m venv venv
     source venv/bin/activate
     ```

3. **Install Requirements**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure Environment Variables**:
   Create a `.env` file in `backend/`:
   ```env
   SECRET_KEY=django-insecure-algoverse-key
   DEBUG=True
   ALLOWED_HOSTS=localhost,127.0.0.1
   CORS_ALLOWED_ORIGINS=http://localhost:3000

   CLERK_SECRET_KEY=sk_test_zPVmUDtBkfpxKU0yGW91svAOaERC2gha6bkvLFrdIm

   DATABASE_NAME=algoverse_db
   DATABASE_USER=postgres
   DATABASE_PASSWORD=user106b
   DATABASE_HOST=localhost
   DATABASE_PORT=5432
   ```

5. **Run Django Database Migrations**:
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

6. **Start Django DRF Server**:
   ```bash
   python manage.py runserver 8000
   ```
   The REST API will be available at `http://localhost:8000/api/`.

---

## ✅ Verification & Testing Checklist

- Open `http://localhost:3000` in your browser.
- Log in using Clerk Auth.
- Navigate to `/dashboard` to view the 15-category curriculum progress matrix.
- Launch any simulation (e.g. `/simulation/bubble-sort`, `/simulation/dijkstra`, `/simulation/kmp`, `/simulation/hash-table`).
- Test playback controls (Play, Step Forward/Back, Speed Slider) and interactive graph editor canvas.

---

## 📜 Support & Resources

- [Architecture Guide](ARCHITECTURE.md)
- [Main Repository README](README.md)
