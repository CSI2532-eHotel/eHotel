-- Index pour accélérer la recherche des chambre par hôtel
CREATE INDEX idx_chambre_hotel_id ON Chambre(hotel_id);

-- Index pour accélérer la jointure entre réservation et chambre
CREATE INDEX idx_reservation_chambre_id ON Reservation(chambre_id);

-- Index pour accélérer la recherche d'employé par NAS
CREATE INDEX idx_employe_nas ON Employe(NAS_employe);

-- Index pour accélérer la recherche dans la table de réservation
CREATE INDEX idx_reservation_nas_client ON Reservation(nas_client);
