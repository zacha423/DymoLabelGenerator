const fs = require('node:fs').promises;

async function readLabel (name) {
  try {
    console.log('read call');
    const data = await fs.readFile (__dirname + '/../public/labels/' + name, 'utf-8');
    console.log('fin call');
    return data;
  }
  catch (err) {
    console.log('Error reading label: '+ name + ', ' + err);
  }
}

let voucherlbl;

(async () => {
  try {
    voucherlbl = await readLabel ('voucher_info.dymo');
    console.log ('loaded voucher');
    console.log(voucherlbl);
  }
  catch (err) {
    console.log ('failed to load voucher' + err);
  }
    
})();
// const voucherlbl =  (async () => {
  // await readLabel('voucher_info.dymo');
// });
// console.log(readLabel('voucher_info.dymo'));.
console.log(voucherlbl);

exports.voucher  = (req, res, next) => {
  // const lbl = await (fs.readFile ('./public/labels/voucher.dymo', 'utf-8'));
  
  res.render('voucher', {title: 'Voucher Label Template', label: voucherlbl});
}