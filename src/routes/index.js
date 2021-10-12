const express = require('express');
const router = express.Router();
const {
  gamesGet,
  gamesPut,
  gamesGetById,
  gamesDelete,
  gamesPost } = require('../controllers/controller');


router.post('/', gamesPost);

router.get('/', gamesGet);

router.get('/:id', gamesGetById);

router.put('/:id', gamesPut);

router.delete('/:id', gamesDelete);


module.exports = router;
