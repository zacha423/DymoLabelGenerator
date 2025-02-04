// JS related to printer controls card
export function configureLabelTriggers (label) {
  $('#printButton').on('click', () => {
    // printLabel (label);
    try {
      if (!label) {
        alert ("Label not loaded");
        return;
      }

      // label.print($('#printersSelect').val());
    }
    catch (e) {
      alert(e.message || e);
    }
  });


  // add on click for new print method
  $('#printButton').on('click', () => {
    let xml = label.getLabelXml();
    
    $.post('/print', {label: xml, printer: $('#printersSelect').val()}, (datazz) => {
      // alert (datazz);
    });
  });
}

$(() => {
  $.get('/printers', data => {
    data.forEach(printer => {let option= document.createElement('option');
      option.value = printer;
      option.append(document.createTextNode(printer));
      $('#printersSelect').append(option);  
    });
  });
  
  $('#printButton').disabled = true;
  $('#printersSelect').select2();   
});