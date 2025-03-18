import express from 'express';

import cors from 'cors';

import { 
    insertClient, 
    validateClientLogin,
    getClientProfileByEmail,
    deleteClientByNAS, 
    updateClientByNAS,
    // D: added these 2 for my client functions
    updateClientProfile,
    deleteClientReservation
} from './clientDatabase.js';

import { 
    validateEmployeeLogin,
    // D: added for my employee function
    deleteEmployeReservation
} from './employeeDatabase.js';

import { 
    getEmployeesByHotelId, 
    insertEmployee, 
    updateEmployee, 
    deleteEmployee 
} from './managerDatabase.js';

import env from 'dotenv';

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
app.get('/api/client/:email', getClientProfileByEmail);
app.delete('/api/client/:nas', deleteClientByNAS);
app.put('/api/client/:nas', updateClientByNAS);
// D: added these 2 for my client functions
app.put('/api/client/profile', updateClientProfile);
app.delete('/api/client/reservation/:reservation_ID', deleteClientReservation);

// =================================route pour employee===========================
app.post('/api/login/employee', validateEmployeeLogin);
// D: added for employee function
app.post('/api/login/employee/:reservation_ID', deleteEmployeReservation);

// =================================route pour manager===========================
app.get('/api/employees/:hotelId', getEmployeesByHotelId);
app.post('/api/employee', insertEmployee);
app.put('/api/employee/:nas', updateEmployee);
app.delete('/api/employee/:nas', deleteEmployee);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`);
});