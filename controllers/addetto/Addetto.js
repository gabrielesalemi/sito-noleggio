//FUNZIONALITA' RISERVATE ALL'ADDETTO AL RITIRO/CONSEGNA CHE PUO' AGGIORNARE LE TABELLE ADEGUATE
//SEGNANDO CON UN VALORE 0 O 1 SE IL VEICOLO E' STATO CONSEGNATO/RICONSEGNATO O MENO.
var createError = require('http-errors');

const { config } = require('../../db/config');

const { makeDb, withTransaction } = require('../../db/dbmiddleware');


    async function AllPosts(req, res, next) {
        // istanziamo il middleware
        const db = await makeDb(config);
        let results = {};
        try {
    
            await withTransaction(db, async() => {
                results = await db.query('SELECT id_prenotazione FROM prenota as p');
                res.send(results);
            });
        } catch (err) {
            console.log(err);
            next(createError(500));
        }
    }

    async function UpdatePrenotazioneAddetto(req, res, next) {
        // istanziamo il middleware
        const db = await makeDb(config);
        let results = {};
        try {
            await withTransaction(db, async() => {
                let id_addetto = await db.query('SELECT id_utente FROM utente as u WHERE username = ?', [req.body.id_addetto])

                if(req.body.riconsegna == 'on' && req.body.ritira == 'on'){
                    console.log("non puoi modificare entrambe le tabelle");
                }
                else if(req.body.ritiro == 'on'){
                    results = await db.query('INSERT INTO `ritira` (`id_addetto`, `id_prenotazione`, `ritira`) VALUES (?, ?, 1)', [id_addetto[0].id_utente, req.body.p])
                }
                else if(req.body.riconsegna == 'on'){
                    results = await db.query('INSERT INTO `consegna` (`id_addetto`, `id_prenotazione`, `consegna`) VALUES (?, ?, 1)', [id_addetto[0].id_utente, req.body.p])
                }
              
                res.send("ciao");
            });
        } catch (err) {
            console.log(err);
            next(createError(500));
        }
    
}

    

    module.exports = {AllPosts, UpdatePrenotazioneAddetto};

