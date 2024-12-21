// JS related to printer controls card
export function initializeCard () {
  $('#printButton').disabled = true;
  loadPrinters ();
}

// get a list of printers
async function loadPrinters () {
  dymo.label.framework.getPrintersAsync().then((printers) => {
    if (printers.length == 0) {
      alert("No DYMO printers are installed.");
      return;
    }
    printers.forEach((printer) => {
      let option = document.createElement ("option");
      let printerName = printer["name"];
      
      option.value = printerName;
      option.append (document.createTextNode(printerName));
      $("#printersSelect").append(option);
    });
  }).thenCatch ((e) => {
    alert ("Load printers failed: " + e);
    return;
  });
}

