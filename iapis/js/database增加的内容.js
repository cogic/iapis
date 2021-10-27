/*
database.js 需要增加以下两个函数
另外把database.js中其他函数callback返回的 成功失败提示 统一为字符串"true"或"false"
*/

/*
fetchList()中要返回需要进行风险评估的所有植物，结构如下
示例：
注：如果字段名不一致就用adapter适配。
[
  {
    "name": "紫茎泽兰"
  },
  {
    "name": "薇甘菊"
  }
]
*/
function fetchList(callback){
  $.get("json/ttttttassessment_plants.json",function(plants){
    callback(plants);
  })
}

/*
fetchDensityData()中要返回行政区的入侵物种密度数据，结构如下
示例：
注：value为密度，密度单位为（种/百平方公里），如果数据库中的单位为（种/平方公里）则需要乘100。
    如果字段名不一致就用adapter适配。
[
  {
    "adcode": 440100,
    "value": 22.2
  },
  {
    "adcode": 440200,
    "value": 20.1
  }
]
*/
function fetchDensityData(callback){
  $.get("json/ttttttdenitydata.json",function(plants){
    callback(plants);
  })
}