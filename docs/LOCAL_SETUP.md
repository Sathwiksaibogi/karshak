# Karshak Local Setup Guide

## Overview

Karshak is a full-stack farmer-to-consumer marketplace organized as a monorepo with a React frontend and a Node.js/Express backend.

The repository contains:

```text
karshak/
├── client/
├── server/
└── README.md
```

## Prerequisites

Before running the project locally, install:

- Git
- Node.js
- npm
- VS Code or another code editor

You also need valid development environment variables for the backend.

## 1. Clone the Repository

```bash
git clone https://github.com/Sathwiksaibogi/karshak.git
cd karshak
```

## 2. Install and Run the Frontend

Open a terminal in the repository and run:

```bash
cd client
npm install
npm run dev
```

Vite will display the local frontend URL in the terminal.

## 3. Install and Run the Backend

Open a second terminal and run:

```bash
cd server
npm install
npm run dev
```

Depending on the configured package scripts, the server can also be started with:

```bash
npm start
```

## 4. Backend Environment Variables

The backend requires environment variables similar to the following:

```text
DATABASE_URL=your_postgresql_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
CLIENT_URL=http://localhost:5173
```

Use your own development values.

**Never commit real secrets, passwords, API keys, tokens, or `.env` files to GitHub.**

## 5. Main Services Used by Karshak

- Frontend: React + Vite
- Backend: Node.js + Express.js
- Database: PostgreSQL through Prisma ORM
- Production database: Neon PostgreSQL
- Product image storage: Cloudinary
- Frontend deployment: Vercel
- Backend deployment: Vercel

## 6. Basic Troubleshooting

### `npm` packages are missing

Run:

```bash
npm install
```

inside the relevant `client` or `server` folder.

### Frontend cannot reach the backend

Check that the backend is running and that the frontend/backend URL configuration is correct.

### Database connection fails

Check that `DATABASE_URL` is configured correctly in your local backend environment.

### Image upload fails

Check the Cloudinary environment variables in your local backend environment.

## Production Links

Frontend:

https://karshak-client.vercel.app/

Backend:

https://karshak-server.vercel.app/

---

This guide is intended to help new contributors understand the basic local setup without exposing private production configuration.