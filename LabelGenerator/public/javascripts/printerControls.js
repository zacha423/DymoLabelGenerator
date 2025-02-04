// JS related to printer controls card
export function configureLabelTriggers (label) {
  $('#printButton').on('click', () => {
    let xml = label.getLabelXml();
    
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