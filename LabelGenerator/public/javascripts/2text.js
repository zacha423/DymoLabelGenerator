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
    // _debug_labelNames (label);

    loadPrintersAsync ();
    updatePreview (label);



    // Add onchange for asset
    $('#asset').change(() => {
      console.log('Changing Asset Tag');
      label.setObjectText('AssetTag', $('#asset').val());
      updatePreview(label);
    });

    $('#model').change(() => {
      console.log ('Changing model text');
      label.setObjectText('Model', $('#model').val());
      updatePreview(label);
    });

    $('#hardwareField').change(() => {
      console.log("Changing hardware values");
      label.setObjectText('Hardware', $('#cpu').val() + " / " + $('#memory').val() + " / " + $('#storage').val())
      updatePreview(label);
    });

    $('#returnField').change(() => {
      console.log ("Changing returned items");
      str = "Retd w/: ";

      if ($('#usbc').prop('checked')) {
        str += "USB-C Charger, ";
      }

      if ($('#barrel').prop('checked')) {
        str += "Barrel/Magsafe Charger, ";
      }

      if ($('#dongle').prop('checked')) {
        str += "Hub, ";
      }

      str += $('#custom').val();

      label.setObjectText('Accessories', str);
      updatePreview (label);
    });

    $('#usbc').on('input', () => {
      if ($('#usbc').prop('checked')) {
        $('#barrel').prop('checked', false);
      }
    });


    $('#barrel').on('input', () => {
      if($('#barrel').prop('checked')) {
        $('#usbc').prop('checked', false);
      }
    });




  }

  onload();
});

function updatePreview (label) {
  if (!label) {
    return;
  }  

  const pngData = label.render();
  const labelImage = $('#labelImage');
  labelImage.attr('src', "data:image/png;base64," + pngData);
}

function _debug_labelNames (label) {
  let names = label.getObjectNames();
  console.log(names);
  names.forEach ((name) => {
    console.log (name + ": " + label.getObjectText (name));
  });
}




/***
 * // prints the label
      printButton.onclick = function() {
        try {               
          if (!label) {
            alert("Load label before printing");
            return;
          }

          //alert(printersSelect.value);
          label.print(printersSelect.value);
          //label.print("unknown printer");
        }
        catch(e) {
          alert(e.message || e);
        }
      }
 */