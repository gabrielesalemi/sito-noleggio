var express = require('express');
var router = express.Router();

const PostsController = require('../controllers/addetto/Addetto'); 

router.get('/AllPosts', PostsController.AllPosts); 
router.post('/Updateprenotazione', PostsController.UpdatePrenotazioneAddetto); 

module.exports = router; 