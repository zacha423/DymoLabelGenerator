import { configureLabelTriggers as configureDeviceInfo} from "./deviceInfo.js";
import { _debug_labelNames, openLabel } from "./dymoutils.js";
import { configureLabelTriggers as configurePrintButton} from "./printerControls.js";

openLabel("http://localhost:3000/labels/bumpdown.dymo").then((label) => {
  label.setObjectText('DeviceLabel', 'NEW STOCK');
  configurePrintButton (label);
  configureDeviceInfo (label);
  _debug_labelNames(label);
})