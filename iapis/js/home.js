function creatCharts() {
  $.get("json/home.json", function (options) {
    setInfo(options[0]);
    createTable(options[1]);
    creatEchart(document.getElementById("infocontainer1"), options[2]);
    creatEchart(document.getElementById("infocontainer2"), options[3]);
    creatEchart(document.getElementById("infocontainer3"), options[4]);
  });
}

function creatEchart(dom, option) {
  var myChart = echarts.init(dom);
  myChart.setOption(option);
}

function createTable(data) {
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      $(".info1table tr:nth-child(" + (i + 4) + ") th:nth-child(" + (j + 2) + ")").html(data[i][j]);
    }
  }
  for (let k = 0; k < data[0].length; k++) {
    $(".info1table tr:nth-child(" + 6 + ") th:nth-child(" + (k + 2) + ")").html(data[0][k] +data[1][k]);
  }
}

function setInfo(para){
  $("#info1 h6").html(para[0]);
  $("#info2 h6").html(para[1]);
  $("#info3 h6").html(para[2]);
}