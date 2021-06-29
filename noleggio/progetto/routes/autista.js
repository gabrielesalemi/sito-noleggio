var express = require('express');
var router = express.Router();

const PrenotazioneController = require('../controllers/autista/Prenotazione'); 

router.get('/Prenotazioni', PrenotazioneController.PrenotazioniconAutista); 
router.post('/Updateprenotazione', PrenotazioneController.UpdatePrenotazioneAutista); 
router.get('/Prenotazioniautista', PrenotazioneController.PrenotazioniAutista); 
router.post('/Deleteprenotazione', PrenotazioneController.Deleteprenotazione); 


module.exports = router; 