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
router.post('/print', function (req, res, next) { 
  // from e.g. /voucher
  // label converted back to xml (label.getLabelXml())
  // xml and printer name sent to /print
    // printer names needed to be loaded in backend or add /printers to return current printers
  // /print converts xml back to label
  // /print calls print() function
  // /print redirects back to previous page with history.back() or a similar method
  

  //curl data from http://127.0.0.1:41951/DYMO/DLS/Printing/GetPrinters
  // e.g. $.get('https://127.0.0.1:41951/DYMO/DLS/Printing/GetPrinters', function(data) {console.log(data);})
  // https://host.docker.internal:41951/DYMO/DLS/Printing/GetPrinters
});
module.exports = router;


{/* <Printers>
	<TapePrinter>
		<Name>DYMO LabelWriter 450 DUO Tape</Name>
		<ModelName>DYMO LabelWriter 450 DUO Tape</ModelName>
		<IsConnected>False</IsConnected>
		<IsLocal>True</IsLocal>
		<IsAutoCutSupported>True</IsAutoCutSupported>
	</TapePrinter>
	<LabelWriterPrinter>
		<Name>DYMO LabelWriter 450 DUO Label</Name>
		<ModelName>DYMO LabelWriter 450 DUO Label</ModelName>
		<IsConnected>False</IsConnected>
		<IsLocal>True</IsLocal>
		<IsTwinTurbo>False</IsTwinTurbo>
	</LabelWriterPrinter>
	<LabelWriterPrinter>
		<Name>fakeDYMO LabelWriter 450 Turbo</Name>
		<ModelName>DYMO LabelWriter 450 Turbo</ModelName>
		<IsConnected>True</IsConnected>
		<IsLocal>True</IsLocal>
		<IsTwinTurbo>False</IsTwinTurbo>
	</LabelWriterPrinter>
</Printers> */}