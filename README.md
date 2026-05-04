# 🚀 Templio — Mini SaaS Template Store

A full-stack web application for browsing, discovering, and favoriting professional SaaS templates. Built with the MERN stack.

---

## 👤 Author

**[Your Name]**
- Name: SivanathBabu V G
- GitHub: [github.com/yourusername](https://github.com/Sivavg)

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js (Vite) + TailwindCSS |
| Backend | Node.js + Express.js |
| Database | MongoDB + Mongoose |
| Auth | JWT + Bcrypt |
| HTTP Client | Axios |
| UI | Lucide React, React Hot Toast |

---

## 📁 Project Structure

```
fullstack-intern-task/
├── client/                  # React Frontend (Vite)
│   ├── src/
│   │   ├── api/             # Axios config & API services
│   │   ├── components/      # Navbar, TemplateCard, ProtectedRoute
│   │   ├── context/         # Auth Context
│   │   └── pages/           # Home, Login, Register, Templates, Favorites
│   └── vite.config.js
│
└── server/                  # Node.js Backend
    ├── src/
    │   ├── config/          # MongoDB connection
    │   ├── controllers/     # auth, template, favorite controllers
    │   ├── middleware/      # JWT auth, error handler
    │   ├── models/          # User, Template, Favorite schemas
    │   ├── routes/          # API routes
    │   ├── app.js
    │   ├── index.js
    │   └── seed.js          # DB seeder (10 templates)
    └── .env
```

---

## ⚙️ Setup Instructions

### Prerequisites
- Node.js v18+
- MongoDB running locally (`mongodb://localhost:27017`)
- Git

---

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/fullstack-intern-task.git
cd fullstack-intern-task
```

---

### 2. Backend Setup

```bash
cd server
npm install
```

Create `.env` file in `server/`:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/saas_template_store
JWT_SECRET=supersecretjwtkey_saas2024_gnxtace
JWT_EXPIRES_IN=7d
NODE_ENV=development
```

Start the backend (it will automatically seed templates if the DB is empty):
```bash
npm run dev
```
> Backend runs on **http://localhost:5000**

---

### 3. Frontend Setup

Open a new terminal:
```bash
cd client
npm install
npm run dev
```
> Frontend runs on **http://localhost:5173**

---

## 📡 API Endpoints

### Auth
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/auth/register` | Public | Register new user |
| POST | `/api/auth/login` | Public | Login user |
| GET | `/api/auth/me` | Private | Get current user |

### Templates
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/templates` | Public | List all templates (search, filter, pagination) |
| GET | `/api/templates/:id` | Public | Get template by ID |

### Favorites
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/favorites` | Private | Get user's favorites |
| POST | `/api/favorites/:templateId` | Private | Toggle favorite |
| GET | `/api/favorites/ids` | Private | Get favorited template IDs |
| GET | `/api/favorites/check/:templateId` | Private | Check if favorited |

---

## ✨ Features

- **Authentication** — JWT-based register/login with bcrypt password hashing
- **Template Browser** — Grid view with search, category filter, and pagination
- **Smart Favorites** — Toggle favorites with real-time UI update
- **Protected Routes** — Favorites page requires authentication
- **Responsive Design** — Mobile-first glassmorphism dark theme
- **Error Handling** — Proper HTTP status codes and JSON responses
- **10 Seed Templates** — Across 7 categories (Dashboard, Landing Page, E-Commerce, etc.)

---

## 🌟 Bonus Features Implemented

- ✅ Search by name/description/tags
- ✅ Filter by category
- ✅ Logout button
- ✅ Protected routes
- ✅ Pagination
- ✅ Skeleton loading states
- ✅ Toast notifications
- ✅ Mobile-responsive navbar with hamburger menu
