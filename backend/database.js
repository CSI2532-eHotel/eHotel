//prend toutes les informations de la base de données pg et mettre dans l'objet pool
import pkg from 'pg';
const { Pool } = pkg;

//on crée un instance de pool pour se connecter à la base de données
const pool = new Pool({
    user: "csi2532_ehotel",
    database:"ehotel",
    password:"ehotel",
    host:"ehotel.ddns.net",
    port:5432
});

const createChaineHotel =`CREATE TABLE ChaineHotel (
    chaine_ID VARCHAR(5) NOT NULL UNIQUE CHECK (chaine_ID ~ '^[0-9]{5}$'), 
    nom_chaine VARCHAR(50),
    rue VARCHAR(100),
    ville VARCHAR(50),
    code_postal VARCHAR(7) CHECK (code_postal ~ '^[A-Z][0-9][A-Z] [0-9][A-Z][0-9]$'),
    nombre_hotel INTEGER CHECK (nombre_hotel > 0),
    courriel_chaine VARCHAR(25) CHECK (courriel_chaine ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    numero_telephone_chaine VARCHAR(12) CHECK (numero_telephone_chaine ~ '^[1-9][0-9]{2} [0-9]{3} [0-9]{4}$'),
    PRIMARY KEY (chaine_ID)
);`
pool.query(createChaineHotel, (err, res) => {
    if(err){
        console.error(err);
    }else{
        console.log("Table ChaineHotel créée avec succès");
        console.log(res);
    }
});
export default pool;