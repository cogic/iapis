// document.writeln("<script src='js/adapter.js'></script>");

function fetchData3(listsValue, tagValue, textValue, callback) {
  //从数据库获取入侵物种名录数据
  console.log("传递", listsValue, tagValue, textValue);
  $.get("json/ttttttplantsdata.json", function (plantsData) {
    formatter2(plantsData, function (newData) {
      console.log(newData);
      callback(newData);
    });
    return;
  });
}

function fetchData(listValue, adcode, callback) {
  //从数据库获取分布概览数据
  console.log("传递", listValue, adcode);
  $.get("json/ttttttdatabasedata.json", function (distributionData) {
    formatter1(distributionData, function (newData) {
      //将数据库传来的格式转为前端内的格式
      callback(newData);
    });
    return;
  });
}

function fetchData2(enementValue, callback) {
  //从数据库获取分布概览环境变量和社会经济数据
  console.log("传递", enementValue);
  $.get("json/ttttttenementdata.json", function (enementData) {
    callback(enementData);
    return;
  });
}

function fetchData4(plantId, callback) {
  console.log("传递", plantId);
  $.get("json/ttttttaplantdata.json", function (plantData) {
    plantData = JSON.stringify(plantData); //服务器带图片数的json字符串

    plantData += "3";
    console.log(plantData);
    var imgnum = plantData.substr(plantData.lastIndexOf("}") + 1); //imgnum为截取出来的图片数
    plantData = plantData.substring(0, plantData.length - imgnum.length);
    imgnum = parseInt(imgnum);
    console.log("图片数为" + imgnum);
    // console.log(plantData%100);
    // plantData = plantData%100;
    plantData = JSON.parse(plantData);
    callback(plantData, imgnum);
    return;
  });
}

function fetchData5(callback) {
  //直接从数据库取植物评估结果
  var result = [{
    plant: "顶顶顶",
    gender: "male",
    age: "lt30",
    degree: "bachelor",
    title: "middle",
    c1: "1",
    c2: "1",
    c3: "1",
    c4: "0",
    c5: "0",
    c6: "0",
    c7: "0.5",
    c8: "0.2",
    c9: "0.3",
    c10: "0.3",
    c11: "0.2",
    c12: "0.2",
    c13: "2",
    c14: "0",
    c15: "0.5",
    c16: "0",
    c17: "0.5",
    c18: "0.5",
    c19: "0.5",
    c20: "1",
    c21: "0",
    c22: "0",
    c23: "0",
    c24: "0",
    c25: "0",
    c26: "0",
    c27: "0",
    c28: "0",
    c29: "0",
    c30: "0",
    c31: "0.5",
    c32: "0",
    c33: "0",
    c34: "0",
    c35: "0",
  }];
  callback(result);
}

function takeData(result, callback) {
  var resultJson = JSON.stringify(result);
  // 把resultJson发送到服务器，返回提交结果
  var str = "true";
  callback(str);
}

function takeData2(plantid, callback) {
  // var resultJson = JSON.stringify(result);
  // 把resultJson发送到服务器，返回提交结果
  // 传递要删除的植物id
  var str = "true";
  callback(str);
}

function takeData3(plant, callback) {
  // updata的数据
  // 把plant发送到服务器,返回修改结果
  console.log("传递：");
  console.log(plant);
  var str = "true";
  callback(str);
}

function takeData5(username,password,callback){
  //验证登录
  callback("true")
}

function fetchList(callback){
  $.get("json/ttttttassessment_plants.json",function(plants){
    callback(plants);
  })
}

function fetchDensityData(callback){
  $.get("json/ttttttdenitydata.json",function(plants){
    callback(plants);
  })
}