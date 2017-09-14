// Global variables
// State is holding all the previous states
var state = [{
  player: 1,
  field: [0, 0, 0, 0, 0, 0, 0, 0, 0]
}];
var mode = "";

// Configuration
const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

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

  // Gameloop betreten
  gameLoop();
}

const gameLoop = (clickedElement) => {
  // Select last state

  // Nur state ändern, wenn etwas geklickt wurde.
  if (clickedElement) {
    // Um die mutierung zu stoppen klonen
    const currentState = state[state.length - 1];
    // Hiermit wird das Objekt tief geklont.
    const nextState = JSON.parse(JSON.stringify(currentState));
    // Spieler ändern
    nextState.player = (currentState.player === 1) ? 2 : 1;
    nextState.field[clickedElement - 1] = nextState.player;
    state.push(nextState);
    console.log(state);
  }

  const currentState = state[state.length - 1];
  //console.log("State", state)
  applyToField(currentState);
}

const revert = () => {
  state = state.slice(0, -1);
  gameLoop();
}

const applyToField = (currentState) => {
  currentState.field.forEach((number, index) => {
    const targetField = $("#game" + (index + 1));
    switch(number) {
      case 0:
        targetField.text("");
        targetField.css("background-color", "grey");
        targetField.prop("disabled", false);
        break;
      case 1:
        targetField.text("X");
        targetField.prop("disabled", true);
        targetField.css("background-color", "orange");
        break;
      case 2:
        targetField.text("O");
        targetField.prop("disabled", true);
        targetField.css("background-color", "blue");
        break;
    }
  });
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
  // Um beide Textfelder zu prüfen wurde hier | anstelle von || verwendet.
  if (!validateEmail("#inputPlayerOneMvsM") | !validateEmail("#inputPlayerTwoMvsM")) {
    setStatus('Bitte valide Email-Adressen eingeben', 'red');
    return false;
  }

  setStatus("Eingaben korrekt!", "green");
  return true;
}

const validateEmail = (inputId) => {
  const email = $(inputId).val();

  if (emailPattern.test(email)) {
    $(inputId).removeClass("emailInvalid");
    return true;
  } else {
    // Invalid indicator
    $(inputId).addClass("emailInvalid");
    return false;
  }
}

const checkForWinner = (currentState) => {
  const fields = currentState.field;

  // Senkrecht 1
  if (fields[0])
}
