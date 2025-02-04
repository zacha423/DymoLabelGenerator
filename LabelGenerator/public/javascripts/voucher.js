import { _debug_labelNames, openLabel, renderLabelToImage } from "./dymoutils.js";
import { configureLabelTriggers as configureDeviceInfo} from "./deviceInfo.js";
import { configureLabelTriggers as configurePrintButton, configureSecondaryLabelTriggers} from "./printerControls.js";

openLabel(deviceCard).then((label) => {
  $(() => {
    _debug_labelNames (label);
    label.setObjectText('DeviceLabel','VOUCHER');
    configureDeviceInfo (label);
    configurePrintButton (label); 
  });
});

    
openLabel(text2).then((label) => {
  $(() => {
    _debug_labelNames (label);
    // configurePrintButton (label); 
    configureSecondaryLabelTriggers (label);

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

