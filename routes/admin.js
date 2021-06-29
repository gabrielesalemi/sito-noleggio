var express = require('express');
var router = express.Router();

const AdminController = require('../controllers/admin/Admin'); 


router.get('/Autistisenzacorsa', AdminController.Autistisenzacorsa); 
router.post('/Updateprenotazione', AdminController.UpdatePrenotazioneAdmin); 
router.get('/Prenotazionisenzaautista', AdminController.PrenotazionisenzaAutista); 


module.exports = router; 