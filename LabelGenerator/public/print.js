import { openLabel } from "./javascripts/dymoutils";

export function sendPrint(label3, printer) {
  let label2;
  openLabel(label3).then(data => label2 = data);

  label2.print(printer);

}

$(() => {
  sendPrint (label, printer);
})
// history.back();