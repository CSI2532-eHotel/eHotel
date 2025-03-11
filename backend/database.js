/*
*Ce ficher contient tous les requêtes de la base de données
*/

//prend toutes les informations de la base de données pg et mettre dans l'objet pool
import pkg from 'pg';
import env from 'dotenv';
const { Pool } = pkg;
env.config(); // Load environment variables

//on crée un instance de pool pour se connecter à la base de données
const pool = new Pool({
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT
});

// ==================================insertion(insert)====================================
//fonction pour inserer un client
export const insertClient = async (req, res) => {
    try {
        const { NAS_client, nom_client, prenom_client, rue, ville, code_postal, courriel_client, motpasse_client, date_enregistrement } = req.body;
        
        const newClient = await pool.query(
            "INSERT INTO Client (nas_client, nom_client, prenom_client, rue, ville, code_postal, courriel_client, motpasse_client, date_enregistrement) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
            [NAS_client, nom_client, prenom_client, rue, ville, code_postal, courriel_client, motpasse_client, date_enregistrement]
        );
        //RETURNING * renvoie immédiatement les valeurs du client ajouté
        res.status(201).json(newClient.rows[0]); //renvoie le client inseré
    } catch (err) {
        console.error(err.message);
        // Send proper error response to client
        res.status(500).json({ error: err.message });
    }
};










// ==================================selection (select)==================================














//=======================================mise à jour (update)=============================












//===========================================suppression (delete)==========================
export default pool;