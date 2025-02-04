const express = require('express');
const router = express.Router();
const labelController = require('../controllers/labelController');
const printerController = require ('../controllers/printerController');
router.get('/printers', printerController.printers);

/* GET home page. */
router.get('/return', function(req, res, next) {
  res.redirect('/');
});

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Returned Device Label' });
});

router.get('/bumpdown', function (req, res, next) {
  res.render ('bumpdown', {title:'Bumpdown Label Template'});  
});

// router.get('/voucher', function (req, res, next) {
//   res.render ('voucher', {title:'Voucher Label Template'});
// });
router.get('/voucher', labelController.voucher);

router.get('/assignment', function (req, res, next) {
  res.render('assignment', {title: 'Device Assignment'});
})

router.get('/new', function(req, res, next) {
  res.render('newStock', {title: 'New Device'});
});

const Dymo = require('dymojs');
let dymo = new Dymo({hostname: "host.docker.internal"});
router.post('/print', function (req, res, next) { 
  dymo.print(req.body.printer, req.body.label);
  res.status(200).send ();
});
module.exports = router;