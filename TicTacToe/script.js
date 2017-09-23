// Global variables
// State is holding all the previous states
var state = [];
var mode = '';
const initialState = {
    player: 2,
    field: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    fieldDisabled: true,
    gameEnded: false,
    startDisabled: false,
    resetDisabled: true,
    editMode: true,
    reason: 'Initial',
    backAvailable: false
  };

// Configuration
const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// Initialize the program. Main function.
const init = () => {
  setStatus('Warte auf Start...', 'green');

  // Push initial state
  pushState(initialState);

  apply(getCurrentState());
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
  apply(newState);
}

const uncheckAllCheckboxes = () => $('.optionsRadio').prop('checked', false);

const disableAllInputs = () => $('.optionsInput').prop('disabled', true);
const enableAllInputs = () => $('.optionsInput').prop('disabled', false);
const disableAllRadios = () => $('.optionsRadio').prop('disabled', true);
const enableAllRadios = () => $('.optionsRadio').prop('disabled', false);

const cleanupInputs = (shouldEmpty) => {
  $('.optionsInput').removeClass('emailValid');
  $('.optionsInput').removeClass('emailInvalid');
  if (shouldEmpty) {
    $('.optionsInput').val('');
  }
}

const reset = () => {
  state = [];
  pushState(initialState);

  // Andere sachen, die zurückgesetzt werden müssen
  uncheckAllCheckboxes();
  cleanupInputs(true);
  disableAllInputs();
  $('.optionsRadio').prop('disabled', false);

  mode = '';

  setStatus('Zurückgesetzt. ')
}

const start = () => {
  if (!validate()) {
    console.log('Validation failed.');
    return;
  }

  const newState = getNewState(`Start modus=${mode}`);

  // Textfelder deaktivieren
  newState.editMode = false;
  newState.startDisabled = true;
  newState.fieldDisabled = false;
  newState.resetDisabled = false;
  newState.backAvailable = true;

  pushState(newState);

  // Gameloop betreten
  gameLoop();
}

const gameLoop = (clickedElement) => {
  // Nur state ändern, wenn etwas geklickt wurde. Ansonsten nur die elemente aktualisieren.
  if (clickedElement) {
    const currentState = getCurrentState();

    // Nicht wenn das feld disabled ist
    if(currentState.fieldDisabled) {
      setStatus('Diese Aktion ist nicht erlaubt, da das Spiel noch nicht gestartet ist.', 'red');
      return;
    }

    // Nicht wenn das spiel schon beendet ist
    if (currentState.gameEnded) {
      setStatus('Diese Aktion ist nicht erlaubt, da das Spiel bereits beendet ist.', 'red');
      return;
    }

    const nextState = getNewState('FieldChange: ' + clickedElement);
    // Spieler ändern
    nextState.player = (currentState.player === 1) ? 2 : 1;
    nextState.field[clickedElement - 1] = nextState.player;
    pushState(nextState);
    console.log(state);
  }

  // Select last state
  const currentState = getCurrentState();

  // Check for winner
  const winner = getWinner(currentState);
  if (winner.isFinished) {
    const newState = getNewState('Finished: ' + winner.text);
    newState.gameEnded = true;

    pushState(newState);

    setStatus(winner.text, 'green');
  }

  apply(currentState);
}

const revert = () => {
  state = state.slice(0, -1);
  gameLoop();
  $('.actionLog').html(getStateReasons());
}

const apply = (currentState) => {
  // field
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

  if (!currentState.editMode) {
    disableAllInputs();
    disableAllRadios();
    cleanupInputs();
  } else {
    enableAllRadios();
    cleanupInputs(true);
  }

  $('#start').prop('disabled', currentState.startDisabled);
  $('#reset').prop('disabled', currentState.resetDisabled);
  $('#back').prop('disabled', !currentState.backAvailable);
}

const setStatus = (str, color) => {
  $('#status').css('color', color);
  $('#status').text(str);
}

// Click on a radio button
const selectOption = option => {
  mode = option;

  uncheckAllCheckboxes();
  disableAllInputs();
  cleanupInputs(true);

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
  } else if (mode === 'MvsM') {
    // Um beide Textfelder zu prüfen wurde hier | anstelle von || verwendet.
    if (!validateEmail('#inputPlayerOneMvsM') | !validateEmail('#inputPlayerTwoMvsM')) {
      setStatus('Bitte valide Email-Adressen eingeben', 'red');
      return false;
    }
    if ($('#inputPlayerOneMvsM').val() === $('#inputPlayerTwoMvsM').val()) {
      setStatus('Bitte unterschiedliche Email-Adressen eingeben', 'red');
      return false;
    }
  } else if (mode === 'MvsPC') {
    if (!validateEmail('#inputPlayerMvsPC')) {
      setStatus('Bitte valide Email-Adresse eingeben', 'red');
      return false;
    }
  }

  setStatus('Eingaben korrekt, Spiel gestartet!', 'green');
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

const getWinner = currentState => {
  const retObj = {
    isFinished: false,
    text: ''
  };
  const winnerCode = checkForWinner(currentState);

  if (winnerCode === 3) {
    retObj.text = 'Unentschieden.';
    retObj.isFinished = true;
  } else if (winnerCode === 1) {
    retObj.isFinished = true;
    if (mode === 'MvsM') {
      retObj.text = `Spieler 1 (${$('#inputPlayerOneMvsM').val()}) hat gewonnen!`;
    } else if (mode === 'MvsPC') {
      retObj.text = 'Du (menschlicher Spieler) hast gewonnen!';
    } else if (mode === 'PCvsPC') {
      retObj.text = 'PC 1 hat gewonnen.';
    }
  } else if (winnerCode === 2) {
    retObj.isFinished = true;
    if (mode === 'MvsM') {
      retObj.text = `Spieler 2 (${$('#inputPlayerTwoMvsM').val()}) hat gewonnen!`;
    } else if (mode === 'MvsPC') {
      retObj.text = 'Ohh nein :(. Du hast leider verloren.';
    } else if (mode === 'PCvsPC') {
      retObj.text = 'PC 2 hat gewonnen.';
    }
  }

  return retObj;
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
    return fields[1];
  }

  // Senkrecht 3
  if (fields[2] === fields[5] && fields[2] === fields[8] && fields[2] !== 0) {
    return fields[2];
  }

  // Waagrecht 1
  if (fields[0] === fields[1] && fields[0] === fields[2] && fields[0] !== 0) {
    return fields[0];
  }

  // Waagrecht 2
  if (fields[3] === fields[4] && fields[3] === fields[5] && fields[3] !== 0) {
    return fields[3];
  }

  // Waagrecht 3
  if (fields[6] === fields[7] && fields[6] === fields[8] && fields[6] !== 0) {
    return fields[6];
  }

  // Diagonal 1
  if (fields[0] === fields[4] && fields[0] === fields[8] && fields[0] !== 0) {
    return fields[0];
  }

  // Diagonal 2
  if (fields[2] === fields[4] && fields[2] === fields[6] && fields[2] !== 0) {
    return fields[2];
  }

  if (fields.filter(field => field !== 0).length === fields.length) {
    return 3;
  }

  return 0;
}
