import io from 'socket.io-client';
const socket = io('http://localhost:11001');

socket.on('connect', (): void => {
  const timeout = 40000;
  console.log(`Client connected for ${timeout}`);

  socket.on('realtimeEvent', (payload): void => {

    console.log(JSON.stringify(payload, null, 2));
  });

  setTimeout((): void => {
    process.exit(0);
  }, timeout);
});