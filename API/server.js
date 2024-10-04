const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const connectDB = require('./Database/connection');
const cookieParser = require('cookie-parser');
const Route = require('./Routes/API');
const http = require('http');
const { Server } = require('socket.io'); 
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });


const app = express();
const server = http.createServer(app);

// Set up Socket.IO server with CORS settings
const io = new Server(server, {
  cors: {
    origin:"http://localhost:5173",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});
const __dirname = path.resolve()
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

app.use(express.static(path.join(__dirname,'/Client/dist' )))
app.get('*', (req, res) => {
res.sendFile(path.join(__dirname,'Client','dist','index.html'))
})


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
