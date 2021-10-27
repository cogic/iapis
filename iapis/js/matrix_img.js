/* https://github.com/d3/d3-plugins/tree/master/hexbin Copyright 2013 Michael Bostock. */
!function(){d3.hexbin=function(){function u(n){var r={};return n.forEach(function(n,t){var a=s.call(u,n,t)/o,e=Math.round(a),c=h.call(u,n,t)/i-(1&e?.5:0),f=Math.round(c),l=a-e;if(3*Math.abs(l)>1){var v=c-f,g=f+(f>c?-1:1)/2,m=e+(e>a?-1:1),M=c-g,d=a-m;v*v+l*l>M*M+d*d&&(f=g+(1&e?1:-1)/2,e=m)}var j=f+"-"+e,p=r[j];p?p.push(n):(p=r[j]=[n],p.i=f,p.j=e,p.x=(f+(1&e?.5:0))*i,p.y=e*o)}),d3.values(r)}function a(r){var t=0,u=0;return n.map(function(n){var a=Math.sin(n)*r,e=-Math.cos(n)*r,i=a-t,o=e-u;return t=a,u=e,[i,o]})}var e,i,o,c=1,f=1,h=r,s=t;return u.x=function(n){return arguments.length?(h=n,u):h},u.y=function(n){return arguments.length?(s=n,u):s},u.hexagon=function(n){return arguments.length<1&&(n=e),"m"+a(n).join("l")+"z"},u.centers=function(){for(var n=[],r=0,t=!1,u=0;f+e>r;r+=o,t=!t,++u)for(var a=t?i/2:0,h=0;c+i/2>a;a+=i,++h){var s=[a,r];s.i=h,s.j=u,n.push(s)}return n},u.mesh=function(){var n=a(e).slice(0,4).join("l");return u.centers().map(function(r){return"M"+r+"m"+n}).join("")},u.size=function(n){return arguments.length?(c=+n[0],f=+n[1],u):[c,f]},u.radius=function(n){return arguments.length?(e=+n,i=2*e*Math.sin(Math.PI/3),o=1.5*e,u):e},u.radius(1)};var n=d3.range(0,2*Math.PI,Math.PI/3),r=function(n){return n[0]},t=function(n){return n[1]}}();

/* https://github.com/davidbau/seedrandom Copyright 2013 David Bau. */
(function(a,b,c,d,e,f){function k(a){var b,c=a.length,e=this,f=0,g=e.i=e.j=0,h=e.S=[];for(c||(a=[c++]);d>f;)h[f]=f++;for(f=0;d>f;f++)h[f]=h[g=j&g+a[f%c]+(b=h[f])],h[g]=b;(e.g=function(a){for(var b,c=0,f=e.i,g=e.j,h=e.S;a--;)b=h[f=j&f+1],c=c*d+h[j&(h[f]=h[g=j&g+b])+(h[g]=b)];return e.i=f,e.j=g,c})(d)}function l(a,b){var e,c=[],d=(typeof a)[0];if(b&&"o"==d)for(e in a)try{c.push(l(a[e],b-1))}catch(f){}return c.length?c:"s"==d?a:a+"\0"}function m(a,b){for(var d,c=a+"",e=0;c.length>e;)b[j&e]=j&(d^=19*b[j&e])+c.charCodeAt(e++);return o(b)}function n(c){try{return a.crypto.getRandomValues(c=new Uint8Array(d)),o(c)}catch(e){return[+new Date,a,a.navigator.plugins,a.screen,o(b)]}}function o(a){return String.fromCharCode.apply(0,a)}var g=c.pow(d,e),h=c.pow(2,f),i=2*h,j=d-1;c.seedrandom=function(a,f){var j=[],p=m(l(f?[a,o(b)]:0 in arguments?a:n(),3),j),q=new k(j);return m(o(q.S),b),c.random=function(){for(var a=q.g(e),b=g,c=0;h>a;)a=(a+c)*d,b*=d,c=q.g(1);for(;a>=i;)a/=2,b/=2,c>>>=1;return(a+c)/b},p},m(c.random(),b)})(this,[],Math,256,6,52);

