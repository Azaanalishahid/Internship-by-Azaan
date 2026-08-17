# Express Supabase Auth REST API & Web UI

A modern, production-grade Express.js backend providing authentication endpoints (`signup`, `login`, `logout`, `refresh`, `me`) powered by **Supabase Auth** (`@supabase/supabase-js`), complete with input validation, JWT token verification, error handling, and a sleek interactive web dashboard.

---

## 🌟 Key Features

- 🔐 **Sign Up Endpoint (`POST /api/auth/signup`)**: Registers new users with optional metadata (`name`, custom properties) via Supabase Auth.
- 🔑 **Login Endpoint (`POST /api/auth/login`)**: Authenticates credentials and returns JWT `access_token`, `refresh_token`, and user details.
- 🛡️ **JWT Middleware Protection (`GET /api/auth/me`)**: Validates Bearer tokens on protected routes using `supabase.auth.getUser()`.
- 🔄 **Session Refresh (`POST /api/auth/refresh`)**: Refreshes expired sessions using `refresh_token`.
- 🚪 **Logout Endpoint (`POST /api/auth/logout`)**: Invalidates current active session.
- 💻 **Interactive Web UI**: A glassmorphism dark-theme web dashboard served at `http://localhost:3000` to test all authentication flows visually.
- 🧪 **Automated Test Suite**: Full end-to-end API test script included (`npm test`).

---

## 🚀 Getting Started

### 1. Environment Setup
The project uses `.env` for environment configuration. Credentials have been pre-configured:

```env
PORT=3000
SUPABASE_URL=https://nncwixdgnxjfgmkdbsxp.supabase.co
SUPABASE_ANON_KEY=sb_publishable_d3Ldvgtg39YLH8TpYYO-fA_QfF2WaWD
```

### 2. Start the Server

```bash
# Start in production mode
npm start

# Start in development mode with hot-reload
npm run dev
```

Once running, visit **`http://localhost:3000`** in your browser to open the interactive Web UI.

---

## 📡 API Endpoints Overview

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/signup` | Public | Register new user account |
| `POST` | `/api/auth/login` | Public | Authenticate user & get JWT tokens |
| `POST` | `/api/auth/refresh` | Public | Refresh JWT session using `refresh_token` |
| `GET` | `/api/auth/me` | Protected | Fetch current user profile (Requires `Authorization: Bearer <token>`) |
| `POST` | `/api/auth/logout` | Protected | Sign out user session |
| `GET` | `/health` | Public | Healthcheck endpoint |

---

## 💻 cURL Usage Examples

### 1. Sign Up
```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@gmail.com",
    "password": "SuperPassword123!",
    "name": "Jane Doe"
  }'
```

### 2. Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@gmail.com",
    "password": "SuperPassword123!"
  }'
```

### 3. Fetch User Profile (Protected)
```bash
curl -X GET http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer <YOUR_ACCESS_TOKEN>"
```

### 4. Refresh Token
```bash
curl -X POST http://localhost:3000/api/auth/refresh \
  -H "Content-Type: application/json" \
  -d '{
    "refresh_token": "<YOUR_REFRESH_TOKEN>"
  }'
```

### 5. Logout
```bash
curl -X POST http://localhost:3000/api/auth/logout \
  -H "Authorization: Bearer <YOUR_ACCESS_TOKEN>"
```

---

## 🧪 Running Automated Tests

```bash
npm test
```

---

## 📂 Project Architecture

```
task6/
├── .env                  # Live Supabase environment variables
├── .env.example          # Template environment variables
├── package.json          # Dependencies & npm scripts
├── README.md             # Project documentation
├── public/               # Frontend Client Application
│   ├── index.html        # Glassmorphism Web Interface
│   ├── styles.css        # Custom CSS Design System
│   └── app.js            # Interactivity & API fetch logic
├── scripts/
│   └── test-api.js       # End-to-end API verification suite
└── src/
    ├── app.js            # Express server entry point
    ├── config/
    │   └── supabase.js   # Supabase Client initialization
    ├── controllers/
    │   └── authController.js  # SignUp, Login, Logout, Refresh, Profile logic
    ├── middleware/
    │   ├── authMiddleware.js  # JWT Bearer token authentication
    │   └── errorHandler.js    # Global error & 404 handler
    └── routes/
        └── authRoutes.js      # Express router mapping
```
