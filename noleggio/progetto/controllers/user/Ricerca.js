//FUNZIONE DI RICERCA IN BASE AI DATI SELEZIONATI DALL'UTENTE
var createError = require('http-errors');

const { config } = require('../../db/config');

const { makeDb, withTransaction } = require('../../db/dbmiddleware');


async function newRicerca(req, res, next) {
    // istanziamo il middleware
    const db = await makeDb(config);
    let results={};
    try {
        await withTransaction(db, async() => {
            results = await db.query('SELECT v.nome, v.targa FROM prenota as p, veicolo as v, città as c WHERE v.tipo_veicolo = ? v.id = p.id_veicolo AND p.id_citta_riconsegna = ? AND p.data_fine < ? AND p.ora_fine < ?', [req.query.tipov, req.query.posiz_rit, req.query.ora_rit, req.query.data_rit]);
                res.send(results);
            
            
        });
    } catch (err) {
        console.log(err);
        next(createError(500));
    }
}

module.exports = {newRicerca};
