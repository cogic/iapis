/*
fetchData()中返回的数据增加三个字段，如下
注：增加的字段名不同则需要修改formatter1()
{
    "id": "121",
    "name": "紫茎泽兰",
    "riskscoremin": 52.5, // 风险最低分，类型是数字，不过传字符串也可以
    "riskscoremax": 82.5, // 风险最高分
    "risklevel": "一级风险（高）" // 风险等级
}
*/
function formatter1(preJson, callback) {
  var newJson = [];
  for (let i = 0; i < preJson.length; i++) {
    newJson.push({ adcode: 0, species: [] });
    newJson[i].adcode = preJson[i].administrativeCode;
    for (let j = 0; j < preJson[i].plants.length; j++) {
      newJson[i].species.push({ name: "" ,id:"",riskscoremin:"",riskscoremax:"",risklevel:""});
      newJson[i].species[j].name = preJson[i].plants[j].pnameCn;
      newJson[i].species[j].id = preJson[i].plants[j].pid;
      newJson[i].species[j].riskscoremin = preJson[i].plants[j].riskscoremin; // 字段名不同则修改
      newJson[i].species[j].riskscoremax = preJson[i].plants[j].riskscoremax; // 字段名不同则修改
      newJson[i].species[j].risklevel = preJson[i].plants[j].risklevel; // 字段名不同则修改
    }
  }
  callback(newJson);
  return;
}