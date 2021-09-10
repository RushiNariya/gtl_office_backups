import app from './app';
import db from '@app/lib/src/dbConn';

const start = async (): Promise<void> => {
  await db();
  const port = parseInt(process.env.PORT);

  app.listen(port, '0.0.0.0', (): void => {
    console.log(`Starting Backend server on port ${port}`);
  });
};

(async (): Promise<void> => {
  await start();
})();
