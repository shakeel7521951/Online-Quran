# 🚀 Complete API Integration Guide - Online Quran Platform

This guide covers the complete API integration for both **Users** and **Tutors** management systems in the Online Quran application.

## 📋 Overview

The application now includes full CRUD (Create, Read, Update, Delete) operations for:

- **Users Management** - Regular users and admins
- **Tutors Management** - Teaching staff with specialized fields

## 🛠 Backend Architecture

### Database Models

1. **User Model** (`backend/src/models/User.js`)

   - Basic user information with authentication
   - Profile details and contact information
   - Role-based access (user/admin)

2. **Tutor Model** (`backend/src/models/Tutor.js`)
   - Extended user model with teaching-specific fields
   - Qualifications, certifications, and subjects
   - Student assignment tracking and review system

### API Endpoints

#### Users API (`/api/users`)

- `GET /` - Get all users
- `GET /:id` - Get user by ID
- `PUT /:id` - Update user
- `DELETE /:id` - Delete user
- `PATCH /:id/toggle-status` - Toggle user status

#### Tutors API (`/api/tutors`)

- `GET /` - Get all tutors
- `GET /:id` - Get tutor by ID
- `POST /` - Create new tutor
- `PUT /:id` - Update tutor
- `DELETE /:id` - Delete tutor
- `PATCH /:id/toggle-status` - Toggle tutor status
- `PATCH /:id/assign-student` - Manage student assignments

### Authentication

All endpoints require JWT authentication:

```
Authorization: Bearer <your_jwt_token>
```

## 💻 Frontend Integration

### API Services

- `frontend/src/features/usersAPI.js` - Users API functions
- `frontend/src/features/tutorsAPI.js` - Tutors API functions

### Components Updated

1. **UsersTable.jsx** - Users management interface
2. **TutorsTable.jsx** - Tutors management interface

### Modal Components

- **View Modals** - Display detailed information
- **Edit Modals** - Update records with form validation
- **Delete Modals** - Confirm deletion with safety checks

## 🔧 Key Features

### Users Management

✅ Real-time data fetching from MongoDB  
✅ Search and filter functionality  
✅ User status management (active/inactive)  
✅ CRUD operations with API integration  
✅ Error handling and loading states

### Tutors Management

✅ All user management features plus:  
✅ Advanced filtering (role, gender, reviews)  
✅ Student assignment tracking  
✅ Review and rating system  
✅ Teaching specialization fields  
✅ Experience and qualification tracking

## 🚦 Getting Started

### 1. Start Backend Server

```bash
cd backend
npm start
```

Server runs on: `http://localhost:5000`

### 2. Start Frontend Server

```bash
cd frontend
npm run dev
```

Frontend runs on: `http://localhost:5173`

### 3. Authentication Required

- Login to get JWT token
- Token automatically included in API requests
- Access Users/Tutors management from dashboard

## 📊 Data Flow

```
Frontend Component → API Service → Backend Route → Controller → Database Model
     ↓
Database Response ← Controller ← Backend Route ← API Service ← Component Update
```

## 🔍 Testing APIs

Use the provided REST files:

- `backend/users-api-test.rest` - Test user endpoints
- `backend/tutors-api-test.rest` - Test tutor endpoints

## 📝 File Structure

```
backend/
├── src/
│   ├── models/
│   │   ├── User.js          # User data model
│   │   └── Tutor.js         # Tutor data model
│   ├── controllers/
│   │   ├── usersController.js   # User business logic
│   │   └── tutorsController.js  # Tutor business logic
│   ├── routes/
│   │   ├── users.js         # User API routes
│   │   └── tutors.js        # Tutor API routes
│   └── server.js            # Main server file
├── users-api-test.rest      # User API tests
└── tutors-api-test.rest     # Tutor API tests

frontend/
├── src/
│   ├── features/
│   │   ├── usersAPI.js      # User API service
│   │   └── tutorsAPI.js     # Tutor API service
│   └── Dashboard/
│       ├── usersPage/
│       │   ├── UsersTable.jsx       # Users management
│       │   └── modelsSection/       # User modals
│       └── tutorsPage/
│           ├── TutorsTable.jsx      # Tutors management
│           └── modelsSection/       # Tutor modals
```

## ⚡ Quick Commands

```bash
# Install dependencies
cd backend && npm install
cd frontend && npm install

# Start development servers
npm run dev  # In both backend and frontend

# Test API endpoints
# Use REST files with VS Code REST Client extension
```

## 🛡 Security Features

- JWT token authentication
- Password hashing (in production)
- Input validation and sanitization
- Role-based access control
- Protected routes and middleware

## 📈 Next Steps

1. Add pagination for large datasets
2. Implement file upload for profile images
3. Add advanced search filters
4. Create dashboard analytics
5. Add real-time notifications
6. Implement audit logging

---

**Status**: ✅ **Ready for Development**

Both Users and Tutors management systems are fully integrated with MongoDB, complete with CRUD operations, authentication, and user-friendly interfaces.
