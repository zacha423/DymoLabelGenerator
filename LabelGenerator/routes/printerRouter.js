const express = require('express');
const router = express.Router();
const printerController = require ('../controllers/printerController');

router.get('/printers', printerController.printers);
router.post('/print', printerController.print);

module.exports = router;