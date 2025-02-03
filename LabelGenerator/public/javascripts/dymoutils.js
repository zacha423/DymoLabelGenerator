export async function openLabel (path) {
  let label;
  try {
    
    label = await dymo.label.framework.openLabelXml(path);

    if (!label.isValidLabel()) {
      console.error ("Invalid label!");
    }
  }
  catch (e) {
    console.error ("Failed to open label: " + e);
  }

  return label;
}

// Call to Dymo to render label and load the data into an image element.
export function renderLabelToImage (label, imageElement) {
  console.log ("util render'");
  if (!label || !imageElement) {
    return;
  }

  const pngData = label.render();
  imageElement.attr('src', "data:image/png;base64," + pngData);
}

export function hello () {
  console.log('hello world');
}

export function _debug_labelNames (label) {
  let names = label.getObjectNames();
  console.log(names);
  names.forEach ((name) => {
    console.log (name + ": " + label.getObjectText (name));
  });
}