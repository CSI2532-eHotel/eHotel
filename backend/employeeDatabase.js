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
         WHERE h.hotel_id = $1`,
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