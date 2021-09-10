const express = require("express");
const { createServer } = require('http');
const userRoute = require("./routes/userRoute");

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: false }));

app.use('/api/user/', userRoute);

const server = createServer(app);
server.listen(3000);
