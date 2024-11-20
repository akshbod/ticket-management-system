'use strict';

const cluster = require('cluster');
const os = require('os');
const express = require('express');
require('dotenv').config();

const PORT = process.env.PORT;

if (cluster.isMaster) {

    const numCPUs = os.cpus().length;
    console.log(`Master process is running (PID: ${process.pid}). Forking ${numCPUs} workers...`);

    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} exited. Code: ${code}, Signal: ${signal}`);
        console.log('Starting a new worker...');
        cluster.fork();
    });
} else {
    const app = express();
    app.use(express.json());
    
    const morgan = require('morgan');
    const routes = require('./config/routes');
    const swaggerUi = require('swagger-ui-express');


    const swaggerDocument = require('./config/swaggerConfig');
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    app.use(morgan('dev'));

    app.use(routes);

    app.listen(PORT, () => {
        console.log(`Worker process running on PID: ${process.pid}, listening on port ${PORT}`);
    });
    
};
