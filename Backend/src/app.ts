import express from 'express';
import { PointController } from './Controllers/PointController';
import cors from 'cors'; // Import cors

const app = express();
const port = 5001;
const corsOptions = {
    origin: '*', // Allows all origins
    methods: ['GET'], // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
    preflightContinue: false, // Pass the CORS preflight request to the next handler
    optionsSuccessStatus: 204 // Status code for successful OPTIONS requests
};
app.use(cors(corsOptions));
app.get('/api/get/points', PointController.getAll);
app.listen(port,'0.0.0.0', () => {
    console.log("servidor activo en el puerto ", port);
});