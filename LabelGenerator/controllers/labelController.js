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

