# 💼 MERN Job Portal System

A full-stack Job Portal System built using the MERN stack (MongoDB, Express.js, React, Node.js) that connects Job Seekers and Recruiters under Admin supervision. The platform supports job posting, searching, applying, application tracking, recruiter approval, and full admin control.

---

## 📑 Table of Contents

- [Tech Stack](#tech-stack)
- [User Roles](#user-roles)
- [Project Structure](#project-structure)
- [Backend – Detailed File Breakdown](#backend--detailed-file-breakdown)
- [Frontend – Detailed File Breakdown](#frontend--detailed-file-breakdown)
- [Database Schema Design](#database-schema-design)
- [API Endpoints Reference](#api-endpoints-reference)
- [Authentication & Authorization](#authentication--authorization)
- [Environment Variables](#environment-variables)
- [Installation & Setup](#installation--setup)
- [Deployment](#deployment)
- [Key Features Summary](#key-features-summary)

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js, React Router DOM, Axios, Tailwind CSS |
| State Management | React Context API |
| Backend | Node.js, Express.js |
| Database | MongoDB with Mongoose ODM |
| Authentication | JSON Web Tokens (JWT), bcryptjs |
| Deployment | Vercel (Frontend), Render (Backend), MongoDB Atlas (DB) |

---

## 👥 User Roles

| Role | Description |
|---|---|
| Job Seeker | Browses jobs, applies, and tracks application status |
| Recruiter | Posts jobs, views applicants, and manages applications. Requires Admin approval before posting |
| Admin | Manages all users, recruiters, and job listings |

---

## 📁 Project Structure

```
mern-job-portal/
│
├── backend/                        # Node.js + Express REST API
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── jobController.js
│   │   ├── applicationController.js
│   │   ├── userController.js
│   │   └── notificationController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── roleMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Job.js
│   │   ├── Application.js
│   │   └── Notification.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── jobRoutes.js
│   │   ├── applicationRoutes.js
│   │   ├── userRoutes.js
│   │   └── notificationRoutes.js
│   ├── utils/
│   │   ├── generateToken.js
│   │   └── sendNotification.js
│   ├── .env
│   ├── server.js
│   └── package.json
│
├── frontend/                       # React.js Application
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── api/
│   │   │   ├── axiosInstance.js
│   │   │   ├── authAPI.js
│   │   │   ├── jobAPI.js
│   │   │   ├── applicationAPI.js
│   │   │   ├── userAPI.js
│   │   │   └── notificationAPI.js
│   │   ├── context/
│   │   │   ├── AuthContext.js
│   │   │   └── NotificationContext.js
│   │   ├── components/
│   │   │   ├── common/
│   │   │   │   ├── Navbar.jsx
│   │   │   │   ├── Footer.jsx
│   │   │   │   ├── Loader.jsx
│   │   │   │   ├── ProtectedRoute.jsx
│   │   │   │   └── NotificationBell.jsx
│   │   │   ├── jobseeker/
│   │   │   │   ├── JobCard.jsx
│   │   │   │   ├── JobFilters.jsx
│   │   │   │   └── ApplicationStatusBadge.jsx
│   │   │   ├── recruiter/
│   │   │   │   ├── JobForm.jsx
│   │   │   │   └── ApplicantRow.jsx
│   │   │   └── admin/
│   │   │       ├── UserTable.jsx
│   │   │       └── RecruiterApprovalCard.jsx
│   │   ├── pages/
│   │   │   ├── public/
│   │   │   │   ├── HomePage.jsx
│   │   │   │   ├── LoginPage.jsx
│   │   │   │   └── SignupPage.jsx
│   │   │   ├── jobseeker/
│   │   │   │   ├── JobSeekerDashboard.jsx
│   │   │   │   ├── JobDetailsPage.jsx
│   │   │   │   ├── AppliedJobsPage.jsx
│   │   │   │   └── JobSeekerProfile.jsx
│   │   │   ├── recruiter/
│   │   │   │   ├── RecruiterDashboard.jsx
│   │   │   │   ├── PostJobPage.jsx
│   │   │   │   ├── ManageJobsPage.jsx
│   │   │   │   └── ApplicantsListPage.jsx
│   │   │   └── admin/
│   │   │       ├── AdminDashboard.jsx
│   │   │       ├── ManageUsersPage.jsx
│   │   │       ├── ManageRecruitersPage.jsx
│   │   │       └── AdminManageJobsPage.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── vite.config.js
│   └── package.json
│
└── README.md
```

---

## 🔧 Backend – Detailed File Breakdown

### `backend/server.js`
The main entry point of the backend application. It initializes the Express app, connects to the MongoDB database by calling the `db.js` config, registers all route groups under their respective prefixes (`/api/auth`, `/api/jobs`, `/api/apply`, `/api/users`, `/api/notifications`), applies global middleware such as `express.json()` for parsing JSON request bodies and `cors()` for enabling cross-origin requests from the frontend. Also starts the HTTP server on the configured port.

---

### `backend/config/db.js`
Handles the MongoDB connection using Mongoose. Reads the `MONGO_URI` value from the environment variables and calls `mongoose.connect()`. Logs a success message when the connection is established or exits the process if the connection fails. This file is called once during server startup in `server.js`.

---

### `backend/models/User.js`
Defines the Mongoose schema for all users in the system. Contains the following fields:
- `name` – Full name of the user
- `email` – Unique email used for login
- `password` – Hashed password stored using bcryptjs
- `role` – Enum field with values: `jobseeker`, `recruiter`, `admin`
- `isApproved` – Boolean flag applicable only to recruiters; set to `false` by default and toggled to `true` by the admin before the recruiter can post jobs
- `createdAt` – Auto-generated timestamp

Includes a pre-save hook that hashes the password before storing it whenever the password field is modified.

---

### `backend/models/Job.js`
Defines the Mongoose schema for job listings. Contains the following fields:
- `title` – Job title
- `company` – Company name
- `location` – Job location
- `salary` – Offered salary
- `description` – Full job description
- `recruiterId` – Reference (ObjectId) to the User who posted the job
- `isActive` – Boolean to soft-control job visibility
- `createdAt` – Auto-generated timestamp

---

### `backend/models/Application.js`
Defines the Mongoose schema for job applications submitted by job seekers. Contains the following fields:
- `userId` – Reference (ObjectId) to the job seeker who applied
- `jobId` – Reference (ObjectId) to the job applied for
- `status` – Enum field with values: `pending`, `accepted`, `rejected`; defaults to `pending`
- `appliedAt` – Timestamp when the application was submitted

Includes a unique compound index on `userId` and `jobId` to prevent duplicate applications to the same job.

---

### `backend/models/Notification.js`
Defines the Mongoose schema for in-app notifications. Contains the following fields:
- `userId` – Reference (ObjectId) to the user who should receive the notification
- `message` – Notification text describing the event
- `isRead` – Boolean flag; defaults to `false`
- `createdAt` – Timestamp of the notification

---

### `backend/controllers/authController.js`
Contains all logic for user authentication:

- `registerUser` – Accepts name, email, password, and role. Checks if the email is already registered. Creates a new user in the database. If the role is `recruiter`, sets `isApproved` to `false`. Returns a success message.
- `loginUser` – Accepts email and password. Finds the user by email. Compares the provided password with the hashed password using bcryptjs. If valid, generates a JWT token using `generateToken.js` and returns it along with the user's role and name.

---

### `backend/controllers/jobController.js`
Contains all logic for job management:

- `getAllJobs` – Fetches all active jobs from the database. Supports optional query parameters for filtering by `title`, `location`, and `salary` range using Mongoose query conditions. Accessible by any logged-in user.
- `getJobById` – Fetches the full details of a single job by its MongoDB `_id`. Returns 404 if not found.
- `createJob` – Creates a new job listing. Only accessible to approved recruiters. Associates the job with the logged-in recruiter's `userId`.
- `updateJob` – Updates the fields of an existing job. Checks that the requesting recruiter owns the job before allowing edits.
- `deleteJob` – Deletes a job listing. Recruiters can only delete their own jobs. Admins can delete any job.

---

### `backend/controllers/applicationController.js`
Contains all logic for job applications:

- `applyForJob` – Allows a job seeker to apply for a job. Checks for duplicate applications. Creates a new Application document with `status: pending`. Triggers a notification to the recruiter who posted the job.
- `getUserApplications` – Returns all applications submitted by the logged-in job seeker, populated with job details.
- `getJobApplicants` – Returns all applications for a specific job. Only accessible by the recruiter who owns the job.
- `updateApplicationStatus` – Allows a recruiter to change the status of an application to `accepted` or `rejected`. Triggers a notification to the job seeker informing them of the status change.

---

### `backend/controllers/userController.js`
Contains admin-level logic for managing users:

- `getAllUsers` – Returns a list of all registered users. Accessible by admin only.
- `deleteUser` – Deletes a user by their ID. Accessible by admin only.
- `getAllRecruiters` – Returns a list of all users with `role: recruiter`.
- `approveRecruiter` – Sets the `isApproved` field of a recruiter to `true`, enabling them to post jobs.
- `removeRecruiter` – Sets `isApproved` to `false` or deletes the recruiter entirely.

---

### `backend/controllers/notificationController.js`
Contains logic for the notification system:

- `getUserNotifications` – Returns all notifications for the logged-in user, sorted by newest first.
- `markAsRead` – Marks a specific notification as read by setting `isRead` to `true`.
- `markAllAsRead` – Marks all unread notifications for the logged-in user as read.

---

### `backend/middleware/authMiddleware.js`
A middleware function that runs before protected route handlers. It reads the `Authorization` header from the incoming request, extracts the JWT token from the `Bearer <token>` format, verifies the token using `jsonwebtoken` and the `JWT_SECRET` environment variable, and attaches the decoded user payload (`userId`, `role`) to `req.user`. If the token is missing or invalid, it returns a 401 Unauthorized response.

---

### `backend/middleware/roleMiddleware.js`
A middleware factory that accepts one or more role strings (e.g., `"admin"`, `"recruiter"`) and returns a middleware function. The returned middleware checks `req.user.role` against the allowed roles. If the user's role is not permitted, it returns a 403 Forbidden response. Used after `authMiddleware` to enforce role-based access control on sensitive routes. Also checks `isApproved` on recruiter-only routes before allowing access.

---

### `backend/routes/authRoutes.js`
Registers the authentication endpoints:
- `POST /api/auth/register` → `authController.registerUser`
- `POST /api/auth/login` → `authController.loginUser`

No authentication middleware applied to these routes since they are public.

---

### `backend/routes/jobRoutes.js`
Registers the job management endpoints and applies appropriate middleware:
- `GET /api/jobs` → Public or auth-required; calls `jobController.getAllJobs`
- `GET /api/jobs/:id` → Calls `jobController.getJobById`
- `POST /api/jobs` → Requires auth + recruiter role + `isApproved` check; calls `jobController.createJob`
- `PUT /api/jobs/:id` → Requires auth + recruiter role; calls `jobController.updateJob`
- `DELETE /api/jobs/:id` → Requires auth + recruiter or admin role; calls `jobController.deleteJob`

---

### `backend/routes/applicationRoutes.js`
Registers the application endpoints:
- `POST /api/apply` → Requires auth + jobseeker role; calls `applicationController.applyForJob`
- `GET /api/applications/user` → Requires auth + jobseeker role; calls `applicationController.getUserApplications`
- `GET /api/applications/job/:id` → Requires auth + recruiter role; calls `applicationController.getJobApplicants`
- `PUT /api/applications/:id` → Requires auth + recruiter role; calls `applicationController.updateApplicationStatus`

---

### `backend/routes/userRoutes.js`
Registers the admin user management endpoints:
- `GET /api/users` → Requires auth + admin role; calls `userController.getAllUsers`
- `DELETE /api/users/:id` → Requires auth + admin role; calls `userController.deleteUser`
- `GET /api/users/recruiters` → Requires auth + admin role; calls `userController.getAllRecruiters`
- `PUT /api/users/recruiters/:id/approve` → Requires auth + admin role; calls `userController.approveRecruiter`
- `DELETE /api/users/recruiters/:id` → Requires auth + admin role; calls `userController.removeRecruiter`

---

### `backend/routes/notificationRoutes.js`
Registers the notification endpoints:
- `GET /api/notifications` → Requires auth; calls `notificationController.getUserNotifications`
- `PUT /api/notifications/:id/read` → Requires auth; calls `notificationController.markAsRead`
- `PUT /api/notifications/read-all` → Requires auth; calls `notificationController.markAllAsRead`

---

### `backend/utils/generateToken.js`
A utility function that accepts a user's `_id` and `role`, then uses `jsonwebtoken.sign()` to create and return a signed JWT token. The token is signed with the `JWT_SECRET` environment variable and set to expire based on `JWT_EXPIRES_IN` (e.g., `7d`).

---

### `backend/utils/sendNotification.js`
A reusable utility function that creates a Notification document in the database. Accepts `userId` and `message` as parameters. Called from `applicationController.js` whenever an application is submitted or its status changes.

---

## 🖥 Frontend – Detailed File Breakdown

### `frontend/src/main.jsx`
The root entry point of the React application. Renders the `App` component into the `#root` DOM element. Wraps the application with all top-level context providers: `AuthContextProvider` and `NotificationContextProvider`.

---

### `frontend/src/App.jsx`
Defines the complete client-side routing structure using React Router DOM. Maps URL paths to their corresponding page components. Groups routes into public routes (accessible without login), and protected routes (wrapped with `ProtectedRoute` component) for each role — job seeker, recruiter, and admin. Handles 404 with a fallback route.

---

### `frontend/src/index.css`
Global stylesheet that imports Tailwind CSS base, components, and utilities using the `@tailwind` directives. May include any custom global overrides or Tailwind typography plugin configuration.

---

### `frontend/tailwind.config.js`
Configures Tailwind CSS for the project. Defines the `content` array pointing to all `.jsx` and `.js` files so Tailwind can purge unused styles in production. May extend the default theme with custom colors, fonts, or spacing values relevant to the portal's branding.

---

### `frontend/vite.config.js`
Vite build tool configuration. Sets up the React plugin for JSX transformation and configures the dev server proxy so that API calls to `/api` during development are forwarded to the backend server (e.g., `http://localhost:5000`), avoiding CORS issues in development.

---

### `frontend/src/api/axiosInstance.js`
Creates and exports a pre-configured Axios instance with the backend's base URL set from the environment variable `VITE_API_BASE_URL`. Attaches a request interceptor that reads the JWT token from `localStorage` and injects it into the `Authorization: Bearer <token>` header of every outgoing request automatically, so individual API call files do not need to handle headers manually.

---

### `frontend/src/api/authAPI.js`
Contains functions that call the authentication endpoints using the `axiosInstance`:
- `registerUser(data)` – Calls `POST /api/auth/register`
- `loginUser(data)` – Calls `POST /api/auth/login` and returns the token and user info

---

### `frontend/src/api/jobAPI.js`
Contains functions for all job-related API calls:
- `fetchAllJobs(filters)` – Calls `GET /api/jobs` with optional query params for filtering
- `fetchJobById(id)` – Calls `GET /api/jobs/:id`
- `createJob(data)` – Calls `POST /api/jobs`
- `updateJob(id, data)` – Calls `PUT /api/jobs/:id`
- `deleteJob(id)` – Calls `DELETE /api/jobs/:id`

---

### `frontend/src/api/applicationAPI.js`
Contains functions for application-related API calls:
- `applyForJob(jobId)` – Calls `POST /api/apply`
- `getUserApplications()` – Calls `GET /api/applications/user`
- `getJobApplicants(jobId)` – Calls `GET /api/applications/job/:id`
- `updateApplicationStatus(applicationId, status)` – Calls `PUT /api/applications/:id`

---

### `frontend/src/api/userAPI.js`
Contains functions for admin user management API calls:
- `getAllUsers()` – Calls `GET /api/users`
- `deleteUser(id)` – Calls `DELETE /api/users/:id`
- `getAllRecruiters()` – Calls `GET /api/users/recruiters`
- `approveRecruiter(id)` – Calls `PUT /api/users/recruiters/:id/approve`
- `removeRecruiter(id)` – Calls `DELETE /api/users/recruiters/:id`

---

### `frontend/src/api/notificationAPI.js`
Contains functions for notification API calls:
- `getNotifications()` – Calls `GET /api/notifications`
- `markNotificationRead(id)` – Calls `PUT /api/notifications/:id/read`
- `markAllNotificationsRead()` – Calls `PUT /api/notifications/read-all`

---

### `frontend/src/context/AuthContext.js`
Creates and provides the global authentication state using React Context API. Stores the following state:
- `user` – Object containing the logged-in user's name, role, and userId (decoded from JWT or stored in state)
- `token` – JWT string stored in both state and `localStorage`
- `isAuthenticated` – Boolean derived from whether a valid token exists

Exposes the following functions via context:
- `login(userData, token)` – Saves the token to `localStorage` and updates user state
- `logout()` – Clears the token from `localStorage` and resets state

This context is consumed by `ProtectedRoute`, `Navbar`, and any page that needs to know the current user's role.

---

### `frontend/src/context/NotificationContext.js`
Creates and provides global notification state. Stores:
- `notifications` – Array of notification objects fetched from the API
- `unreadCount` – Integer count of unread notifications

Exposes functions to fetch notifications and mark them as read. Periodically polls the notification API (e.g., every 30 seconds) or refreshes on specific events to keep the notification bell count up to date.

---

### `frontend/src/components/common/Navbar.jsx`
The top navigation bar rendered on all pages. Reads the `user` and `logout` from `AuthContext` to conditionally render links based on the user's role. Shows navigation links to the appropriate dashboard, profile, and other role-specific pages. Renders the `NotificationBell` component for logged-in users. Contains the logout button that calls the `logout()` context function.

---

### `frontend/src/components/common/Footer.jsx`
A simple footer component rendered at the bottom of all pages. Contains copyright information and optionally some static links.

---

### `frontend/src/components/common/Loader.jsx`
A reusable loading spinner component styled with Tailwind CSS. Displayed while API calls are in progress on any page to give the user visual feedback.

---

### `frontend/src/components/common/ProtectedRoute.jsx`
A wrapper component that accepts an `allowedRoles` prop (array of role strings). Reads the authentication state from `AuthContext`. If the user is not authenticated, redirects to the Login page. If the user is authenticated but their role is not in `allowedRoles`, redirects to a 403 or home page. If authorized, renders the child route component. Used in `App.jsx` to wrap all private routes.

---

### `frontend/src/components/common/NotificationBell.jsx`
Renders a bell icon in the Navbar. Reads `unreadCount` from `NotificationContext` and shows a red badge with the count if there are unread notifications. On click, opens a dropdown listing recent notifications with their read/unread status and allows marking them as read.

---

### `frontend/src/components/jobseeker/JobCard.jsx`
A reusable card component that displays a summary of a single job listing, including the title, company, location, and salary. Contains an "Apply" button and a "View Details" link. Accepts a `job` object as a prop and an `onApply` callback function.

---

### `frontend/src/components/jobseeker/JobFilters.jsx`
A sidebar or top filter panel containing input fields for filtering the job list by title (text search), location (text or dropdown), and salary range (min/max inputs). Calls a parent-provided `onFilterChange` callback whenever any filter changes, which triggers a new API call or filters the local job list.

---

### `frontend/src/components/jobseeker/ApplicationStatusBadge.jsx`
A small styled badge component that renders the application status (`Pending`, `Accepted`, `Rejected`) with corresponding color styling using Tailwind CSS classes (e.g., yellow for pending, green for accepted, red for rejected).

---

### `frontend/src/components/recruiter/JobForm.jsx`
A reusable controlled form component used on both the Post Job page and the Edit Job page. Contains input fields for title, company, location, salary, and description. Accepts initial values as props (empty for creation, pre-filled for editing) and an `onSubmit` callback. Performs basic client-side validation before calling the callback.

---

### `frontend/src/components/recruiter/ApplicantRow.jsx`
A table row component used in the Applicants List page. Displays a single applicant's name, email, and current application status. Contains a dropdown or buttons that allow the recruiter to change the status to `accepted` or `rejected`, calling the provided `onStatusChange` callback.

---

### `frontend/src/components/admin/UserTable.jsx`
A reusable table component for displaying a list of users. Accepts an array of user objects and renders each as a table row showing name, email, and role. Includes a delete button on each row that triggers a confirmation and then calls the provided `onDelete` callback.

---

### `frontend/src/components/admin/RecruiterApprovalCard.jsx`
A card component used on the Admin Manage Recruiters page. Displays a recruiter's name, email, and current approval status. Provides "Approve" and "Remove" action buttons that call the corresponding API functions.

---

### `frontend/src/pages/public/HomePage.jsx`
The landing page shown to unauthenticated visitors. Contains a hero section with a tagline and call-to-action buttons for Login and Signup. May display a brief description of the portal's features to attract new users.

---

### `frontend/src/pages/public/LoginPage.jsx`
Contains a login form with email and password fields. On submission, calls `loginUser()` from `authAPI.js`, stores the returned token and user info using `AuthContext.login()`, and redirects the user to the appropriate dashboard based on their role. Shows validation errors if the credentials are incorrect.

---

### `frontend/src/pages/public/SignupPage.jsx`
Contains a registration form with fields for name, email, password, and a role selector (Job Seeker or Recruiter). On submission, calls `registerUser()` from `authAPI.js`. After successful registration, redirects to the login page with a success message. If the role is Recruiter, informs the user that admin approval is required before they can post jobs.

---

### `frontend/src/pages/jobseeker/JobSeekerDashboard.jsx`
The main dashboard for job seekers. On mount, fetches all available jobs using `fetchAllJobs()`. Renders the `JobFilters` component and passes filter state as query parameters to the API. Renders a grid of `JobCard` components. Handles the apply action by calling `applyForJob()` and showing success or error feedback.

---

### `frontend/src/pages/jobseeker/JobDetailsPage.jsx`
Displays the full details of a single job. Reads the job ID from the URL params and fetches the job using `fetchJobById()`. Shows the title, company, location, salary, and full description. Contains an "Apply Now" button. If the job seeker has already applied, the button is disabled and shows "Already Applied."

---

### `frontend/src/pages/jobseeker/AppliedJobsPage.jsx`
Displays a list of all jobs the logged-in job seeker has applied for. Fetches data using `getUserApplications()`. For each application, shows the job title, company, application date, and the `ApplicationStatusBadge` component to display the current status.

---

### `frontend/src/pages/jobseeker/JobSeekerProfile.jsx`
Displays the logged-in job seeker's profile information including name and email. Provides a form to update the name, email, and password. On form submission, calls the appropriate user update API endpoint.

---

### `frontend/src/pages/recruiter/RecruiterDashboard.jsx`
The main dashboard for recruiters. If the recruiter's `isApproved` status is `false`, displays a pending approval notice instead of the dashboard content. If approved, fetches and displays summary statistics: total jobs posted and total applicants across all jobs. Provides quick navigation links to Post Job and Manage Jobs pages.

---

### `frontend/src/pages/recruiter/PostJobPage.jsx`
Renders the `JobForm` component with empty initial values. On form submission, calls `createJob()` from `jobAPI.js` and redirects to the Manage Jobs page on success. Displays error messages if the API call fails (e.g., if the recruiter is not approved).

---

### `frontend/src/pages/recruiter/ManageJobsPage.jsx`
Fetches and lists all jobs posted by the logged-in recruiter. Displays job title, location, and creation date for each listing. Provides an "Edit" button that navigates to the Post Job page with the job's existing data pre-filled in the `JobForm`. Provides a "Delete" button that calls `deleteJob()` after a confirmation prompt.

---

### `frontend/src/pages/recruiter/ApplicantsListPage.jsx`
Reads the job ID from the URL params and fetches all applicants for that job using `getJobApplicants()`. Renders a table of `ApplicantRow` components. Handles status change by calling `updateApplicationStatus()`, which also triggers a notification to the job seeker.

---

### `frontend/src/pages/admin/AdminDashboard.jsx`
The main admin overview page. Fetches and displays platform-wide statistics: total users, total recruiters, and total job listings. Provides navigation cards or sidebar links to all admin management pages.

---

### `frontend/src/pages/admin/ManageUsersPage.jsx`
Fetches all users using `getAllUsers()` and renders them in the `UserTable` component. Allows the admin to delete any user by calling `deleteUser()`. Displays a confirmation dialog before deletion.

---

### `frontend/src/pages/admin/ManageRecruitersPage.jsx`
Fetches all recruiter accounts using `getAllRecruiters()`. Renders a list of `RecruiterApprovalCard` components. Allows the admin to approve a pending recruiter by calling `approveRecruiter()` or remove an existing recruiter by calling `removeRecruiter()`.

---

### `frontend/src/pages/admin/AdminManageJobsPage.jsx`
Fetches all job listings across all recruiters. Renders them in a table showing title, company, recruiter name, and creation date. Allows the admin to delete any inappropriate or spam job by calling `deleteJob()`.

---

## 🗄 Database Schema Design

### User Schema
| Field | Type | Description |
|---|---|---|
| `name` | String | Full name of the user |
| `email` | String | Unique email address |
| `password` | String | Hashed using bcryptjs |
| `role` | Enum | `jobseeker`, `recruiter`, `admin` |
| `isApproved` | Boolean | Only relevant for recruiters; defaults to `false` |
| `createdAt` | Date | Auto-generated on creation |

### Job Schema
| Field | Type | Description |
|---|---|---|
| `title` | String | Job title |
| `company` | String | Company name |
| `location` | String | Job location |
| `salary` | String/Number | Offered salary |
| `description` | String | Full job description |
| `recruiterId` | ObjectId | Reference to User (role: recruiter) |
| `isActive` | Boolean | Controls visibility; defaults to `true` |
| `createdAt` | Date | Auto-generated on creation |

### Application Schema
| Field | Type | Description |
|---|---|---|
| `userId` | ObjectId | Reference to User (role: jobseeker) |
| `jobId` | ObjectId | Reference to Job |
| `status` | Enum | `pending`, `accepted`, `rejected`; defaults to `pending` |
| `appliedAt` | Date | Auto-generated timestamp |

Compound unique index on `{ userId, jobId }` to prevent duplicate applications.

### Notification Schema
| Field | Type | Description |
|---|---|---|
| `userId` | ObjectId | Reference to the recipient User |
| `message` | String | Notification text |
| `isRead` | Boolean | Defaults to `false` |
| `createdAt` | Date | Auto-generated timestamp |

---

## 🔌 API Endpoints Reference

### Auth
| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/auth/register` | Public | Register a new user |
| POST | `/api/auth/login` | Public | Login and receive JWT token |

### Jobs
| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/jobs` | Public/Auth | Get all jobs with optional filters |
| GET | `/api/jobs/:id` | Public/Auth | Get a single job's full details |
| POST | `/api/jobs` | Recruiter (Approved) | Create a new job listing |
| PUT | `/api/jobs/:id` | Recruiter (Owner) | Update an existing job |
| DELETE | `/api/jobs/:id` | Recruiter (Owner) / Admin | Delete a job listing |

### Applications
| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/apply` | Job Seeker | Apply for a job |
| GET | `/api/applications/user` | Job Seeker | Get own applications |
| GET | `/api/applications/job/:id` | Recruiter | Get all applicants for a job |
| PUT | `/api/applications/:id` | Recruiter | Update application status |

### Users (Admin)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/users` | Admin | Get all users |
| DELETE | `/api/users/:id` | Admin | Delete a user |
| GET | `/api/users/recruiters` | Admin | Get all recruiters |
| PUT | `/api/users/recruiters/:id/approve` | Admin | Approve a recruiter |
| DELETE | `/api/users/recruiters/:id` | Admin | Remove a recruiter |

### Notifications
| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/notifications` | Auth | Get all notifications for logged-in user |
| PUT | `/api/notifications/:id/read` | Auth | Mark a notification as read |
| PUT | `/api/notifications/read-all` | Auth | Mark all notifications as read |

---

## 🔐 Authentication & Authorization

The system uses JWT (JSON Web Token) based authentication.

**Flow:**
1. User logs in via `POST /api/auth/login`
2. Backend verifies credentials and returns a signed JWT token
3. Frontend stores the token in `localStorage` and attaches it to every subsequent API request via Axios request interceptor
4. Backend `authMiddleware.js` verifies the token on every protected route
5. `roleMiddleware.js` further checks if the user's role is permitted for that specific route
6. For recruiter routes, an additional `isApproved` check ensures only admin-approved recruiters can post jobs

**Frontend Route Protection:**
- The `ProtectedRoute.jsx` component wraps all private pages
- It reads authentication state from `AuthContext`
- Unauthenticated users are redirected to `/login`
- Users accessing a route outside their role are redirected away

---

## 🌐 Environment Variables

### Backend (`backend/.env`)
```
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d
```

### Frontend (`frontend/.env`)
```
VITE_API_BASE_URL=http://localhost:5000
```

For production, update `VITE_API_BASE_URL` to the deployed Render backend URL.

---

## ⚙️ Installation & Setup

### Prerequisites
- Node.js v18+
- MongoDB Atlas account (or local MongoDB)
- npm or yarn

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/mern-job-portal.git
cd mern-job-portal
```

### 2. Backend Setup
```bash
cd backend
npm install
# Create your .env file and fill in the required values
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install
# Create your .env file and fill in the required values
npm run dev
```

The backend runs on `http://localhost:5000` and the frontend on `http://localhost:5173` by default.

---

## 🚀 Deployment

| Service | Platform | Notes |
|---|---|---|
| Frontend | Vercel | Connect GitHub repo, set `VITE_API_BASE_URL` to backend URL in environment settings |
| Backend | Render | Set all backend environment variables in Render dashboard |
| Database | MongoDB Atlas | Create a cluster, whitelist Render's IP, use the connection string in `MONGO_URI` |

---

## ✅ Key Features Summary

- JWT-based authentication with role selection at registration
- Role-based access control across all API routes and frontend pages
- Recruiter approval workflow managed by Admin before job posting is enabled
- Full CRUD operations for job listings by recruiters
- Job search and filtering by title, location, and salary
- Application tracking with status updates (Pending / Accepted / Rejected)
- In-app notification system triggered by application events
- Admin control panel for user, recruiter, and job management
- Protected frontend routes using React Context API
- Responsive UI built with Tailwind CSS
- Deployed on Vercel + Render + MongoDB Atlas

---

> **Viva Tip:** "This is a role-based job portal system where job seekers can browse and apply for jobs, recruiters can manage job postings and applications after admin approval, and admins control the entire system. It uses JWT authentication, REST APIs, React Context for state management, and MongoDB for data storage — ensuring secure, scalable, and role-aware client-server interaction."
#   J o b - P o r t a l - S y s t e m  
 #   J o b - P o r t a l - S y s t e m  
 #   J o b - P o r t a l - S y s t e m  
 #   J o b - P o r t a l - S y s t e m  
 #   J o b - P o r t a l - S y s t e m  
 