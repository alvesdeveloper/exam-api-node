import { app } from './app';

const port = 3000;

const server = app.listen(port, () =>
  console.log('Server is listening on port: ' + port)
);

process.on('SIGINT', () => {
  server.close();
  console.log('exam-api finished');
});
