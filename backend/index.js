import express, { json } from 'express';
import cors from 'cors';

const app = express();

// Middleware- nous permet de lire les données envoyées par le client 
app.use(json());
// client(frontend) est sur un port différent- localhost:3000 de celui du serveur(backend)-localhost:5000
// on doit donc autoriser les requêtes cross-origin
app.use(cors());

app.listen(5000, () => {
    console.log('Server has started on port 5000');
});