import { _debug_labelNames, openLabel, renderLabelToImage } from "./dymoutils.js";
import { configureLabelTriggers as configurePrintButton } from "./printerControls.js";

openLabel("http://localhost:3000/labels/freetext.dymo").then((label) => {
  configurePrintButton(label);

  _debug_labelNames (label);
  console.log('endnames');
  console.log(label);
  console.log(label.getLabelXml());
  $('textarea').change(() => {
    label.setObjectText('text', $('textarea').val());
    // console.log(label.setObjectText('text','1234\n5678'));
    console.log(label);
    renderLabelToImage (label, $('#labelImage'));
  });

  $('textarea').trigger('change');
});