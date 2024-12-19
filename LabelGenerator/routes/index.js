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
  fs.readFile (path.join(__dirname, '../data/models.csv'), 'utf8', (err, data) => {
    const results = [];
    if (err) {
      console.log ("Failed to read model data: " + err);
      // res.render('error',)
      return;
      
    }  

    console.log (data);

    data.split('\n').forEach((row) => {
      model = row.split(',');
      results.push({model:model[0],year:model[1]});
    });

    console.log (results);

  });

  fs.readFile(path.join(__dirname, '../data/hardware.csv'), 'utf8', (err, data) => {
    const results = [];

    if (err) {
      console.log ("Failed to read hardware data: " + err);
      return;
    }

    console.log (data);

    data.split('\n').forEach ((row) => {
      hardware = row.split(',');
      results.push({cpu:hardware[0], memory:hardware[1], storage:hardware[2]});
    });

    console.log (results);
  })
  
  
  
  
  res.render ('2js', {title:'Bumpdown Label Template'});

  
});

module.exports = router;
