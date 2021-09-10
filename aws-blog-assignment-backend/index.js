const express = require('express')
const path = require('path');
require('dotenv').config();
const cors = require('cors');
const app = express()

const userRoute = require("./routes/userRoute");
const blogRoute = require("./routes/blogRoute");

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use('/static', express.static(path.join(__dirname, 'public','images')));

app.get('/', (req, res) => {
    res.send('<b>My</b> first express http server')
})

app.use('/api/user/', userRoute);
app.use('/api/blog/', blogRoute);

app.listen(5000, () => {
    console.log(`Example app listening on port ${process.env.PORT}.`)
})
