import { renderLabelToImage } from "./dymoutils.js"

export function configureLabelTriggers(label) {
  $('#labelFormWrapper').change(() => {
    renderLabelToImage (label, $('#deviceLabelImage'));
  })

  $('#asset').change(() => {
    label.setObjectText('AssetTag', $('#asset').val());
  });

  $('#model').on('input', () => {
    label.setObjectText('Model', $('#model').val());
  });

  $('#hardwareField').change(() => {
    label.setObjectText('Hardware', $('#hardware').find(':selected').val());
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

  $('#returnField').trigger('change');
  $('#labelFormWrapper').trigger('change');
}

// Load available default computer models
$.get('/data/models.csv', ((data) => {
  $(() => {
    data.split('\r\n').forEach((row) => {
      let model = row.split(',');
      let str = model[0] + " (" + model[1] + " Stock)";
      $('#models').append($('<option>', {value: str, text: str}));
      $('#model').append($('<option>', {value: str, text: str}));
    });
  });
}));

// Load standard hardware configs
$.get('/data/hardware.csv', (data) => {
  $(() => {
    data.split('\n').forEach ((row) => {
      let hardware = row.split(',');
      let str = "" + hardware[0] + " / " + hardware [1] + " / " + hardware[2];
      $('#hardware').append($('<option>', {text: str}));
    });
  });
});


// Configure behavior of accessory select options
  $(() => {
    // User should have either USB-C or Barrel/Magsafe Charger
  $('#barrel').on('input', () => {
    if($('#barrel').prop('checked')) {
      $('#usbc').prop('checked', false);
      $('#nothing').prop('checked', false);
    }     
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

  // Enable select2 selects
  $('#model').select2({tags:true});  
  $('#hardware').select2({tags:true});  
});

