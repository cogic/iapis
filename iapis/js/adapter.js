function formatter1(preJson, callback) {
  //数据库格式
  // {
  //   cID: "",
  //   plants: [
  //     {
  //       pNameCn: "",
  //     }
  //   ],
  // };
  // 转成分布概览中的格式
  // {
  //   adcode: "",
  //   species: [
  //     {
  //       name: "",
  //     },
  //   ],
  // };

  var newJson = [];
  for (let i = 0; i < preJson.length; i++) {
    newJson.push({ adcode: 0, species: [] });
    newJson[i].adcode = preJson[i].cID;
    for (let j = 0; j < preJson[i].plants.length; j++) {
      newJson[i].species.push({ name: "" ,id:"",riskscoremin:"",riskscoremax:"",risklevel:""});
      newJson[i].species[j].name = preJson[i].plants[j].pNameCn;
      newJson[i].species[j].id = preJson[i].plants[j].pid;
      newJson[i].species[j].riskscoremin = preJson[i].plants[j].riskscoremin;
      newJson[i].species[j].riskscoremax = preJson[i].plants[j].riskscoremax;
      newJson[i].species[j].risklevel = preJson[i].plants[j].risklevel;
    }
  }
  callback(newJson);
  return;
}

function formatter2(preJson, callback) {
  //数据库格式
  // {
  //   "pID":101,
  //   "pNameCn": "中文名中文名",
  //   "pNameSci": "scientific name",
  //   "sortCn": "科科科科",
  //   "genus": "属属属属",/////////////////////
  //   "invasionHistory": "原产地原产地",
  // },
  // 转成分布概览中的格式
  // {
  //   "id":101,
  //   "cnName": "中文名中文名",
  //   "scientificName": "scientific name",
  //   "family": "科科科科",
  //   "genus": "属属属属",
  //   "provenance": "原产地原产地",
  // },

  var newJson = [];
  for (let i = 0; i < preJson.length; i++) {
    newJson.push({
      id: "",
      cnName: "",
      scientificName: "",
      family: "",
      genus: "",
      provenance: "",
    });
    newJson[i].id = preJson[i].pid;
    newJson[i].cnName = preJson[i].pNameCn;
    newJson[i].scientificName = preJson[i].pNameSci;
    newJson[i].family = preJson[i].sortCn;
    newJson[i].genus = "null";
    newJson[i].provenance = preJson[i].invasionHistory;
  }
  callback(newJson);
  return;
}
