const express = require('express');
require('dotenv').config();
const app = express();
const router = require('./Routes/Route');
const dbconnect = require('./Config/Database');
const cors = require('cors');

const corsOption = {
    origin: ['http://localhost:5173'],
};
app.use(cors(corsOption));

app.use(express.json());
app.use(router);

app.get('/', (req, res) => {
    res.send('Hello from express Js');
});

const PORT = process.env.PORT || 5500;
dbconnect();

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));