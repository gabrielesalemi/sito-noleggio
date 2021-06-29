//FUNZIONE PER MODIFICARE I DATI DELLA PRENOTAZIONE
var createError = require('http-errors');

const { config } = require('../../db/config');

const { makeDb, withTransaction } = require('../../db/dbmiddleware');

        async function newUpdatePrenotazione(req, res, next) {

            const db = await makeDb(config);

            try{
                await withTransaction(db, async() => {
                    if(req.body.giustifica)
                        await db.query("UPDATE prenota SET giustifica_ritardo = ? WHERE id_prenotazione = ?", [req.body.giustifica, req.body.id_pren]);
                    if(req.body.luogoric)
                        await db.query("UPDATE prenota SET id_citta_ritiro = ? WHERE id_prenotazione = ?", [req.body.luogoric, req.body.id_pren]);
                    if(req.body.elimina)
                        await db.query("DELETE FROM prenota WHERE id_prenotazione = ?",[ req.body.id_pren])
                });
            }
            catch(err){
                console.log(err);
                next(createError(500));
            }
            res.send("modifiche avvenute");

        }
        module.exports = {newUpdatePrenotazione};
