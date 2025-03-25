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

// Fonction pour obtenir les chambres disponibles par zone (ville)
export const getRoomsByZone = async (req, res) => {
    try {
        const query = `
            SELECT 
                h.hotel_ID, h.nom_hotel, h.rue, h.ville, h.code_postal, h.etoile,
                c.chambre_ID, c.prix, c.commodite, c.capacite, c.extensible, c.vue
            FROM 
                Hotel h
            JOIN 
                Chambre c ON h.hotel_ID = c.hotel_ID
            WHERE 
                c.dommage = 'non' 
                AND c.chambre_ID NOT IN (
                    SELECT chambre_ID FROM Location 
                    WHERE current_date BETWEEN debut_date_location AND fin_date_location
                    
                    UNION
                    
                    SELECT chambre_ID FROM Reservation 
                    WHERE current_date BETWEEN debut_date_reservation AND fin_date_reservation
                )
            ORDER BY h.ville, h.nom_hotel
        `;

        const result = await pool.query(query);

        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: err.message });
    }
};

// Fonction pour obtenir les chambres disponibles par capacité
export const getRoomsByCapacity = async (req, res) => {
    try {
        const query = `
            SELECT 
                h.hotel_ID, h.nom_hotel, h.rue, h.ville, h.code_postal, h.etoile,
                c.chambre_ID, c.prix, c.commodite, c.capacite, c.extensible, c.vue
            FROM 
                Hotel h
            JOIN 
                Chambre c ON h.hotel_ID = c.hotel_ID
            WHERE 
                c.dommage = 'non' 
                AND c.chambre_ID NOT IN (
                    SELECT chambre_ID FROM Location 
                    WHERE current_date BETWEEN debut_date_location AND fin_date_location
                    
                    UNION
                    
                    SELECT chambre_ID FROM Reservation 
                    WHERE current_date BETWEEN debut_date_reservation AND fin_date_reservation
                )
            ORDER BY c.capacite, h.nom_hotel
        `;

        const result = await pool.query(query);

        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: err.message });
    }
};

// Fonction pour créer une réservation
export const createClientReservation = async (req, res) => {
    const { NAS_client, chambre_ID, debut_date_reservation, fin_date_reservation } = req.body;

    try {
        // Vérifier si la chambre est disponible pour ces dates
        const checkAvailable = await pool.query(
            `SELECT * FROM Chambre
             WHERE chambre_ID = $1
             AND dommage = 'non'
             AND chambre_ID NOT IN (
                SELECT chambre_ID FROM Location 
                WHERE $2 <= fin_date_location AND $3 >= debut_date_location
                
                UNION
                
                SELECT chambre_ID FROM Reservation 
                WHERE $2 <= fin_date_reservation AND $3 >= debut_date_reservation
             )`,
            [chambre_ID, debut_date_reservation, fin_date_reservation]
        );

        if (checkAvailable.rows.length === 0) {
            return res.status(400).json({
                success: false,
                message: "La chambre n'est pas disponible pour ces dates"
            });
        }

        // Créer la réservation
        const newReservation = await pool.query(
            "INSERT INTO Reservation (debut_date_reservation, fin_date_reservation, NAS_client, chambre_ID) VALUES($1, $2, $3, $4) RETURNING *",
            [debut_date_reservation, fin_date_reservation, NAS_client, chambre_ID]
        );

        res.status(201).json({
            success: true,
            reservation: newReservation.rows[0]
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, error: err.message });
    }
};

// Function to get all reservations for a client
export const getmyReservations = async (req, res) => {
    try {
        const { nasClient } = req.params;

        const query = `
            SELECT 
                r.reservation_ID, 
                r.NAS_client,
                r.chambre_ID,
                r.debut_date_reservation,
                r.fin_date_reservation,
                h.nom_hotel as hotel_name,
                h.rue,
                h.ville,
                h.code_postal,
                h.etoile,
                c.vue,
                c.extensible,
                c.commodite,
                c.prix,
                c.capacite
            FROM 
                Reservation r
            JOIN 
                Chambre c ON r.chambre_ID = c.chambre_ID
            JOIN 
                Hotel h ON c.hotel_ID = h.hotel_ID
            WHERE 
                r.NAS_client = $1
            ORDER BY 
                r.debut_date_reservation DESC
        `;

        const result = await pool.query(query, [nasClient]);
        res.json(result.rows);
    } catch (err) {
        console.error("Error fetching client reservations:", err.message);
        res.status(500).json({ error: err.message });
    }
};
