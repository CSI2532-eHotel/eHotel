
-- Table pour archiver les réservations
CREATE TABLE IF NOT EXISTS ArchiveReservation (
    archive_reservation_id SERIAL PRIMARY KEY,
    reservation_id INTEGER,
    debut_date_reservation DATE,
    fin_date_reservation DATE,
    nas_client INTEGER,
    chambre_id INTEGER,
    date_archive TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table pour archiver les locations
CREATE TABLE IF NOT EXISTS ArchiveLocation (
    archive_location_id SERIAL PRIMARY KEY,
    location_id INTEGER,
    debut_date_location DATE,
    fin_date_location DATE,
    montant INTEGER,
    transaction_date DATE,
    nas_employe INTEGER,
    nas_client INTEGER,
    chambre_id INTEGER,
    reservation_id INTEGER,
    date_archive TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Trigger pour ajouter automatiquement la date de transaction lors de l'insertion dans Location
CREATE OR REPLACE FUNCTION set_transaction_date()
RETURNS TRIGGER AS $$
BEGIN
    NEW.transaction_date := CURRENT_DATE;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER trigger_set_transaction_date
BEFORE INSERT ON Location
FOR EACH ROW
EXECUTE FUNCTION set_transaction_date();

-- Trigger pour archiver les réservations passées
CREATE OR REPLACE FUNCTION archive_past_reservations()
RETURNS TRIGGER AS $$
BEGIN
    -- Archiver les réservations passées
    INSERT INTO ArchiveReservation (
        reservation_id, debut_date_reservation, fin_date_reservation, nas_client, chambre_id
    )
    SELECT 
        reservation_id, debut_date_reservation, fin_date_reservation, nas_client, chambre_id
    FROM 
        Reservation
    WHERE 
        fin_date_reservation < CURRENT_DATE;
    
    -- Supprimer les réservations archivées
    DELETE FROM Reservation WHERE fin_date_reservation < CURRENT_DATE;
    
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER trigger_archive_past_reservations
AFTER INSERT OR UPDATE ON Reservation
EXECUTE FUNCTION archive_past_reservations();

CREATE OR REPLACE TRIGGER trigger_archive_past_locations
AFTER INSERT OR UPDATE ON Location
EXECUTE FUNCTION archive_past_locations();

-- Trigger pour archiver une réservation après qu'elle a été convertie en location
CREATE OR REPLACE FUNCTION archive_reservation_after_location()
RETURNS TRIGGER AS $$
BEGIN
   -- Archiver la réservation
    INSERT INTO ArchiveReservation (
        reservation_id, debut_date_reservation, fin_date_reservation, nas_client, chambre_id
    )
    SELECT 
        r.reservation_id, r.debut_date_reservation, r.fin_date_reservation, r.nas_client, r.chambre_id
    FROM 
        Reservation r
    WHERE 
        r.reservation_id = NEW.reservation_id;
    
    -- Supprimer la réservation de la table Reservation
    DELETE FROM Reservation WHERE reservation_id = NEW.reservation_id;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER trigger_archive_reservation_after_location
AFTER INSERT ON Location
FOR EACH ROW
EXECUTE FUNCTION archive_reservation_after_location();

-- Trigger pour archiver les locations passées
CREATE OR REPLACE FUNCTION archive_past_locations()
RETURNS TRIGGER AS $$
BEGIN

    INSERT INTO ArchiveLocation (
        location_id, debut_date_location, fin_date_location, montant, transaction_date,
        nas_employe, nas_client, chambre_id, reservation_id
    )
    SELECT 
        location_id, debut_date_location, fin_date_location, montant, transaction_date,
        nas_employe, nas_client, chambre_id, reservation_id
    FROM 
        Location
    WHERE 
        fin_date_location < CURRENT_DATE;
    
    -- Supprimer les locations archivées
    DELETE FROM Location WHERE fin_date_location < CURRENT_DATE;
    
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;
