const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const connectDB = require('./Database/connection');
const cookieParser = require('cookie-parser');
const Route = require('./Routes/API');


dotenv.config({ path: path.join(__dirname, '.env') });
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));


connectDB();
//routes
app.use('/API',Route);

app

app.use((err, req, res, next) => {
  console.error(err.stack);
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
