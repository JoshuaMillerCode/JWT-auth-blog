import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import authenticateToken from './middleware.js';

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI);

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

app.use(express.json());
app.use(cors());

app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/api/protected', authenticateToken, (req, res) => {
  res.json({ message: 'Access granted' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
