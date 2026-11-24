# EduTrack Pro &mdash; Full-Stack Student Management System

[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.19-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![GitHub Pages](https://img.shields.io/badge/Hosted_on-GitHub_Pages-222222?style=for-the-badge&logo=githubpages&logoColor=white)](https://pages.github.com/)

A comprehensive, end-to-end **Full-Stack Student Management System** integrating a **React.js** frontend with a **Node.js & Express.js** REST API and a **MySQL** relational database.

Developed by **U B Aiswarya** for **Module 04 (Week 4 Final Capstone)** of the Internship Program.

---

## 🌟 Deliverable Links
- **GitHub Repository:** [https://github.com/aiswaryabala17/fullstack-student-management](https://github.com/aiswaryabala17/fullstack-student-management)
- **Live Website:** [https://aiswaryabala17.github.io/fullstack-student-management/](https://aiswaryabala17.github.io/fullstack-student-management/)

---

## 🎯 Key Objectives Achieved

| Objective | Implementation Details |
| :--- | :--- |
| **1. Complete Full-Stack Stack** | Built with React.js (Frontend), Node.js & Express.js (Backend), and MySQL (Database). |
| **2. Full System Integration** | Unified client-server architecture with API service layer connecting UI actions directly to database queries. |
| **3. CRUD Operations & Search** | Register, Retrieve (with multi-field search and department filtering), Update, and Delete student records. |
| **4. Database Schema & Pooling** | Production MySQL schema with connection pooling, indexes, and normalized tables. |
| **5. 100% Free Live Website** | Hosted directly on **GitHub Pages** (zero cost, zero billing) with auto-detecting backend connectivity and demo persistence. |
| **6. Testing & Documentation** | Health verification endpoint `/api/health`, Postman collection, and comprehensive setup documentation. |

---

## 🏗️ System Architecture

```text
┌─────────────────────────────────┐
│     React 18 User Interface     │  ◄── (Client UI: Form, Table, Grid, Modals)
└────────────────┬────────────────┘
                 │ HTTP / REST API (JSON)
┌────────────────▼────────────────┐
│   Node.js / Express.js Server   │  ◄── (Routing, Controllers, Validation)
└────────────────┬────────────────┘
                 │ Connection Pool (mysql2)
┌────────────────▼────────────────┐
│     MySQL Relational Database   │  ◄── (student_management_db / students table)
└─────────────────────────────────┘
```

---

## 📂 Project Structure

```text
fullstack-student-management/
├── index.html                   # Free zero-setup root app for GitHub Pages
├── package.json                 # Monorepo scripts
├── README.md                    # System documentation
├── push_to_github.sh            # Git push helper script
├── .gitignore                   # Ignore configuration
├── client/                      # React Frontend Application
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── src/
│       ├── App.jsx              # Main UI coordinator
│       ├── services/api.js      # Backend API communication service
│       ├── components/          # Modular React components
│       └── styles/              # CSS design system & themes
└── server/                      # Node.js & Express Backend
    ├── server.js                # Server entry point
    ├── package.json
    ├── .env.example
    ├── config/db.js             # MySQL pool configuration
    ├── controllers/             # Business logic & responses
    ├── models/                  # SQL queries (CRUD)
    ├── routes/                  # Express REST routes
    ├── middleware/              # Input validation & error handling
    └── sql/schema.sql           # Database schema & sample seed data
```

---

## 🚀 Running the Project Locally

### 1. Setup Backend & Database
```bash
# 1. Navigate to server
cd server

# 2. Install dependencies
npm install

# 3. Import MySQL schema
mysql -u root -p < sql/schema.sql

# 4. Configure .env file
cp .env.example .env

# 5. Start Express server
npm start
# Server runs on http://localhost:5000
```

### 2. Run React Frontend
```bash
# In a new terminal tab:
cd client
npm install
npm run dev
# Client runs on http://localhost:3000
```

---

## 🌐 100% Free Live Website Deployment (GitHub Pages)

To publish the **Live Website** deliverable for free:
1. Open your repository on GitHub: `https://github.com/aiswaryabala17/fullstack-student-management`.
2. Click **Settings** &rarr; **Pages**.
3. Under **Build and deployment > Branch**, select `main` and `/ (root)`.
4. Click **Save**.
5. Within 1 minute, the live site is available at:
   `https://aiswaryabala17.github.io/fullstack-student-management/`

---

## 👤 Author

- **Developer:** U B Aiswarya
- **GitHub:** [@aiswaryabala17](https://github.com/aiswaryabala17)
- **Role:** Aspiring Full-Stack .NET Developer & Software Engineer
- **Degree:** B.Tech (2023 - 2027)

---
*Developed for Module 04 (Week 4 Final Capstone) of the Internship Program.*
