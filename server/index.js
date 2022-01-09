require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/task');
const errorHandler = require('./error-handler/errorHandler');
const app = express();

connectDB();

app.use(express.json());
app.use(
  cors({
    origin: '*',
    credentials: true,
  })
);
app.use('/api/auth', authRoutes);

app.use('/api/task', taskRoutes);

app.get('/', (req, res) => {
  res.send('Hello from the server');
});

app.use(errorHandler);

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

process.on('unhandledRejection', (err, promise) => {
  console.error(`Logged Error: ${err}`);
  server.close(() => process.exit(1));
});
