<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="utf-8">
    <title>Lektion 2</title>
  </head>
  <body onLoad="countTo100(); verstecken();">
    <h1>Math mit JavaScript</h1>
    <table>
      <tr>
        <th>
          Beschreibung
        </th>
        <th>
          Input 1
        </th>
        <th>
          Input 2
        </th>
        <th>
          Resultat
        </th>
      </tr>
      <tr>
        <td>
          Maximale Zahl
        </td>
        <td>
          <input type="number" id="maxZahl1" onInput="calculateMax();">
        </td>
        <td>
          <input type="number" id="maxZahl2" onInput="calculateMax();">
        </td>
        <td>
          <input type="number" id="maxZahlResult" disabled>
        </td>
      </tr>
      <tr>
        <td>
          Zahlen sortieren
        </td>
        <td>
          <input type="number" id="sortZahl1" onInput="sortNumbers();">
        </td>
        <td>
          <input type="number" id="sortZahl2" onInput="sortNumbers();">
        </td>
        <td>
          <input type="text" id="sortZahlResult" disabled>
        </td>
      </tr>
      <tr>
        <td>
          Fakultät berechnen
        </td>
        <td>
          <input type="number" id="fakZahl1" onInput="berechneFakultaet();">
        </td>
        <td>
        </td>
        <td>
          <input type="text" id="fakResult" disabled>
        </td>
      </tr>
    </table>
    <div id="countResult"></div>
    <div id="versteckenResult"></div>
    <script src="script.js"></script>
  </body>
</html>