var data = [
    // {title: "虎斑蝶Danaus genutia"},
    // {title: "棘洼甲螨 Camisia spinifer (C. L. Koch, 1836)"},
    // {title: "丽棘蜥"},
    // {title: "紫网柄菌Dictyostelium purpureum集群"},
    // {title: "Flammulina velutipes (Curtis) Singer,金针菇"},
    // {title: "Leotia lubrica  (Scop.) Pers.,润滑锤舌菌"},
    // {title: "Lyophyllum decastes (Fr.) Singer,荷叶离褶伞"},
    // {title: "中日双盖蕨Diplazium × kidoi"},
    // {title: "光叶蕨Cystopteris chinensis"},
    // {title: "南岭石杉 Huperzia nanlingensis"},
    // {title: "翼盖蕨Didymochlaena truncatula"},
    // {title: "莎草蕨Schizaea digitata"},
    // {title: "霞客鳞毛蕨Dryopteris shiakeana"},
    // {title: "琴叶凤仙花 Impatiens pandurata Y. H. Tan & S. X. Yu"},
    // {title: "戴夜蛾 Lopharthrum comprimens (Walker)"},
    // {title: "琴叶凤仙花 Impatiens pandurata Y. H. Tan & S. X. Yu"},
    // {title: "天门山紫菀 Aster tianmenshanensis"},
    // {title: "天门山紫菀 Aster tianmenshanensis"},
    // {title: "天门山紫菀 Aster tianmenshanensis"},
    // {title: "天门山紫菀 Aster tianmenshanensis"},
    // {title: "Saussurea lhozhagensis 洛扎雪兔子"},
    // {title: "Saussurea lhunzensis 隆子风毛菊"},
    // {title: "Saussurea pseudoleucoma 拟羽裂雪兔子"},
    // {title: "Saussurea pseudotridactyla 拟三指雪兔子"},
    // {title: "Platanthera nanlingensis"},
    // {title: "Viola nujiangensis Y.S. Chen &X.H. Jin"},
    // {title: "Ganoderma applanatum"},
    // {title: "Gomphus floccosus"},
    // {title: "Gomphus floccosus"},
    // {title: "Hygrocybe chlorophana (Fr.) Wünsche."},
    // {title: "Hygrophorus eburneus (Bull.) Fr."},
    // {title: "Lyophyllum decastes (Fr.) Singer"},
    // {title: "Paxillus involutus (Batsch) Fr."},
    // {title: "Pholiota squarrosa (Vahl) P. Kumm."},
    // {title: "鳞丝膜菌[Cortinarius pholideus (Lilj.) Fr. ]"},
    // {title: "类悦金蝉蛛 Phintella suavisoides"},
    // {title: "Umbellozetes  squamaceus  Wang et Shen, 1999  鳞纹伞顶甲螨"},
    // {title: "墨脱棘蛙 Maculopaa medogensis ( Fei and Ye, 1999 )"},
    // {title: "沼蛙 Boulengerana guentheri ( Boulenger, 1882 )"},
    // {title: "光叶粗筒苣苔Briggsia leiophylla Fang Wen & Y.G.Wei"},
    // {title: "凤山报春苣苔Primulina fengshanensis Fang Wen & Yue Wang"},
    // {title: "微小报春苣苔Primulina minor Fang Wen & Y. G. Wei"},
    // {title: "披针叶半蒴苣苔Hemiboea angustifolia F.Wen 8145"},
    // {title: "新种-囊筒报春苣苔Primulina carinata Y. G. Wei, Fang Wen & H. Z. Lü"},
    // {title: "新种-多色报春苣苔Primulina versicolor F. Wen, B. Pan & B.M. Wang"},
    // {title: "新种-黄纹报春苣苔Primulina lutvittata Fang Wen & Y.G. Wei"},
    // {title: "紫花报春苣苔Primulina purpurea F. Wen, B. Zhao & Y.G Wei"},
    // {title: "Gonodactylus smithii"},
    // {title: "厚螯真寄居蟹Dardanus crassimanus (H. Milne Edwards, 1836)"},
    // {title: "叉背金线鲃"},
    // {title: "小眼金线鲃"},
    // {title: "流感病毒"},
    // {title: "环指硬壳寄居蟹Calcinus elegans (H. Milne Edwards, 1836)"},
    // {title: "腺病毒"},
    // {title: "轮状病毒"},
    // {title: "四川灵芝 Ganoderma sichuanense J.D. Zhao & X.Q. Zhang"},
    // {title: "夏蜡梅 Calycanthus chinensis"},
    // {title: "宝兴吊灯花 Ceropegia paohsingensis"},
    // {title: "总状绿绒蒿 Meconopsis racemosa"},
    // {title: "条纹蚁巢伞Termitomyces striatus (Beeli) R. Heim"},
    // {title: "罗汉松Podocarpus macrophyllus"},
    // {title: "金银莲花 Nymphoides indica"},
    // {title: "银粉背蕨 Aleuritopteris argentea"},
    // {title: "长足虻"},
    // {title: "文昌鱼"},
    // {title: "文昌鱼"},
    // {title: "文昌鱼 "},
    // {title: "文昌鱼"},
    // {title: "文昌鱼"},
    // {title: "长足虻"},
    // {title: "杯状疣杯 Tarzetta cupularis"},
    // {title: "吉林盾盘菌 Scutellinia jilinensis"},
    // {title: "文昌鱼"},
    // {title: " "},
    // {title: " "},
    // {title: " "},
    // {title: "长足虻"},
    // {title: "长足虻"},
    // {title: " "},
    // {title: "长足虻"},
    // {title: "Cortinarius phoeniceus (Vent.) Maire"},
    // {title: "荷叶离褶伞Lyophyllum decastes (Fr.) Singer"},
    // {title: "征镒麻Zhengyia shennongensis 植株群落"},
    // {title: "征镒麻Zhengyia shennongensis 花枝上部分"},
    // {title: "征镒麻托叶"},
    // {title: "节蒴木Borthwickia trifoliata  花序"},
    // {title: "节蒴木Borthwickia trifoliata 花序及幼果"},
    // {title: "节蒴木果实"},
    // {title: "1节蒴木果实"},
    // {title: " "},
    // {title: "节蒴木枝"},
    // {title: " "},
    // {title: " "},
    // {title: "麻栗坡杜鹃兰Cremastra malipoensis G. W. Hu"},
    // {title: " "},
    // {title: " "},
    // {title: "1麻栗坡杜鹃兰Cremastra malipoensis G. W. Hu"},
    // {title: " "},
    // {title: " "},
    // {title: " "}
    {title: " "},
    {title: " "},
    {title: " "},
    {title: " "},
    {title: " "},
    {title: " "},
    {title: " "},
    {title: " "},
    {title: " "},
    {title: " "},
    {title: " "},
    {title: " "},
    {title: " "},
    {title: " "},
    {title: " "},
    {title: " "},
    {title: " "},
    {title: " "},
    {title: " "},
    {title: " "},
    {title: " "},
    {title: " "},
    {title: " "},
    {title: " "},
    {title: " "},
    {title: " "},
    {title: " "},
    {title: " "},
    {title: " "},
    {title: " "},
    {title: " "},
    {title: " "},
    {title: " "},
    {title: " "},
    {title: " "},
    {title: " "},
    {title: " "},
    {title: " "},
    {title: " "},
    {title: " "},
    {title: " "},
    {title: " "},
    {title: " "},
    {title: " "},
    {title: " "},
    {title: " "},
    {title: " "},
    {title: " "},
    {title: " "},
    {title: " "},
    {title: " "},
    {title: " "},
    {title: " "},
    {title: " "},
    {title: " "},
    {title: " "},
    {title: " "},
    {title: " "},
    {title: " "},
    {title: " "},
    {title: " "},
    {title: " "},
    {title: " "},
    {title: " "},
    {title: " "},
    {title: " "},
    {title: " "},
    {title: " "},
    {title: " "},
    {title: " "},
    {title: " "},
    {title: " "},
    {title: " "},
    {title: " "},
    {title: " "},
    {title: " "},
    {title: " "},
    {title: " "},
    {title: " "},
    {title: " "},
    {title: " "},
    {title: " "},
    {title: " "},
    {title: " "},
    {title: " "},
    {title: " "},
    {title: " "},
    {title: " "},
    {title: " "},
    {title: " "},
    {title: " "},
    {title: " "},
    {title: " "},
    {title: " "},
    {title: " "},
    {title: " "},
    {title: " "},
    {title: " "},
    {title: " "},
    {title: " "},
];

