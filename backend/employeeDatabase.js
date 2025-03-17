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
