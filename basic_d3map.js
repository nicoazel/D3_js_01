
var data_index = [0,1,2,3,4];

var cx_input = [50,200,400,600,300];
var cy_input = [100,150,100,200,300];
var r_input = [10,20,30,40,50];
var DaSVG = d3.select("svg");
DaSVG.attr("align","center");

var circle = DaSVG.selectAll("circle").data(data_index);

var circleEnter = circle.enter().append("circle");
circleEnter.attr("cy", function(d, i){ return cy_input[i]; });
circleEnter.attr("cx", function(d, i){ return cx_input[i]; });
circleEnter.attr("r", function(d, i){ return r_input[i];   });


DaSVG.selectAll("text").data(data_index)
.enter()
.append("text")
.attr("x", function(d,i){return cx_input[i];})
.attr("y", function(d,i){return cy_input[i];})
.text( function(d,i) {return "#"+String(i);})
.attr("font-family", "sans-serif")
.attr("font-size", "20px")
.attr("fill", "red");


var mymap = L.map('mapid').setView([40.4406, -79.9959], 12);

L.tileLayer('https://api.mapbox.com/styles/v1/nicoazel/citog8me600042hl13iyg56ed/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoibmljb2F6ZWwiLCJhIjoiY2l0b2czbHVlMDNyeTJ6c2I2aDJpZHVhNyJ9.cpjh3h2_xzXL-Xwum8nA_w', {
  maxZoom: 18,
  id: 'mapbox.myPGH'
}).addTo(mymap);
