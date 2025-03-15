/*
*Ce ficher contient les informations de connexion à la base de données
*/
//prend toutes les informations de la base de données pg et mettre dans l'objet pool
import pkg from 'pg';
import env from 'dotenv';
const { Pool } = pkg;
env.config(); // Load environment variables

//crée un instance de pool pour se connecter à la base de données
const pool = new Pool({
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT
});

export default pool;