function addfunc() {
    $("#adder").off("click");
    $("#adder").on("click", add);
}

// function getUrlParam(name) {
//   var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
//   var r = window.location.search.substr(1).match(reg); //匹配目标参数
//   if (r != null) return unescape(r[2]);
//   return null; //返回参数值
// }

function add() {
  var plant = {
    // pid:,
    // pnameCn: "紫茎泽兰",
    // pnameAlias: "解放草、破坏草",
    // pnameEn: "Crofton Weed",
    // pnameSci: "Eupatorium adenophorum Spreng.",
    // pnameSyn: null,
    // sortCn: "菊科",
    // sortEn: "Compositae",
    // geographicalDistribution: "中美洲、在世界热带地区广泛分布。",
    // invasionHistory: "1935年在云南南部发现，可能经缅甸传入。现分布于云南、广西、贵州、四川（西南部）、台湾、垂直分布上限为2500m。",
    // invasionHazard: "在其发生区常形成单种优群落，排挤本地植物，影响天然林的恢复；侵入经济林地和农田，影响栽培植物生长；堵塞水渠，阻碍交通，全株有毒性，危害畜牧业。",
    // morphologicalCharacteristic: "茎紫色，被腺状短柔毛，叶对生，卵状三角形，边缘具粗锯齿。头状花序，直径可达6mm，排成伞房状，总苞片3-4层，小花白色，高1-2.5m。",
    // prevention:
    //   "（1）生物防治：泽兰实蝇对植株高生长有明显的抑制作用，野外寄生率可达50%以上；（2）替代控制：用臂形草、红三叶草、狗牙根等植物进行替代控制有一定成效。（3）化学防治：2，4-D、草甘膦、敌草快、麦草畏等10多种除草剂对紫茎泽兰地上部分有一定的控制作用，但对于根部效果较差。",
    // imageDir: "/images/P1",
  };
  eval("plant." + $("#plantform input[type=hidden]").attr("name") + "='" + $("#plantform input[type=hidden]").val() + "'");
  $("#plantform input[type=text]").each(function () {console.log("fggf")
    eval("plant." + $(this).attr("name") + "='" + $(this).val() + "'");
  });
  takeData3(plant, function (message) {
    if (message == "true") {
      alert("添加成功！");
      updatefunc();
      // createTable(null, null, null); //删除后重新加载表格
    } else {
      alert("添加失败，请重试！");
    }
  });
  //   $("input[name=pNameCn]").val(plantData.pnameCn);
  //   $("input[name=pNameSci]").val(plantData.pnameSci);
  //   $("input[name=pNameSyn]").val(plantData.pnameSyn);
  //   $("input[name=sortCn]").val(plantData.sortCn);
  //   $("input[name=sortEn]").val(plantData.sortEn);
  //   $("input[name=pNameEn]").val(plantData.pnameEn);
  //   $("input[name=pNameAlias]").val(plantData.pnameAlias);
  //   $("input[name=geographicalDistribution]").val(plantData.geographicalDistribution);
  //   $("input[name=invasionHistory]").val(plantData.invasionHistory);
  //   $("input[name=invasionHazard]").val(plantData.invasionHazard);
  //   $("input[name=morphologicalCharacteristic]").val(plantData.morphologicalCharacteristic);
  //   $("input[name=prevention]").val(plantData.prevention);
}
