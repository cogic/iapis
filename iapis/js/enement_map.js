// document.writeln("<script src='//webapi.amap.com/maps?v=2.0&key=af623eef450ea6e447829438b62a1168&plugin=AMap.DistrictSearch'></script>");
// document.writeln("<script src='//webapi.amap.com/ui/1.1/main.js'></script>");
// document.writeln("<script src='js/echarts.min.js'></script>");
// document.writeln("<script src='js/database.js'></script>");
// var sNew = [];
// for (let i = 0; i < 2; i++) {
//   sNew.push(document.createElement("script"));
//   sNew[i].async = true;
// }
// sNew[0].src = "//webapi.amap.com/maps?v=2.0&key=af623eef450ea6e447829438b62a1168&plugin=AMap.DistrictSearch";
// sNew[1].src = "//webapi.amap.com/ui/1.1/main.js";
// for (let i = 0; i < sNew.length; i++) {
//   let s0 = document.getElementsByTagName("script")[i];
//   s0.parentNode.insertBefore(sNew[i], s0);
// }

var ok = false;
var optionData;
var myChart = null;
var guangdongAdcode = 440000;

function createEvmtMap(optionValue, optionsJsonPath) {
  var dom = document.getElementById("container");
  // myChart.removeAttribute("_echarts_instance_");
  if (myChart != null) myChart.dispose();
  myChart = echarts.init(dom);
  myChart.showLoading("default", {
    text: "地图加载中...",
    color: "#167DC9",
    textColor: "#000000",
    maskColor: "rgba(255, 255, 255, 0.2)",
    fontSize: 16,
    spinnerRadius: 5,
    lineWidth: 3,
    fontWeight: "bold",
  });
  combineJson(optionValue, optionsJsonPath, function (od) {
    optionData = od;
    //排序
    function sortValue(a, b) {
      return b.value - a.value;
    }
    //利用js中的sort方法
    optionData.series[0].data.sort(sortValue);
    getGeoJson(guangdongAdcode);
  });
}

function combineJson(value, optionsJsonPath, callback) {
  fetchData2(value, function (enementData) {
    //////////////////////////
    $.get(optionsJsonPath, function (optionJson) {
      for (let i = 0; i < optionJson.length - 1; i++) {
        if (optionJson[i].value == value) {
          optionJson[i].series[0].data = enementData;

          callback(optionJson[i]);
          return;
        }
      }
      console.log("optionJson not found");
      callback(optionJson[optionJson.length - 1]);
      return;
    });
  });
}

function getGeoJson(adcode) {
  AMapUI.loadUI(["geo/DistrictExplorer"], function (DistrictExplorer) {
    var districtExplorer = new DistrictExplorer();
    districtExplorer.loadAreaNode(adcode, function (error, areaNode) {
      if (error) {
        console.error(error);
        return;
      }
      var subFeatures = areaNode.getSubFeatures();
      var geoJson = { type: "FeatureCollection", features: subFeatures };
      makemap(geoJson);
    });
  });
}

