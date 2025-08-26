const http = require('http');
const app = require('./app');
require('dotenv').config();
const { dbconnection } = require('./dbConnection');


const port = process.env.PORT || 8080;
const server = http.createServer(app);

// WebSocket setup
const { Server } = require('socket.io');

const io = new Server(server, {
  cors: {
    origin: '*', // Be more specific in production
    methods: ['GET', 'POST']
  }
});
require('./services/socket.service')(io);

dbconnection()
  .finally(() => {
    server.listen(port, () => {
      console.log(`🚀 Server is running on port ${port}`);
    });
  });


