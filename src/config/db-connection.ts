import { createConnection } from 'typeorm';

export const connectDatabase = async () => {
  const connection = await createConnection();
  console.log(`Database connection started`);

  process.on('SIGINT', () => {
    connection.close().then(() => console.log('Database connection finished'));
  });
};
