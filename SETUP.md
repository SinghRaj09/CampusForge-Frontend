# 🚀 CampusForge - Quick Setup Guide

## ⚡ 3-Step Installation

### Step 1: Install Dependencies
```bash
cd CampusForge
npm install --legacy-peer-deps
```

### Step 2: Make Sure Backend is Running
```
Your C++ backend should be running on:
http://localhost:18080
```

### Step 3: Start Development Server
```bash
npm run dev
```

Done! The app opens at `http://localhost:5173`

---

## 📋 Checklist Before Running

- ✅ Node.js 16+ installed
- ✅ C++ backend running on port 18080
- ✅ All environment variables set in backend
- ✅ Supabase database connected in backend

---

## 🔌 API Endpoints

Your backend should have these endpoints:

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /signup | Register new user |
| POST | /login | Login user |
| GET | /projects | Get all projects |
| POST | /add_project | Create project |
| GET | /my_projects | Get user's projects |
| PUT | /edit_project | Update project |
| DELETE | /delete_project | Delete project |

---

## 🎨 What You'll See

### Login Page
- Email and password login
- Link to signup

### Sign Up Page  
- Full name, email, password
- Auto-login after signup

### Dashboard
- All projects in 3x4 grid (responsive)
- Search bar at top
- Profile dropdown menu
- Pagination controls

### Add Project
- Form with:
  - Title
  - Description
  - Required Skills
  - Contact Name
  - Contact Phone
  - Contact Email
  - Status

### My Projects
- "No Projects" message if empty
- Project cards with Edit and Delete buttons

---

## 📝 Project Card Shows

- ✅ Project Title
- ✅ Project Description
- ✅ Required Skills (tags)
- ✅ Contact Name
- ✅ Contact Phone (clickable)
- ✅ Contact Email (clickable)
- ✅ Status badge (live/expired)
- ✅ Edit & Delete buttons (on My Projects)

---

## 🔑 Authentication Flow

1. User signs up on `/signup`
2. Backend creates user in Supabase
3. Auto-login after signup
4. JWT token stored in localStorage
5. Token sent in Authorization header for all requests
6. Logout clears token and redirects to login

---

## 🐛 Common Issues

### "Connection refused" error
→ Make sure C++ backend is running on port 18080

### "CORS error"
→ Check CORS headers in your backend middleware

### "Token expired"
→ Just login again (tokens expire after 24 hours)

### Module not found errors
→ Run `npm install --legacy-peer-deps` again

---

## 📱 Responsive Design

- **Desktop**: 3-column grid
- **Tablet**: 2-column grid
- **Mobile**: 1-column grid

All responsive styling included!

---

## 🎯 Features Included

✨ Modern dark theme with animations
🔐 JWT authentication
🔍 Real-time search
📄 Pagination (12 items per page)
✏️ Edit projects modal
🗑️ Delete with confirmation
📱 Fully responsive
⚡ Built with Vite (fast!)

---

## 🚀 To Build for Production

```bash
npm run build
```

Creates a `dist/` folder ready to deploy!

---

## ✅ Ready?

Run these commands and you're good to go:

```bash
npm install --legacy-peer-deps
npm run dev
```

Open `http://localhost:5173` in your browser!

🎉 That's it!
