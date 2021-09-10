const express = require("express");
const { createServer } = require('http');
const cors = require('cors');
const noteRoute = require("./routes/notesRoute");

const app = express();

app.use(cors());

app.use(express.json())
app.use(express.urlencoded({ extended: false }));

app.use('/api/notes/', noteRoute);

const server = createServer(app);
server.listen(3000);
