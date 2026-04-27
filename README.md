# Accentrix Role-Based Project Management Portal

Full-stack role-based web application built from the assessment brief.

## Tech Stack

- Frontend: React, React Router, Context API, Axios, Vite
- Backend: Node.js, Express.js, JWT, bcrypt, Mongoose
- Database: MongoDB
- Roles: Admin, Client, User

## Features

- JWT login, registration, logout, protected routes, and token validation
- Password hashing with bcrypt
- Role-based Express middleware and React route guards
- Admin dashboard with totals, statistics, and recent activity
- Admin user management with create, edit, delete, and role assignment
- Admin client management with add, update, and delete
- Reports page with date filters and CSV export
- Settings page with password change and system configuration
- Client dashboard with personal summary, notifications, and project overview
- Client profile image upload, personal details, and password change
- Client project status updates
- User dashboard with limited summary data
- User profile editing and password change

## Assignment Requirement Checklist

- Frontend: React.js
- Backend: Node.js (Express.js)
- Database: MongoDB
- Authentication: JWT-based login system
- Dashboard: Role-based dynamic dashboard
- Three roles supported: Admin, Client, and User
- Different access permissions and dashboards for each role
- React functional components and hooks
- React Router for routing
- Context API for state management
- Axios for backend communication
- Protected routes based on user role
- Responsive UI
- RESTful backend structure
- JWT authentication
- Role-based middleware
- CRUD functionality
- Environment configuration with `.env`
- Proper error handling
- Clean backend folder structure with controllers, routes, models, and middleware
- Database schema is designed with Mongoose and collections are created automatically
- User registration
- Login with email and password
- Password hashing using bcrypt
- JWT token generation
- Role-based authorization
- Logout functionality
- Token validation on protected routes
- Admin Dashboard: total users, total clients, statistics, recent activity
- User Management: create, edit, delete users, assign roles
- Client Management: add, update, delete clients
- Reports Page: view reports, filter by date, export CSV
- Settings Page: change password, basic system configuration
- Client Dashboard: personal summary, notifications, project overview
- Client Profile Page: edit personal info, upload profile image, change password
- Client Projects Page: view assigned projects, update project status
- User Dashboard: view limited summary data
- User Profile Page: edit personal information, change password
- GitHub-ready repository with frontend and backend
- Database properly configured
- README file with setup instructions
- Demo credentials for Admin, Client, and User

## Demo Credentials

| Role | Email | Password |
| --- | --- | --- |
| Admin | admin@accentrix.local | Admin@123 |
| Client | client@accentrix.local | Client@123 |
| User | user@accentrix.local | User@123 |

## Setup

1. Install MongoDB locally or provide a MongoDB Atlas connection string.
2. Check `backend/.env`:

```bash
PORT=5000
MONGO_URI=mongodb+srv://divyapandey822123_db_user:5GUEgFnLhlus4eTg@cluster0.8lecssg.mongodb.net/
JWT_SECRET=DFHJGUIHNFFJgkGJGFKUHGH
JWT_EXPIRES_IN=7d
CLIENT_URL=https://accentrix-assignment-2.onrender.com
```

3. Update `backend/.env` if needed.
4. Install and seed the backend:

```bash
npm install
npm run seed
npm run dev
```

5. In another terminal, check `frontend/.env` and run frontend:

```bash
cd frontend
npm install
npm run dev
```

6. Open `http://localhost:5173`.

## API Overview

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `GET|POST /api/users`
- `PUT|DELETE /api/users/:id`
- `PUT /api/users/profile`
- `GET|POST /api/clients`
- `PUT|DELETE /api/clients/:id`
- `GET|POST /api/projects`
- `PUT|DELETE /api/projects/:id`
- `GET /api/reports`
- `GET /api/reports/export`
- `GET /api/dashboard`
- `GET|PUT /api/settings`

## Folder Structure

```text
backend/
  src/
    config/
    controllers/
    middleware/
    models/
    routes/
    uploads/
    utils/
frontend/
  src/
    api/
    components/
    context/
    pages/
```

## Notes

- Mongoose creates collections automatically when the seed script runs.
- Profile images are stored in `backend/src/uploads`.
- Admin-only routes are guarded on both backend and frontend.
