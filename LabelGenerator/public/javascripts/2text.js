//***************************************************************************** */
$(() => {
  function onload() {
    const labelFile = $('#labelFile');
    const addressTextArea = $('#addressTextArea');
    const printerSelect = $('#printersSelect');
    const printButton = $('#printButton');

    // Initialize the controls
    printButton.disabled = true;
    addressTextArea.disabled = true;


    let label = dymo.label.framework.openLabelFile("http://localhost:3000/labels/testlabel.dymo");
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
    // console.log (label.getLabelXml());

    // labelFile.on("change", function () {
    //   console.log ('test');
      
    //   // load file from 

    //   // let label = dymo.label.framework.openLabelXml("");
      
      
      


    // });



  }

  onload();
});
