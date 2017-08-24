const calculateMax = () => {
  const zahl1 = parseInt(document.getElementById('maxZahl1').value);
  const zahl2 = parseInt(document.getElementById('maxZahl2').value);

  let max = Math.max(zahl1, zahl2);

  if (isNaN(max)){
    max = 0;
  }

  document.getElementById('maxZahlResult').value = max;
}

const sortNumbers = () => {
  const zahl1 = parseInt(document.getElementById('sortZahl1').value);
  const zahl2 = parseInt(document.getElementById('sortZahl2').value);

  if (isNaN(zahl1) || isNaN(zahl2)) {
    return;
  }

  const sorted = zahl1 > zahl2 ? zahl1 + ";" + zahl2 : zahl2 + ";" + zahl1;

  document.getElementById('sortZahlResult').value = sorted;
}

const countTo100 = () => {
  let result = 0;

  for (var i = 1; i<=100; i++) {
    result += i;
  }

  document.getElementById('countResult').innerHTML = "Alle Zahlen bis 100 addiert: " + result;
}

const berechneFakultaet = () => {
  const zahl = parseInt(document.getElementById('fakZahl1').value);
  let result = 1;

  for (var i = 1; i<=zahl; i++)
    result = result * i;

  document.getElementById('fakResult').value = result;
}

const verstecken = () => {
  var i = 0;
  var result = '';

  while(i <= 100) {
    result += (i+1) + "; "
    i++;
  }

  result += "Ich komme!"

  document.getElementById('versteckenResult').innerHTML = result;
}
