// document.writeln("<script src='js/echarts.min.js'></script>");
// document.writeln("<script src='js/database.js'></script>");

var myChart = null;
var parentFeatures;
var optionValue;
var selectedDistrict = null;
var curDistrict = null;
var acroutes;
var subtext;
// var hideflag = false;

function createOVMap(value, stext, adcode) {
  acroutes = [
    {
      adcode: 440000,
      name: "广东省",
    },
  ];
  subtext = stext;
  optionValue = value;
  $("#maptip1").css("color", "#b0b0b0");
  $("#maptip1").html("[单击地区可固定植物列表]");
  $("#maptip2").css("color", "#b0b0b0");
  $("#maptip2").html("#双击地区可进入县级行政区视图#");
  // $("#maptip1").html("");
  // $("#maptip2").html("");
  createMap(adcode);
}

function createMap(adcode) {
  $("#maptip3").html("");
  hideflag = false;
  var dom = document.getElementById("container");
  // selectedDistrict = null;
  // curDistrict = null;
  if (myChart != null) myChart.dispose();
  selectedDistrict = null;
  curDistrict = null;
  showDetails({ name: "—" });
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
  getGeoJson(adcode);
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

      if (geoJson.features.length > 0) {
        parentFeatures = geoJson.features;
      } else if (geoJson.features.length === 0) {
        geoJson.features = parentFeatures.filter(function (item) {
          if (item.properties.adcode == adcode) {
            return item;
          }
        });
        if (geoJson.length === 0) return;
      }
      fetchData(optionValue, adcode, function (distributionData) {
        //////////////////////////
        makemap(geoJson, distributionData);
      });
    });
  });
}
function makemap(geoJson, mapData) {
  echarts.registerMap("guangdong", geoJson);
  for (let i = 0; i < mapData.length; i++) {
    mapData[i].value = mapData[i].species.length;
  }
  // var mapping = geoJson.features.reduce(
  //   (pre, cur) => ((pre[cur.properties.adcode] = cur), pre),
  //   {}
  // );

  // var mapping = geoJson.features.reduce(
  //   (pre, cur) => {console.log(pre,cur)},
  //   {}
  // );
  var alldir = [];

  //建立映射
  var mapping = geoJson.features.reduce(function (pre, cur) {
    pre[cur.properties.adcode] = cur;
    alldir.push({
      adcode: cur.properties.adcode,
      name: cur.properties.name,
      species: [],
      value: 0,
    });
    // console.log(alldir);
    return pre;
  }, {});

  // 循环赋值 O(n)
  // console.log(mapping);
  mapData.forEach(function (o) {
    var code = o.adcode;
    //简易处理行政编码的更改
    switch (code) {
      case 440184:
        code = 440117;
        break;
      case 440183:
        code = 440118;
        break;
      case 440923:
        code = 440904;
        break;
      case 441283:
        code = 441204;
        break;
      case 441723:
        code = 441704;
        break;
      case 445121:
        code = 445103;
        break;
      case 445221:
        code = 445203;
        break;
      default:
        break;
    }
    if (mapping[code]) {
      // console.log(mapping)
      //       alldir[code].species=o.species
      //       console.log("HHHHHHHH")
      //       console.log(alldir)
      o.name = mapping[code].properties.name;
    } else {
      console.log("mapping[code] is undefined");
    }
  });
  var maplen = mapData.length;
  for (let i = 0; i < alldir.length; i++) {
    var flag = false;
    for (let j = 0; j < maplen; j++) {
      if (alldir[i].adcode == mapData[j].adcode) {
        flag = true;
        break;
      }
    }
    if (flag == false) mapData.push(alldir[i]);
  }
  console.log(mapData);
  myChart.hideLoading();
  myChart.setOption(
    (option = {
      title: {
        text: getAcroutes(), ////////////////
        textStyle: {
          color: "#3B3B3B",
          fontSize: 20,
        },
        subtext: "" + subtext + "", ////////////////
        subtextStyle: {
          fontSize: 11,
          width: "220",
          overflow: "break",
        },
        // left: "12",
        // top: "12",
        left: "40",
        top: "40",
      },
      tooltip: {
        // enterable:true,
        // transitionDuration :0.4,
        // position: [100, -50],
        trigger: "item",
        formatter: "{b}<br>{c} (种)", ////////////////
        textStyle: {
          color: "black",
          fontSize: 14,
        },
      },
      toolbox: {
        show: true,
        orient: "horizontal",
        // left: "20",
        // top: "50",
        left: "auto",
        right: "20",
        bottom: "10",
        itemSize: 18,
        feature: {
          saveAsImage: {
            iconStyle: {
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
            textColor: "black",
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
            optionToContent: function (opt) {
              var div = '<div id="dataChart"></div>';
              setD(opt);
              return div;
            },
          },
        },
      },
      visualMap: {
        type: "piecewise",
        itemGap: 0,
        itemSymbol: "rect",
        pieces: getPieces(mapData),
        // pieces: getPieces(0, 60, 10),
        // left: "20",
        // top: "100",
        left: "40",
        top: "130",
        orient: "vertical",
        realtime: true,
        calculable: false,
        itemWidth: 20,
        itemHeight: 20,
        align: "auto",
        inRange: {
          color: ["#F7FEE1", "#A4E379", "#2F952E"],
        },
        outOfRange: {
          color: ["#CBCBCB", "#848484"],
        },
      },
      aspectScale: 0.925,
      series: [
        {
          name: "分布概览",
          type: "map",
          mapType: "guangdong", // 自定义扩展图表类型
          layoutCenter: ["500", "center"],
          // 如果宽高比大于 1 则宽度为 100，如果小于 1 则高度为 100，保证了不超过 100x100 的区域
          layoutSize: 430,
          // left: "190",
          // right: "110",
          // top: "40",
          // bottom:"auto",
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
          selectedMode: true, // 设置是否可选中地图块
          select: {
            // 地图块选中时Style
            label: {
              show: true,
              fontSize: 14,
              fontWeight: "bold",
              color: "#3572c2",
              // textBorderColor: "#42BC63",
              textBorderColor: "#FFFFFF",
              textBorderWidth: 1.5,
            },
            itemStyle: {
              color: null,
              // areaColor: "#42BC63",
              // areaColor: null,
              // borderColor: "#4D4D4D",
              borderWidth: 1.5,
              borderColor: "#3572c2",
              opacity: 1,
              shadowColor: "rgba(0, 0, 0, 0.1)",
              shadowBlur: 10,
            },
          },
          data: mapData,
        },
      ],
    })
  );
  myChart.getZr().off("click", mapFloat);
  myChart.getZr().on("click", mapFloat);
  myChart.off("dblclick", mapInto);
  myChart.on("dblclick", mapInto);
  myChart.off("mouseover", showDetails);
  myChart.on("mouseover", showDetails);
  myChart.off("mouseout", showTip);
  myChart.on("mouseout", showTip);
  myChart.off("click", showDetails2);
  myChart.on("click", showDetails2);
  myChart.off("selectchanged", fixDetails);
  myChart.on("selectchanged", fixDetails);
  // myChart.off("mousemove", setTip);
  // myChart.on("mousemove", setTip);
}

function getPieces(data) {
  //排序
  function sortSpecies(a, b) {
    return b.species.length - a.species.length;
  }
  //利用js中的sort方法
  data.sort(sortSpecies);
  var min = data[data.length - 1].species.length;
  var max = data[0].species.length;
  var splitNumber = 10;
  var pieces = [];
  var per = (max - min) / splitNumber;
  pieces.push({ lt: min + per });
  pieces.push({ gt: max - per });
  for (let i = 2; i < splitNumber; i++) {
    pieces.push({ gt: min + per * (i - 1), lte: min + per * i });
  }
  console.log(pieces);
  return pieces;
}

function fixDetails() {
  ///////////////////
  if (selectedDistrict == curDistrict) {
    // $(".tablerow").remove();
    selectedDistrict = null;
    // $("#listtip").html("params.name");
  } else selectedDistrict = curDistrict;
}

// function setTip(params){
//   if(hideflag){
//     $("#maptip1").hide();
//   } else{
//     $("#maptip1").show();
//   }
// }

function showTip(params) {
  if (params.data.adcode % 100 != 0) {
    // 是县级行政区视图
    $("#maptip1").css("color", "#b0b0b0");
    // $("#maptip1").html("");
    $("#maptip2").css("color", "#a635c2");
    // $("#maptip2").html("#单击空白处返回市级行政区#");
  } else {
    $("#maptip1").css("color", "#b0b0b0");
    // $("#maptip1").html("");
    $("#maptip2").css("color", "#b0b0b0");
    // $("#maptip2").html("");
  }
}

function showDetails(params) {
  // console.log(curDistrict+"*"+selectedDistrict);
  // $("#maptip1").html(params.name+"*"+selectedDistrict);
  if (params.componentType === "series" && params.data.adcode % 100 === 0) {
    $("#maptip1").css("color", "#c23535");
    // 是市级行政区视图
    // $("#maptip1").html("[单击区域可固定植物列表]");
    $("#maptip2").css("color", "#a635c2");
    // $("#maptip2").html("#双击区域可进入县级行政区#");
  } else if (params.componentType === "series" && params.data.adcode % 100 != 0) {
    // 是县级行政区视图
    $("#maptip1").css("color", "#c23535");
    // $("#maptip1").html("[单击区域可固定植物列表]");
    $("#maptip2").css("color", "#b0b0b0");
    // $("#maptip2").html("#单击空白处返回市级行政区#");
    // $("#maptip2").html("");
  }
  if (params.name === selectedDistrict) {
    $("#maptip1").css("color", "#b0b0b0");
    $("#maptip3").css("color", "#3572c2");
  } else {
    $("#maptip3").css("color", "#b0b0b0");
  }
  if (curDistrict != params.name) {
    curDistrict = params.name;
    if (selectedDistrict == null) {
      $("#listtip").html(params.name);
      setTable(params);
    }
  }
}

function showDetails2(params) {
  // if (curDistrict != params.name) {
  // console.log("fgfgf");
  // curDistrict = params.name;
  // console.log(params);
  if (selectedDistrict != null) {
    $("#listtip").html(params.name + "（已固定）");
    $("#listtip").css("color", "#3572c2");
    $("#maptip1").css("color", "#b0b0b0");
    $("#maptip3").css("color", "#3572c2");
    $("#maptip3").html("*已固定，再次单击选中地区可取消固定*");
  } else {
    $("#listtip").html(params.name);
    $("#listtip").css("color", "#000000");
    $("#maptip1").css("color", "#c23535");
    $("#maptip3").html("");
  }
  setTable(params);
  // }
  // }
}

function setTable(params){
  $(".tablerow").remove();
      if (params.data && params.value != 0) {
        function sortCnName(a, b) {
          return a.name.localeCompare(b.name, "zh-CN");
        }
        //利用js中的sort方法
        params.data.species.sort(sortCnName);
        for (let i = 0; i < params.data.species.length; i++) {
          var tr = '<tr class="tablerow"><td class="num">null</td><td class="name">null</td><td class="riskscore">null</td><td class="risklevel">null</td><td class="details"><a href="#">null</a></td></tr>';
          $("#list_table").append(tr);
          $("#list_table tr:last")
            .find(".num")
            .html(i + 1);
          $("#list_table tr:last").find(".name").html(params.data.species[i].name);
          var max = params.data.species[i].riskscoremax;
          max = parseFloat(max).toString();
          var min = params.data.species[i].riskscoremin;
          min = parseFloat(min).toString();
          if(max == 0) max ="NaN";
          if(min == 0) min ="NaN";
          if(max != "NaN" || min != "NaN"){
            $("#list_table tr:last").find(".riskscore").html((max=="NaN"?"无":max)+" | "+(min=="NaN"?"无":min));
          } else {
            $("#list_table tr:last").find(".riskscore").html("—");
          }
          if(params.data.species[i].risklevel!=null){
            $("#list_table tr:last").find(".risklevel").html(params.data.species[i].risklevel);
            if(params.data.species[i].risklevel.indexOf("高")!=-1){
              $("#list_table tr:last").find(".risklevel").css("color","#D05454")
            } else if(params.data.species[i].risklevel.indexOf("中")!=-1){
              $("#list_table tr:last").find(".risklevel").css("color","#F1A52F")
            }else if(params.data.species[i].risklevel.indexOf("低")!=-1){
              $("#list_table tr:last").find(".risklevel").css("color","#BEAD21")
            }
          }
          else{
            $("#list_table tr:last").find(".risklevel").html("—");
          }
          var url = "details.html" + "?id=" + params.data.species[i].id;
          $("table tr:last")
            .find(".details")
            .html("<a href=" + url + " target='_blank'>详情</a>");
        }
      } else {
        var tr = '<tr class="tablerow"><td colspan="10" style="text-align:center;background-color:#FFFFFF;width:1000px;color:#E95454;padding-left:20px">-</td></tr>';
        $("#list_table").append(tr);
      }
}

function mapInto(params) {
  if (!params.data || !params.data.adcode) {
    console.log("params.data.adcode is undefined");
    return;
  }
  if (params.data.adcode % 100 != 0) return; //阻止区县级下钻
  //如果当前是最后一级，就直接return
  if (acroutes[acroutes.length - 1].adcode == params.data.adcode) {
    return;
  }
  var nextData = params.data;
  acroutes.push({
    name: nextData.name,
    adcode: nextData.adcode,
  });
  createMap(nextData.adcode);
  $("#maptip1").css("color", "#b0b0b0");
  $("#maptip2").css("color", "#a635c2");
  $("#maptip2").html("#单击空白处返回市级行政区视图#");
  $("#listtip").css("color", "#000000");
}

function mapFloat(params) {
  if (!params.target) {
    if (acroutes.length === 1) return;
    acroutes.pop();
    createMap(acroutes[acroutes.length - 1].adcode);
    $("#maptip2").css("color", "#b0b0b0");
    $("#maptip2").html("#双击地区可进入县级行政区#");
    $("#listtip").css("color", "#000000");
  }
}
function getAcroutes() {
  var str = acroutes[0].name;
  for (let i = 1; i < acroutes.length; i++) {
    str += ">" + acroutes[i].name;
  }
  return str;
}

function setD(optionData) {
  // toSet();
  var dataviewOpt = {
    title: null,
    legendData: [],
    xAxisData: [],
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
        name: "数量（种）",
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
    dataviewOpt.title = optionData.title[0].subtext; ////////////////
    for (var i = 0; i < optionData.series[0].data.length; i++) {
      dataviewOpt.xAxisData.push(optionData.series[0].data[i].name);
      dataviewOpt.seriesData.push(optionData.series[0].data[i].value);
    }
    // console.log(dataviewOpt);
  }
}
