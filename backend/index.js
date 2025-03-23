import express from 'express';
import cors from 'cors';
import { insertClient, validateClientLogin,getClientProfileByEmail, deleteClientByNAS, updateClientByNAS, getRoomsByZone, getRoomsByCapacity, createClientReservation, getmyReservations} from './clientDatabase.js';
import { validateEmployeeLogin, getClientReservation, cancelReservation, createLocationFromReservation, getClientLocation, getAvailableRooms, createDirectLocation} from './employeeDatabase.js';
import { getEmployeesByHotelId, insertEmployee, updateEmployee, deleteEmployee, getClientsByHotelId, getClientReservations, getClientLocations, getHotelById, getChambresByHotelId, insertChambre, getChambreStatus, deleteChambre, updateChambre} from './managerDatabase.js';
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
app.get('/api/rooms/by-zone', getRoomsByZone);
app.get('/api/rooms/by-capacity', getRoomsByCapacity);
app.post('/api/reservations', createClientReservation);
app.get('/api/client/:nasClient/reservations', getmyReservations);

// =================================route pour employee===========================
app.post('/api/login/employee', validateEmployeeLogin);
app.get('/api/employee/:employeeId/reservations', getClientReservation);
app.delete('/api/reservations/:reservationId', cancelReservation);
app.post('/api/locations', createLocationFromReservation);
app.get('/api/employee/:employeeId/locations', getClientLocation);
app.get('/api/employee/:employeeId/availableRooms', getAvailableRooms);
app.post('/api/locations/direct', createDirectLocation);

// =================================route pour manager===========================
app.get('/api/employees/:hotelId', getEmployeesByHotelId);
app.post('/api/employee', insertEmployee);
app.put('/api/employee/:nas', updateEmployee);
app.delete('/api/employee/:nas', deleteEmployee);
app.get('/api/clients/:hotelId', getClientsByHotelId);
app.get('/api/client/:nasClient/reservations', getClientReservations);
app.get('/api/client/:nasClient/locations', getClientLocations);
app.get('/api/hotel/:hotelId', getHotelById);
app.get('/api/chambres/:hotelId', getChambresByHotelId);
app.get('/api/chambre/:chambreId/status', getChambreStatus);
app.post('/api/chambre', insertChambre);
app.put('/api/chambre/:chambreId', updateChambre);
app.delete('/api/chambre/:chambreId', deleteChambre);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`);
});