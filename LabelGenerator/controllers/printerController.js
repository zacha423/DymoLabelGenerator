import fetch from 'node-fetch';
import {parseString} from 'xml2js';

async function loadPrinters () {
  const rawPrinter = await fetch('https://host.docker.internal:41951/DYMO/DLS/Printing/GetPrinters');
  let resu = await rawPrinter.text();

  parseString (resu, (err, res) => {
    resu = res;
  })

  // get array of printer names
  console.log("printers loaded");
  return resu['Printers']['LabelWriterPrinter'].flatMap((data => data.Name))
}

let printe2rs;
loadPrinters().then(data => {printe2rs = data});


export function printers(req, res, next) {
  console.log('test');
  res.send (printe2rs);
}