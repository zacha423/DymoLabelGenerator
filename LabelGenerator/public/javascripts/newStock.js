import { configureLabelTriggers as configureDeviceInfo} from "./deviceInfo.js";
import { _debug_labelNames, openLabel } from "./dymoutils.js";
import { configureLabelTriggers as configurePrintButton} from "./printerControls.js";

openLabel(newLabel).then((label) => {
  label.setObjectText('DeviceLabel', 'NEW STOCK');
  configurePrintButton (label);
  configureDeviceInfo (label);
})