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
  const models = [];
  fs.readFile (path.join(__dirname, '../data/models.csv'), 'utf8', (err, data) => {
    if (err) {
      console.log ("Failed to read model data: " + err);
      // res.render('error',)
      return;
      
    }  

    console.log (data);

    data.split('\n').forEach((row) => {
      model = row.split(',');
      models.push({model:model[0],year:model[1]});
    });

    console.log (models);

  });

  const hardwares = [];
  fs.readFile(path.join(__dirname, '../data/hardware.csv'), 'utf8', (err, data) => {
    

    if (err) {
      console.log ("Failed to read hardware data: " + err);
      return;
    }

    console.log (data);

    data.split('\n').forEach ((row) => {
      hardware = row.split(',');
      hardwares.push({cpu:hardware[0], memory:hardware[1], storage:hardware[2]});
    });

    console.log (hardwares);
  })
  
  
  
  
  res.render ('2js', {title:'Bumpdown Label Template', models:models, hardware:hardwares});

  
});

module.exports = router;
