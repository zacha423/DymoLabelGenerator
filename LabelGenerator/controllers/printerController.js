import fetch from 'node-fetch';
import {parseString} from 'xml2js';
import {createRequire } from 'module';
import DYMO_HOSTNAME from '../constants';
const esmRequire = createRequire (import.meta.url);
const Dymo = esmRequire('dymojs');
const dymo = new Dymo({hostname: DYMO_HOSTNAME});


async function loadPrinters () {
  const rawPrinter = await fetch('https://' + DYMO_HOSTNAME + ':41951/DYMO/DLS/Printing/GetPrinters');
  let printersXML = await rawPrinter.text();

  parseString (printersXML, (err, res) => {
    printersXML = res;
  })

  console.log("Startup: Loaded Printers!");
  return printersXML['Printers']['LabelWriterPrinter'].flatMap((printer => printer.Name))
}

let availablePrinters;
loadPrinters().then(data => {availablePrinters = data});


export function printers(req, res, next) {
  res.send (availablePrinters);
}

export function print (req, res, next) {
  dymo.print(req.body.printer, req.body.label);
  res.status(200).send();
}