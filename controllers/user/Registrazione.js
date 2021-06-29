//FUNZIONE DI REGISTRAZIONE, LA REGISTRAZIONE AVVIENE SOLAMENTE SE IL CODICE FISCALE E IL CODICE
//DELLA CARTA DI CREDITO SI TROVANO RISPETTIVAMENTE NEL DBMS DELL'AGENZIA DELLE ENTRATE E DEL DBMS DELLA BANCA.
var createError = require('http-errors');

const crypto = require('crypto');
const { config } = require('../../db/config');
const { configf } = require('../../db/configcodicefiscale');
const { configc } = require('../../db/configcredito');
const { makeDb, withTransaction } = require('../../db/dbmiddleware');



// middleware di registrazione
async function newRegistrazione(req, res, next) {
    // istanziamo il middleware
    const db = await makeDb(config);
    
    const dbf = await makeDb(configf);
    const dbcarta = await makeDb(configc);
    let fiscaletrue = {};
    let creditotrue = {};

    

    

    try{
        await withTransaction(dbf, async() => {

        let codicef = req.body.codicef;

        fiscaletrue = await dbf.query('SELECT * FROM utente WHERE codice = ?', [codicef]) 
         .catch(err => {
            throw err;
        });
    });
    }
    catch(err){
        console.log(err);
        next(createError(500));
    }

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

    if(creditotrue && fiscaletrue ){
        let results = {};
        try {
            
            await withTransaction(db, async() => {
                console.log(req.body.username);
                results = await db.query(' SELECT SHA2(?,256) AS encpwd', [req.body.password])
                .catch(err => {
                    throw err;
                });
                console.log(req.body.password);

            let encpwd = results[0].encpwd;
            console.log('Password cifrata');
            console.log(results);
            let utente = "utente";
                // inserimento utente
            results = await db.query("INSERT INTO utente (tipo_utente, nome, cognome, regione, provincia, comune, datanascita, email, username, password, codicef, codicec) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)", [
                        utente,
                        req.body.nome,
                        req.body.cognome,
                        req.body.region,
                        req.body.state,
                        req.body.town,
                        req.body.data,
                        req.body.email,
                        req.body.username,
                        encpwd,
                        req.body.codicef,
                        req.body.codicec,
                        
                    ])
                    .catch(err => {
                        throw err;
                    });

                console.log('Inserimento tabella utente');
                console.log(results);
                
                console.log(`Utente ${req.body.email} inserito!`);
                res.send("benvenuto");
            });
        } catch (err) {
            console.log(err);
            next(createError(500));
        }
   }

}

module.exports = {newRegistrazione};
