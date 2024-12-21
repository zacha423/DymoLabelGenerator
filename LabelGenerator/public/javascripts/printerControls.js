// JS related to printer controls card
export function initializeCard () {
  $('#printButton').disabled = true;
  loadPrinters ();
}

// get a list of printers
export async function loadPrinters () {
  let _printers = [];

  dymo.label.framework.getPrintersAsync().then((printers) => {
    if (printers.length == 0) {
      alert("No DYMO printers are installed.");
      return;
    }

    _printers.forEach((printer) => {
      let option = document.createElement ("option");
      option.value = printerName;
      option.append (document.createTextNode(printer["name"]));
      $("#printersSelect").append(option);
    });
  }).thenCatch ((e) => {
    alert ("Load printers failed: " + e);
    return;
  });
}