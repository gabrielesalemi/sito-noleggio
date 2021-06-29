//FUNZIONE PER STAMPARE NOME E ID_PRENOTAZIONE DELL'UTENTE
var createError = require('http-errors');

const { config } = require('../../db/config');

const { makeDb, withTransaction } = require('../../db/dbmiddleware');


    async function newPosts(req, res, next) {
        // istanziamo il middleware
        const db = await makeDb(config);
        let results = {};
        try {
    
            await withTransaction(db, async() => {
                results = await db.query('SELECT nome, id_prenotazione FROM utente as u, prenota as p WHERE u.username = ? AND p.id_utente = u.id_utente', [req.query.username]);
                res.send(results);
            });
        } catch (err) {
            console.log(err);
            next(createError(500));
        }
    }

    

    module.exports = {newPosts};

