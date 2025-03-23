/*
 * Ce fichier contient toutes les requêtes et fonctions liées aux employés
 */

import pool from "./configDatabase.js";

//fonction pour validate employee login
export const validateEmployeeLogin = async (req, res) => {
    try {
        const { courriel, motpasse } = req.body;

        const result = await pool.query(
            "SELECT NAS_employe, nom_employe, prenom_employe, role, courriel_employee, hotel_ID FROM Employe WHERE courriel_employee = $1 AND motpasse_employee = $2",
            [courriel, motpasse]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({ success: false, message: "Courriel ou mot de passe incorrect" });
        }

        const employee = result.rows[0];
        const isManager = employee.role === 'gestionnaire';
        const isReceptionist = employee.role === 'receptioniste';

        // seulement les gestionnaires (login into manager page) et receptionistes (login into employee page) peuvent se connecter
        if (!isManager && !isReceptionist) {
            return res.status(403).json({
                success: false,
                message: "Accès non autorisé. Seuls les gestionnaires et receptionistes peuvent se connecter."
            });
        }

        res.json({
            success: true,
            userType: "employee",
            userData: {
                ...employee,
                est_gestionnaire: isManager,
                est_receptioniste: isReceptionist
            }
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, error: err.message });
    }
};

//fonction pour obtenir tous les reservations des clients qui ont réservé des chambres dans hotel ou l'employe travaille
export const getClientReservation = async (req, res) => {
    try {
        const { employeeId } = req.params;

        // obtenir l'hotel_id de l'employe
        const employeeResult = await pool.query(
            "SELECT hotel_ID FROM Employe WHERE NAS_employe = $1",
            [employeeId]
        );

        if (employeeResult.rows.length === 0) {
            return res.status(404).json({ success: false, message: "Employé non trouvé" });
        }

        const hotelId = employeeResult.rows[0].hotel_id;

        const reservationsResult = await pool.query(
            `SELECT r.reservation_id, r.debut_date_reservation, r.fin_date_reservation, 
                c.nas_client, c.nom_client, c.prenom_client, 
                ch.chambre_id, ch.prix as montant
         FROM Reservation r
         JOIN Client c ON r.nas_client = c.nas_client
         JOIN Chambre ch ON r.chambre_id = ch.chambre_id
         JOIN Hotel h ON ch.hotel_id = h.hotel_id
         WHERE h.hotel_id = $1
         ORDER BY r.debut_date_reservation ASC`,
            [hotelId]
        );

        res.json({
            success: true,
            reservations: reservationsResult.rows
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, message: err.message });
    }
};

// Fonction pour supprimer une réservation
export const deleteReservation = async (req, res) => {
    try {
        const { reservationId } = req.params;

        // Vérifier si la réservation existe
        const checkResult = await pool.query(
            "SELECT reservation_id FROM Reservation WHERE reservation_id = $1",
            [reservationId]
        );

        if (checkResult.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Réservation non trouvée"
            });
        }

        // Supprimer la réservation
        await pool.query(
            "DELETE FROM Reservation WHERE reservation_id = $1",
            [reservationId]
        );

        res.json({
            success: true,
            message: "Réservation annulée avec succès"
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, message: err.message });
    }
};

// Fonction pour créer une location à partir d'une réservation
export const createLocationFromReservation = async (req, res) => {
    const client = await pool.connect();
    try {
        // Start transaction
        await client.query('BEGIN');
        
        const { debut_date_location, fin_date_location, montant, NAS_employe, NAS_client, chambre_ID, reservation_ID } = req.body;
        
        // Get reservation details to ensure we have all the data
        const reservationResult = await client.query(
            `SELECT * FROM Reservation WHERE reservation_id = $1`,
            [reservation_ID]
        );
        
        if (reservationResult.rows.length === 0) {
            throw new Error("Réservation non trouvée");
        }
        
        // Insert into Location table - the transaction_date will be set by the trigger
        const locationResult = await client.query(
            `INSERT INTO Location 
            (debut_date_location, fin_date_location, montant, NAS_employe, NAS_client, chambre_ID, reservation_ID) 
            VALUES ($1, $2, $3, $4, $5, $6, $7) 
            RETURNING *`,
            [debut_date_location, fin_date_location, montant, NAS_employe, NAS_client, chambre_ID, reservation_ID]
        );
        
        // The trigger archive_reservation_after_location will handle archiving and deletion

        // Commit transaction
        await client.query('COMMIT');
        
        res.json({
            success: true,
            message: "Location créée avec succès et réservation archivée",
            location: locationResult.rows[0]
        });
    } catch (err) {
        // Rollback in case of error
        await client.query('ROLLBACK');
        console.error("Erreur détaillée:", err);
        res.status(500).json({ success: false, message: err.message });
    } finally {
        client.release();
    }
};

// Fonction pour obtenir toutes les locations de l'hôtel où travaille l'employé
export const getClientLocation = async (req, res) => {
    try {
        const { employeeId } = req.params;

        // obtenir l'hotel_id de l'employe
        const employeeResult = await pool.query(
            "SELECT hotel_ID FROM Employe WHERE NAS_employe = $1",
            [employeeId]
        );

        if (employeeResult.rows.length === 0) {
            return res.status(404).json({ success: false, message: "Employé non trouvé" });
        }

        const hotelId = employeeResult.rows[0].hotel_id;

        const locationsResult = await pool.query(
            `SELECT l.location_id, l.debut_date_location, l.fin_date_location, l.montant, l.transaction_date,
                c.nas_client, c.nom_client, c.prenom_client, 
                ch.chambre_id, 
                e.nas_employe, e.nom_employe, e.prenom_employe
         FROM Location l
         JOIN Client c ON l.nas_client = c.nas_client
         JOIN Chambre ch ON l.chambre_id = ch.chambre_id
         JOIN Employe e ON l.nas_employe = e.nas_employe
         JOIN Hotel h ON ch.hotel_id = h.hotel_id
         WHERE h.hotel_id = $1
         ORDER BY l.transaction_date DESC`,
            [hotelId]
        );

        res.json({
            success: true,
            locations: locationsResult.rows
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, message: err.message });
    }
};