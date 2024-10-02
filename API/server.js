const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const connectDB = require('./Database/connection');
const cookieParser = require('cookie-parser');
const Route = require('./Routes/API');
const http = require('http');
const { Server } = require('socket.io'); 


dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
const server = http.createServer(app);

const io = new Server(server); 


app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));


connectDB();
const cors = require('cors');
app.use(cors()); 


app.use('/API', Route);


io.on('connection', (socket) => {
  console.log('A user connected');


  socket.on('chat message', (msg) => {
    io.emit('chat message', msg); 
  });


  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});


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
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
