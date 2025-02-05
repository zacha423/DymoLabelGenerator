import { _debug_labelNames, openLabel, renderLabelToImage } from "./dymoutils.js";
import { configureLabelTriggers as configureDeviceInfo } from "./deviceInfo.js";
import { 
  configureLabelTriggers as configurePrintButton, 
  configureSecondaryLabelTriggers
} from "./printerControls.js";

openLabel(deviceIDLabel).then((label) => {
  $(() => {
    label.setObjectText('DeviceLabel', 'VOUCHER');
    configureDeviceInfo(label);
    configurePrintButton(label);
  });
});


openLabel(voucherLabel).then((label) => {
  $(() => {
    configureSecondaryLabelTriggers(label);

    $('#voucherWrapper').change(() => {
      renderLabelToImage(label, $('#voucherLabelImage'));
    })

    $('#asset').change(() => {
      label.setObjectText('AssetTag', $('#asset').val());

      // Manually render, since this field is part of the DeviceCard
      renderLabelToImage(label, $('#voucherLabelImage'));
    });

    $('#voucherno').change(() => {
      label.setObjectText('ticketNumber', $('#voucherno').val())
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

