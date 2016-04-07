var BPM = 165;

var NOTES = {"tch": 100,
             "dim": 50,
             "dom": 25,
             "": 0 }

var TOQUE = ["tch","", "tch","", "dim", "","","", "dom", "", "","", "dom","",""]

///////////////////////////////////////

var dData = function() {
    return NOTES[TOQUE[position % TOQUE.length]]
};

var beat = function() {
    position += 1;
}

var dLabel = function() {
    return "";
    
    //return TOQUE[position % TOQUE.length]
};

////////////////////////////////////

var beat_freq_ms = 60 * 1000 / BPM / 4; // we want quavers (croches), not crotchets (noires)

var position = 0

var initLabels = []
var initData  = []

var INIT_LENGTH = 40;
for (i = 0; i < INIT_LENGTH; i++) {
    beat()
    initLabels.push(dLabel())
    initData.push(dData())
}

var barChartData = {
  labels: initLabels,
  datasets: [{
    fillColor: "rgba(220,220,220,0.2)",
      strokeColor: "rgba(220,220,220,1)",
      pointColor: "rgba(220,220,220,1)",
    data: initData
  }]
}

var ctx = document.getElementById("canvas").getContext("2d");
var barChartDemo = new Chart(ctx).Line(barChartData, {
    responsive: true,
    maintainAspectRatio: false,

    animation: false,

    barValueSpacing: 2,
    pointDot : false,
    bezierCurve : true,
    scaleShowLabels: false,

    scaleBeginAtZero: true,
    scaleShowVerticalLines: false,
    showTooltips: false,
});
setInterval(function() {
    beat()
    
    barChartDemo.removeData();
    barChartDemo.addData([dData()], dLabel());

}, beat_freq_ms);
