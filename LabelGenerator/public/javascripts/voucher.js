import { _debug_labelNames, openLabel, renderLabelToImage } from "./dymoutils.js";
import { configureLabelTriggers as configureDeviceInfo} from "./deviceInfo.js";
import { configureLabelTriggers as configurePrintButton} from "./printerControls.js";
console.log('text2: ' + text2);
openLabel("http://localhost:3000/labels/bumpdown.dymo").then((label) => {
  $(() => {
    console.log("label: " + label);
    console.log (decodeURIComponent(text2));
    label.setObjectText('DeviceLabel','VOUCHER');
    configureDeviceInfo (label);
    configurePrintButton (label); 
  });
});

openLabel("http://localhost:3000/labels/voucher_info.dymo").then((label) => {
  $(() => {
    _debug_labelNames (label);
    configurePrintButton (label); 

    $('#voucherWrapper').change(() => {
      renderLabelToImage (label, $('#voucherLabelImage'));
    })

    $('#asset').change(() => {
      label.setObjectText('AssetTag', $('#asset').val());
      // Manually render, since this field is part of the DeviceCard
      renderLabelToImage (label, $('#voucherLabelImage'));
    });

    $('#voucherno').change(() => {
      label.setObjectText('ticketNumber',$('#voucherno').val())
    });

    $('#department').change(() => {
      label.setObjectText('department', $('#department').val());
    });

    $('#role').change(() => {
      label.setObjectText('role', $('#role').val());
    });

    $('#voucherWrapper').trigger('change');
  });
});

