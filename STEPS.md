# 🚀 Local Setup Guide: MERN Job Portal

Follow these steps to set up and run the Job Portal system on your local machine.

---

## 📋 1. Prerequisites Checklist

Before you begin, ensure you have the following installed on your system:

- [ ] **Node.js (v18 or higher):**
  - Check version: `node -v`
  - Download from: [nodejs.org](https://nodejs.org/)
- [ ] **npm (v8 or higher):**
  - Check version: `npm -v` (usually comes with Node.js)
- [ ] **MongoDB (v6 or higher):**
  - You can use [MongoDB Compass](https://www.mongodb.com/try/download/compass) (local) or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (cloud).
  - Default local URI: `mongodb://localhost:27017/jobportal`
- [ ] **Git:**
  - Check version: `git --version`
  - Download from: [git-scm.com](https://git-scm.com/)

---

## 📂 2. Clone the Repository

Open your terminal (Command Prompt, PowerShell, or Terminal) and run:

```bash
git clone <repository-url>
cd AtharvaNaikProject
```

---

## ⚙️ 3. Backend Configuration

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Set up Environment Variables:**
   - Create a file named `.env` in the `backend` folder.
   - Copy the following configuration:
     ```env
     PORT=5000
     MONGO_URI=mongodb://localhost:27017/jobportal
     JWT_SECRET=your_super_secret_jwt_key_12345
     JWT_EXPIRES_IN=7d
     ```
   - *Note: Replace `MONGO_URI` if you are using MongoDB Atlas.*
4. **Start the backend server:**
   ```bash
   npm run dev
   ```
   - The server should now be running at `http://localhost:5000`.

---

## 🎨 4. Frontend Configuration

1. **Open a new terminal window** (keep the backend terminal running).
2. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```
3. **Install dependencies:**
   ```bash
   npm install
   ```
4. **Set up Environment Variables:**
   - Create a file named `.env` in the `frontend` folder.
   - Add the following:
     ```env
     VITE_API_BASE_URL=http://localhost:5000
     ```
5. **Start the frontend application:**
   ```bash
   npm run dev
   ```
   - The app should now be running at `http://localhost:5173`.

---

## 🔑 5. Accessing the Admin Panel

The project is currently configured to allow you to create an admin account directly from the UI for easy setup:

1. Open your browser and go to `http://localhost:5173/signup`.
2. Select the **Admin** role (look for the "System Control" card).
3. Fill in your name, email, and password.
4. Click **Create Account**.
5. Once registered, log in at `http://localhost:5173/login`.
6. You will be automatically redirected to the **Admin Dashboard** upon successful login.

---

## 🛠 Troubleshooting

- **MongoDB Connection Error:** Ensure your MongoDB service is running locally (`services.msc` on Windows or `brew services start mongodb-community` on macOS).
- **Port 5000/5173 Already in Use:** If another app is using these ports, you may need to close them or change the `PORT` in `.env`.
- **CSS Not Loading:** If the site looks unstyled, ensure you have followed the `npm install` step in the frontend directory to install Tailwind CSS v4 dependencies.

---

Happy coding! 💻✨