function makemap(geoJson) {
  echarts.registerMap("guangdong", geoJson);
  myChart.hideLoading();

  var mapping = geoJson.features.reduce(function (pre, cur) {
    pre[cur.properties.adcode] = cur;
    return pre;
  }, {});

  // 循环赋值 O(n)
  // console.log(mapping);
  optionData.series[0].data.forEach(function (o) {
    // console.log(o.adcode);
    if (mapping[o.adcode]) {
      o.name = mapping[o.adcode].properties.name;
    } else {
      console.log("mapping[o.adcode] is undefined");
    }
  });
  console.log(optionData);
  myChart.setOption(
    (option = {
      title: {
        text: optionData.title.text + " (" + optionData.unit + ")", ////////////////
        textStyle: {
          color: "#3B3B3B",
          fontSize: 20,
        },
        subtext: optionData.title.subtext, ////////////////
        left: "40",
        top: "40",
      },
      tooltip: {
        trigger: "item",
        formatter: optionData.tooltip.formatter + " (" + optionData.unit + ")", ////////////////
        textStyle: {
          color: "black",
          fontSize: 14,
        },
      },
      toolbox: {
        show: true,
        orient: "horizontal",
        left: "auto",
        right: "20",
        bottom: "10",
        itemSize: 18,
        feature: {
          saveAsImage: {
            iconStyle: {
              // borderColor: "#17ABD0",
              borderWidth: 1,
            },
            emphasis: {
              iconStyle: {
                textFill: "#000000",
                textPadding: 3,
                textBorderRadius: 4,
                textBackgroundColor: "#E3E3E3",
              },
            },
          },
          dataView: {
            readOnly: true,
            backgroundColor: "rgba(255,255,255,1)",
            // textColor: "#000000",
            buttonColor: "#F1C96C",
            buttonTextColor: "#000000",
            lang: ["数据视图", "<返回", "刷新"],
            iconStyle: {
              color: "#F1C96C",
              borderColor: "#000000",
              borderWidth: 1,
            },
            emphasis: {
              iconStyle: {
                textFill: "#000000",
                textPadding: 5,
                textBorderRadius: 5,
                textBackgroundColor: "#E3E3E3",
              },
            },
            optionToContent: function () {
              var div = '<div id="dataChart"></div>';
              setD();
              return div;
              ////////////////
              //   var seriesData = opt.series[0].data;
              //   var table =
              //     '<table  border="1" style="margin-left:20px;border-collapse:collapse;font-size:14px;text-align:center"><tbody><tr>' +
              //     "<td>" +
              //     optionData.toolbox.feature.dataView.optionToContent.name +
              //     "</td>";
              //   for (var i = 0; i < seriesData.length; i++) {
              //     table += "<td>" + seriesData[i].name + "</td>";
              //   }
              //   table +=
              //     "</tr>" +
              //     "<tr><td>" +
              //     optionData.toolbox.feature.dataView.optionToContent.value +
              //     "</td>";
              //   for (var i = 0; i < seriesData.length; i++) {
              //     table += "<td>" + seriesData[i].value + "</td>";
              //   }
              //   table += "</tr>";
              //   table += "</tbody></table>";
              //   return table;
            },
          },
        },
      },
      visualMap: {
        type: "piecewise",
        // splitNumber: 10,
        itemGap: 0,
        itemSymbol: "rect",
        // min: optionData.visualMap.min, ////////////////
        // max: optionData.visualMap.max, ////////////////
        pieces: getPieces(optionData.visualMap.min, optionData.visualMap.max, optionData.visualMap.splitNumber),
        // text: optionData.visualMap.text, ////////////////
        left: "40",
        top: "130",
        orient: "vertical",
        realtime: true,
        calculable: false,
        precision: optionData.visualMap.precision, //////////////// 图例条显示的小数位数
        itemWidth: 20,
        itemHeight: 20,
        align: "auto",
        inRange: {
          ////////////////
          color: optionData.visualMap.inRange.color,
        },
        outOfRange: {
          color: ["#CBCBCB", "#848484"],
        },
      },
      aspectScale: 0.925,
      series: [
        {
          name: "环境变量和社会经济要素",
          type: "map",
          mapType: "guangdong", // 自定义扩展图表类型
          roam: false,
          left: "auto",
          right: "40",
          top: "center",
          itemStyle: {
            // 鼠标未滑过时地图块Style
            normal: {
              label: {
                show: true,
                fontSize: 11,
                color: "#343434",
              },
              show: true,
              areaColor: "#8B8B8B",
              borderColor: "#595959",
              borderWidth: 1,
              opacity: 1,
            },
          },
          emphasis: {
            // 鼠标滑过时地图块高亮Style
            label: {
              show: true,
              fontSize: 14,
              fontWeight: "bold",
              color: "#000000",
              // textBorderColor: "#42BC63",
              textBorderColor: "#FFFFFF",
              textBorderWidth: 1.5,
            },
            itemStyle: {
              // areaColor: "#42BC63",
              areaColor: null,
              // borderColor: "#4D4D4D",
              borderWidth: 1.5,
              opacity: 1,
              shadowColor: "rgba(0, 0, 0, 0.1)",
              shadowBlur: 10,
            },
          },
          selectedMode: false, // 设置是否可选中地图块
          // select: { // 地图块选中时Style
          //   itemStyle: {
          //     color: null,
          //     borderWidth: 1,
          //   },
          // },
          // nameProperty:"adcode",
          data: optionData.series[0].data,
        },
      ],
    })
  );
}

