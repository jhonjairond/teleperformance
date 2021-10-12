const router = require('express').Router();

const customerController = require('../controllers/mysqlController');

router.get('/list/all', customerController.list);
router.post('/add', customerController.save);
router.get('/edit/:id', customerController.edit);
router.put('/update/:id', customerController.update);
router.delete('/delete/:id', customerController.delete);

module.exports = router;

