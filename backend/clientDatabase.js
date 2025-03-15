/*
* Ce fichier contient tous les requêtes et fonctions liées aux clients
*/
import pool from './configDatabase.js';

// fonction pour insérer un client
export const insertClient = async (req, res) => {
    try {
        const { NAS_client, nom_client, prenom_client, rue, ville, code_postal, courriel_client, motpasse_client, date_enregistrement } = req.body;
        
        const newClient = await pool.query(
            "INSERT INTO Client (nas_client, nom_client, prenom_client, rue, ville, code_postal, courriel_client, motpasse_client, date_enregistrement) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
            [NAS_client, nom_client, prenom_client, rue, ville, code_postal, courriel_client, motpasse_client, date_enregistrement]
        );
        res.status(201).json(newClient.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: err.message });
    }
};

// fonction pour validate client login
export const validateClientLogin = async (req, res) => {
    try {
        const { courriel, motpasse } = req.body;
        
        const result = await pool.query(
            "SELECT nas_client, nom_client, prenom_client, courriel_client FROM Client WHERE courriel_client = $1 AND motpasse_client = $2",
            [courriel, motpasse]
        );
        
        if (result.rows.length === 0) {
            return res.status(401).json({ success: false, message: "Courriel ou mot de passe incorrect" });
        }
        
        res.json({ 
            success: true, 
            userType: "client", 
            userData: result.rows[0]
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, error: err.message });
    }
};

// fonction pour update client profile / personal info
// no NAS_client => this info doesn't change
// no password hashing for now - client can just change password directly
// email can also be changed easily
export const updateClientProfile = async (req, res) => {
    try {
        const { NAS_client, nom_client, prenom_client, rue, ville, code_postal, courriel_client, motpasse_client } = req.body;
        
        const updateQuery = `
            UPDATE Client
            SET 
                nom_client = $1,
                prenom_client = $2,
                rue = $3,
                ville = $4,
                code_postal = $5,
                motpasse_client = $6
            WHERE courriel_client = $7
            RETURNING *;
        `;

        const values = [
            nom_client, 
            prenom_client, 
            rue, 
            ville, 
            code_postal, 
            motpasse_client, 
            courriel_client
        ];

        const updatedClient = await pool.query(updateQuery, values);

        res.status(200).json(updatedClient.rows[0]);
    } catch (err) {
        console.error('Error updating client profile:', err.message);
        res.status(500).json({ error: err.message });
    }
};

