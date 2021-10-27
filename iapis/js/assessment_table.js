// document.writeln("<script src='js/database.js'></script>");

function createAssessmentTable() {
  $("#plantlist").hide();
  fetchList(function (list) {
    function sortName(a, b) {
      return a.name.localeCompare(b.name, "zh-CN");
    }
    //利用js中的sort方法
    list.sort(sortName);
    setPlantList(list);
  });
  $.get("json/assessment_table.json", function (tableData) {
    for (let i = 0; i < tableData.length; i++) {
      if (i == 0) {
        $("#assessment").append("<tr id='first'><td>一、专家基本情况</tr></td>");
      } else if (i == 4) {
        $("#assessment").append("<tr id='second'><td>二、入侵植物风险三级指标评估</tr></td>");
      }
      var tr = "<tr><td class='check'><h6 class='que'>" + (i + 1) + "." + tableData[i].question + "</h6>";
      for (let j = 0; j < tableData[i].options.length; j++) {
        //if测试用 最后删掉下面两行，留下else后面的语句即可即可
        if (j == 0) tr += "<input waschecked='true' checked class='opitem' type=" + tableData[i].type + " value=" + tableData[i].options[j].value + " name=" + tableData[i].name + " id=iid" + i + j + " num=" + i + " />";
        else 
        tr += "<input class='opitem' type=" + tableData[i].type + " value=" + tableData[i].options[j].value + " name=" + tableData[i].name + " id=iid" + i + j + " num=" + i + " />";

        tr += "<label for=iid" + i + j + ">" + tableData[i].options[j].text + "</label>";
        if (i > 3) tr += "<br>";
      }
      tr += "</td></tr>";
      $("#assessment").append(tr);
    }
    setnoselect()
    $("#assessment").append("<tr id='end'><td>问卷调查结束，请您再次检查是否有错漏题目，感谢您的大力支持</tr></td>");
  });
  $(document).off("click", ".opitem");
  $(document).on("click", ".opitem", function () {
    var domName = $(this).attr("name");
    var $radio = $(this);
    // if ($radio.data("waschecked") == true) {console.log("ifififiif")
    //   $radio.prop("checked", false);
    //   setnoselect()
    //   // $radio.removeProp("checked");
    //   $("input:radio[name='" + domName + "']").data("waschecked", false);
    // } else {console.log("else")
    //   $radio.prop("checked", true);
    //   setnoselect()
    //   // $radio.attr("checked", "checked");
    //   $("input:radio[name='" + domName + "']").data("waschecked", false);
    //   $radio.data("waschecked", true);
    // }
    if ($radio.attr("waschecked")=="true") {console.log("ifififiif")
      $radio.prop("checked", false);
      setnoselect()
      // $radio.removeProp("checked");
      $("input:radio[name='" + domName + "']").attr("waschecked", "false");
    } else {console.log("else")
      $radio.prop("checked", true);
      setnoselect()
      // $radio.attr("checked", "checked");
      $("input:radio[name='" + domName + "']").attr("waschecked", "false");
      $radio.attr("waschecked", "true");
    }
  });

  $(".quit").on("click", function () {
    $(".fullscreen").hide();
  });
  // $("#commit").off("click");
  $("#commit").on("click", function () {
    var result = {};
    var score = 0;
    var level = "";
    result.plant = $("#plant").val().replace(/\s+/g, "");
    if (check() == "false1") {
      $(".checkfull h1").html("您未填写植物名！");
      $(".checkfull").show();
      return;
    } else if (check() == "false2") {
      $(".checkfull h1").html("请填写正确的植物名！<br> （该植物名不在可选列表中）");
      $(".checkfull").show();
      return;
    }
    var index = 1;
    var nots = "";
    $("#assessment td").each(function () {
      if ($(this).attr("class") != "check") return;
      var $inputChecked = $(this).find("input:checked");
      var name = $inputChecked.attr("name");
      var value = $inputChecked.val();
      if (name == undefined) {
        nots += "  #" + index;
      } else {
        if (name != "gender" && name != "age" && name != "degree" && name != "title") {
          score += parseFloat(value);
        }
        eval("result." + name + "='" + value + "'");
      }
      index++;
    });
    // console.log("未选择项" + nots);
    // console.log(result);
    if (nots == "") {
      if (score < 45) {
        level = "三级风险（低）";
      } else if (score < 60) {
        level = "二级风险（中）";
      } else {
        level = "一级风险（高）";
      }
      $(".commitfull h2").html("【评&nbsp&nbsp估&nbsp&nbsp结&nbsp&nbsp果】<br>&nbsp&nbsp物种：" + $("#plant").val() + "<br>&nbsp&nbsp风险分值：" + score + "<br>&nbsp&nbsp风险等级：" + level);
      $(".commitfull").show();
      $(".yescommit").off("click");
      $(".yescommit").on("click", function () {
        $(".fullscreen").hide();
        takeData(result, function (message) {
          if (message == "true") {
            $(".checkfull h1").html("提交成功！");
            $(".checkfull span.quit").html("确认");
          } else if (message == "false") {
            $(".checkfull h1").html("提交失败！");
            $(".checkfull span.quit").html("重试");
          } else {
            $(".checkfull h1").html(message);
            $(".checkfull .quit").html("error");
          }
          $(".checkfull").show();
          // alert(message);
        });
      });
      // takeData(result, function (message) {
      // });
    } else {
      $(".recheckfull h1").html("请选择完毕再提交！未选择项：");
      $(".recheckfull h2").html(nots);
      $(".recheckfull").show();
      // alert("请选择完毕再提交！您的未选择项：" + nots);
    }
  });
  // $("#clear").off("click");
  $("#clear").on("click", function () {
    $(".clearfull").show();
    // clear = window.confirm("确定要清除已选的所有选项吗？");
    // if (clear == true) $("input[type='radio']").removeAttr("checked");
  });
  $(".yesclear").on("click", function () {
    $("input[type='radio']").prop("checked", false);
    $("input[type='radio']").removeAttr("waschecked");
    setnoselect()
    $(".clearfull").hide();
  });
}

