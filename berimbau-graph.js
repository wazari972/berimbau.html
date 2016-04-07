DEBUG_MODE = false

var marker = function() {
    var note = note_name()
    var MARQUE = {tch: { type: "cross",    color:"green"},
                  dim: { type: "triangle", color:"orange"},
                  dom: { type: "triangle", color:"tomato"}}
    if (note in MARQUE) {
        return MARQUE[note];
    }

    return {type: DEBUG_MODE ? "square" : "none", color: ""}
}

var updateChart = null;
    
window.onload = function () {
    live__on_loaded();
    
    var dps = []; // dataPoints
    
    //var tick = new Audio('tick.mp3').play()

    var chart = new CanvasJS.Chart("canvas",{
	title :{
	    text: "Live berimbau "
	},
        axisX:{
            gridThickness: 0.5,
            interval:4, 
            tickColor: "red",
            tickLength: 5,
            tickThickness: 2
        },
        axisY: {
            interlacedColor: "Azure",
            //interval: 50,
            tickColor: "navy",
            tickLength: 10,
            minimum: -25,
            maximum: 110
        },
	toolTip:{  enabled: false},
	data: [{
	    type: "spline",
	    dataPoints: dps 
	}]
    });

    var xVal = 0;
    var yVal = 100;	
    
    var dataLength = 110; // number of dataPoints visible at any point
    var current_toque_span = $("#current_toque")
    updateChart = function (count) {
	count = count || 1;
	// count is number of times loop runs to generate random dataPoints.
	for (var j = 0; j < count; j++) {
	    yVal = current_height();
            mark = marker()
            
	    dps.push({
		x: (0.0 + xVal) / MARK_PER_BEAT,
		y: yVal,
                markerType: mark.type,
                markerColor: mark.color,
                note_name: note_name()
	    });
	    xVal++;
            beat();
	};
        var last_note = dps[0]
        if (last_note.note_name) {
            current_toque_span.text(last_note.note_name)
            current_toque_span.css('background-color', last_note.markerColor)
        } else {
            current_toque_span.css('background-color', '')
        }
            
	if (dps.length > dataLength) {
	    dps.shift();
	}
	
	chart.render();		
        
    };
    
    // generates first set of dataPoints
    updateChart(dataLength); 
    
    // update chart after specified time. 
    setInterval(function(){
        if (paused) return;
        updateChart()
    }, beat_freq_ms*2); 
}

