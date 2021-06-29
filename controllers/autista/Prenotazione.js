//GESTIONE DELL'AUTISTA. CON PrenotazioniconAutista L'AUTISTA VEDE LE PRENOTAZIONI CHE NECESSITANO DI 
//UN AUTISTA E PUO' DECIDERE DI SCEGLIERE UNA DI QUELLE PRENOTAZIONI E SI AGGIUNGE CON UpdatePrenotazioneAutista.
//LE ULTIME DUE FUNZIONI PERMETTONO RISPETTIVAMENTE DI FAR VEDERE LE PRENOTAZIONI DI UN'AUTISTA E LA POSSIBILITA' 
//DI RIMUOVERSI DA UNA DI ESSE.
var createError = require('http-errors');

const { config } = require('../../db/config');

const { makeDb, withTransaction } = require('../../db/dbmiddleware');


    async function PrenotazioniconAutista(req, res, next) {
        // istanziamo il middleware
        const db = await makeDb(config);
        let results = {};
        try {
    
            await withTransaction(db, async() => {
                results = await db.query('SELECT id_prenotazione FROM prenota as p WHERE p.id_autista is NULL AND autista=1');
                res.send(results);
            });
        } catch (err) {
            console.log(err);
            next(createError(500));
        }
    }

    async function UpdatePrenotazioneAutista(req, res, next) {
        // istanziamo il middleware
        const db = await makeDb(config);
        try {
            let results = {};
            await withTransaction(db, async() => {
                let autista = await db.query('SELECT id_utente FROM utente as u WHERE u.username = ?', [req.body.id_autista])
                results = await db.query('UPDATE prenota SET id_autista = ? WHERE id_prenotazione = ?', [autista[0].id_utente, req.body.p]);
                res.send("ciao");
            });
        } catch (err) {
            console.log(err);
            next(createError(500));
        }
    }

    async function PrenotazioniAutista(req, res, next) {
        // istanziamo il middleware
        const db = await makeDb(config);
        let results = {};
        let autista = {};
        try {
    
            await withTransaction(db, async() => {
                autista = await db.query('SELECT id_utente FROM utente as u WHERE u.username = ?', [req.query.id_autista])
                results = await db.query('SELECT id_prenotazione FROM prenota as p WHERE p.id_autista = ?', [autista[0].id_utente]);
                res.send(results);
            });
        } catch (err) {
            console.log(err);
            next(createError(500));
        }
    }

    async function Deleteprenotazione(req, res, next) {
        // istanziamo il middleware
        const db = await makeDb(config);
        let results = {};
        try {
    
            await withTransaction(db, async() => {
                await db.query("UPDATE prenota SET id_autista = NULL WHERE id_prenotazione = ?",[req.body.pren]);
                res.send(results);
            });
        } catch (err) {
            console.log(err);
            next(createError(500));
        }
    }

    

    module.exports = {PrenotazioniconAutista, UpdatePrenotazioneAutista, PrenotazioniAutista, Deleteprenotazione};

