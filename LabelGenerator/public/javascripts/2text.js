//***************************************************************************** */
$(() => {
  function loadPrintersAsync () {
    console.log ("Loading printers");

    _printers = [];
    dymo.label.framework.getPrintersAsync().then((printers) => {
      if (printers.length == 0) {
        alert("No DYMO printers are installed.");
        return;
      }

      _printers = printers;
      printers.forEach((printer) => {
        let printerName = printer["name"];
        let option = document.createElement ("option");
        option.value = printerName;
        option.append (document.createTextNode(printerName));
        $("#printersSelect").append(option);
      });
    }).thenCatch ((e) => {
      alert ("Load printers failed: " + e);
      return;
    });
  }

  function onload() {
    const labelFile = $('#labelFile');
    const addressTextArea = $('#addressTextArea');
    const printerSelect = $('#printersSelect');
    const printButton = $('#printButton');

    // Initialize the controls
    printButton.disabled = true;
    addressTextArea.disabled = true;


    let label = dymo.label.framework.openLabelFile("http://localhost:3000/labels/bumpdown.dymo");
    const res = label.isValidLabel();
    console.log(res);

    function determineLabelType (label) {
      if (label.isDCDLabel()) {
        console.log ("Dymo Connect label");
      }
      if (label.isDLSLabel()) {
        console.log ("DLS Label");
      }
    }

    determineLabelType (label);
    let names = label.getObjectNames();
    console.log(names);
    console.log (label.getObjectText(names[0]));
    console.log (label.getObjectText(names[1]));
    console.log (label.getObjectText(names[2]));

    names.forEach ((item) => {
      console.log (label.getObjectText (item));
    });

    loadPrintersAsync ();
  
      
      
      


  



  }

  onload();
});
