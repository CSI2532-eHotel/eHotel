-- Vue 1: Nombre de chambres disponibles par zone (ville), on suppose que zone implique les chambres des hôtels dans une ville spécifique- Ottawa, Chicago, Dallas,etc
--recherche des chambres disponibles par zone qui ne sont pas endommagées et qui ne sont pas actuellement en location ou réservées
CREATE VIEW ChambresDisponibleParZone AS
SELECT 
    h.ville, 
    COUNT(c.chambre_ID) AS nombre_chambres_disponibles
FROM 
    Hotel h
JOIN 
    Chambre c ON h.hotel_ID = c.hotel_ID
WHERE 
    c.dommage = 'non' -- Chambre pas endommagée
    AND c.chambre_ID NOT IN (
        -- Chambres actuellement en location
        SELECT chambre_ID FROM Location 
        WHERE current_date BETWEEN debut_date_location AND fin_date_location
        
        UNION
        
        -- Chambres réservées mais pas encore en location
        SELECT chambre_ID FROM Reservation 
        WHERE current_date BETWEEN debut_date_reservation AND fin_date_reservation
    )
GROUP BY 
    h.ville;

-- Vue 2: Capacité de toutes les chambres d'un hôtel spécifique (on suppose la capacité de chaque chambre est soit simple, double ou famille comme dans la description du projet)
--recherche les chambre disponibles par capacité qui ne sont pas endommagées et qui ne sont pas actuellement en location ou réservées
CREATE VIEW CapaciteChambresParHotel AS
SELECT 
    h.hotel_ID,
    h.nom_hotel,
    c.capacite,
    COUNT(c.chambre_ID) AS nombre_chambres
FROM 
    Hotel h
JOIN 
    Chambre c ON h.hotel_ID = c.hotel_ID
GROUP BY 
    h.hotel_ID, h.nom_hotel, c.capacite;