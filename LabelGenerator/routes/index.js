const express = require('express');
const router = express.Router();
const fs = require ('node:fs');
const path = require ('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/test', function (req, res, next) {
  console.log('test');
  res.render ('2js', {title:'Bumpdown Label Template'});  
});

router.get('/voucher', function (req, res, next) {
  res.render ('voucher', {title:'Voucher Label Template'});
});

module.exports = router;
