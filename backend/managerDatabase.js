/*
* Ce fichier contient toutes les requêtes et fonctions liées aux gestionnaires
*/
import pool from './configDatabase.js';

//fonction pour obtenir tous les employés qui travaillent dans le même hôtel que le gestionnaire
export const getEmployeesByHotelId = async (req, res) => {
    try {
        const { hotelId } = req.params;
        const employees = await pool.query(
            "SELECT NAS_employe, nom_employe, prenom_employe, rue, ville, code_postal, role, courriel_employee FROM Employe WHERE hotel_ID = $1",
            [hotelId]
        );
        res.json(employees.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: err.message });
    }
};

//fonction pour inserer un nouveau employé
export const insertEmployee = async (req, res) => {
    try {
        const { 
            NAS_employe, 
            nom_employe, 
            prenom_employe, 
            rue, 
            ville, 
            code_postal, 
            role, 
            courriel_employee, 
            motpasse_employee, 
            hotel_ID 
        } = req.body;

        const newEmployee = await pool.query(
            "INSERT INTO Employe (NAS_employe, nom_employe, prenom_employe, rue, ville, code_postal, role, courriel_employee, motpasse_employee, hotel_ID) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *",
            [NAS_employe, nom_employe, prenom_employe, rue, ville, code_postal, role, courriel_employee, motpasse_employee, hotel_ID]
        );
        
        res.status(201).json(newEmployee.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: err.message });
    }
};

//fonction pour meettre à jour un employé
export const updateEmployee = async (req, res) => {
    try {
        const { nas } = req.params;
        const { 
            nom_employe, 
            prenom_employe, 
            rue, 
            ville, 
            code_postal, 
            role, 
            courriel_employee, 
            motpasse_employee 
        } = req.body;
        const updatedEmployee = await pool.query(
            "UPDATE Employe SET nom_employe = $1, prenom_employe = $2, rue = $3, ville = $4, code_postal = $5, role = $6, courriel_employee = $7, motpasse_employee = $8 WHERE NAS_employe = $9 RETURNING *",
            [nom_employe, prenom_employe, rue, ville, code_postal, role, courriel_employee, motpasse_employee, nas]
        );
        if (updatedEmployee.rows.length === 0) {
            return res.status(404).json({ error: "Employé non trouvé" });
        }
        res.json(updatedEmployee.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: err.message });
    }
};

// fonction pour supprimer un employé par son NAS
export const deleteEmployee = async (req, res) => {
    try {
        const { nas } = req.params;
        const deletedEmployee = await pool.query(
            "DELETE FROM Employe WHERE NAS_employe = $1 RETURNING *",
            [nas]
        );
        if (deletedEmployee.rows.length === 0) {
            return res.status(404).json({ error: "Employé non trouvé" });
        }
        res.json({ message: "Employé supprimé avec succès" });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: err.message });
    }
};