import { readFileSync } from 'node:fs';

const LABEL_DIR = import.meta.dirname + '/../public/labels/';
const ENCODING = 'utf-8';

const voucherlbl = readFileSync (LABEL_DIR + 'voucher_info.dymo', ENCODING);
const returnlbl = readFileSync (LABEL_DIR + 'returned.dymo', ENCODING);
const assignmentlbl = readFileSync (LABEL_DIR + 'assignment.dymo', ENCODING);
const bumpdownlbl = readFileSync (LABEL_DIR + 'bumpdown.dymo', ENCODING);

export function assignment (req, res, next) {
  res.render('assignment', {title: 'Device Assignment', label: assignmentlbl});
}

export function bumpdown (req, res, next) {
  res.render('bumpdown', {title: 'Bumpdown Label Template', label: bumpdownlbl});
}
export function returns (req, res, next) {
  res.render('index', {title: 'Returned Device Label', label: returnlbl});
}

export function voucher(req, res, next) {
  res.render('voucher', {title: 'Voucher Label Template', label: voucherlbl, deviceCard: bumpdownlbl});
}

export function newStock (req, res, next) {
  res.render('newStock', {title: 'New Device', label: bumpdownlbl});
}