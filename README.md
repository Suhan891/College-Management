<div align="center">
  <h1>🎓 College & Student Management System</h1>
  <p><strong>A comprehensive full-stack platform designed to streamline college administration, timetable scheduling, and attendance tracking.</strong></p>
  
  <p>
    <a href="https://nodejs.org/"><img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" /></a>
    <a href="https://expressjs.com/"><img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js" /></a>
    <a href="https://nextjs.org/"><img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" /></a>
    <a href="https://react.dev/"><img src="https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 19" /></a>
    <a href="https://www.postgresql.org/"><img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" /></a>
    <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind_CSS_4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" /></a>
  </p>
</div>

---

## 🚀 Overview

The **Student Management System** is a robust, scalable web application designed to digitize and manage the entire lifecycle of college administration. It features powerful role-based access control, dynamic timetable generation, and advanced attendance tracking (including geolocation verification).

---

## 💻 Tech Stack

### ⚙️ Backend (Express.js & Node.js)
- **Core Framework:** Express.js
- **Database:** PostgreSQL (Direct SQL queries using `pg`)
- **Authentication:** JSON Web Tokens (JWT), bcrypt for password hashing
- **Data Validation:** Joi
- **Utilities:** Nodemailer (Email/OTP), Haversine Distance (Geolocation for attendance)

### 🎨 Frontend (Next.js 16)
- **Framework:** Next.js (App Router) & React 19
- **Styling:** Tailwind CSS v4, shadcn/ui, Radix UI primitives
- **State Management:** Zustand (Global State), TanStack React Query v5 (Data Fetching & Caching)
- **Forms & Validation:** React Hook Form + Zod
- **Visuals:** Recharts (Data visualization), Embla Carousel

---

## ✨ Key Features

### 🔐 Role-Based Architecture
- Distinct access levels and dashboards for **Admin**, **College**, **Teacher**, and **Student**.
- Secure authentication with token versioning and password reset capabilities.

### 🏛️ College & Department Management
- Hierarchical structure mapping: **Colleges -> Departments -> Streams -> Courses -> Classes -> Subjects**.
- Store geographical locations of colleges for proximity-based features.

### 📅 Advanced Timetable Management
- Version-controlled timetable system to handle semester-wise schedule changes.
- Conflict-free time slot allocations connecting classes, subjects, and teachers.
- Structured daily and weekly views.

### 📍 Smart Attendance System
- Session-based attendance tracking handled by teachers for specific periods.
- Support for multiple marking sources (Student self-marking, Teacher, Class Teacher).
- Geolocation validation using Haversine distance to ensure students are physically present within the college premises.

---

## 📂 Project Structure

```text
Student Management/
├── backend/                # Node.js + Express API
│   ├── controllers/        # Business logic for routes
│   ├── middleware/         # Auth and Validation middlewares
│   ├── postgresModel/      # Raw SQL schema definitions (DDL)
│   ├── routes/             # Express route definitions
│   ├── db/                 # Database connection config
│   ├── service/            # External services (Email, etc.)
│   └── app.js              # Entry point
└── frontend/               # Next.js Application
    ├── app/                # Next.js App Router (Auth, Dashboard)
    ├── components/         # Reusable UI components (shadcn/ui)
    ├── lib/                # Utility functions
    └── package.json        # Frontend dependencies
```

---

## 🛠️ Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- [PostgreSQL](https://www.postgresql.org/)

### Backend Setup
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure your environment variables. Create a `.env` file:
   ```env
   PORT=8080
   DATABASE_URL="postgresql://user:password@localhost:5432/student_management"
   JWT_SECRET="your_jwt_secret"
   # Add other required variables (e.g., Nodemailer credentials)
   ```
4. Start the backend server:
   ```bash
   npm run start
   # or for development:
   npx nodemon app.js
   ```

### Frontend Setup
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Next.js development server:
   ```bash
   npm run dev
   ```

---

<div align="center">
  <p>Built with ❤️</p>
</div>
