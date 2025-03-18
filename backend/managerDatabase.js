/*
* Ce fichier contient toutes les requêtes et fonctions liées aux gestionnaires
* Les fonctions suivantes sont incluses:
* - getEmployeesByHotelId: obtenir tous les employés qui travaillent dans le même hôtel que le gestionnaire
* - insertEmployee: insérer un nouveau employé dans l'hotel ou le gestionnaire travaille
* - updateEmployee: mettre à jour un employé de l'hôtel ou le gestionnaire travaille
* - deleteEmployee: supprimer un employé de l'hôtel ou le gestionnaire travaille
* - getClientsByHotelId: obtenir tous les clients de l'hôtel où le gestionnaire travaille
* - getClientsByHotelId: obtenir tous les clients de l'hôtel où le gestionnaire travaille
* - getClientReservations: obtenir les réservations d'un client de l'hôtel où le gestionnaire travaille
* - getClientLocations: obtenir les locations d'un client de l'hôtel où le gestionnaire travaille
* - getHotelById: obtenir les informations de l'hôtel où le gestionnaire travaille
* - getChambresByHotelId: obtenir toutes les chambres de l'hôtel où le gestionnaire travaille
* - getChambreStatus: obtenir le statut d'une chambre (si elle est louée, réservée ou disponible)
* - insertChambre: insérer une nouvelle chambre dans l'hôtel où le gestionnaire travaille
* - updateChambre: mettre à jour une chambre de l'hôtel où le gestionnaire travaille
* - deleteChambre: supprimer une chambre de l'hôtel où le gestionnaire travaille
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

//fonction pour inserer un nouveau employé dans l'hotel ou le gestionnaire travaille    
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

//fonction pour mettre à jour un employé de l'hôtel ou le gestionnaire travaille
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

// fonction pour supprimer un employé par son NAS de l'hôtel ou le gestionnaire travaille
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

// Fonction pour obtenir tous les clients de l'hôtel où le manager travaille
export const getClientsByHotelId = async (req, res) => {
    try {
        const { hotelId } = req.params;
        const clients = await pool.query(
            `SELECT DISTINCT c.* 
             FROM Client c
             LEFT JOIN Reservation r ON c.NAS_client = r.NAS_client
             LEFT JOIN Chambre ch ON r.chambre_ID = ch.chambre_ID
             LEFT JOIN Location l ON c.NAS_client = l.NAS_client
             LEFT JOIN Chambre ch2 ON l.chambre_ID = ch2.chambre_ID
             WHERE ch.hotel_ID = $1 OR ch2.hotel_ID = $1`,
            [hotelId]
        );
        // Exclure les mots de passe de la réponse
        const clientsWithoutPasswords = clients.rows.map(client => {
            const { motpasse_client, ...clientWithoutPassword } = client;
            return clientWithoutPassword;
        });

        res.json(clientsWithoutPasswords);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: err.message });
    }
};

// Fonction pour obtenir les réservations d'un client de l'hôtel où le manager travaille
export const getClientReservations = async (req, res) => {
    try {
        const { nasClient } = req.params;
        const reservations = await pool.query(
            "SELECT * FROM Reservation WHERE NAS_client = $1 ORDER BY debut_date_reservation DESC",
            [nasClient]
        );
        res.json(reservations.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: err.message });
    }
};

// Fonction pour obtenir les locations d'un client  de l'hôtel où le manager travaille
export const getClientLocations = async (req, res) => {
    try {
        const { nasClient } = req.params;
        const locations = await pool.query(
            "SELECT * FROM Location WHERE NAS_client = $1 ORDER BY debut_date_location DESC",
            [nasClient]
        );
        res.json(locations.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: err.message });
    }
};

// Fonction pour obtenir les informations de l'hôtel où le manager travaille
export const getHotelById = async (req, res) => {
    try {
        const { hotelId } = req.params;
        const hotel = await pool.query(
            "SELECT * FROM Hotel WHERE hotel_ID = $1",
            [hotelId]
        );
        if (hotel.rows.length === 0) {
            return res.status(404).json({ error: "Hôtel non trouvé" });
        }
        res.json(hotel.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: err.message });
    }
};

// Fonction pour obtenir toutes les chambres de l'hôtel ou le manager travaille
export const getChambresByHotelId = async (req, res) => {
    try {
        const { hotelId } = req.params;
        const chambres = await pool.query(
            `SELECT 
                c.chambre_id, 
                c.prix, 
                c.commodite, 
                c.capacite, 
                c.extensible, 
                c.dommage, 
                c.vue, 
                c.hotel_id,
                CASE 
                    WHEN l.chambre_id IS NOT NULL THEN 'loué'
                    WHEN r.chambre_id IS NOT NULL THEN 'réservé'
                    ELSE 'disponible'
                END as status
            FROM 
                Chambre c
            LEFT JOIN 
                (SELECT chambre_id FROM Reservation WHERE CURRENT_DATE BETWEEN debut_date_reservation AND fin_date_reservation) r 
                ON c.chambre_id = r.chambre_id
            LEFT JOIN 
                (SELECT chambre_id FROM Location WHERE CURRENT_DATE BETWEEN debut_date_location AND fin_date_location) l 
                ON c.chambre_id = l.chambre_id
            WHERE 
                c.hotel_id = $1
            ORDER BY 
                c.chambre_id`,
            [hotelId]
        );
        
        res.json(chambres.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: err.message });
    }
};

// Fonction pour obtenir le statut d'une chambre (si elle est louée, réservée ou disponible)
export const getChambreStatus = async (req, res) => {
    try {
        const { chambreId } = req.params;
        // Vérifier si la chambre est en location ou réservation
        const statut = await pool.query(
            `SELECT 
                EXISTS(SELECT 1 FROM Reservation WHERE chambre_id = $1 AND CURRENT_DATE BETWEEN debut_date_reservation AND fin_date_reservation) as is_reserved,
                EXISTS(SELECT 1 FROM Location WHERE chambre_id = $1 AND CURRENT_DATE BETWEEN debut_date_location AND fin_date_location) as is_rented
            `,
            [chambreId]
        );
        
        const { is_reserved, is_rented } = statut.rows[0];
        // Une chambre peut être supprimée uniquement si elle n'est ni réservée ni louée
        const can_delete = !is_reserved && !is_rented;
        res.json({ 
            can_delete, 
            status: is_rented ? 'loué' : (is_reserved ? 'réservé' : 'disponible')
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: err.message });
    }
};

// Fonction pour inserer une nouvelle chambre dans l'hôtel ou le manager travaille
export const insertChambre = async (req, res) => {
    try {
        const { 
            chambre_ID,
            prix, 
            commodite, 
            capacite, 
            extensible, 
            dommage, 
            vue, 
            hotel_ID 
        } = req.body;
        
        const newChambre = await pool.query(
            "INSERT INTO Chambre (chambre_id, prix, commodite, capacite, extensible, dommage, vue, hotel_id) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
            [chambre_ID, prix, commodite, capacite, extensible, dommage, vue, hotel_ID]
        );
        
        res.status(201).json(newChambre.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: err.message });
    }
};

// Fonction pour mettre à jour une chambre existante
export const updateChambre = async (req, res) => {
    try {
        const { chambreId } = req.params;
        const { 
            prix, 
            commodite, 
            capacite, 
            extensible, 
            dommage, 
            vue 
        } = req.body;
        
        const updatedChambre = await pool.query(
            "UPDATE Chambre SET prix = $1, commodite = $2, capacite = $3, extensible = $4, dommage = $5, vue = $6 WHERE chambre_id = $7 RETURNING *",
            [prix, commodite, capacite, extensible, dommage, vue, chambreId]
        );
        if (updatedChambre.rows.length === 0) {
            return res.status(404).json({ error: "Chambre non trouvée" });
        }
        res.json(updatedChambre.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: err.message });
    }
};

// Fonction pour supprimer une chambre
export const deleteChambre = async (req, res) => {
    try {
        const { chambreId } = req.params;
        
        // Vérifier d'abord si la chambre est réservée ou louée
        const statut = await pool.query(
            `SELECT 
                EXISTS(SELECT 1 FROM Reservation WHERE chambre_id = $1 AND CURRENT_DATE BETWEEN debut_date_reservation AND fin_date_reservation) as is_reserved,
                EXISTS(SELECT 1 FROM Location WHERE chambre_id = $1 AND CURRENT_DATE BETWEEN debut_date_location AND fin_date_location) as is_rented
            `,
            [chambreId]
        );
        
        const { is_reserved, is_rented } = statut.rows[0];
        if (is_reserved || is_rented) {
            return res.status(400).json({ 
                error: "Impossible de supprimer cette chambre car elle est actuellement réservée ou louée" 
            });
        }
        
        // Si la chambre n'est ni réservée ni louée, on peut la supprimer
        const deletedChambre = await pool.query(
            "DELETE FROM Chambre WHERE chambre_id = $1 RETURNING *",
            [chambreId]
        );
        
        if (deletedChambre.rows.length === 0) {
            return res.status(404).json({ error: "Chambre non trouvée" });
        }
        
        res.json({ message: "Chambre supprimée avec succès" });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: err.message });
    }
};