-- Index pour accélérer la recherche des chambre par hôtel
CREATE INDEX idx_chambre_hotel_id ON Chambre(hotel_id);
-- Cet index optimise rapidement la récupération des chambres par hôtel (getChambresByHotelId pour la page manageChambre.js
-- Il permet de filtrer efficacement les chambres sans parcourir l'intégralité de la table, améliorant significativement les performances des requêtes de filtrage par hôtel.

-- Index pour accélérer la jointure entre réservation et chambre
CREATE INDEX idx_reservation_chambre_id ON Reservation(chambre_id);
-- Cet index accélère les jointures complexes impliquant les réservations et les chambres, notamment dans les requêtes de vérification de statut de chambre. 
-- Il réduit considérablement le temps de jointure et de recherche lors de l'interrogation des réservations par chambre.

-- Index pour accélérer la recherche dans la table de réservation
CREATE INDEX idx_reservation_nas_client ON Reservation(nas_client);
-- Cet index optimise les requêtes de recherche de réservations par client, comme dans la fonction getClientReservation. 
-- Il permet un accès rapide et efficace aux réservations d'un client spécifique.

-- Index pour accélérer les mises à jour des chambres
CREATE INDEX idx_chambre_update ON Chambre(hotel_id, chambre_id);
-- Cet index optimise les opérations de mise à jour des chambres comme updateChambre et deleteChambre. 
-- Il permet de localiser rapidement les chambres spécifiques à mettre à jour au sein d'un hôtel, réduisant le temps de recherche lors des modifications.

-- Index pour accélérer les mises à jour des employés
CREATE INDEX idx_employe_update ON Employe(hotel_id, NAS_employe);
-- Cet index améliore les performances des opérations de mise à jour d'employés comme updateEmployee et deleteEmployee. 
-- Il permet une recherche rapide et précise des employés à modifier en combinant l'identifiant de l'hôtel et le numéro d'assurance sociale.
