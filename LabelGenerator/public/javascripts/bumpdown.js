import { openLabel } from "./dymoutils.js";
import { configureLabelTriggers as configureDeviceInfo} from "./deviceInfo.js"
import { configureLabelTriggers as configurePrintButton } from "./printerControls.js";

openLabel(bumpdownLabel).then((label) => {
  $(() => {
    configureDeviceInfo (label);
    configurePrintButton (label);
  });
});