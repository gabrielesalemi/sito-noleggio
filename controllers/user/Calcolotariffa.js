//FUNZIONE PER CALCOLARE LA TARIFFA, SE L'UTENTE HA SCELTO L'AUTISTA VERRA' SOMMATA AL PREZZO LA MANCIA E IL SOVRAPPREZO PER QUANTI GIORNI USA IL VEICOLO
//ALTRIMENTI DOVRA' AGGIUNGERE I DATI DEL CONDUCENTE E VERRA' COMUNQUE EFFETTUATO IL SOVRAPPREZZO IN BASE AI GIORNI DI UTILIZZO DEL VEICOLO
//PER INSERIRE IL NUMERO DELLA PATENTE CONTROLLO SE ESISTE NEL DB DELLA MOTORIZZAZIONE.
//SE L'UTENTE CHIEDE DI CAMBIARE IL LUOGO DI RITIRO SI AGGIORNA LA TABELLA CORRISPONDENTE.
var createError = require('http-errors');

const crypto = require('crypto');

const { config } = require('../../db/config');
const { configp } = require('../../db/configpatente');

const { makeDb, withTransaction } = require('../../db/dbmiddleware');

        async function newCalcoloTariffa(req, res, next) {
            const dbp = await makeDb(configp);
            const db = await makeDb(config);
            let results = {};
            let patente = {};
            let date = {};

            try{
                await withTransaction(dbp, async() => {
                    patente = await dbp.query("SELECT nome FROM patenti WHERE codice = ?", [req.body.patente]);

                });
            }
            catch(err){
                console.log(err);
                next(createError(500));
            }
            
            if(req.body.patente && req.body.autista){
                try{
                    console.log("non puoi richiedere l'autista e allo stesso tempo il conducente ");
                }
                catch(err){
                    console.log(err);
                    next(createError(500));
                }      
            }

            if(req.body.autista == 'on'){
                try{
                    await withTransaction(db, async() => {
                    await db.query("UPDATE prenota SET autista = 1 WHERE id_prenotazione = ?", [ req.body.id_pren])
                    await db.query("UPDATE prenota SET prezzo = prezzo+5 WHERE id_prenotazione = ?", [req.body.id_pren]);
                    await db.query("UPDATE prenota SET prezzo = prezzo + 3 WHERE id_prenotazione = ? AND data_fine - data_inizio =1 ", [req.body.id_pren]);
                    await db.query("UPDATE prenota SET prezzo = prezzo + 7 WHERE id_prenotazione = ? AND data_fine - data_inizio = 2", [req.body.id_pren]);
                    await db.query("UPDATE prenota SET prezzo = prezzo + 15 WHERE id_prenotazione = ? AND data_fine - data_inizio = 3", [req.body.id_pren]);
                    await db.query("UPDATE prenota SET prezzo = prezzo + 25 WHERE id_prenotazione = ? AND data_fine - data_inizio > 3", [req.body.id_pren]); 
                    });
                }
                catch(err){
                    console.log(err);
                    next(createError(500));
                }                
            }

            else{
                try{
                    await withTransaction(db, async() => {
                    if(patente){
                        await db.query("UPDATE prenota SET patente_conducente = ? WHERE id_prenotazione = ?", [req.body.patente, req.body.id_pren]);
                        await db.query("UPDATE prenota SET prezzo = prezzo + 3 WHERE id_prenotazione = ? AND data_fine - data_inizio =1 ", [req.body.id_pren]);
                        await db.query("UPDATE prenota SET prezzo = prezzo + 7 WHERE id_prenotazione = ? AND data_fine - data_inizio = 2", [req.body.id_pren]);
                        await db.query("UPDATE prenota SET prezzo = prezzo + 15 WHERE id_prenotazione = ? AND data_fine - data_inizio = 3", [req.body.id_pren]);
                        await db.query("UPDATE prenota SET prezzo = prezzo + 25 WHERE id_prenotazione = ? AND data_fine - data_inizio > 3", [req.body.id_pren]); 

                    }
                    else{
                        console.log("patente non esistente");
                    }
                    });
                }
                catch(err){
                    console.log(err);
                    next(createError(500));
                }  
                
          

            }
            if(req.body.nuovoritiro)
                await db.query("UPDATE prenota SET id_citta_ritiro = ? WHERE id_prenotazione = ? ",  [req.body.nuovoritiro, req.body.id_pren])

            res.send("prenotazione effettuata");
         
        
        }

        module.exports = {newCalcoloTariffa};

