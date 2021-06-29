var express = require('express');
var router = express.Router();

const registrazioneController = require('../controllers/user/Registrazione'); 
const UpdateprenotazioneController = require('../controllers/user/Updateprenotazione'); 
const LoginController = require('../controllers/user/Login'); 
const PostsController = require('../controllers/user/Posts'); 
const RicercaController = require('../controllers/user/Ricerca'); 
const CalcolotariffaController = require('../controllers/user/Calcolotariffa'); 
const UpdateutenteController = require('../controllers/user/Updateutente'); 
const PrenotazioneController = require('../controllers/user/Prenotazione'); 
const TipoUtenteController = require('../controllers/user/Tipo'); 


router.post('/Registrazione', registrazioneController.newRegistrazione); 
router.post('/Prenotazione', PrenotazioneController.newPrenotazione); 
router.post('/Updateprenotazione', UpdateprenotazioneController.newUpdatePrenotazione); 
router.post('/Login', LoginController.newLogin);

router.get('/Tipo', TipoUtenteController.Tipo); 
router.get('/Posts', PostsController.newPosts); 
router.get('/Ricerca', RicercaController.newRicerca); 
router.post('/Calcolotariffa', CalcolotariffaController.newCalcoloTariffa); 
router.post('/Updateutente', UpdateutenteController.newUpdate); 

module.exports = router; 