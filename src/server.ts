import http from 'http';
import { app } from './app';
import { initializeSocket } from './socket';

const port = process.env.PORT || 3000;

const server = http.createServer(app);

initializeSocket(server); // Initialize socket connection

server.listen(port);