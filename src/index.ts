import { createServer } from 'http';
import { app } from './app.js';
import createDebug from 'debug';

const debug = createDebug('SKINS:index');
const PORT = process.env.PORT ?? 2700;
const server = createServer(app);

debug('Starting server');

server.listen(PORT);

server.on('listening', () => {
  debug('Listening on port', PORT);
});

server.on('error', (error) => {
  console.log(error.message);
});
