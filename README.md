# ProTasker

ProTasker is a **task & project management backend API** built with **Node.js** and **Express.js**.  
It provides endpoints for managing **users, projects, tasks, authentication, and collaboration** with a clean and modular architecture.  

The project follows industry best practices with **ESLint + Prettier**, structured validation, and reusable middlewares.

---

## 🚀 Features

- 🔐 **Authentication & Authorization** (JWT-based)
- 📂 **Projects & Tasks Management** (CRUD operations)
- 👥 **User Management**
- ✅ **Input Validation** with custom validators
- ⚡ **Express Middleware** for error handling & security
- 🛠️ **Config-driven setup** (easier environment management)
- ✨ **Code quality** with ESLint & Prettier

---

## 📂 Project Structure

src/
 ├── config/          # Configuration files (env, db, etc.)
 ├── middlewares/     # Custom middlewares (auth, error handling, etc.)
 ├── models/          # Database models (Mongoose/Sequelize/Prisma - depending on setup)
 ├── routes/          # Routes + Controllers for each module
 ├── validators/      # Request validation schemas
 ├── app.js           # Express app setup
 └── server.js        # Server bootstrap
.eslintrc.js          # ESLint configuration
.prettierrc           # Prettier configuration
package.json

## 🛠️ Tech Stack

Language: JavaScript (Node.js)
Framework: Express.js
Validation: Custom validators (e.g., Joi / express-validator - depending on implementation)
Code Quality: ESLint + Prettier
Package Manager: npm

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Schandroid243/ProTasker.git
   cd ProTasker
   git checkout dev
2. **Install dependencies**
   ```bash
   npm install
3. **Setup environment variables**
   Create a .env file in the root directory:
   PORT=5000
   NODE_ENV=development
   DATABASE_URL=your_database_url_here
   JWT_SECRET=your_secret_key_here

## ▶️ Running the App

1. **Development**
   ```bash
   npm run dev
2. **Production**
   ```bash
   npm start

## 🧪 Linting & Formatting

1. **Check linting errors**
   ```bash
   npm run lint
2. **Fix formatting**
   ```bash
   npm run format

## 📌 Roadmap

 - Project Management API
 - Unit & Integration Tests
 - CI/CD pipeline
