const fs = require('node:fs');

const LABEL_DIR = __dirname + '/../public/labels/';
const ENCODING = 'utf-8';

const voucherlbl = fs.readFileSync (LABEL_DIR + 'voucher_info.dymo', ENCODING);
const returnlbl = fs.readFileSync (LABEL_DIR + 'returned.dymo', ENCODING);
const assignmentlbl = fs.readFileSync (LABEL_DIR + 'assignment.dymo', ENCODING);
const bumpdownlbl = fs.readFileSync (LABEL_DIR + 'bumpdown.dymo', ENCODING);


exports.voucher  = (req, res, next) => {
  res.render('voucher', {title: 'Voucher Label Template', label: voucherlbl, deviceCard: bumpdownlbl});
}

