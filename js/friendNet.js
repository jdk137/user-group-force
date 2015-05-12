var FriendNet = function (container, chartWidth, chartHeight, leftLegendWidth, linkDistance, forceCharge) {
  var w = chartWidth || 830,
      h = chartHeight || 500;
  var legendWidth = leftLegendWidth || 200;
  //image adjust param
  var linkDis = linkDistance || 160; // link distance
  var charge = forceCharge || -1000; //negative value results in node repulsion, positive value results in node attraction. Larger absolute value is, larger the force is;
  var container = $(container);
  var floatTag;
  
  //d3 obj
  var svg= d3.select(container[0]).append("svg")
      .attr("width", w)
      .attr("height", h);
  var legend = svg.append("g")
      .attr("width", legendWidth)
      .attr("height", h)
      .attr("class", "legend")
      .style("font", "14px 微软雅黑,sans-serif");
  var vis = svg.append("g")
      .attr("width", w - legendWidth)
      .attr("height", h)
      .attr("transform", "translate(" + legendWidth + ",0)");
  var node;
  var link;

  //layout obj
  var force;
  
  //prepare data
  var matrix=[];
  var words= [];
  var centerWord;
  var userInfo = {
    696332896: {'gender': 1, 'level': 3}
  };
  var rawData = [[696332896,16867059,1,2],[696332896,424731924,1,2],[696332896,71401648,1,2],[696332896,673793874,2,2],[696332896,758345387,2,1],[696332896,125538391,1,2],[16867059,11210790,1,2],[16867059,88020110,1,3],[16867059,99143933,2,4],[16867059,23637,1,4],[16867059,288820485,1,2],[16867059,10713671,1,4],[16867059,305861149,1,3],[16867059,83110410,2,2],[16867059,758345387,2,1],[16867059,71893149,1,1],[16867059,41665619,2,4],[16867059,46882968,1,2],[16867059,24636925,1,2],[16867059,56416028,1,2],[16867059,28196941,1,2],[16867059,21072898,1,3],[16867059,56567600,2,4],[16867059,79893522,2,2],[16867059,22229953,1,1],[16867059,31023319,1,4],[16867059,127052757,1,4],[16867059,21537586,1,3],[16867059,20327859,2,3],[16867059,365278022,1,1],[16867059,22343217,1,2],[16867059,686629837,1,1],[16867059,33911672,1,2],[16867059,712193480,2,2],[16867059,598438506,2,4],[16867059,106123230,2,2],[16867059,36635578,2,3],[16867059,275282107,1,2],[16867059,69389215,1,2],[16867059,58226693,2,4],[16867059,32135405,1,4],[16867059,36002100,2,4],[16867059,12614924,1,2],[16867059,142310604,2,2],[16867059,14773429,1,3],[16867059,78604907,1,3],[16867059,125538391,1,2],[16867059,714343733,1,2],[16867059,21744113,1,5],[16867059,20349894,1,5],[16867059,26396621,2,3],[16867059,49004666,1,2],[16867059,71401648,1,2],[16867059,155185899,2,2],[16867059,10280524,1,4],[16867059,15148,1,4],[16867059,105977883,1,2],[16867059,175410,1,2],[16867059,56741663,1,1],[16867059,692483631,2,2],[71401648,714957487,1,1],[71401648,381881112,1,4],[71401648,666663308,2,3],[71401648,320051687,1,3],[71401648,199184887,1,2],[71401648,275950534,2,2],[71401648,23637,1,4],[71401648,673793874,2,2],[71401648,48618701,2,3],[71401648,382940830,2,2],[71401648,382387625,2,2],[71401648,46882968,1,2],[71401648,759822511,1,1],[71401648,305861149,1,3],[71401648,758345387,2,1],[71401648,41665619,2,4],[71401648,412334374,2,2],[71401648,771029477,2,2],[71401648,56416028,1,2],[71401648,624581496,2,2],[71401648,598438506,2,4],[71401648,613707370,1,2],[71401648,16867059,1,2],[71401648,531618311,1,2],[71401648,95038893,2,3],[71401648,63144910,2,4],[71401648,682498395,2,3],[71401648,76640527,1,2],[71401648,10186377,1,2],[71401648,393181685,2,2],[71401648,20349894,1,5],[71401648,495367397,2,2],[71401648,49004666,1,2],[71401648,539560333,1,3],[71401648,49601837,2,3],[71401648,106865261,2,4],[71401648,692483631,2,2],[125538391,349489044,2,2],[125538391,656757244,2,3],[125538391,199411060,1,3],[125538391,301765148,2,3],[125538391,77040599,1,3],[125538391,278172812,2,2],[125538391,88020110,1,3],[125538391,11210790,1,2],[125538391,100173714,1,2],[125538391,104807698,1,2],[125538391,23637,1,4],[125538391,140855947,1,2],[125538391,126266429,2,2],[125538391,86334703,2,3],[125538391,308994927,2,4],[125538391,110016410,1,3],[125538391,46882968,1,2],[125538391,223559667,2,3],[125538391,56416028,1,2],[125538391,21134849,2,3],[125538391,758345387,2,1],[125538391,256391431,2,2],[125538391,692017205,1,2],[125538391,56567600,2,4],[125538391,394051001,2,2],[125538391,354779201,1,2],[125538391,143756864,1,5],[125538391,41087386,1,4],[125538391,365278022,1,1],[125538391,60907401,1,3],[125538391,22343217,1,2],[125538391,32135405,1,4],[125538391,16867059,1,2],[125538391,600463651,2,2],[125538391,136709102,2,2],[125538391,168888196,2,2],[125538391,127546499,2,2],[125538391,20498402,2,4],[125538391,39511769,1,2],[125538391,142310604,2,2],[125538391,393875098,1,3],[125538391,47568332,1,3],[125538391,394221134,2,3],[125538391,128436307,2,2],[125538391,159147526,1,2],[125538391,368485886,1,3],[125538391,14773429,1,3],[125538391,200044078,1,2],[125538391,26513046,2,3],[125538391,357367119,2,3],[125538391,141447266,1,3],[125538391,79185598,2,3],[125538391,393181685,2,2],[125538391,62991362,1,5],[125538391,90464084,2,3],[125538391,26790228,2,4],[125538391,156651215,2,3],[125538391,88919604,1,2],[125538391,85284656,1,3],[125538391,49807331,1,5],[125538391,274753763,2,2],[125538391,684943044,2,2],[125538391,85649701,1,2],[125538391,69805057,1,2],[125538391,594097045,1,2],[125538391,692483631,2,2],[125538391,56741663,1,1],[424731924,506692648,1,2],[424731924,141423610,1,2],[424731924,726331519,1,1],[424731924,753471706,2,2],[424731924,706217742,2,2],[424731924,514411625,2,1],[424731924,40955419,1,3],[424731924,393181685,2,2],[424731924,692483631,2,2],[673793874,150084117,1,1],[673793874,377501651,1,2],[673793874,71401648,1,2],[758345387,88020110,1,3],[758345387,11210790,1,2],[758345387,650568295,2,1],[758345387,128477053,2,3],[758345387,48618701,2,3],[758345387,738482261,1,2],[758345387,56416028,1,2],[758345387,46882968,1,2],[758345387,325929230,2,2],[758345387,815568657,2,2],[758345387,22343217,1,2],[758345387,256559229,1,2],[758345387,695524641,2,2],[758345387,16867059,1,2],[758345387,39511769,1,2],[758345387,680216660,2,2],[758345387,142310604,2,2],[758345387,65759340,2,4],[758345387,125538391,1,2],[758345387,714343733,1,2],[758345387,71401648,1,2],[758345387,733776732,1,1],[758345387,88919604,1,2],[758345387,56741663,1,1],[758345387,692483631,2,2]];
  var wordCount = {};
  var wordIndex = {};
  
  var dataProcess = function () {
    //remove single friend
    (function () {
      var count = {};
      var temp = [];
      var existed = {};
      rawData.forEach(function (d) {
        userInfo[d[1]] = {'gender': d[2], 'level': d[3]};
        var small = Math.min(d[0], d[1]);
        var big = Math.max(d[0], d[1]);
        if (typeof existed[small + "_" + big] === 'undefined') {
          existed[small + "_" + big] = 1;
        } else {
          return;
        }
        d.slice(0, 2).forEach(function (d, i) {
          if (typeof count[d] === 'undefined') {
            count[d] = 1;
          } else {
            count[d] += 1;
          }
        });
      });
      rawData.forEach(function (d) {
        if (count[d[0]] > 1 && count[d[1]] > 1) {
          temp.push(d);
        } 
      });
      rawData = temp;
    }());
    
    words = [];
    (function () {
      var existed = {};
      rawData.forEach(function (d) {
        var small = Math.min(d[0], d[1]);
        var big = Math.max(d[0], d[1]);
        if (typeof existed[small + "_" + big] === 'undefined') {
          existed[small + "_" + big] = 1;
        } else {
          return;
        }
        d.slice(0, 2).forEach(function (d, i) {
          if (typeof wordCount[d] === 'undefined') {
            wordCount[d] = 1;
            words.push(d);
            wordIndex[d] = words.length - 1;
          } else {
            wordCount[d] += 1;
          }
        });
      });
    }());
    
    matrix = [];
    var zeroArray = d3.range(words.length).map(function (d) {return 0;});
    words.forEach(function (d) {
      matrix.push(zeroArray.slice());
    });
    
    rawData.forEach(function (d) {
      var i1 = wordIndex[d[0]],
          i2 = wordIndex[d[1]];
      matrix[i1][i2] = 1;
      matrix[i2][i1] = 1;
    });
  };
  dataProcess();
  
  // get node link data
  var getNewJson = function (word) {
      centerWord = word;
      var json = {};
      var nodes = json.nodes = [];
      var links = json.links = [];
      var nodeIndex = {};
  
      var getSameFriendNum = function (i1, i2) {
        var count = 0;
        matrix[i1].forEach(function (d, i) {
          if (d === 1 && matrix[i2][i] === 1) {
            count += 1;
          }
        });
        return count;
      };
  
      var getNodes = function (word, level) {
        if (typeof nodeIndex[word] !== 'undefined') {
          // already added;
          return;
        } else {
          nodes.push({
              "name":word,
              "value": wordCount[word],
              "gender": userInfo[word].gender,
              "level": userInfo[word].level
              });
          nodeIndex[word] = nodes.length - 1;
        }
  
        if (level === 1) {
          // max level is 1
          return;
        }
        matrix[wordIndex[word]].forEach(function (d, i) {
          // no link
          if (d === 0) {
            return;
          }
          getNodes(words[i], level + 1);
        });
      };
      var getLinks = function () {
        var i, j;
        var l = nodes.length;
        var sIndex, tIndex;
        for (i = 0; i < l - 1; i++) {
          sIndex = wordIndex[nodes[i].name];
          for (j = i + 1; j < l; j++) {
            tIndex = wordIndex[nodes[j].name];
            if (matrix[sIndex][tIndex] === 1) {
              //links.push({source: i, target: j, value: nodes[i].value + nodes[j].value});
              links.push({source: i, target: j, value: getSameFriendNum(sIndex, tIndex)});
            }
          }
        }
      };
      getNodes(word, 0);
      getLinks();
  
      return json;
  }
  
  var init = function () {
    var createFloatTag = function () {
        var _mousemove = function (e) {
            var jqNode = e.data.jqNode;
            var container = e.data.container;
            var mouseToFloatTag = {x: 20, y: 20};
            var offset = $(container).offset();
            if (!(e.pageX && e.pageY)) {return false;}
            var x = e.pageX - offset.left,
                y = e.pageY - offset.top;
            var position = $(container).position();
    
            setContent.call(this);
    
            //set floatTag location
            floatTagWidth = jqNode.outerWidth();
            floatTagHeight = jqNode.outerHeight();
            if (floatTagWidth + x + 2 * mouseToFloatTag.x <=  $(container).width()) {
                x += mouseToFloatTag.x;
            } else {
                x = x - floatTagWidth - mouseToFloatTag.x;
            }
            if (y >= floatTagHeight + mouseToFloatTag.y) {
                y = y - mouseToFloatTag.y - floatTagHeight;
            } else {
                y += mouseToFloatTag.y;
            }
            jqNode.css("left",  x  + "px");
            jqNode.css("top",  y + "px");
        };
    
        var setContent = function () {};
    
        function floatTag(cont) {
            var container = cont;
            var jqNode = $("<div/>").css({
                "border": "1px solid",
                "border-color": $.browser.msie ? "rgb(0, 0, 0)" : "rgba(0, 0, 0, 0.8)",
                "background-color": $.browser.msie ? "rgb(0, 0, 0)" : "rgba(0, 0, 0, 0.75)",
                "color": "white",
                "border-radius": "2px",
                "padding": "12px 8px",
                //"line-height": "170%",
                //"opacity": 0.7,
                "font-size": "12px",
                "box-shadow": "3px 3px 6px 0px rgba(0,0,0,0.58)",
                "font-familiy": "宋体",
                "z-index": 10000,
                "text-align": "center",
                "visibility": "hidden",
                "position": "absolute"
            });
            $(container).append(jqNode)
                .mousemove({"jqNode": jqNode, "container": container}, _mousemove);
            return jqNode;
        }
    
        floatTag.setContent = function (sc) {
            if (arguments.length === 0) {
                return setContent;
            }
            setContent = sc;
        };
        return floatTag;
    };
    container.css({
        "position": "relative",
        "background-color": "#f5fff5",
        "width": w + "px",
        "height": h + "px"
    });
    floatTag = createFloatTag()(container);
    floatTag.css({"visibility": "hidden"});
    container.delegate(".node", "mouseover", function () {
      var d = this.__data__;
      var levelInfo = {
        0: "信用得分<=3",
        1: "新手买家（1-2星）",
        2: "初级买家（3-5星）",
        3: "中级买家（1钻）",
        4: "资深买家（2钻）",
        5: "骨灰级买家（3钻及以上）"
      };
      //set floatTag content
      floatTag.html('<div><p>' + d.name + '</p>'
          + '<p>好友数：' + d.value + '</p>'
          + '<p>' + (d.gender === 1 ? '男' : '女') + '</p>'
          + '<p>' + levelInfo[d.level] + '</p>'
          + '</div>'
      );
      floatTag.css({"visibility": "visible"});
      $("line.link").css({"opacity": 0.15});
      $("g.node").css({"opacity": 0.15});
      $("line." + d.name).each(function () {
        var d = this.__data__;
        $(this).css({"opacity": 1});
        $("g." + d.source.name).css({'opacity': 1});
        $("g." + d.target.name).css({'opacity': 1});
      });
    });
    container.delegate(".node", "mouseout", function () {
      $("line.link").css({"opacity": 1});
      $("g.node").css({"opacity": 1});
      floatTag.css({"visibility": "hidden"});
    });
    container.delegate(".link", "mouseover", function () {
      var d = this.__data__;
      //set floatTag content
      floatTag.html('<div><p>' + d.source.name + " - " + d.target.name + '</p>'
          + '<p>' + d.source.name + ' 好友数：' + d.source.value + '</p>'
          + '<p>' + d.target.name + ' 好友数：' + d.target.value + '</p>'
          + '<p>共同好友数：' + d.value + '</p>'
          + '</div>'
      );
      floatTag.css({"visibility": "visible"});
      $("g.node").css({"opacity": 0.15});
      $("g." + d.source.name).css({"opacity": 1});
      $("g." + d.target.name).css({"opacity": 1});
      $("line.link").css({"opacity": 0.15});
      $(this).css({"opacity": 1});
    });
    container.delegate(".link", "mouseout", function () {
      $("g.node").css({"opacity": 1});
      $("line.link").css({"opacity": 1});
      floatTag.css({"visibility": "hidden"});
    });
  };
  init();
          
  var drawForce = function (word, firstTime) {
    var nameCompress = function (name) {
      var name = name + "";
      return name.substr(0, 2) + "**" + name.substr(name.length - 2, 2);
    };
    var circleR = function (d) { return 8 + 2 * d.level; };
    var circleColor = function (d) { return d.gender === 1 ? "#3fa9f5" : "#ff88a2"; }
    var circleOpacity = function (d) { return d.fill_opacity = Math.min(d.value * 2 / 100 + 0.3, 1); }
    var lineWidth = function(d) { return Math.sqrt(d.value) + 3; };
    var json = getNewJson(word);
    force = d3.layout.force()
        .charge(charge)
        .linkDistance(linkDis)
        .nodes(json.nodes)
        .links(json.links)
        .size([w - legendWidth, h])
        .start();
  
    link = vis.selectAll("line.link")
        .data(json.links)
      .enter().append("line")
        .attr("class", function (d) { return "link " + d.source.name + " " + d.target.name; })
        .style("stroke-width", lineWidth)
        .style("stroke", "#999")
        .style("stroke-opacity", .6)
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });
  
    node = vis.selectAll("g.node")
        .data(json.nodes)
      .enter().append("svg:g")
        .attr("class", function (d) { return "node " + d.name; })
        .call(force.drag);
  
    node.append("circle")
      .attr("r", circleR)
      .on("click",function(d){refresh(d.name);})
      .style("stroke-width", function (d) { return d.name === centerWord ? 2 : 0; })
      .style("stroke", function (d) { return "gray";})
      .style("stroke-opacity", function (d) { return Math.min(d.value * 2 / 100 + 0.3, 1); })
      .style("fill", circleColor)
      .style("fill-opacity", circleOpacity)
      .style("cursor", function (d) { return d.name === centerWord ? '' : 'pointer'; });
  
    node.append("svg:text")
        .attr("class", "nodetext")
        .attr("dx", 12)
        .attr("dy", ".35em")
        .attr("pointer-events", "none")
        .style("font", "12px 微软雅黑,sans-serif")
        .text(function(d) { return nameCompress(d.name); });
  
    force.on("tick", function() {
      node.attr("transform", function(d) {
        var ratio = 0.7;
        if (d.name === centerWord) {
          d.x = d.x * ratio  + (w - legendWidth) / 2 * (1 - ratio);
          d.y = d.y * ratio + h / 2 * (1 - ratio);
        }
        return "translate(" + d.x + "," + d.y + ")";
      });
  
      link.attr("x1", function(d) { return d.source.x; })
          .attr("y1", function(d) { return d.source.y; })
          .attr("x2", function(d) { return d.target.x; })
          .attr("y2", function(d) { return d.target.y; });
    });
  
    var drawLegend = function () {
      var levelInfo = {
        0: "信用得分<=3",
        1: "新手买家（1-2星）",
        2: "初级买家（3-5星）",
        3: "中级买家（1钻）",
        4: "资深买家（2钻）",
        5: "骨灰级买家（3钻及以上）"
      };
  
      //color
      var colorLegend = legend.append("g")
        .attr("width", 200)
        .attr("height", 100)
        .attr("transform", "translate(0," + 0 + ")");
      colorLegend.append("text")
        .attr("x", 10)
        .attr("y", 30)
        .text("颜色");
      colorLegend.append("rect")
        .attr("x", 10)
        .attr("y", 45)
        .attr("width", 30)
        .attr("height", 20)
        .attr("fill", "#3fa9f5");
      colorLegend.append("text")
        .attr("x", 50)
        .attr("y", 60)
        .text("男");
      colorLegend.append("rect")
        .attr("x", 10)
        .attr("y", 75)
        .attr("width", 30)
        .attr("height", 20)
        .attr("fill", "#ff88a2");
      colorLegend.append("text")
        .attr("x", 50)
        .attr("y", 90)
        .text("女");
  
      //size
      var sizeLegend = legend.append("g")
        .attr("width", 200)
        .attr("height", 300)
        .attr("transform", "translate(0," + 95 + ")");
      sizeLegend.append("text")
        .attr("x", 10)
        .attr("y", 35)
        .text("大小");
      sizeLegend.append("circle")
        .attr("cx", 30)
        .attr("cy", 65)
        .attr("r", circleR({level: 5}))
        .attr("fill", "#3fa9f5");
      sizeLegend.append("text")
        .attr("x", 60)
        .attr("y", 65)
        .attr("dominant-baseline", "central")
        .text(levelInfo[5]);
      sizeLegend.append("circle")
        .attr("cx", 30)
        .attr("cy", 105)
        .attr("r", circleR({level: 4}))
        .attr("fill", "#3fa9f5");
      sizeLegend.append("text")
        .attr("x", 60)
        .attr("y", 105)
        .attr("dominant-baseline", "central")
        .text(levelInfo[4]);
      sizeLegend.append("circle")
        .attr("cx", 30)
        .attr("cy", 141)
        .attr("r", circleR({level: 3}))
        .attr("fill", "#3fa9f5");
      sizeLegend.append("text")
        .attr("x", 60)
        .attr("y", 141)
        .attr("dominant-baseline", "central")
        .text(levelInfo[3]);
      sizeLegend.append("circle")
        .attr("cx", 30)
        .attr("cy", 173)
        .attr("r", circleR({level: 2}))
        .attr("fill", "#3fa9f5");
      sizeLegend.append("text")
        .attr("x", 60)
        .attr("y", 173)
        .attr("dominant-baseline", "central")
        .text(levelInfo[2]);
      sizeLegend.append("circle")
        .attr("cx", 30)
        .attr("cy", 200)
        .attr("r", circleR({level: 1}))
        .attr("fill", "#3fa9f5");
      sizeLegend.append("text")
        .attr("x", 60)
        .attr("y", 200)
        .attr("dominant-baseline", "central")
        .text(levelInfo[1]);
      sizeLegend.append("circle")
        .attr("cx", 30)
        .attr("cy", 225)
        .attr("r", circleR({level: 0}))
        .attr("fill", "#3fa9f5");
      sizeLegend.append("text")
        .attr("x", 60)
        .attr("y", 225)
        .attr("dominant-baseline", "central")
        .text(levelInfo[0]);
  
      //opacity
      var opacityLegend = legend.append("g")
        .attr("width", 200)
        .attr("height", 100)
        .attr("transform", "translate(0," + 300 + ")");
      var gradient = svg.append("svg:defs")
        .append("svg:linearGradient")
          .attr("id", "gradient")
          .attr("x1", "0%")
          .attr("y1", "100%")
          .attr("x2", "100%")
          .attr("y2", "100%")
          .attr("spreadMethod", "pad");
      
      gradient.append("svg:stop")
          .attr("offset", "0%")
          .attr("stop-color", "#ff88a2")
          .attr("stop-opacity", circleOpacity({value: 1}));
      
      gradient.append("svg:stop")
          .attr("offset", "100%")
          .attr("stop-color", "#ff88a2")
          .attr("stop-opacity", circleOpacity({value: 30}));
  
      opacityLegend.append("text")
        .attr("x", 10)
        .attr("y", 63)
        .text("透明度");
      opacityLegend.append("text")
        .attr("x", 10)
        .attr("y", 85)
        .attr("dominant-baseline", "central")
        .text("1个好友");
      opacityLegend.append("text")
        .attr("x", 170)
        .attr("y", 85)
        .attr("dominant-baseline", "central")
        .text("30好友");
      opacityLegend.append("rect")
        .attr("x", 67)
        .attr("y", 78)
        .attr("width", 100)
        .attr("height", 15)
        .attr("fill", "url(#gradient)");
  
      //line
      var lineLegend = legend.append("g")
        .attr("width", 200)
        .attr("height", 100)
        .attr("transform", "translate(0," + 408 + ")");
      lineLegend.append("text")
        .attr("x", 10)
        .attr("y", 23)
        .text("连线");
      lineLegend.append("line")
        .attr("x1", 10)
        .attr("y1", 40)
        .attr("x2", 100)
        .attr("y2", 40)
        .attr("stroke", "#999999")
        .attr("stroke-opacity", 0.6)
        .attr("stroke-width", lineWidth({value: 15}));
      lineLegend.append("text")
        .attr("x", 120)
        .attr("y", 40)
        .attr("dominant-baseline", "central")
        .text("15个共同好友");
      lineLegend.append("line")
        .attr("x1", 10)
        .attr("y1", 65)
        .attr("x2", 100)
        .attr("y2", 65)
        .attr("stroke", "#999999")
        .attr("stroke-opacity", 0.6)
        .attr("stroke-width", lineWidth({value: 0}));
      lineLegend.append("text")
        .attr("x", 120)
        .attr("y", 65)
        .attr("dominant-baseline", "central")
        .text("0个共同好友");
    };
  
    if (firstTime) {
      drawLegend();
    }
  };
  drawForce(words[0], true);
  
  var refresh= function (word) {
      floatTag.css({"visibility": "hidden"});
      vis.remove();
      vis = svg.append("g")
          .attr("width", w - legendWidth)
          .attr("height", h)
          .attr("transform", "translate(" + legendWidth + ",0)");
      drawForce(word);
  };

  this.startAnim = function () {
    force.resume();
  };
  this.stopAnim = function () {
    force.stop();
  };
}