function getPieces(min, max, splitNumber) {
  var pieces = [];
  var per = (max - min) / splitNumber;
  pieces.push({ lt: min + per });
  pieces.push({ gt: max - per });
  for (let i = 2; i < splitNumber; i++) {
    pieces.push({ gt: min + per * (i - 1), lte: min + per * i });
  }
  return pieces;
}

function setD() {
  // toSet();
  var dataviewOpt = {
    title: null,
    legendData: [],
    xAxisData: [],
    yAxisName:null,
    seriesData: [],
  };
  setTimeout(toSet, 30);
  function toSet() {
    if ($("#dataChart").length <= 0) {
      console.log("$('#dataChart').length<=0");
      return;
    }
    formData();
    var dom = document.getElementById("dataChart");
    var dataChart = echarts.init(dom);
    // 指定图表的配置项和数据
    var option = {
      title: {
        text: dataviewOpt.title,
        textStyle: {
          color: "#3B3B3B",
          fontSize: 20,
        },
        left: "center",
        top: "auto",
      },
      tooltip: {},
      toolbox: {
        show: true,
        orient: "horizontal",
        left: "auto",
        right: "20",
        bottom: "10",
        itemSize: 18,
        feature: {
          saveAsImage: {
            iconStyle: {
              // borderColor: "#17ABD0",
              borderWidth: 1,
            },
            emphasis: {
              iconStyle: {
                textFill: "#000000",
                textPadding: 3,
                textBorderRadius: 4,
                textBackgroundColor: "#E3E3E3",
              },
            },
          },
        },
      },
      legend: {
        // data: ["销量"],
      },
      xAxis: {
        name: "地区",
        axisTick: {
          alignWithLabel: true,
        },
        axisLabel: {
          color: "#000000",
          overflow: "break",
          interval: 0,
          width: 0,
        },
        data: dataviewOpt.xAxisData,
      },
      yAxis: {
        name: dataviewOpt.yAxisName,
        axisLabel: {
          color: "#000000",
        },
      },
      series: [
        {
          type: "bar",
          itemStyle: {
            color: "#858585",
            // shadowColor: 'rgba(75,134,190,1)',
            // shadowBlur: 3
          },
          emphasis: {
            // focus: "series",
            blurScope: "coordinateSystem",
            itemStyle: {
              color: "#4F4F4F",
              shadowColor: "rgba(0,0,0,1)",
              shadowBlur: 3,
            },
          },
          data: dataviewOpt.seriesData,
        },
      ],
    };

    // 使用刚指定的配置项和数据显示图表。
    dataChart.setOption(option);
  }
  function formData() {
    console.log(optionData);
    dataviewOpt.title = optionData.title.text; ////////////////
    dataviewOpt.yAxisName = optionData.toolbox.feature.dataView.optionToContent.value + " (" + optionData.unit + ")";
    for (var i = 0; i < optionData.series[0].data.length; i++) {
      dataviewOpt.xAxisData.push(optionData.series[0].data[i].name);
      dataviewOpt.seriesData.push(optionData.series[0].data[i].value);
    }
    // console.log(dataviewOpt);
  }
}
