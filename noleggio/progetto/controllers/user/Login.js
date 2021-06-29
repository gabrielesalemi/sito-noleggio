var createError = require('http-errors');

const crypto = require('crypto');

const { config } = require('../../db/config');

const { makeDb, withTransaction } = require('../../db/dbmiddleware');

async function newLogin(req, res, next) {
    


    // istanziamo il middleware
    const db = await makeDb(config);
    let results = {};
    try {

        await withTransaction(db, async() => {
            // inserimento utente
            results = await db.query('SELECT * FROM `utente`\
            WHERE username = ?', [
                    req.body.username
                ])
                .catch(err => {
                    throw err;
                });

            if (results.affectedRows == 0) {
                console.log('Utente non trovato!');
                next(createError(404, 'Utente non trovato'));
            } else {
                let pwdhash = crypto.createHash('sha256'); // istanziamo l'algoritmo di hashing
                pwdhash.update(req.body.password); // cifriamo la password
                let encpwd = pwdhash.digest('hex'); // otteniamo la stringa esadecimale

                if (encpwd != results[0].password) {
                    // password non coincidenti
                    console.log('Password errata!');
                    next(createError(403, 'Password errata'));
                } else {
                    console.log('Utente autenticato');
                    console.log(results);
                    // recupero username
                    let usern = results[0].username;
                    results = await db.query('SELECT nome, cognome, tipo_utente, username FROM utente WHERE username = ?'
                    , [usern])
                    .catch(err => {
                        throw err;
                    });
                    res.send(results);
                }
            }
        });
    } catch (err) {
        console.log(err);
        next(createError(500));
    }
}




module.exports = {newLogin};

