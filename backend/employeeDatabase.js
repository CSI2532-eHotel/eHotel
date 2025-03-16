/*
 * Ce fichier contient toutes les requêtes et fonctions liées aux employés
 */

import pool from "./configDatabase.js";

//fonction pour validate employee login
export const validateEmployeeLogin = async (req, res) => {
  try {
    const { courriel, motpasse } = req.body;

    const result = await pool.query(
      "SELECT e.nas_employe, e.nom_employe, e.prenom_employe, e.courriel_employee, e.role, e.hotel_id " +
        "FROM Employe e WHERE e.courriel_employee = $1 AND e.motpasse_employee = $2",
      [courriel, motpasse]
    );

    console.log("result.rows", result.rows);

    if (result.rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Courriel ou mot de passe incorrect",
      });
    }

    //verifier si l'employé est gestionnaire
    const userData = {
      ...result.rows[0],
      est_gestionnaire: result.rows[0].role === "gestionnaire",
    };

    res.json({
      success: true,
      userType: "employee",
      userData: userData,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, error: err.message });
  }
};
