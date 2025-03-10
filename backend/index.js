import express from 'express';
import cors from 'cors';
import { insertClient } from './database.js';

const app = express();

// Middleware- nous permet de lire les données envoyées par le client 
app.use(express.json());
// client(frontend) est sur un port différent- localhost:3000 de celui du serveur(backend)-localhost:5000
// on doit donc autoriser les requêtes cross-origin
app.use(cors());

// =================================route pour insertion (post)===========================
//route pour inserer un client
app.post('/api/client', insertClient); 

// =================================route pour selection (get)===========================


// =================================route pour mis à jour (put)===========================

// =================================route pour suppression (delete)===========================

app.listen(5000, () => {
    console.log('Server has started on port 5000');
});