data.forEach(function(d, i) {
    d.i = i % 10;
    d.j = i / 10 | 0;
});

Math.seedrandom(+d3.timeHour(new Date));

d3.shuffle(data);

var height = 800,
    imageWidth = 184,
    imageHeight = 184,
    radius = 70,
    depth = 3;

var currentFocus = [innerWidth / 2, height / 2],
    desiredFocus,
    idle = true;

var style = document.body.style,
    transform = ("webkitTransform" in style ? "-webkit-"
            : "MozTransform" in style ? "-moz-"
            : "msTransform" in style ? "-ms-"
            : "OTransform" in style ? "-o-"
            : "") + "transform";

var hexbin = d3.hexbin()
    .radius(radius);

if (!("ontouchstart" in document)) d3.select("#examples")
    .on("mousemove", mousemoved);

var deep = d3.select("#examples-deep");

var canvas = deep.append("canvas")
    .attr("height", height);

var context = canvas.node().getContext("2d");

var svg = deep.append("svg")
    .attr("height", height);

var mesh = svg.append("path")
    .attr("class", "example-mesh");

var anchor = svg.append("g")
    .attr("class", "example-anchor")
    .selectAll("a");

var graphic = deep.selectAll("svg,canvas");

var image = new Image;
image.src = "images/homeshow/jingling.jpg";
image.onload = resized;

