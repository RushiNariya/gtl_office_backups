import app from './app';

const start = async (): Promise<void> => {
  const port: number = parseInt(process.env.PORT);

  app.listen(port, '0.0.0.0', (): void => {
    console.log(`Starting Graph server on port ${port}`);
  });

};

(async (): Promise<void> => {
  await start();
})();
