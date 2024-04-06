// Load our .env file
import dotenv from 'dotenv';
dotenv.config();

// Import express and cors
import express from 'express';
import cors from 'cors';

// Set up express
const app = express();
app.disable('x-powered-by');
app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));




// server.js
import registerRouter from "./server/routers/user.js";

import trackerRouter from './server/routers/tracker.js';
app.use('/user', registerRouter);
app.use('/healthtracker', trackerRouter);









app.get('*', (req, res) => {
    res.json({ ok: true });
});


const port = process.env.VITE_PORT;
app.listen(port, () => {
    console.log(`\n Server is running on http://localhost:${port}\n`);
});
