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

export const confirmClientReservation = async (req, res) => {
  try {
      const { reservation_ID, transaction_date, NAS_employe } = req.body;

      // Step 1: Check if the reservation exists
      const reservation = await pool.query(
          "SELECT * FROM reservation WHERE reservation_ID = $1",
          [reservation_ID]
      );

      if (reservation.rows.length === 0) {
          return res.status(404).json({ error: "Reservation not found" });
      }

      // Extract reservation details
      const {
          debut_date_reservation,
          fin_date_reservation,
          NAS_client,
          chambre_ID
      } = reservation.rows[0];

      // Step 2: Insert into location table (WITHOUT deleting the reservation)
      const newLocation = await pool.query(
          "INSERT INTO location (debut_date_location, fin_date_location, montant, transaction_date, NAS_employe, NAS_client, chambre_ID, reservation_ID) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
          [
              debut_date_reservation,
              fin_date_reservation,
              500, // Default amount (Modify as needed)
              transaction_date,
              NAS_employe,
              NAS_client,
              chambre_ID,
              reservation_ID
          ]
      );

      res.status(201).json({
          message: "Reservation confirmed and converted to location",
          location: newLocation.rows[0]
      });
  } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: err.message });
  }
};