d3.select(window)
    .on("resize", resized)
    .each(resized);

function drawImage(d) {
    context.save();
    context.beginPath();
    context.moveTo(0, -radius);

    for (var i = 1; i < 6; ++i) {
        var angle = i * Math.PI / 3,
            x = Math.sin(angle) * radius,
            y = -Math.cos(angle) * radius;
        context.lineTo(x, y);
    }

    context.clip();
    context.drawImage(image,
        imageWidth * d.i, imageHeight * d.j,
        imageWidth, imageHeight,
        -imageWidth / 2, -imageHeight / 2,
        imageWidth, imageHeight);
    context.restore();
}

function resized() {
    var deepWidth = innerWidth * (depth + 1) / depth,
        deepHeight = height * (depth + 1) / depth,
        centers = hexbin.size([deepWidth, deepHeight]).centers();

    desiredFocus = [innerWidth / 2, height / 2];
    moved();

    graphic
        .style("left", Math.round((innerWidth - deepWidth) / 2) + "px")
        .style("top", Math.round((height - deepHeight) / 2) + "px")
        .attr("width", deepWidth)
        .attr("height", deepHeight);

    centers.forEach(function(center, i) {
        center.j = Math.round(center[1] / (radius * 1.5));
        center.i = Math.round((center[0] - (center.j & 1) * radius * Math.sin(Math.PI / 3)) / (radius * 2 * Math.sin(Math.PI / 3)));
        context.save();
        context.translate(Math.round(center[0]), Math.round(center[1]));
        drawImage(center.example = data[(center.i % 10) + ((center.j + (center.i / 10 & 1) * 5) % 10) * 10]);
        context.restore();
    });

    mesh.attr("d", hexbin.mesh);

    anchor = anchor.data(centers, function(d) { return d.i + "," + d.j; });

    anchor.exit().remove();

    var anchorEnter = anchor.enter().append("a")
        .attr("xlink:href", function(d) { return d.example.url; })
        .attr("xlink:title", function(d) { return d.example.title; });

    anchorEnter.append("path")
        .attr("d", hexbin.hexagon());

    anchor = anchorEnter.merge(anchor)
        .attr("transform", function(d) { return "translate(" + d + ")"; });
}

function mousemoved() {
    var m = d3.mouse(this);

    desiredFocus = [
        Math.round((m[0] - innerWidth / 2) / depth) * depth + innerWidth / 2,
        Math.round((m[1] - height / 2) / depth) * depth + height / 2
    ];

    moved();
}

function moved() {
    if (idle) d3.timer(function() {
        if (idle = Math.abs(desiredFocus[0] - currentFocus[0]) < .5 && Math.abs(desiredFocus[1] - currentFocus[1]) < .5) currentFocus = desiredFocus;
        else currentFocus[0] += (desiredFocus[0] - currentFocus[0]) * .14, currentFocus[1] += (desiredFocus[1] - currentFocus[1]) * .14;
        deep.style(transform, "translate(" + (innerWidth / 2 - currentFocus[0]) / depth + "px," + (height / 2 - currentFocus[1]) / depth + "px)");
        return idle;
    });
}