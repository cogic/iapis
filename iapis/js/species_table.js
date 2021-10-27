// document.writeln("<script src='js/database.js'></script>");

function createTable(listsValue, tagValue, textValue) {
  fetchData3(listsValue, tagValue, textValue, function (plantsData) {
    function sortCnName(a, b) {
      return a.cnName.localeCompare(b.cnName, "zh-CN");
    }
    //利用js中的sort方法
    plantsData.sort(sortCnName);
    formTable(plantsData);
  });
}

function formTable(plantsData) {
  var currentPage = 1; // 当前页
  var pageSize = parseInt($(".pageSizeSelect").find("option:selected").val()); // 每页条数
  var total; // 总条数
  if (plantsData) total = plantsData.length;
  else total = 0;
  var totalSize = 1; // 总页数
  var pageShow = 8; // 每次最大展示页数
  // $(function () {
  // 初始化
  if (total > 0) {
    pageTurn();
  } else {
    $(".pagebox").undelegate(".pageNumber", "click");
    $(".pageSizeSelect").off("change");
    $(".pagebox_first").off("click");
    $(".pagebox_pre").off("click");
    $(".pagebox_next").off("click");
    $(".pagebox_last").off("click");
    $(".tablerow").remove();
    var $tr = '<tr class="no_result tablerow">' + '<td colspan="10">无匹配的搜索结果</td>' + "</tr>";
    $("table").append($tr);
    $(".pagebox_count").html("0条结果，共0页");
    return;
  }
  // });
  $(".pagebox").undelegate(".pageNumber", "click");//
  $(".pagebox").delegate(".pageNumber", "click", function () {
    // 页码数字被点击跳转到对应页码
    var no = parseInt($(this).attr("data"));
    currentPage = no;
    pageTurn();
  });

  $(".pageSizeSelect").off("change");//
  $(".pageSizeSelect").on("change", function () {
    // 每页条数改变则重回第一页
    pageSize = parseInt($(this).find("option:selected").val());
    currentPage = 1;
    if (total > 0) {
      pageTurn();
    }
  });

  $(".pagebox_first").off("click");//
  $(".pagebox_first").on("click", function () {
    // 首页被点击则回到第一页
    if (currentPage != 1) {
      currentPage = 1;
      pageTurn();
    }
  });

  $(".pagebox_pre").off("click");//
  $(".pagebox_pre").on("click", function () {
    // 上一页被点击则当前页码-1
    if (currentPage != 1) {
      currentPage = currentPage - 1;
      pageTurn();
    }
  });

  $(".pagebox_next").off("click");//
  $(".pagebox_next").on("click", function () {
    // 下一页被点击则当前页码-1
    if (currentPage != totalSize) {
      currentPage = currentPage + 1;
      pageTurn();
    }
  });

  $(".pagebox_last").off("click");//
  $(".pagebox_last").on("click", function () {
    // 末页被点击则去到最大页
    if (currentPage != totalSize) {
      currentPage = totalSize;
      pageTurn();
    }
  });

  function pageTurn() {
    var pages = [];
    pages.push(currentPage);
    totalSize = Math.ceil(total / pageSize); // 计算总页数
    $(".pagebox_count").html(total + "条结果，共" + totalSize + "页");
    for (var i = 1; i < pageShow; i++) {
      var a = currentPage + i;
      var b = currentPage - i;
      if (pages.length < pageShow && a <= totalSize) pages.push(a);
      if (pages.length < pageShow && b > 0) pages.push(b);
    }

    pages.sort(function compare(val1, val2) {
      return val1 - val2;
    });

    var content = "";
    for (var i = 0; i < pages.length; i++) {
      if (pages[i] == currentPage) {
        // 当前页页码点亮
        content += "<span class='pageNumber current' data='" + pages[i] + "'>" + pages[i] + "</span>";
      } else {
        content += "<span class='pageNumber' data='" + pages[i] + "'>" + pages[i] + "</span>";
      }
    }

    $(".pageNumber").remove(); // 移除旧的页码
    $(".pagebox_pre").after(content);

    createTableBody(plantsData, pageSize * (currentPage - 1), pageSize * (currentPage - 1) + pageSize);
  }
}

function createTableBody(plantsData, start, end) {
  $(".tablerow").remove();
  for (let i = start; i < end && i < plantsData.length; i++) {
    var tr = 
    '<tr class="tablerow">' + 
    '<td class="num">null</td>' + 
    '<td class="cn_name">null</td>' + 
    '<td class="scientific_name">null</td>' + 
    '<td class="family">null</td>' + 
    '<td class="genus">null</td>' + 
    '<td class="provenance"><div>null</div></td>' + 
    '<td class="details">' + 
    '<a href="#">null</a>' + 
    '</td>' + '</tr>';
    $("table").append(tr);
    $("table tr:last")
      .find(".num")
      .html(i + 1);
    newHtml($("table tr:last").find(".cn_name"), plantsData[i].cnName);
    newHtmlSpecial($("table tr:last").find(".scientific_name"), plantsData[i].scientificName);
    newHtml($("table tr:last").find(".family"), plantsData[i].family);
    newHtml($("table tr:last").find(".genus"), plantsData[i].genus);
    newHtml($("table tr:last").find(".provenance div"), plantsData[i].provenance);
    var url = "details.html" + "?id=" + plantsData[i].id;
    $("table tr:last")
      .find(".details")
      .html("<a href=" + url + " target='_blank'>详情</a>");
  }
}

function newHtml(jq, str) {
  if (str == null) {
    str = "-";
    jq.css("text-align", "center");
  }
  jq.html(str);
}

function newHtmlSpecial(jq, str) {
  if (str == null) {
    str = "-";
    jq.css("text-align", "center");
    jq.html(str);
  } else {
    var spl = str.split(" ");
    if(spl.length < 2) {
      jq.html(str);
    } else {
      var snleft = spl[0] + " " + spl[1];
      var snright = "";
      for (let i = 2; i < spl.length; i++) {
        snright +=" " + spl[i];
      }
      jq.html("<span class='snleft'>" + snleft +"</span><span class='snright'>" + snright +"</span>")
      $(".snleft").css("font-style","italic")
    }
  }
}
