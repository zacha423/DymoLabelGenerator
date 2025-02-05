import { openLabel, renderLabelToImage } from "./dymoutils.js";
import { configureLabelTriggers } from "./printerControls.js";

openLabel(returnLabel).then((label) => {
  $(() => {
    configureLabelTriggers(label);

    $('#labelFormWrapper').change(() => {
      renderLabelToImage (label, $('img'));
    })

    $('#asset').change(() => {
      label.setObjectText('AssetTag', $('#asset').val());
    })

    $('#name').change(() => {
      label.setObjectText('name', $('#name').val());
    })

    $('#reason').change(() => {
      label.setObjectText('returnReason', $('#reason').val());
    })

    $('#ticketno').change(() => {
      label.setObjectText('ticketNumber', $('#ticketno').val());
    });

    $('#reason').select2({tags:true});
    
    $('#labelFormWrapper').trigger('change');

  });
});