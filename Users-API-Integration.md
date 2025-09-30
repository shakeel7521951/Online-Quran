# Users Management API Integration

This document explains how the Users API integration works in the Online Quran application.

## Backend API Endpoints

The following API endpoints have been created for user management:

### Base URL: `/api/users`

All endpoints require authentication via JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

### Endpoints:

1. **GET /api/users** - Get all users

   - Returns: List of all users (passwords and sensitive data excluded)

2. **GET /api/users/:id** - Get user by ID

   - Returns: Single user details

3. **PUT /api/users/:id** - Update user

   - Body: `{ username, email, phone, bio, address, role }`
   - Returns: Updated user data

4. **DELETE /api/users/:id** - Delete user

   - Returns: Success message

5. **PATCH /api/users/:id/toggle-status** - Toggle user active/inactive status
   - Returns: Updated user with new status

## Frontend Integration

### API Service (`frontend/src/features/usersAPI.js`)

The `usersAPI` object contains all the functions to interact with the backend:

```javascript
import { usersAPI } from "../../features/usersAPI";

// Get all users
const users = await usersAPI.getAllUsers();

// Update user
await usersAPI.updateUser(userId, userData);

// Delete user
await usersAPI.deleteUser(userId);

// Toggle user status
await usersAPI.toggleUserStatus(userId);
```

### UsersTable Component Updates

The `UsersTable.jsx` component has been updated to:

1. **Fetch real data** from the API instead of using dummy data
2. **Handle loading and error states**
3. **Integrate CRUD operations** with the modal components
4. **Support user status toggling** (activate/deactivate)

### Key Features:

- **Real-time data fetching** from MongoDB
- **Search and filter functionality** with real user data
- **CRUD operations** through modal dialogs
- **User status management** (active/inactive based on `isVerified` field)
- **Error handling** with user-friendly messages
- **Loading states** during API calls

### Data Structure

The API works with the following user data structure:

```javascript
{
  _id: "ObjectId",
  username: "string",
  email: "string",
  role: "user" | "admin",
  isVerified: boolean, // Used as active/inactive status
  phone: "string",
  bio: "string",
  address: "string",
  profileImage: "string",
  createdAt: "date",
  updatedAt: "date"
}
```

### Authentication Required

All API endpoints require a valid JWT token. Make sure users are logged in before accessing the Users Management page.

### Usage Instructions

1. **Start the backend server**: `npm start` in the backend folder
2. **Start the frontend server**: `npm run dev` in the frontend folder
3. **Login** to get a valid JWT token
4. **Navigate** to the Users Management page in the dashboard
5. **Perform operations** like view, edit, delete, and toggle user status

The integration provides a complete user management system with real database connectivity and full CRUD operations.
