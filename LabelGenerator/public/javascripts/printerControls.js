// JS related to printer controls card
export function configureLabelTriggers (label) {
  $('#printButton').on('click', () => {
    let xml = label.getLabelXml();
    console.log("I've printed a label!");
    event.stopImmediatePropagation();
    // Trigger a secondary label, if any.
    setTimeout (() => {console.log("I've slept!");$('#printButton').trigger('delayClick');}, 4500)
    $.post('/print', {label: xml, printer: $('#printersSelect').val()});
  });
}

export function configureSecondaryLabelTriggers (label) {
  $('#printButton').on('delayClick', () => {
    let xml = label.getLabelXml ();
    console.log ("I've also printed a label.");
    $.post('/print', {label: xml, printer: $('#printersSelect').val()});
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