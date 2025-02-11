const express = require('express');
const router = express.Router();
const labelController = require('../controllers/labelController');

router.get('/', labelController.returns);
router.get('/return', labelController.returns);
router.get('/bumpdown', labelController.bumpdown);
router.get('/voucher', labelController.voucher);
router.get('/assignment', labelController.assignment);
router.get('/new', labelController.newStock);

module.exports = router;