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
    // const labelFile = $('#labelFile');
    // const printerSelect = $('#printersSelect');
    const printButton = $('#printButton');

    // Initialize the controls
    printButton.disabled = true;

  

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
      // label.setObjectText('Hardware', $('#cpu').val() + " / " + $('#memory').val() + " / " + $('#storage').val())
      label.setObjectText('Hardware', $('#s2t').find(':selected').val());
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

      if ($('#nothing').prop('checked')) {
        str += "No Accessories";
      }

      str += $('#custom').val();

      label.setObjectText('Accessories', str);
      updatePreview (label);
    });

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
        $('#custom').val('');
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
    })

    $.get('/data/models.csv', ((data) => {
      data.split('\n').forEach((row) => {
        model = row.split(',');
        str = model[0] + " (" + model[1] + " Stock)";
        $('#models').append($('<option>', {value: str, text: str}));
      });
    }));

    $('#models').on('input', () => {
      $('#model').val($('#models').val());
      $('#model').trigger('change');
    })

    $.get('/data/hardware.csv', (data) => {
      data.split('\n').forEach ((row) => {
        hardware = row.split(',');
        str = "" + hardware[0] + " / " + hardware [1] + " / " + hardware[2];
        $('#default_hardware').append($('<option>', {cpu: hardware[0], memory:hardware[1], storage:hardware[2], text: str}));
        $('#s2t').append($('<option>', {cpu: hardware[0], memory:hardware[1], storage:hardware[2], text: str}));
      });
    });

    $('#default_hardware').on('input', () => {
      selectedOpt = $('#default_hardware').find(':selected');

      $('#cpu').val(selectedOpt.attr('cpu'));
      $('#memory').val(selectedOpt.attr('memory'));
      $('#storage').val(selectedOpt.attr('storage'));
    });

    $('#returnField').trigger('change');



    $('#s2t').select2({tags:true, createTag: (tag) => {

      let term = $.trim(tag.term);
      let terms = term.split(' / ');
      
      if (term === '') {
        return null;
      }


      console.log ({
        id: term,
        text: term,
      //   cpu: terms[0],
      //   memory: terms[1],
      //   storage: terms[2]
      });

      return {
        id: term,
        text: term,
        value: term
        // cpu: terms[0],
        // memory: terms[1],
        // storage: terms[2]
      };
    }});    
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