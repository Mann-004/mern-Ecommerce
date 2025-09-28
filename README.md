# SCATCH - MERN E-Commerce Platform

SCATCH is a **full-stack e-commerce application** built with the MERN stack (MongoDB, Express.js, React, Node.js). It offers a seamless user experience with features like user authentication, product management, cart functionality, Stripe-powered checkout, and order tracking. The frontend leverages **React with Vite and Tailwind CSS** for a modern, responsive UI, while the backend uses **Node.js, Express, and MongoDB** for robust data handling and API services.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Project](#running-the-project)
- [Swagger API Documentation](#swagger-api-documentation)
- [Authentication](#authentication)
- [API Routes](#api-routes)
- [License](#license)

---

## Features

- **User Authentication**:
  - Register, login, and logout (email/password & Google OAuth).
  - Password reset and user profile updates.
- **Product Management** (Admin-only):
  - Create, read, update, and delete (CRUD) products.
- **Cart Functionality**:
  - Add/remove items, increment/decrement quantities.
- **Checkout & Payments**:
  - Secure checkout with Stripe integration.
- **Order Management**:
  - View user orders, admin order management, and order status updates.
- **API Documentation**:
  - Fully documented REST API with Swagger UI for easy testing and integration.

---

## Tech Stack

### Backend
- **Node.js**: Server-side JavaScript runtime.
- **Express.js**: Web framework for building RESTful APIs.
- **MongoDB + Mongoose**: NoSQL database with an ODM for data modeling.
- **JWT**: Secure authentication with JSON Web Tokens.
- **Stripe API**: Payment processing for checkout.
- **Swagger/OpenAPI 3.0**: API documentation and testing.

### Frontend
- **React.js + Vite**: Fast, modern frontend framework with a high-performance build tool.
- **React Router DOM**: Client-side routing for seamless navigation.
- **Redux Toolkit**: State management for predictable data flow.
- **Tailwind CSS**: Utility-first CSS framework for responsive design.
- **GSAP**: Smooth animations for enhanced user experience.
- **Recharts**: Data visualization for charts and analytics.
- **React Hook Form + Yup**: Form handling and validation.
- **Stripe React SDK**: Frontend integration for Stripe payments.

---

## Folder Structure

### Backend (`/server` or `/backend`)
```
server/
├── config/                 # Configuration files (e.g., database, environment)
├── controllers/            # Request handlers for API routes
├── middleware/             # Custom middleware (e.g., authentication, error handling)
├── models/                 # Mongoose schemas and models
├── routes/                 # Express API routes
├── utils/                  # Utility functions (e.g., JWT, email)
├── swagger.json            # Swagger API documentation
├── server.js               # Entry point for the backend
└── package.json            # Backend dependencies and scripts
```

### Frontend (`/client` or `/frontend`)
```
client/
├── public/                 # Static assets (e.g., images, favicon)
├── src/
│   ├── assets/             # Media files (e.g., images, fonts)
│   ├── components/         # Reusable React components
│   ├── pages/              # Page-level components (e.g., Home, Cart, Checkout)
│   ├── redux/              # Redux slices and store configuration
│   ├── styles/             # Tailwind CSS and custom styles
│   ├── utils/              # Utility functions (e.g., API calls, helpers)
│   ├── App.jsx             # Main app component
│   └── main.jsx            # Entry point for React
├── vite.config.js          # Vite configuration
└── package.json            # Frontend dependencies and scripts
```

---

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/scatch.git
   cd scatch
   ```

2. **Install Backend Dependencies**:
   ```bash
   cd server
   npm install
   ```

3. **Install Frontend Dependencies**:
   ```bash
   cd ../client
   npm install
   ```

---

## Environment Variables

Create a `.env` file in the `/server` directory with the following variables:

```env
# Backend
PORT=5000
MONGO_URI=mongodb://localhost:27017/scatch
NODE_ENV=develo pment

JWT_SECRET=your_jwt_secret_key

STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
CALLBACK_URL=your_callback_url

# Frontend (create .env in /client)
VITE_API_URL=http://localhost:5000/api
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

> **Note**: Replace placeholder values (e.g., `your_jwt_secret_key`) with actual credentials. Ensure sensitive data is kept secure and not committed to version control.

---

## Running the Project

1. **Start MongoDB**:
   Ensure MongoDB is running locally or provide a MongoDB Atlas URI in the `.env` file.

2. **Run the Backend**:
   ```bash
   cd server
   npm run dev
   ```
   The backend will run on `http://localhost:5000` (or the specified `PORT`).

3. **Run the Frontend**:
   ```bash
   cd client
   npm run dev
   ```
   The frontend will run on `http://localhost:5173` (default Vite port).

4. **Access the Application**:
   Open `http://localhost:5173` in your browser to view the frontend.

---

## Swagger API Documentation

The backend includes **Swagger UI** for API documentation and testing.

- **Access**: Navigate to `http://localhost:8000/api-docs` after starting the backend.
- **Features**: Explore all API endpoints, test requests, and view request/response schemas.

---

## Authentication

- **JWT-Based Authentication**:
  - Users receive a JWT upon successful login, stored securely in the frontend.
  - Protected routes (e.g., admin product management) require a valid token.
- **Google OAuth**:
  - Integrated for seamless login using Google accounts.
- **Password Reset**:
  - Email-based password reset flow with secure token generation.

---

## API Routes

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user
- `POST /api/auth/google` - Google OAuth login
- `POST /api/auth/forgot-password` - Request password reset
- `PUT /api/auth/reset-password/:token` - Reset password
- `PUT /api/auth/profile` - Update user profile (requires authentication)

### Products (Admin-only)
- `GET /api/products` - List all products
- `POST /api/products` - Create a product
- `PUT /api/products/:id` - Update a product
- `DELETE /api/products/:id` - Delete a product

### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:id` - Update item quantity
- `DELETE /api/cart/:id` - Remove item from cart

### Checkout
- `POST /api/checkout` - Create Stripe checkout session

### Orders
- `GET /api/orders` - Get user orders
- `GET /api/orders/admin` - Get all orders (admin-only)
- `PUT /api/orders/:id` - Update order status (admin-only)

> **Note**: All routes are documented in Swagger UI at `/api-docs`.

