//***************************************************************************** */
import { hello, openLabel, renderLabelToImage } from "./dymoutils.js";
import { initializeCard as initPrinters} from "./printerControls.js";
$(() => {
  hello();


  function onload() {
    initPrinters ();
    let label;

    
    openLabel("http://localhost:3000/labels/bumpdown.dymo").then((data) => {
      label = data;


      // Add onchange for asset
      $('#asset').change(() => {
        console.log('Changing Asset Tag');
        label.setObjectText('AssetTag', $('#asset').val());
      });

      $('#labelFormWrapper').change(() => {
        renderLabelToImage(label, $('#labelImage'));
      });

      $('#s3t').on('input', () => {
        label.setObjectText('Model', $('#s3t').val());
      })

      $('#hardwareField').change(() => {
        console.log("Changing hardware values");
        label.setObjectText('Hardware', $('#s2t').find(':selected').val());
      });

      
      $('#returnField').change(() => {
        console.log ("Changing returned items");
        let str = "Returned: ";

        if ($('#usbc').prop('checked')) {
          str += "USB-C Charger, ";
        }

        if ($('#barrel').prop('checked')) {
          str += "Barrel/Magsafe Charger, ";
        }

        if ($('#dongle').prop('checked')) {
          str += "Hub, ";
        }

        if ($('#nothing').prop('checked')) {
          str += "No Accessories";
        }

        if ($('#customCheck').prop('checked')) {
          str += $('#custom').val();
        }
        
        label.setObjectText('Accessories', str);
      });




      
    // _debug_labelNames (label);




    $('#usbc').on('input', () => {
      if ($('#usbc').prop('checked')) {
        $('#barrel').prop('checked', false);
        $('#nothing').prop('checked', false);
      }     
    });


    $('#barrel').on('input', () => {
      if($('#barrel').prop('checked')) {
        $('#usbc').prop('checked', false);
        $('#nothing').prop('checked', false);
      }     
    });

    $('#printButton').on('click', () => {
      printLabel (label);
    });

    $('#nothing').on('input', () => {
      if ($('#nothing').prop('checked')) {
        $('#usbc,#barrel,#dongle').each(function() {
          $(this).prop('checked', false);
        })
        $('#customCheck').prop('checked', false);
      }
    });

    $('#dongle').on('input', () => {
      if ($('#dongle').prop('checked')) {
        console.log ($(self));
        console.log('testttt');
        $('#nothing').prop('checked', false);
      }
    });

    $('#custom').on('input', () => {
      $('#nothing').prop('checked', false);
      $('#customCheck').prop('checked',true);
    });

    $('#customCheck').on('input', () => {
      $('#nothing').prop('checked',false);
    });

    $.get('/data/models.csv', ((data) => {
      data.split('\n').forEach((row) => {
        let model = row.split(',');
        let str = model[0] + " (" + model[1] + " Stock)";
        $('#models').append($('<option>', {value: str, text: str}));
        $('#s3t').append($('<option>', {value: str, text: str}));
      });
    }));

    

    $.get('/data/hardware.csv', (data) => {
      data.split('\n').forEach ((row) => {
        let hardware = row.split(',');
        let str = "" + hardware[0] + " / " + hardware [1] + " / " + hardware[2];
        $('#s2t').append($('<option>', {text: str}));
      });
    });

    $('#returnField').trigger('change');
    $('#labelFormWrapper').trigger('change');



    $('#s2t').select2({tags:true});  
    $('#s3t').select2({tags:true});  
    $('#printersSelect').select2();
    });
    


    

  }

  onload();
  

});

function _debug_labelNames (label) {
  let names = label.getObjectNames();
  console.log(names);
  names.forEach ((name) => {
    console.log (name + ": " + label.getObjectText (name));
  });
}

function printLabel (label) {
  console.log ('printing!');
  try {
    if (!label) {
      alert ("Label not loaded.");
      return;
    }

    label.print($('#printersSelect').val())
  }
  catch (e) {
    alert(e.message || e);
  }
}