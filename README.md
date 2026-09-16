# 🌾 Karshak

### A Full-Stack Farmer-to-Consumer Marketplace

Karshak is a full-stack marketplace designed to connect farmers directly with buyers, enabling farmers to list agricultural products and buyers to discover, purchase, and manage orders through a simple digital platform.

The project focuses on building an end-to-end marketplace experience with separate workflows for farmers and buyers, secure authentication, product management, order processing, image uploads, and persistent cloud-hosted data.

---

## 🚀 Live Application

### Frontend
https://karshak-client.vercel.app/

### Backend API
https://karshak-server.vercel.app/

---

## ✨ Core Features

### 👨‍🌾 Farmer

- Farmer registration and authentication
- Dedicated farmer dashboard
- Add agricultural products
- Upload product images
- Set product price and available quantity
- Add product descriptions
- View listed products
- Manage incoming orders
- Maintain farmer profile information

### 🛒 Buyer

- Buyer registration and authentication
- Browse agricultural product categories
- View product details
- Add products to purchase flow
- Checkout functionality
- Place orders
- View personal order history
- Buyer-specific dashboard

### 🔐 Authentication & Authorization

- JWT-based authentication
- Role-based application flows
- Farmer and Buyer roles
- Protected backend routes
- Persistent user sessions

### 📦 Product & Order Management

- Product creation and retrieval
- Product categorization
- Image uploads
- Quantity and price management
- Checkout flow
- Order creation
- Buyer order tracking
- Farmer-side order management

---

## 🛠️ Tech Stack

### Frontend

- React.js
- Vite
- JavaScript
- React Router
- Axios
- CSS

### Backend

- Node.js
- Express.js
- REST APIs
- JWT Authentication

### Database

- PostgreSQL
- Prisma ORM
- Neon PostgreSQL

### Media Storage

- Cloudinary

### Deployment

- Vercel — Frontend
- Vercel — Backend

### Development Tools

- Git
- GitHub
- VS Code

---

## 🏗️ Architecture

```text
                        ┌───────────────────────┐
                        │        User           │
                        │ Farmer / Buyer        │
                        └───────────┬───────────┘
                                    │
                                    ▼
                        ┌───────────────────────┐
                        │    React + Vite       │
                        │      Frontend         │
                        └───────────┬───────────┘
                                    │
                              HTTP / REST
                                    │
                                    ▼
                        ┌───────────────────────┐
                        │   Node.js + Express   │
                        │      Backend API      │
                        └──────┬─────────┬──────┘
                               │         │
                 ┌─────────────┘         └──────────────┐
                 ▼                                      ▼
        ┌──────────────────┐                   ┌──────────────────┐
        │    Prisma ORM    │                   │    Cloudinary    │
        └────────┬─────────┘                   │  Image Storage   │
                 │                             └──────────────────┘
                 ▼
        ┌──────────────────┐
        │    PostgreSQL    │
        │      Neon        │

```

## 📂 Repository Structure

Karshak is organized as a monorepo containing both the frontend and backend.
```
karshak/
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── ...
│   ├── package.json
│   └── vite.config.js
│
├── server/
    ├── controllers/
    ├── middleware/
    ├── routes/
    ├── prisma/
    ├── uploads/
    ├── server.js
    └── package.json
```
## 🗄️ Data Model

The backend uses Prisma ORM with PostgreSQL.

The application contains core entities such as:
```
User
│
├── Farmer
│    └── Products
│
└── Buyer
     └── Orders

Category
   │
   └── Products

Product
   │
   └── Orders
```
Major application models include:

- User
- Farmer
- Buyer
- Category
- Product
- Order

## 🔄 Application Flow
```
User
 │
 ▼
Register / Login
 │
 ▼
Role Detection
 │
 ├────────────── Farmer ──────────────┐
 │                                    │
 │                             Farmer Dashboard
 │                                    │
 │                        Add / Manage Products
 │                                    │
 │                           Manage Orders
 │
 └────────────── Buyer ───────────────┐
                                      │
                               Buyer Dashboard
                                      │
                              Browse Products
                                      │
                               Product Details
                                      │
                                  Checkout
                                      │
                                Place Order
```
## ⚙️ Local Development
###  Clone the repository
```
git clone https://github.com/Sathwiksaibogi/karshak.git
cd karshak
```
### Frontend Setup
```
cd client
npm install
npm run dev
```
The frontend will run locally using Vite.
### Backend Setup
Open another terminal:
```
cd server
npm install
```
Configure the required environment variables and then start the backend.
```
npm run dev
```
or, depending on the configured scripts:
```
npm start
```
## 🔐 Environment Variables
Create the appropriate .env file inside the backend directory.
Example:
```
DATABASE_URL=your_postgresql_connection_string

JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

CLIENT_URL=http://localhost:5173
```
Never commit production secrets or .env files to GitHub.

## 🌐 API Structure
The backend follows a REST-style architecture.

Example API areas include:
```
/api/auth
/api/products
/api/orders
/api/categories
/api/users
```
These routes are responsible for authentication, marketplace data, products, users, and order management.

## 🔒 Security Considerations

Karshak includes several application-level security practices:

- JWT-based authentication
- Protected API routes
- Role-based authorization
- Environment-based secret management
- Server-side request validation
- Database access through Prisma ORM
- Secure handling of cloud credentials

## ☁️ Deployment Architecture
```
GitHub
│
├── Karshak Monorepo
│   │
│   └── client/
│         │
│         ▼
│      Vercel
│         │
│         ▼
│   Production Frontend
│
└── Backend
      │
      ▼
   Vercel
      │
      ├──── PostgreSQL → Neon
      │
      └──── Images → Cloudinary
```
## 🎯 What I Learned

Building Karshak provided hands-on experience across the complete development lifecycle of a production-oriented web application, including:

- Designing frontend and backend architectures
- Building REST APIs
- Implementing authentication and authorization
- Designing relational database models
- Working with Prisma ORM
- Integrating PostgreSQL
- Implementing image upload workflows
- Building role-based applications
- Connecting frontend and backend services
- Managing environment variables
- Deploying frontend and backend applications
- Debugging production deployments
- Structuring a full-stack project as a monorepo

## 🛣️ Future Improvements

Potential future enhancements include:

- Improved responsive UI/UX
- Advanced search and filtering
- Product reviews and ratings
- Improved order tracking
- Payment gateway integration
- Notifications
- Better analytics for farmers
- Improved testing coverage
- CI/CD automation
- Performance optimization
  
## 📄 License

This project is currently maintained as a portfolio and learning project.
