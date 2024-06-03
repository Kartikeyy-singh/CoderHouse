const express = require('express');
require('dotenv').config();
const app = express();
const router = require('./Routes/Route');
const dbconnect = require('./Config/Database');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const server = require('http').createServer(app);

const io = require('socket.io')(server, {
    cors: {
        origin: 'http://localhost:5173/',
        methods: ['GET', 'POST'],
    },
});


const corsOption = {
    origin: 'http://localhost:5173',
    credentials: true,
};
app.use(cors(corsOption));
app.use(cookieParser());
app.use(express.json({ limit: '8mb' }));
app.use('/storage', express.static('storage'));
app.use(router);

app.get('/', (req, res) => {
    res.send('Hello from express Js');
});

const PORT = process.env.PORT || 5500;
dbconnect();

io.on('connection', (socket) => {
    console.log('new connection', socket.id);
})

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));