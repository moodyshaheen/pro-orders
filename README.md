# E-Commerce Full Stack Project

A complete e-commerce solution with React frontend, Node.js backend, and admin panel.

## 🚀 Live Demo

- **Frontend (Customer)**: [https://your-frontend.vercel.app](https://your-frontend.vercel.app)
- **Admin Panel**: [https://your-admin.vercel.app](https://your-admin.vercel.app)
- **Backend API**: [https://your-backend.vercel.app](https://your-backend.vercel.app)

## 🛠️ Tech Stack

### Frontend
- React 19
- Vite
- React Router DOM
- Axios
- React Hook Form + Zod
- Bootstrap
- Framer Motion
- Lottie React

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Multer (File Upload)
- bcryptjs
- CORS

### Admin Panel
- React 19
- Vite
- Tailwind CSS
- Axios

## 📁 Project Structure

```
├── frontend/          # Customer-facing React app
├── backend/           # Node.js API server
├── admin/            # Admin dashboard
└── README.md
```

## 🚀 Deployment

### Backend (Vercel)
1. Deploy backend first
2. Set environment variables in Vercel dashboard
3. Copy the backend URL

### Frontend & Admin
1. Update VITE_API_URL in Vercel environment variables
2. Deploy frontend and admin separately

## 🔧 Environment Variables

### Backend (.env)
```
JWT_SECRET=your_jwt_secret
MONGODB_URI=your_mongodb_connection_string
```

### Frontend & Admin (.env)
```
VITE_API_URL=https://your-backend-url.vercel.app
```

## 📦 Features

- User authentication (JWT)
- Product management
- Shopping cart
- Order management
- Admin dashboard
- File upload for product images
- Responsive design

## 🏃‍♂️ Local Development

1. Clone the repository
2. Install dependencies in each folder:
   ```bash
   cd backend && npm install
   cd ../frontend && npm install
   cd ../admin && npm install
   ```
3. Set up environment variables
4. Start development servers:
   ```bash
   # Backend
   cd backend && npm run server
   
   # Frontend
   cd frontend && npm run dev
   
   # Admin
   cd admin && npm run dev
   ```

## 📄 License

MIT License