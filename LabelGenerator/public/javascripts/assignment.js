import { openLabel, renderLabelToImage } from "./dymoutils.js";
import { configureLabelTriggers } from "./printerControls.js";

openLabel(assignmentLabel).then((label) => {
  $(() => {
    configureLabelTriggers (label);

    $('#labelFormWrapper').change(() => {
      renderLabelToImage (label, $('img'));
    })

    $('#asset').change(() => {
      label.setObjectText('AssetTag', $('#asset').val());
    });

    $('#user').change(() => {
      label.setObjectText('User', $('#user').val());
    })

    $('#department').change(() => {
      label.setObjectText('Department', $('#department').val());
    })

    $('#ticketno').change(() => {
      label.setObjectText('TicketNumber', $('#ticketno').val());
    });

    $('#labelFormWrapper').trigger('change');
  })
});