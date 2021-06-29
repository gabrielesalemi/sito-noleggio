//FUNZIONE PER INSERIRE DATI NELLA TABELLA PRENOTA. I DATI VENGONO POI ULTIMATI IN "CALCOLO TARIFFA".
//L'UTENTE PUO' EFFETTUARE LA PRENOTAZIONE SOLO SE RICEVE L'EMAIL ALL'INDIRIZZO MAIL DATO IN FASE DI REGISTRAZIONE(controllo del dispositivi portatile)

var createError = require('http-errors');

const { config } = require('../../db/config');

const { makeDb, withTransaction } = require('../../db/dbmiddleware');

    async function newPrenotazione(req, res, next) {
        // istanziamo il middleware
        let email = await db.query("SELECT email FROM utente WHERE username = ?", [req.body.id_utente]);
        var transporter = nodemailer.createTransport({
            service: 'outlook',
            auth: {
              user: 'sitonoleggio.progetto@outlook.it',
              pass: 'Qwerty135'
            }
          });
          
          var mailOptions = {
            from: 'sitonoleggio.progetto@outlook.it',
            to: email,
            subject: 'Email verifica dispostivo portatile',
            text: 'Se hai ricevuto questa mail puoi effettuare la prenotazione'
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
        const db = await makeDb(config);
            let results = {};
            let id = {};
            let prezzo = {};
            if(info.response){
            try {
                
                await withTransaction(db, async() => {
                id = await db.query("SELECT id_utente FROM utente WHERE username = ?", [req.body.id_utente]);
                prezzo = await db.query("SELECT prezzo from veicolo WHERE targa = ?", [req.body.targa_veicolo])
                    // inserimento prenotazione
                results = await db.query("INSERT INTO prenota ( id_utente, id_veicolo, id_autista, prezzo, data_inizio, data_fine, ora_inizio, ora_fine, id_citta_ritiro, id_citta_riconsegna) VALUES (?,?,?,?,?,?,?,?,?,?)", [
                            id[0].id_utente,
                            req.body.targa_veicolo,
                            id_autista = null, //verrà modificato qual'ora l'utente vuole l'autista
                            prezzo[0].prezzo,
                            req.body.data_rit,
                            req.body.data_ric,
                            req.body.ora_rit,
                            req.body.ora_ric,
                            req.body.posiz_rit,
                            req.body.posiz_ric,
                           
                        ])
                        .catch(err => {
                            throw err;
                        });
                        
                    results = await db.query("SELECT id_prenotazione FROM prenota WHERE id_utente = ? AND id_veicolo = ? AND data_inizio = ? AND data_fine=? AND ora_inizio = ? AND ora_fine = ?", [ id[0].id_utente,
                        req.body.targa_veicolo,
                        req.body.data_rit,
                        req.body.data_ric,
                        req.body.ora_rit,
                        req.body.ora_ric,])
                    
                  res.send(results);
    
                });
            } catch (err) {
                console.log(err);
                next(createError(500));
            }
            }
        }
        module.exports = {newPrenotazione};
