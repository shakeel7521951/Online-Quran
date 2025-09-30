# Tutors Management API Integration

This document explains how the Tutors API integration works in the Online Quran application.

## Backend API Endpoints

The following API endpoints have been created for tutor management:

### Base URL: `/api/tutors`

All endpoints require authentication via JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

### Endpoints:

1. **GET /api/tutors** - Get all tutors

   - Returns: List of all tutors (passwords and sensitive data excluded)

2. **GET /api/tutors/:id** - Get tutor by ID

   - Returns: Single tutor details

3. **POST /api/tutors** - Create new tutor

   - Body: `{ username, email, password, role, gender, experience, phone, bio, address, qualifications, certifications, teachingSubjects, availableHours }`
   - Returns: Created tutor data

4. **PUT /api/tutors/:id** - Update tutor

   - Body: `{ username, email, role, gender, experience, phone, bio, address, studentsAssigned, reviews, etc. }`
   - Returns: Updated tutor data

5. **DELETE /api/tutors/:id** - Delete tutor

   - Returns: Success message

6. **PATCH /api/tutors/:id/toggle-status** - Toggle tutor active/inactive status

   - Returns: Updated tutor with new status

7. **PATCH /api/tutors/:id/assign-student** - Assign/remove students from tutor
   - Body: `{ increment: 1 }` (positive to add, negative to remove)
   - Returns: Updated tutor with new student count

## Backend Tutor Model

The Tutor model includes the following fields:

```javascript
{
  username: String,           // Required
  email: String,              // Required, unique
  password: String,           // Required (hashed)
  role: String,              // "Qari", "Hafiz", "Teacher", "Imam"
  gender: String,            // "Male", "Female"
  experience: String,        // e.g., "5 Years"
  studentsAssigned: Number,  // Number of assigned students
  reviews: Number,           // Average rating (0-5)
  isVerified: Boolean,       // Email verification status
  isActive: Boolean,         // Account active status
  phone: String,
  bio: String,
  address: String,
  profileImage: String,      // URL to profile image
  qualifications: [String],  // Array of qualifications
  certifications: [String],  // Array of certifications
  teachingSubjects: [String], // Teaching subjects
  availableHours: String,    // Available time slots
  createdAt: Date,
  updatedAt: Date
}
```

## Frontend Integration

### API Service (`frontend/src/features/tutorsAPI.js`)

The `tutorsAPI` object contains all the functions to interact with the backend:

```javascript
import { tutorsAPI } from "../../features/tutorsAPI";

// Get all tutors
const tutors = await tutorsAPI.getAllTutors();

// Create new tutor
await tutorsAPI.createTutor(tutorData);

// Update tutor
await tutorsAPI.updateTutor(tutorId, tutorData);

// Delete tutor
await tutorsAPI.deleteTutor(tutorId);

// Toggle tutor status
await tutorsAPI.toggleTutorStatus(tutorId);

// Assign student to tutor
await tutorsAPI.assignStudentToTutor(tutorId, 1);
```

### TutorsTable Component Updates

The `TutorsTable.jsx` component has been updated to:

1. **Fetch real data** from the API instead of using dummy data
2. **Handle loading and error states**
3. **Integrate CRUD operations** with the modal components
4. **Support tutor status toggling** (activate/deactivate)
5. **Filter by role, status, gender, and reviews**

### Key Features:

- **Real-time data fetching** from MongoDB
- **Advanced search and filter functionality**
- **CRUD operations** through modal dialogs
- **Tutor status management** (active/inactive)
- **Student assignment tracking**
- **Review/rating system**
- **Error handling** with user-friendly messages
- **Loading states** during API calls

### Filtering Options:

- **Role**: All, Teacher, Qari, Hafiz, Imam
- **Status**: All, Active, Inactive
- **Gender**: All, Male, Female
- **Reviews**: All, 5⭐, 4+⭐, 3-⭐

### Modal Components:

1. **ViewTutorModal**: Display complete tutor information
2. **EditTutorModal**: Update tutor details including:
   - Personal information (username, email, phone)
   - Professional details (role, experience, bio)
   - Teaching preferences
3. **DeleteTutorModal**: Confirm and delete tutor

### Usage Instructions

1. **Start the backend server**: `npm start` in the backend folder
2. **Start the frontend server**: `npm run dev` in the frontend folder
3. **Login** to get a valid JWT token
4. **Navigate** to the Tutors Management page in the dashboard
5. **Perform operations** like view, edit, delete, and toggle tutor status

The integration provides a comprehensive tutor management system with specialized features for educational institutions and Quran teaching academies.
