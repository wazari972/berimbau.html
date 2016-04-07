var beat = 130;
var active = false;
var current_beat = 0;

var timer;

var on_bpm_change = function(bpm) {
    beat = bpm;
    
    if (active) {
        clearInterval(timer)
        timer = setInterval(play, beat_delay())
    }
}

var activate = function() {
    active = !active;
    if (active) {
        timer = setInterval(play, beat_delay())
        $("#active").text("pause")
    } else {
        $("#active").text("play")
        clearInterval(timer)
    }
    
}

$(".metronome .preset_bpm").click(function() {
    
    if ($(this).text() == "Angola") {
        var new_beat = 60;
    } else if ($(this).text() == "Benguela") {
        var new_beat = 100;
    } else if ($(this).text() == "Sao Bento Grande") {
        var new_beat = 160;
    }
    $("#bpm").data("roundSlider").setValue(new_beat)
});

$("#active").click(activate);

function play() {
    current_beat += 1
    current_beat %= 4
    if (current_beat == 0) {
        return;
    }
    $("#beater").trigger("play")
}

function beat_delay() {
    return (60/beat)*1000;
}

function changeTooltip(e) {
    var val = e.value, speed;

    on_bpm_change(val)

    return "<div> " + val + " BPM <div>";
}

$(function(){
    $("#bpm").roundSlider({
        sliderType: "min-range",
        editableTooltip: false,
        radius: 105,
        width: 16,
        min: 50,
        value: 130,
        max: 200,
        handleSize: 0,
        handleShape: "square",
        circleShape: "pie",
        startAngle: 315,
        tooltipFormat: "changeTooltip"
    });
    $("#bpm").data("roundSlider").setValue(beat)
    beat = $("#bpm").val()
    active = !active // to keep the initial value
    activate()
})
