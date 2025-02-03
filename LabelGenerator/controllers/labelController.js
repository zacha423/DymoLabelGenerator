import { readFileSync } from 'node:fs';

const LABEL_DIR = import.meta.dirname + '/../public/labels/';
const ENCODING = 'utf-8';

const voucherlbl = readFileSync (LABEL_DIR + 'voucher_info.dymo', ENCODING);
const returnlbl = readFileSync (LABEL_DIR + 'returned.dymo', ENCODING);
const assignmentlbl = readFileSync (LABEL_DIR + 'assignment.dymo', ENCODING);
const bumpdownlbl = readFileSync (LABEL_DIR + 'bumpdown.dymo', ENCODING);


export function voucher(req, res, next) {
  res.render('voucher', {title: 'Voucher Label Template', label: voucherlbl, deviceCard: bumpdownlbl});
}


//export the following to a "printer" controller
import fetch from 'node-fetch';
import {parseString} from 'xml2js';

async function loadPrinters () {
  const rawPrinter = await fetch('https://host.docker.internal:41951/DYMO/DLS/Printing/GetPrinters');
  let resu = await rawPrinter.text();

  parseString (resu, (err, res) => {
    resu = res;
  })

  // get array of printer names
  console.log(resu['Printers']['LabelWriterPrinter'].flatMap((data => data.Name)));
}

loadPrinters();