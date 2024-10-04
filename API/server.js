const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const connectDB = require('./Database/connection');
const cookieParser = require('cookie-parser');
const Route = require('./Routes/API');
const http = require('http');
const { Server } = require('socket.io'); 
const cors = require('cors');

dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

connectDB();

// Enable CORS globally
app.use(cors()); 

// Routes
app.use('/API', Route);

// WebSocket connection handling
io.on('connection', (socket) => {
  console.log('user connected to socket');

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg); 
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Serve static files from the 'dist' folder
app.use(express.static(path.join(__dirname, 'Client/dist')));

// Handle SPA routing (for React, Vue, etc.)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'Client', 'dist', 'index.html'));
});
console.log("Serving static files from:", path.join(__dirname, "Client", "build"));

// Global error handler
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

// Start the server
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
