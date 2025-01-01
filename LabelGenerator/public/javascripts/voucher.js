import { openLabel } from "./dymoutils.js";
import { configureLabelTriggers as configureDeviceInfo} from "./deviceInfo.js";
import { configureLabelTriggers as configurePrintButton} from "./printerControls.js";

openLabel("http://localhost:3000/labels/bumpdown.dymo").then((label) => {
  $(() => {
    configureDeviceInfo (label);
    configurePrintButton (label); 
  });
});

openLabel("http://localhost:3000/labels/voucher_info.dymo").then((label) => {
  $(() => {
    
    configurePrintButton (label); 
  });
});

$(() => {
  // initPrinters();
});