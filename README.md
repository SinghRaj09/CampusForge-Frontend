# CampusForge - Frontend

A modern, feature-rich project sharing platform built with React, Vite, and integrated with a C++ backend and Supabase database.

## 🎯 Features

### Authentication
- ✅ User signup with validation
- ✅ User login with JWT tokens
- ✅ Secure token storage in localStorage
- ✅ Logout functionality

### Project Management
- ✅ Browse all projects with 3x4 grid layout
- ✅ Search projects by title, description, and skills
- ✅ Pagination (12 projects per page)
- ✅ Add new projects
- ✅ View my projects
- ✅ Edit projects (for project owner)
- ✅ Delete projects (for project owner)

### Project Details
- 📌 Title
- 📝 Description
- 🛠️ Required Skills (comma-separated)
- 👤 Contact Name
- 📞 Contact Phone
- 📧 Contact Email
- 📊 Status (live/expired)

### UI/UX
- 🎨 Modern dark theme
- ✨ Smooth animations
- 📱 Fully responsive design
- 🚀 Fast performance with Vite
- 🔄 Real-time search and filtering

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- npm or yarn
- C++ backend running on `http://localhost:18080`

### Installation

1. **Extract the project**
   ```bash
   cd CampusForge
   ```

2. **Install dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

The application will open at `http://localhost:5173`

### Environment Setup

Make sure your C++ backend is running on `http://localhost:18080` with the following endpoints:

- `POST /signup` - User registration
- `POST /login` - User authentication
- `GET /projects` - Get all projects (with search and pagination)
- `POST /add_project` - Create new project
- `GET /my_projects` - Get user's projects
- `PUT /edit_project` - Update project
- `DELETE /delete_project` - Delete project

## 📁 Project Structure

```
CampusForge/
├── src/
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── SignUp.jsx
│   │   ├── Dashboard.jsx
│   │   ├── AddProject.jsx
│   │   ├── MyProjects.jsx
│   │   ├── Auth.css
│   │   ├── Dashboard.css
│   │   ├── ProjectForm.css
│   │   └── MyProjects.css
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Header.css
│   │   ├── ProjectCard.jsx
│   │   ├── ProjectCard.css
│   │   ├── EditProjectModal.jsx
│   │   └── EditProjectModal.css
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🔌 API Integration

### Login
```javascript
POST /login
{
  "email": "user@example.com",
  "password": "password123"
}

Response:
{
  "token": "jwt_token_here"
}
```

### Add Project
```javascript
POST /add_project
Headers: Authorization: Bearer {token}
{
  "title": "Project Title",
  "description": "Project description...",
  "skills": "React, Node.js, MongoDB",
  "contact_name": "John Doe",
  "contact_phone": "+1234567890",
  "contact_email": "john@example.com",
  "status": "live",
  "team_size": 0
}
```

### Get All Projects
```javascript
GET /projects?page=1&search=React
Headers: Authorization: Bearer {token}

Returns: Array of projects
```

### My Projects
```javascript
GET /my_projects
Headers: Authorization: Bearer {token}

Returns: Array of user's projects
```

### Edit Project
```javascript
PUT /edit_project
Headers: Authorization: Bearer {token}
{
  "id": 1,
  "title": "Updated Title",
  "description": "Updated description...",
  "skills": "React, Node.js",
  "contact_name": "John Doe",
  "contact_phone": "+1234567890",
  "contact_email": "john@example.com",
  "status": "live",
  "team_size": 0
}
```

### Delete Project
```javascript
DELETE /delete_project
Headers: Authorization: Bearer {token}
{
  "id": 1
}
```

## 📱 Pages

### Login (`/login`)
- Email and password input
- Show/hide password toggle
- Link to signup page

### Sign Up (`/signup`)
- Full name input
- Email and password with confirmation
- Auto-login after successful signup

### Dashboard (`/dashboard`)
- Display all projects in 3x4 grid (3 columns on desktop, 2 on tablet, 1 on mobile)
- Search bar at the top
- Logo/website name in center or side
- Profile dropdown in top right with:
  - Add Project option
  - My Projects option
  - Logout option
- Pagination controls

### Add Project (`/add-project`)
- Form with all project fields
- Validation on submit
- Success message on completion
- Redirect to dashboard

### My Projects (`/my-projects`)
- Show "No Projects" if user has no projects
- Show project cards with Edit and Delete buttons if user has projects
- Edit button opens modal to update project
- Delete button with confirmation

## 🎨 Styling

The application uses CSS modules with a consistent color scheme:
- **Primary**: #3b82f6 (Blue)
- **Secondary**: #06b6d4 (Cyan)
- **Dark**: #0f172a (Dark Navy)
- **Text**: #ffffff (White)
- **Muted**: #94a3b8 (Gray)

## 🔐 Security Notes

- Tokens are stored in localStorage (consider httpOnly cookies for production)
- JWT tokens expire after 24 hours
- All API calls include authorization headers
- Password validation on both frontend and backend

## 🚀 Build for Production

```bash
npm run build
```

This creates a `dist/` folder with optimized production files.

## 🐛 Troubleshooting

### Connection Errors
If you see "Failed to fetch" errors:
1. Make sure your C++ backend is running
2. Check that it's on `http://localhost:18080`
3. Verify CORS headers are set correctly

### Authentication Issues
- Token expires after 24 hours
- Clear localStorage and re-login if issues persist
- Check browser console for error messages

### Build Issues
```bash
# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

## 📦 Dependencies

- **React 18.3.1** - UI framework
- **React Router 6.28.0** - Client-side routing
- **Vite 5.0.8** - Build tool
- **Lucide React 0.408.0** - Icon library

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Review API integration guide
3. Inspect browser console for errors
4. Verify backend is running correctly

## ✅ Checklist

- [x] Login/SignUp pages
- [x] Dashboard with search and pagination
- [x] Project card with all required fields
- [x] Add project form
- [x] My projects page with edit/delete
- [x] Profile dropdown menu
- [x] Backend integration
- [x] Responsive design
- [x] Error handling
- [x] Loading states

## 🎉 Done!

You now have a fully functional project sharing platform integrated with your C++ backend and Supabase database!

---

**Version**: 1.0.0
**Last Updated**: February 2026
**Status**: ✅ Production Ready
