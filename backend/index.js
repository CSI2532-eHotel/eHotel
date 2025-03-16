import express from 'express';
import cors from 'cors';
import { insertClient, validateClientLogin } from './clientDatabase.js';
import { validateEmployeeLogin } from './employeeDatabase.js';
import env from 'dotenv';
import { insertClientReservation } from './clientDatabase.js';
import { confirmClientReservation } from './employeeDatabase.js';
env.config(); 
const app = express();

// Middleware- nous permet de lire les données envoyées par le client 
app.use(express.json());
// client(frontend) est sur un port différent- localhost:3000 de celui du serveur(backend)-localhost:5000
// on doit donc autoriser les requêtes cross-origin
app.use(cors());

// =================================route pour client===========================
app.post('/api/insertClient', insertClient); 
app.post('/api/login/client', validateClientLogin);
app.post('/api/reservations', insertClientReservation);
// =================================route pour employee===========================
app.post('/api/login/employee', validateEmployeeLogin);
app.post('/api/confirmClientReservation', confirmClientReservation);
// =================================route pour manager===========================



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`);
});