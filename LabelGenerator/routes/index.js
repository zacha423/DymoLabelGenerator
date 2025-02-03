const express = require('express');
const router = express.Router();
const labelController = require('../controllers/labelController');

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
});
module.exports = router;
