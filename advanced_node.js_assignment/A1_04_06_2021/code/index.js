const express = require('express');

const port = 9999;

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(port, '0.0.0.0', () => {
  console.log('Server is running on port' + port);
});
