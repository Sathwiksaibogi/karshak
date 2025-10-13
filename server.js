// // server/server.js

// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import mainRouter from './routes/index.js'; // Import the main router hub
// import path from 'path';
// import uploadsRouter from './routes/uploads.js';

// // Load environment variables from .env file
// dotenv.config();

// // Initialize the Express application
// const app = express();

// // --- Global Middleware ---
// // Enable Cross-Origin Resource Sharing (CORS)
// // This allows your React frontend (on a different port) to communicate with this backend
// app.use(cors({
//   origin: process.env.CLIENT_URL || 'http://localhost:5173', // Be sure to set CLIENT_URL in your .env
//   credentials: true,
// }));

// // Enable the express.json middleware to parse JSON request bodies
// app.use(express.json());
// // Serve static files from uploads
// app.use('/uploads', express.static(path.resolve('uploads')));


// // --- API Routes ---
// // Mount the main router on the /api path.
// // All routes defined in the /routes folder will now be accessible under /api
// // e.g., /api/auth/login, /api/products, /api/status
// app.use('/api', mainRouter);
// app.use('/api/uploads', uploadsRouter);


// // --- Error Handling Middleware (optional but recommended) ---
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send('Something broke!');
// });


// // --- Start The Server ---
// // const PORT = process.env.PORT || 3000;
// // app.listen(PORT, () => {
// //   console.log(`🚀 Server is running on http://localhost:${PORT}`);
// // });
// export default app;




import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mainRouter from './routes/index.js'; // Import the main router hub
import path from 'path';
import uploadsRouter from './routes/uploads.js';

// Load environment variables from .env file
dotenv.config();

// Initialize the Express application
const app = express();

// --- Global Middleware ---
// Enable Cross-Origin Resource Sharing (CORS)
// This allows your React frontend (on a different port) to communicate with this backend
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173', // Be sure to set CLIENT_URL in your .env
  credentials: true,
}));

// Enable the express.json middleware to parse JSON request bodies
app.use(express.json());
// Serve static files from uploads
app.use('/uploads', express.static(path.resolve('uploads')));


// --- API Routes ---
// Mount the main router on the /api path.
// All routes defined in the /routes folder will now be accessible under /api
// e.g., /api/auth/login, /api/products, /api/status
app.use('/api', mainRouter);
app.use('/api/uploads', uploadsRouter);


// --- Error Handling Middleware (optional but recommended) ---
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


// --- Start The Server ---
// This block will only run when you start the server locally (e.g., with `npm run dev`)
// Vercel will ignore it and use the exported `app` object for deployment.
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`🚀 Backend server is running for development on http://localhost:${PORT}`);
  });
}

// Export the app for Vercel
export default app;

