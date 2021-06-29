//FUNZIONALITA' RISERVATE ALL'ADMIN CHE PUO' VEDERE LE PRENOTAZIONI CHE NECESSITANO DI UN'AUTISTA E 
// PUO' ASSEGNARE UN AUTISTA LIBERO AD UNA DI ESSE.
var createError = require('http-errors');

const { config } = require('../../db/config');

const { makeDb, withTransaction } = require('../../db/dbmiddleware');


    async function Autistisenzacorsa(req, res, next) {
        // istanziamo il middleware
        const db = await makeDb(config);
        let results = {};
        try {
    
            await withTransaction(db, async() => {
                results = await db.query('SELECT id_utente FROM utente as u WHERE u.tipo_utente = "autista" AND u.id_utente NOT IN (SELECT p.id_autista FROM prenota as p)');
                //console.log("ciao", results[0].nome);
                res.send(results);
            });
        } catch (err) {
            console.log(err);
            next(createError(500));
        }
    }

    async function PrenotazionisenzaAutista(req, res, next) {
        // istanziamo il middleware
        const db = await makeDb(config);
        let results = {};
        try {
    
            await withTransaction(db, async() => {
                results = await db.query('SELECT id_prenotazione FROM prenota as p WHERE p.autista = 1 AND p.id_autista is NULL');
                //console.log("ciao", results[0].nome);
                res.send(results);
            });
        } catch (err) {
            console.log(err);
            next(createError(500));
        }
    }

    async function UpdatePrenotazioneAdmin(req, res, next) {
        // istanziamo il middleware
        const db = await makeDb(config);
        let results = {};
        try {
            await withTransaction(db, async() => {
                await db.query("UPDATE prenota SET id_autista = ? WHERE id_prenotazione = ?", [req.body.autista, req.body.p])
              
                res.send("ciao");
            });
        } catch (err) {
            console.log(err);
            next(createError(500));
        }
    
}

    

    module.exports = {Autistisenzacorsa, PrenotazionisenzaAutista, UpdatePrenotazioneAdmin};

