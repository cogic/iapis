function createhead() {
  document.writeln("<!-- head -->");
  document.writeln("<div class='head'>");
  document.writeln("<div class='head heart'>");
  document.writeln("<a href='home.html'>");
  document.writeln("<div id='logo'><img src='images/logo.png' alt='logo'></div>");
  document.writeln("<div id='title'><h1>广东省外来入侵植物数据库及风险评估系统</h1>");
  document.writeln("<h2>GUANGDONG PROVINCE INVASIVE ALIEN PLANT DATABASE AND RISK ASSESSMENT SYSTEM</h2></div>");
  document.writeln("</a>");
  document.writeln("</div>");
  document.writeln("</div>");
  document.writeln("<!-- menu -->");
  document.writeln("<div class='menuframe'>");
  document.writeln("<div class='menuframe menu heart'>");
  document.writeln("<ul>");
  document.writeln("<li id='menu_home'><a href='home.html'>主页</a></li>");
  document.writeln("<li id='menu_species_list'><a href='directory.html'>入侵物种名录</a></li>");
  document.writeln("<li id='menu_overview_distribution'><a>分布概览<span class='downiconfont'>&#xe60b;</span></a><ul><li><a href='distribution.html?sel=a'>数量视图</a></li><li><a href='distribution.html?sel=b'>密度视图</a></li></ul></li>");
  document.writeln("<li id='menu_environmental_enements'><a>环境要素<span class='downiconfont'>&#xe60b;</span></a><ul><li><a href='environment.html?sel=a'>光、温、水空间图</a></li><li><a href='environment.html?sel=b'>高程图</a></li><li><a href='environment.html?sel=c'>坡度图</a></li></ul></li>");
  document.writeln("<li id='menu_socioeconomic_status'><a href='socioeconomic.html'>社会经济状况</a></li>");
  document.writeln("<li id='menu_risk_assessment'><a href='assessment.html'>风险评估</a></li>");
  document.writeln("<li id='menu_species_list_details'>详情</li>");
  document.writeln("<li id='manager_login'><a href='login0.html' target='_blank'>管理员入口<span class='managericonfont'>&#xe600;</span></a></li>");
  document.writeln("</ul>");
  document.writeln("</div>");
  document.writeln("</div>");
  document.getElementById("menu_" + document.getElementsByTagName("html")[0].id).className = "menu_selected";
  setMenu("menu_overview_distribution");
  setMenu("menu_environmental_enements");
}

function setMenu(lid) {
  $("#"+lid+" ul").css("opacity", "0");
  $("#"+lid+" ul").hide();
  $("#"+lid)
    .on("mouseover", function () {
      $("#"+lid+">a").css("background-color", "#ffffff");
      $("#"+lid+">a").css("color", "#647e6a");
      $("#"+lid+" ul").show();
      $("#"+lid+" ul").css("opacity", "1");
    })
    .on("mouseout", function () {
      $("#"+lid+">a").css("background-color", "#647e6a");
      $("#"+lid+">a").css("color", "#ffffff");
      $(".menu_selected>a").css("background-color", "#ffffff");
      $(".menu_selected>a").css("color", "#647e6a");
      $("#"+lid+" ul").css("opacity", "0");
      $("#"+lid+" ul").hide();
    });
}

function createtail() {
  document.writeln("<!-- tail -->");
  document.writeln("<div class='tail'>");
  document.writeln("<div class='tail copyright heart'>");
  document.writeln("<h6>");
  document.writeln("          © 2021 华南农业大学 农村人居环境入侵植物风险评估和监测预警 团队");
  document.writeln("          &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp");
  document.writeln("          联系方式 | Email: 2739214247@qq.com");
  document.writeln("</h6>");
  // document.writeln("<a id='loginlink' href='login0.html' target='_blank'>管理员入口</a>");
  document.writeln("</div>");
  document.writeln("</div>");
}
