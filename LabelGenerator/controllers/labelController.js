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
async function loadPrinters () {
  const rawPrinter = await fetch('https://127.0.0.1:41951/DYMO/DLS/Printing/GetPrinters');
  const resu = await rawPrinter.text();
  console.log (resu);
}

loadPrinters();