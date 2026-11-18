# Career Impact: User Management System

## One-Line Project Summary

Built a full-stack MERN application for secure authentication and role-based user administration using React, Express, MongoDB, and JWT.

## CV / Resume Bullets

### Short Version

- Built a user administration platform using **React 19**, **React Router**, **Express 5**, and **MongoDB**, resulting in **10 API route handlers** for authentication and complete user CRUD.
- Secured session restoration and protected operations using **JWT access tokens**, **HttpOnly refresh cookies**, and **bcrypt**, resulting in **server-enforced Admin authorization** across user mutations.
- Designed an account-management interface using **Vite**, **Context API**, and reusable React components, resulting in a successful **4-page frontend build** with paginated user records.

### Detailed Version

- Built a user administration platform using **React 19**, **React Router**, **Axios**, **Express 5**, **Mongoose**, and **MongoDB**, resulting in **10 API route handlers**, **4 application pages**, and complete authentication and user CRUD flows.
- Secured session restoration and protected operations using **JWT access tokens**, **HttpOnly refresh cookies**, and **bcrypt password hashing**, resulting in server-enforced authentication, **2 role-based access levels**, and Admin-only user mutations.
- Automated API request validation using **Express Validator** and middleware, resulting in consistent checks for **registration, login, user creation, updates, and route parameters**.
- Designed reusable React modules with **Context API**, **8 component files**, modals, pagination, loading states, and error handling, resulting in a maintainable five-record-per-page administration interface.
- Documented and exposed the API using **OpenAPI 3.0.3** and **Swagger UI**, resulting in interactive access to all authentication and user-management endpoints and a production-ready API description.

## LinkedIn

### Project Entry

**Title:** Full-Stack User Management System

**Description:** Built a MERN application that handles registration, login, session restoration, protected routes, and role-based account administration. The React interface supports viewing, creating, editing, deleting, and paginating user records, while the Express API enforces JWT authentication and Admin-only mutations. The project contains 10 API route handlers, 8 reusable component files, and interactive Swagger documentation.

**Tech:** React 19, React Router, Context API, Axios, Vite, Node.js, Express 5, MongoDB, Mongoose, JWT, bcrypt, OpenAPI, Swagger UI

**Link:** https://github.com/IFFAT12375/user-management-system

### Experience / About Paragraph

I built a full-stack MERN user management platform to practice secure authentication and role-based authorization. Using React, Context API, and Axios, I created login, registration, protected routes, and paginated account management. I built the Express 5 API with Mongoose, JWT access tokens, HttpOnly refresh cookies, bcrypt password hashing, and server-side Admin checks. I also added request validation and Swagger documentation across 10 API route handlers. The project strengthened my ability to connect frontend state, browser security, API middleware, and MongoDB data modeling.

### LinkedIn Post Draft

I built a MERN user management system to understand authentication and authorization beyond basic login screens.

The problem was that account management needs more than a database table. The application also needs protected routes, session restoration, password hashing, input validation, and server-side role checks.

I created the React interface with protected routes and reusable modals, then connected it to an Express API backed by MongoDB and Mongoose. I used short-lived JWT access tokens for API authorization and an HttpOnly refresh-token cookie for session restoration. bcrypt protects passwords, and Express Validator checks request data before controller logic runs.

One real challenge was keeping the backend role rules and frontend permissions consistent. I solved that by applying server middleware independently of the UI, while the React app also hides Admin-only controls from regular users.

The result is a working application with 10 API route handlers, 4 frontend pages, 8 reusable component files, and Swagger-based API documentation.

Repository: https://github.com/IFFAT12375/user-management-system

#MERN #React #NodeJS #Express #MongoDB #WebDevelopment #FullStack

## Portfolio Case Study

### Title

User Management System: Secure MERN Account Administration

### Tagline

A full-stack account platform for authentication, session recovery, and Admin-controlled user management.

### Overview

This project is a MERN application for registering users, managing authenticated sessions, and administering user records. The React client provides protected views and CRUD modals, while the Express API validates requests and enforces authentication and role restrictions.

The implementation includes 10 API route handlers, 1 Mongoose user model, 2 role values, 4 application pages, 8 reusable component files, and interactive Swagger documentation.

### The Problem

