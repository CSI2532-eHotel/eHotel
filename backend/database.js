/*
*Ce ficher contient tous les requêtes de la base de données
*/

//prend toutes les informations de la base de données pg et mettre dans l'objet pool
import pkg from 'pg';
const { Pool } = pkg;

//on crée un instance de pool pour se connecter à la base de données
const pool = new Pool({
    user: "csi2532_ehotel",
    database:"ehotel",
    password:"ehotel",
    host:"ehotel.ddns.net",
    port:5432
});

// ==================================insertion(insert)====================================
//fonction pour inserer un client
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

//fonction pour inserer une location
export const insertLocation = async (req, res) => {
    try {
        const { location_ID, debut_date_location, fin_date_location, montant, transaction_date, NAS_employe, NAS_client, chambre_ID, reservation_ID } = req.body;
        
        const newLocation = await pool.query(
            "INSERT INTO Location (location_ID, debut_date_location, fin_date_location, montant, transaction_date, NAS_employe, NAS_client, chambre_ID, reservation_ID) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
            [location_ID, debut_date_location, fin_date_location, montant, transaction_date, NAS_employe, NAS_client, chambre_ID, reservation_ID]
        );

        res.status(201).json(newLocation.rows[0]); // Retourne l’entrée ajoutée
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: err.message });
    }
};









// ==================================selection (select)==================================














//=======================================mise à jour (update)=============================












//===========================================suppression (delete)==========================
export default pool;