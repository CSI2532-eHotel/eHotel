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

//fonction pour obtenir les informations d'un client par son courriel 
export const getClientProfileByEmail = async (req, res) => {
    try {
        const { email } = req.params;

        const result = await pool.query(
            "SELECT NAS_client, nom_client, prenom_client, rue, ville, code_postal, courriel_client, date_enregistrement FROM Client WHERE courriel_client = $1",
            [email]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Client not found" });
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: err.message });
    }
};

// fonction pour supprimer un client par son NAS
export const deleteClientByNAS = async (req, res) => {
    const { nas } = req.params;

    try {
        //Pas besoin de supprimer les réservations du client, car elles seront automatiquement supprimées en utilisant la contrainte ON DELETE CASCADE quand on a créé la table Réservation
        const result = await pool.query('DELETE FROM Client WHERE NAS_client = $1', [nas]);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Client non trouvé" });
        }

        res.status(200).json({ message: "Compte supprimé avec succès" });
    } catch (error) {
        console.error("Erreur lors de la suppression du compte:", error);
        res.status(500).json({ error: "Erreur lors de la suppression du compte" });
    }
};

//fonction pour mettre à jour les informations d'un client par son NAS
export const updateClientByNAS = async (req, res) => {
    const { nas } = req.params;
    const { nom_client, prenom_client, rue, ville, code_postal, courriel_client, motpasse_client } = req.body;

    try {
        const result = await pool.query(
            "UPDATE Client SET nom_client = $1, prenom_client = $2, rue = $3, ville = $4, code_postal = $5, courriel_client = $6, motpasse_client = $7 WHERE NAS_client = $8 RETURNING *",
            [nom_client, prenom_client, rue, ville, code_postal, courriel_client, motpasse_client, nas]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Client non trouvé" });
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: err.message });
    }
};

// fonction pour modifier le profil / personal info
// supposer que le client remplit toutes les cases
// no security for password
export const updateClientProfile = async (req, res) => {
    try {
        const { NAS_client, nom_client, prenom_client, rue, ville, code_postal, motpasse_client } = req.body;
        const courriel_client = req.user?.email; 

        const updateQuery = `
            UPDATE Client
            SET 
                NAS_client = $1,
                nom_client = $2,
                prenom_client = $3,
                rue = $4,
                ville = $5,
                code_postal = $6,
                motpasse_client = $7
            WHERE courriel_client = $8
            RETURNING *;
        `;

        const values = [ 
            NAS_client,
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
        console.error('Erreur lors de la mise à jour du profil client:', err.message);
        res.status(500).json({ error: err.message });
    }
};
