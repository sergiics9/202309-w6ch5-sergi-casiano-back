import { createServer } from 'http';
import { app } from './app.js';

const PORT = process.env.PORT || 2700;

const server = createServer(app);

server.listen(PORT);

server.on('listening', () => {
  console.log('Listening on port', PORT);
});
