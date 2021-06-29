//FUNZIONE PER RESTITUIRE IL TIPO DELL'UTENTE
var createError = require('http-errors');

const { config } = require('../../db/config');

const { makeDb, withTransaction } = require('../../db/dbmiddleware');

    async function Tipo(req, res, next) {
        // istanziamo il middleware
        const db = await makeDb(config);
        let results = {};
        try {
    
            await withTransaction(db, async() => {
                results = await db.query('SELECT tipo_utente FROM utente as u WHERE u.username = ? ', [req.query.username]);
                res.send(results[0].tipo_utente);
            });
        } catch (err) {
            console.log(err);
            next(createError(500));
        }
    }

    module.exports = {Tipo};
