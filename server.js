const express = require('express');
const cors = require('cors');
const { PORT } = require(('./src/config/environment'));
const errorHandlers = require('./src/middlewares/errorHandlers');
const deliveryRoutes = require('./src/routes/delivery.routes');


const server = express();

server.use(cors());
server.use(express.json());

server.use('/', deliveryRoutes);
server.use(errorHandlers);

// test the endpoint
server.get('/', (req, res) => {
    res.send('Hello World');
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}
);
module.exports = server;