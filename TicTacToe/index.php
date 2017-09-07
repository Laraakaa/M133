<!DOCTYPE html>
<html lang="de">
  <head>

    <title>TicTacToe</title>

    <link rel="stylesheet" href="style.css">
  </head>
  <body onload="init();">
    <h1>TicTacToe</h1>

    <div class="gameGrid">
      <div class="gameGridRow">
        <div class="gameGridColumn">
          <button class="gameGridButton">
        </div>
        <div class="gameGridColumn">
          <button class="gameGridButton">
        </div>
        <div class="gameGridColumn">
          <button class="gameGridButton">
        </div>
      </div>
      <div class="gameGridRow">
        <div class="gameGridColumn">
          <button class="gameGridButton">
        </div>
        <div class="gameGridColumn">
          <button class="gameGridButton">
        </div>
        <div class="gameGridColumn">
          <button class="gameGridButton">
        </div>
      </div>
      <div class="gameGridRow">
        <div class="gameGridColumn">
          <button class="gameGridButton">
        </div>
        <div class="gameGridColumn">
          <button class="gameGridButton">
        </div>
        <div class="gameGridColumn">
          <button class="gameGridButton">
        </div>
      </div>
    </div>

    <div class="gameOptions">
      <h2>Typ des Spieles:</h2>
      <ul class="gameOptionsList">
        <li>
          <input type="radio" id="radioMenschVsMensch" onClick="selectOption('MvsM')" class="optionsRadio"><label for="radioMenschVsMensch">Mensch vs Mensch</label>
          <ul class="gameOptionsPlayerList">
            <li>
              <label for="inputPlayerOneMvsM">Spieler 1 (Email):</label><input type="email" id="inputPlayerOneMvsM" class="optionsInput" disabled>
            </li>
            <li>
              <label for="inputPlayerTwoMvsM">Spieler 2 (Email):</label><input type="email" id="inputPlayerTwoMvsM" class="optionsInput" disabled>
            </li>
          </ul>
        </li>
        <li>
          <input type="radio" id="radioMenschVsPC" onClick="selectOption('MvsPC')" class="optionsRadio"><label for="radioMenschVsPC">Mensch vs PC</label>
          <ul class="gameOptionsPlayerList">
            <li>
              <label for="inputPlayerMvsPC">Spieler (Email):</label><input type="email" id="inputPlayerMvsPC" class="optionsInput" disabled>
            </li>
          </ul>
        </li>
        <li>
          <input type="radio" id="radioPCvsPC" onClick="selectOption('PCvsPC')" class="optionsRadio"><label for="radioPCVsPC">PC vs PC</label>
        </li>
      </ul>
      <h3 id="status">Spiel wird geladen...</h3>
      <div class="controlButtons">
        <button id="reset" disabled>Reset</button>
        <button id="start" onClick="start();" disabled>Start</button>
        <button disabled>1 Schritt zurück</button>
      </div>
    </div>

    <!-- Scripts sind hier, um die Ladezeiten später auf dem Server zu verbessern -->
    <script src="libs/jquery.min.js"></script>
    <script src="script.js"></script>
  </body>
</html>
