import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';

import userRoutes from './routes/user.route.js';
import contactRoutes from './routes/contact.route.js';
import eventRoutes from './routes/event.route.js';
import trainingRoutes from './routes/training.route.js';
import racesRoutes from './routes/races.route.js';
import ultramRoutes from './routes/ultramarathons.route.js';
import tagRoutes from './routes/tags.route.js';
import registrationRoutes from './routes/registration.route.js'
import paymentRoutes from './routes/payment.route.js';
import resultRoutes from './routes/eventResults.route.js'
import adminStatRoutes from './routes/adminStats.route.js'

const app = express();
// const port = process.env.PORT || 5000;

// MySQL connection

export const db = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE || 'runcrew',
  port: process.env.MYSQL_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

try {
  const connection = await db.getConnection();
  console.log('✅ Connected to MySQL DB');
  connection.release();
} catch (err) {
  console.error('❌ Database connection failed:', err.message);
  process.exit(1);
}

app.use(cors(
  {
    origin: process.env.VITE_FRONTEND_URL,
    credentials: true
  }
));

app.use(express.json());
app.use('/event-files', express.static('uploads'));

app.get('/', (req, res) => {
  res.send("Server is running....");
});

// app.listen(port, () => {
//   console.log("🚀 Server is running on " + port);
// });


app.use('/v1/runcrew', userRoutes);
app.use('/v1/runcrew', contactRoutes);
app.use('/v1/runcrew', eventRoutes);
app.use('/v1/runcrew', trainingRoutes);
app.use('/v1/runcrew', racesRoutes);
app.use('/v1/runcrew', ultramRoutes);
app.use('/v1/runcrew', tagRoutes);
app.use('/v1/runcrew', registrationRoutes);
app.use('/v1/runcrew', paymentRoutes);
app.use('/v1/runcrew', resultRoutes);
app.use('/v1/runcrew', adminStatRoutes);
