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

//fontion pour creer une reservation
export const insertClientReservation = async (req, res) => {
    try {
        const { debut_date_reservation, fin_date_reservation, NAS_client, chambre_ID } = req.body;

        // Validate input
        if (!debut_date_reservation || !fin_date_reservation || !NAS_client || !chambre_ID) {
            return res.status(400).json({ error: "Remplissez tous les cases." });
        }

        // Insert into reservation table
        const newReservation = await pool.query(
            "INSERT INTO reservation (debut_date_reservation, fin_date_reservation, NAS_client, chambre_ID) VALUES ($1, $2, $3, $4) RETURNING *",
            [debut_date_reservation, fin_date_reservation, NAS_client, chambre_ID]
        );

        res.status(201).json({
            message: "Reservation complete",
            reservation: newReservation.rows[0]
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: err.message });
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