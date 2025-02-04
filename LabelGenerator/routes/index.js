// import fetch from 'node-fetch';
// const fetch = require('node-fetch'); // need to upgrade to V3, ESM -- move to external file
// const asyncHandler = require('express-async-handler');


const express = require('express');
const router = express.Router();
const labelController = require('../controllers/labelController');
// import {printers} from '../controllers/printerController.js';
const printerController = require ('../controllers/printerController');
router.get('/printers', printerController.printers);
// router.get('/printers', asyncHandler(async (req, res) => {
//   const result = 
//   
//   console.log(resu);
// }));

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
  console.log(req.body.printer); // or req.body.label
  dymo.print(req.body.printer, req.body.label);
	// res.send ('ermagerd it worked');
  // res.render('print', {label: req.body.label, printer:req.body.printer});
  res.send ('printed');
  // from e.g. /voucher
  // label converted back to xml (label.getLabelXml())
  // xml and printer name sent to /print
    // printer names needed to be loaded in backend or add /printers to return current printers
  // /print converts xml back to label <--
  // /print calls print() function
  // /print redirects back to previous page with history.back() or a similar method
  

  //curl data from http://127.0.0.1:41951/DYMO/DLS/Printing/GetPrinters
  // e.g. $.get('https://127.0.0.1:41951/DYMO/DLS/Printing/GetPrinters', function(data) {console.log(data);})
  // https://host.docker.internal:41951/DYMO/DLS/Printing/GetPrinters
});
module.exports = router;