Account screens must prevent unauthorized access while keeping legitimate sessions usable across refreshes. They also need strict server-side validation and role checks, because hiding controls in the interface does not protect the API.

### My Role

I developed this as a solo project, covering frontend development, API design, authentication middleware, MongoDB modeling, validation, documentation, and repository structure.

### Approach and Key Decisions

- **React and Context API:** Used Context API to keep current-user state and session restoration available throughout the protected interface.
- **Axios with in-memory access tokens:** Stored access tokens in memory and used request interception to attach bearer authorization, keeping the token out of local browser storage.
- **HttpOnly refresh cookies:** Issued refresh-token cookies with HttpOnly, SameSite, and production Secure settings to support session recovery without exposing refresh tokens to JavaScript.
- **JWT middleware:** Separated access-token verification from route logic so protected and Admin-only operations share consistent authentication behavior.
- **Mongoose user model:** Centralized name, unique email, password, role, and timestamps in one schema with `User` and `Admin` values.
- **Swagger documentation:** Published an OpenAPI specification beside the running API to make 10 route handlers directly testable.

### Challenges and Solutions

1. **Session restoration after a page refresh:** The client stores the access token in memory, which disappears on reload. I implemented a refresh-cookie flow that requests a new access token and then retrieves the current profile.

2. **Keeping authorization rules trustworthy:** Frontend authorization alone could not prevent direct API calls. I added separate authentication and Admin middleware to protected server routes.

3. **Managing CRUD state and feedback:** Creating, editing, deleting, loading, and paginating records can create conflicting UI states. I separated service calls, modal state, success messages, and five-record pagination in the user management page.

### Results / Impact

- Delivered **10 API route handlers** across authentication and user management.
- Implemented **4 application pages** and **8 reusable component files**.
- Added **2 role values** and Admin-only create, update, and delete operations.
- Published interactive API documentation for the complete route surface.
- Verified a successful Vite production build; the build produced a **105.93 kB gzipped JavaScript bundle**.
- The repository currently has no automated test suite, so test coverage is not claimed.

### What I Learned and What I Would Improve Next

I learned how JWT lifetimes, refresh cookies, middleware, Mongoose models, and React authentication state interact across a full-stack request. I would improve the project by adding automated unit and integration tests, CI checks, and Docker support. I would also add API pagination and more complete account-recovery flows.

### Links

- **Repository:** https://github.com/IFFAT12375/user-management-system
- **Documentation:** [README.md](./README.md)
- **API documentation:** Available at `http://localhost:5000/api-docs` when the backend is running

## Interview Talking Points

### 30-Second Pitch

I built a MERN user management system with React and Express that handles registration, login, session refresh, protected routes, and role-based CRUD. The 10-route API uses MongoDB and Mongoose, bcrypt password hashing, JWT access tokens, and HttpOnly refresh cookies. I also added reusable React components, five-record pagination, request validation, and Swagger documentation.

### Technical Questions

**How does session restoration work?**

The access token is kept in memory rather than browser storage. When the React app loads, `AuthContext` calls the refresh endpoint using the HttpOnly refresh cookie, receives a new access token, and then calls `/api/auth/me` to restore the current user.

**How are Admin operations protected?**

The server applies authentication middleware to protected routes and `authorizeAdmin` middleware to create, update, and delete user routes. The backend checks the role from the authenticated JWT, independently of frontend controls.

**How is password security implemented?**

The password utilities hash passwords with bcrypt/bcryptjs before storage and compare submitted passwords during login. The Mongoose model stores a required, unique email and password, while API responses do not intentionally expose password fields.

### What Would You Do Differently

I would add automated tests and CI before expanding features. I would test authentication, refresh-cookie behavior, validation, role middleware, CRUD operations, and frontend protected routing, then add Docker and Compose configuration for reproducible local setup.

## Tailoring Tips

- **Frontend role:** Emphasize React 19, React Router, Context API, reusable components, protected routing, modal workflows, pagination, and the successful Vite build.
- **Backend role:** Emphasize the 10 Express route handlers, JWT and refresh-cookie flow, bcrypt hashing, Express Validator, Mongoose modeling, middleware, and Swagger/OpenAPI documentation.
- **Full-stack role:** Present the end-to-end session lifecycle and explain how frontend authentication state stays synchronized with server-side authorization and MongoDB operations.
