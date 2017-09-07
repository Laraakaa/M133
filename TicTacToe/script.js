// Global variables
// State is holding all the previous states
var state = {};
var mode = "";

// Initialize the program. Main function.
const init = () => {
  setStatus('Warte auf Start...', 'green')

  // Enable start button
  $("#start").prop('disabled', false)
}

const start = () => {
  if (!validate()) {
    console.log('Validation failed.')
    return;
  }
}

const setStatus = (str, color) => {
  $("#status").css('color', color);
  $("#status").text(str);
}

// Disable all option input fields
const disableAllOptions = () => {
  $(".optionsInput").prop('disabled', true);
  $(".optionsRadio").prop('checked', false);
}

// Click on a radio button
const selectOption = option => {
  mode = option;
  disableAllOptions();

  // Enable or disable fields
  if (option === 'MvsM') {
    $("#radioMenschVsMensch").prop('checked', true);
    $("#inputPlayerOneMvsM").prop('disabled', false);
    $("#inputPlayerTwoMvsM").prop('disabled', false);
  } else if (option === 'MvsPC') {
    $("#radioMenschVsPC").prop('checked', true);
    $("#inputPlayerMvsPC").prop('disabled', false);
  } else if (option === 'PCvsPC') {
    $("#radioPCvsPC").prop('checked', true);
  }
}

const validate = () => {
  if (!mode) {
    setStatus('Bitte erst eine Option auswählen.', 'red');
    return false;
  }
  return true;
}
