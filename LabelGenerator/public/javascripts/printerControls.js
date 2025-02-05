export function configureLabelTriggers (label) {
  $('#printButton').on('click', (event) => {
    const TIMEOUT = 4500;
    const xml = label.getLabelXml();
    event.stopImmediatePropagation();
    
    // Trigger secondary label if any
    // Must be delayed or Dymo Connect Service will crash / fail to print the 2nd label
    setTimeout (() => {
      $('#printButton').trigger('delayClick');
    }, TIMEOUT);
    $.post('/print', {label: xml, printer: $('#printersSelect').val()});
  });
}

export function configureSecondaryLabelTriggers (label) {
  $('#printButton').on('delayClick', () => {
    const xml = label.getLabelXml ();
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