function setPlantList(list) {
  var item = "";
  for (let i = 0; i < list.length; i++) {
    item += "<div>" + list[i].name + "</div>";
  }
  if (list.length == 0) {
    item = "<div>无匹配</div>";
  }
  $("#plantlist").append(item);
  $("#plantlist").attr("over", "out");
  $("#plantlist").hide();
  $("#plant")
    .on("focus", function () {
      $("#checktip").html("可输入中文名检索");
      $("#checktip").css("color", "#3591cf");
      $("#plantlist").show();
      search(function () {
        $("#nomatch").hide();
        if ($("#plantlist div:visible").length == 0) {
          $("#nomatch").show();
        }
      });
    })
    .on("blur", function () {
      $("#checktip").css("color", "#cf3535");
      if ($("#plantlist").attr("over") == "out") {
        check();
        $("#plantlist").hide();
      }
    })
    .on("input propertychange", function () {
      $(this).val($(this).val().replace(" ", ""));
      search(function () {
        $("#nomatch").hide();
        if ($("#plantlist div:visible").length == 0) {
          $("#nomatch").show();
        }
      });
    });
  $("#plantlist")
    .on("mouseover", function () {
      $("#plantlist").attr("over", "over");
    })
    .on("mouseout", function () {
      $("#plantlist").attr("over", "out");
    });
  $("#plantlist div").on("click", function () {
    if ($(this).attr("id") != "nomatch") $("#plant").val($(this).html());
    check();
    $("#plantlist").hide();
  });

  function search(callback) {
    $("#plantlist div").each(function (index, item) {
      if ($(item).html().indexOf($("#plant").val()) != -1) {
        $(item).show();
      } else {
        $(item).hide();
      }
    });
    callback();
  }
}
function check() {
  if ($("#plant").val() == "") {
    $("#checktip").html("*请填写植物名");
    return "false1";
  }
  var flag = "false2";
  $("#plantlist div").each(function (index, item) {
    if ($(item).html() == $("#plant").val()) {
      flag = "true";
    }
  });
  if (flag == "true") {
    $("#checktip").html("");
  } else {
    $("#checktip").html("*该植物名不在可选列表中！");
  }
  return flag;
}
function setnoselect() {
  $(".check").each(function (index, item) {
    var flag = true;
    $(item)
      .children()
      .each(function (index, child) {
        if ($(child).prop("checked") == true) flag = false;
      });
    if (flag) {
      // $(item).css("border-right", "10px solid rgb(173, 218, 199)");
      $(item).children(".que").css("color","#000000")
    } else {
      // $(item).css("border-right", "10px solid rgb(241, 241, 241)");
      // $(item).css("border-right", "none");
      $(item).children(".que").css("color","#1f8b55")
    }
  });
}
