// Global variables
// State is holding all the previous states
var state = [];
var mode = '';
const initialState = {
    player: 1,
    field: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    fieldDisabled: true,
    startDisabled: false,
    resetDisabled: true,
    reason: 'Initial'
  };

// Configuration
const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// Initialize the program. Main function.
const init = () => {
  setStatus('Warte auf Start...', 'green');

  // Push initial state
  pushState(initialState);

  // Enable start button
  $('#start').prop('disabled', false);
}

// Disable all option input fields
const disableAllOptions = (shouldDisable) => {
  $('.optionsInput').prop('disabled', true);
  $('.optionsRadio').prop('checked', false);
  if (shouldDisable) {
    $('.optionsRadio').prop('disabled', true);
  }
}

// Get the current state
const getCurrentState = () => state[state.length - 1];

// Clone (copy) an object
const cloneObject = obj => JSON.parse(JSON.stringify(obj));

// Get a new state object
const getNewState = (reason) => ({ ...cloneObject(getCurrentState()), reason });

const getStateReasons = () => state.map((value) => `<tr><td>- ${value.reason}</td></tr>`);

const pushState = (newState) => {
  state.push(newState);
  $('.actionLog').html(getStateReasons());
}

const start = () => {
  if (!validate()) {
    console.log('Validation failed.');
    return;
  }

  // Textfelder deaktivieren
  disableAllOptions(true);

  // Gameloop betreten
  gameLoop();
}

const gameLoop = (clickedElement) => {
  // Nur state ändern, wenn etwas geklickt wurde. Ansonsten nur die elemente aktualisieren.
  if (clickedElement) {
    const nextState = getNewState('FieldChange: ' + clickedElement);
    const currentState = getCurrentState();
    // Spieler ändern
    nextState.player = (currentState.player === 1) ? 2 : 1;
    nextState.field[clickedElement - 1] = nextState.player;
    pushState(nextState);
    console.log(state);
  }

  // Select last state
  const currentState = getCurrentState();

  // Check for winner
  const winner = checkForWinner(currentState);
  if (winner !== 0) {
    setStatus('Spieler ${winner} hat gewonnen.');
  }

  apply(currentState);
}

const revert = () => {
  state = state.slice(0, -1);
  gameLoop();
}

const apply = (currentState) => {
  currentState.field.forEach((number, index) => {
    const targetField = $('#game' + (index + 1));
    switch(number) {
      case 0:
        targetField.text('');
        targetField.css('background-color', "grey");
        targetField.prop('disabled', false);
        break;
      case 1:
        targetField.text('X');
        targetField.prop('disabled', true);
        targetField.css('background-color', 'orange');
        break;
      case 2:
        targetField.text('O');
        targetField.prop('disabled', true);
        targetField.css('background-color', 'blue');
        break;
    }
  });
}

const setStatus = (str, color) => {
  $('#status').css('color', color);
  $('#status').text(str);
}

// Click on a radio button
const selectOption = option => {
  mode = option;
  disableAllOptions();

  // Enable or disable fields
  if (option === 'MvsM') {
    $('#radioMenschVsMensch').prop('checked', true);
    $('#inputPlayerOneMvsM').prop('disabled', false);
    $('#inputPlayerTwoMvsM').prop('disabled', false);
  } else if (option === 'MvsPC') {
    $('#radioMenschVsPC').prop('checked', true);
    $('#inputPlayerMvsPC').prop('disabled', false);
  } else if (option === 'PCvsPC') {
    $('#radioPCvsPC').prop('checked', true);
  }
}

const validate = () => {
  if (!mode) {
    setStatus('Bitte erst eine Option auswählen.', 'red');
    return false;
  }
  // Um beide Textfelder zu prüfen wurde hier | anstelle von || verwendet.
  if (!validateEmail('#inputPlayerOneMvsM') | !validateEmail('#inputPlayerTwoMvsM')) {
    setStatus('Bitte valide Email-Adressen eingeben', 'red');
    return false;
  }
  if ($('#inputPlayerOneMvsM').val() === $('#inputPlayerTwoMvsM').val()) {
    setStatus('Bitte unterschiedliche Email-Adressen eingeben', 'red');
    return false;
  }

  setStatus('Eingaben korrekt!', 'green');
  return true;
}

const validateEmail = (inputId) => {
  const email = $(inputId).val();

  if (emailPattern.test(email)) {
    $(inputId).removeClass('emailInvalid');
    $(inputId).addClass('emailValid');
    return true;
  } else {
    // Invalid indicator
    $(inputId).removeClass('emailValid');
    $(inputId).addClass('emailInvalid');
    return false;
  }
}

const checkForWinner = (currentState) => {
  const fields = currentState.field;

  // 0 1 2
  // 3 4 5
  // 6 7 8

  // Senkrecht 1
  if (fields[0] === fields[3] && fields[0] === fields[6] && fields[0] !== 0) {
    return fields[0];
  }

  // Senkrecht 2
  if (fields[1] === fields[4] && fields[1] === fields[7] && fields[1] !== 0) {
    return fields[0];
  }

  // Senkrecht 3
  if (fields[2] === fields[5] && fields[2] === fields[8] && fields[2] !== 0) {
    return fields[0];
  }

  // Waagrecht 1
  if (fields[0] === fields[1] && fields[0] === fields[2] && fields[0] !== 0) {
    return fields[0];
  }

  // Waagrecht 2
  if (fields[3] === fields[4] && fields[3] === fields[5] && fields[3] !== 0) {
    return fields[0];
  }

  // Waagrecht 3
  if (fields[6] === fields[7] && fields[6] === fields[8] && fields[6] !== 0) {
    return fields[0];
  }

  // Diagonal 1
  if (fields[0] === fields[4] && fields[0] === fields[8] && fields[0] !== 0) {
    return fields[0];
  }

  // Diagonal 2
  if (fields[2] === fields[4] && fields[2] === fields[6] && fields[2] !== 0) {
    return fields[0];
  }

  return 0;
}
