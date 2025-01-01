// JS related to printer controls card
export function configureLabelTriggers (label) {
  $('#printButton').on('click', () => {
    printLabel (label);
  });
}

// get a list of printers
dymo.label.framework.getPrintersAsync().then((printers) => {
  if (printers.length == 0) {
    alert("No DYMO printers are installed.");
    return;
  }
  $(() => {
    printers.forEach((printer) => {
      let option = document.createElement ("option");
      let printerName = printer["name"];
      
      option.value = printerName;
      option.append (document.createTextNode(printerName));
      $("#printersSelect").append(option);
    });
  });
}).thenCatch ((e) => {
  alert ("Load printers failed: " + e);
  return;
});

$(() => {
  $('#printButton').disabled = true;
  $('#printersSelect').select2();   
});




