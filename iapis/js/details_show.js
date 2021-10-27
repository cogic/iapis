function greateDTTable() {
  var plantid = getUrlParam("id");
  fetchData4(plantid, function (plantData, imgnum) {
    // $("#test").html(plantData.pnameCn);
    newHtml($("#pname_cn"), plantData.pnameCn);
    newHtmlSpecial($("#pname_sci"), plantData.pnameSci);
    newHtmlSpecial($("#pname_syn"), plantData.pnameSyn);
    newHtml($("#sort"), plantData.sortCn + " " + plantData.sortEn);
    newHtml($("#pname_en"), plantData.pnameEn);
    newHtml($("#pname_alias"), plantData.pnameAlias);
    newHtml($("#geographical_distribution"), plantData.geographicalDistribution);
    newHtml($("#invasion_history"), plantData.invasionHistory);
    newHtml($("#invasion_hazard"), plantData.invasionHazard);
    newHtml($("#morphological_characteristic"), plantData.morphologicalCharacteristic);
    newHtml($("#prevention"), plantData.prevention);
    // console.log(images/P1/1.png);
    if (imgnum == 0) {
      $("#images").html("&nbsp&nbsp&nbsp&nbsp&nbsp-");
      $(".imgtd").css("height", "1px");
    } else {
      for (let i = 0; i < imgnum; i++) {
        // var img = "<img src='images/P" + plantid + "/" + (i + 1) + ".png' alt='" + plantData.pnameCn + "'>";
        var img = "<img src='images/P" + plantid + "/" + (i + 1) + ".png' onerror=\"this.src='images/P" + plantid + "/" + (i + 1) + ".jpg';this.onerror=null\" height='120px' alt='" + plantData.pnameCn + "'>";
        $("#images").append(img);
      }
    }
  });
}

function getUrlParam(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
  var r = window.location.search.substr(1).match(reg); //匹配目标参数
  if (r != null) return unescape(r[2]);
  return null; //返回参数值
}

function newHtml(jq, str) {
  if (str == null) str = "&nbsp&nbsp&nbsp&nbsp&nbsp-";
  jq.html(str);
}

function newHtmlSpecial(jq, str) {
  if (str == null) {
    str = "&nbsp&nbsp&nbsp&nbsp&nbsp-";
    jq.html(str);
  } else {
    var spl = str.split(" ");
    if (spl.length < 2) {
      jq.html(str);
    } else {
      var snleft = spl[0] + " " + spl[1];
      var snright = "";
      for (let i = 2; i < spl.length; i++) {
        snright += " " + spl[i];
      }
      jq.html("<span class='snleft'>" + snleft + "</span><span class='snright'>" + snright + "</span>");
      $(".snleft").css("font-style", "italic");
    }
  }
}
