let data = [];

const loadData = () => {
  data = ["1", "2"];

  while(true) {
    var num = parseInt(prompt("Nummer eingeben"));

    if (isNaN(num))
      break;

    data.push(num);
  }
  refreshTable();
}

const refreshTable = () => {
  const convertedData = data.map((entry, index) => "<tr><td>"+index+"</td><td>"+entry+"</td></tr>");
  const dataString = convertedData.join('');
  console.log(dataString);
  $("#weather").html(dataString);
}
