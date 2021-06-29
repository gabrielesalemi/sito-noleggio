//FUNZIONE PER MODIFICARE I DATI DELL'UTENTE, NEL CASO DELLA CARTA DI CREDITO SI VERIFICA SE IL CODICE
//E' PRESENTE NEL DB DELLA BANCA
var createError = require('http-errors');

const { config } = require('../../db/config');
const { configc } = require('../../db/configcredito');

const { makeDb, withTransaction } = require('../../db/dbmiddleware');

    async function newUpdate(req, res, next) {

            const db = await makeDb(config);
            const dbcarta = await makeDb(configc);

            let results = {};
            try {
            
                await withTransaction(db, async() => {
                    if(req.body.password){
                            results = await db.query(' SELECT SHA2(?,256) AS encpwd', [req.body.password])
                            .catch(err => {
                                throw err;
                            });
                            console.log(req.body.password);
            
                        let encpwd = results[0].encpwd;
                        console.log('Password cifrata');
                        console.log(results);
                     
                        results = await db.query('UPDATE utente SET password = ? WHERE username = ?', [encpwd, req.body.id_utente])
                    }
                    if(req.body.nome){
                        results = await db.query('UPDATE utente SET nome = ? WHERE username = ?', [req.body.nome, req.body.id_utente])
                    }
                    if(req.body.cognome){
                        results = await db.query('UPDATE utente SET cognome = ? WHERE username = ?', [req.body.cognome, req.body.id_utente])
                    }
                    if(req.body.username){
                        results = await db.query('UPDATE utente SET username = ? WHERE username = ?', [req.body.username, req.body.id_utente])
                    }
                    if(req.body.email){
                        results = await db.query('UPDATE utente SET email = ? WHERE username = ?', [req.body.email, req.body.id_utente])
                    }
                    if(req.body.credito){
                        try{
                            await withTransaction(dbcarta, async() => {

                            let codicec = req.body.codicec;
                            creditotrue =  await dbcarta.query('SELECT * FROM utente WHERE codice = ?', [codicec])
                            .catch(err => {
                                throw err;
                            });
                        });
                        }
                        catch(err){
                            console.log(err);
                            next(createError(500));
                        }
                        if(creditotrue){
                            results = await db.query('UPDATE utente SET codice = ? WHERE username = ?', [req.body.credito, req.body.id_utente])
                        }
                    }
                });
            } catch (err) {
                console.log(err);
                next(createError(500));
            }
       }


module.exports = {newUpdate};
