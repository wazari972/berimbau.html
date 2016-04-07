var beat = -1;
var active = false; 
var current_beat = 0;

var timer;

$("#bpm").change(function() {
    if ($("#bpm").val() < 0) {
        $("#bpm").val(0)
    }
    beat = $("#bpm").val();
    $("#beat").text(beat);
    
    if (active) {
        clearInterval(timer)
        timer = setInterval(play, beat_delay())
    }
});

$('#bpm').on('mousemove change',function() { 
    $("#beat").text($("#bpm").val());
});

var activate = function() {
    active = !active;
    if (active) {
        timer = setInterval(play, beat_delay())
        $(this).text("pause")
    } else {
        $(this).text("play")
        clearInterval(timer)
    }
    
}

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

$(function(){
    beat = $("#bpm").val()
    active = !active // to keep the initial value
    activate()
})
