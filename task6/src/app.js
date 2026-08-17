import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import authRoutes from './routes/authRoutes.js';
import { notFoundHandler, globalErrorHandler } from './middleware/errorHandler.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Serve Static Frontend UI
app.use(express.static(path.join(__dirname, '../public')));

// API Routes
app.use('/api/auth', authRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'online',
    timestamp: new Date().toISOString(),
    service: 'Express Supabase Auth API'
  });
});

// Error handling
app.use(notFoundHandler);
app.use(globalErrorHandler);

// Start Server if launched directly
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`\n==================================================`);
    console.log(`🚀 Express Supabase Auth Server is live!`);
    console.log(`📡 Server URL: http://localhost:${PORT}`);
    console.log(`🔐 API Base:   http://localhost:${PORT}/api/auth`);
    console.log(`💻 Interactive UI: http://localhost:${PORT}`);
    console.log(`==================================================\n`);
  });
}

export default app;
