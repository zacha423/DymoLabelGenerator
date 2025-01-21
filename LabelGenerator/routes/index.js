const express = require('express');
const router = express.Router();
const fs = require ('node:fs');
const path = require ('path');
const labelController = require('../controllers/labelController');

/* GET home page. */
router.get('/return', function(req, res, next) {
  res.redirect('/');
});

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Returned Device Label' });
});

router.get('/bumpdown', function (req, res, next) {
  console.log('test');
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
module.exports = router;
