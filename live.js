
var BPM = 100;

var NOTES = {
    tch: {height: 100, length: 0.5},
    dim: {height: 50,  length: 1},
    dom: {height: 0, length: 1},
}

var TRANSITION = {
    "tch-tch": 80,
    "tch-dim": 40,
    "dim-dom": -20,
    "dom-dom": -20,
    "dom-tch": -20
}

var TOQUE = ["dim", "dom", "dom", "tch", "tch"]

var MARK_PER_BEAT = 4; // we want quavers (croches), not crotchets (noires)

///////////////////////////////////////

var current_height = function() {
    if (tempo_position == 0) {
        return NOTES[current_note].height
    } else {
        var transition_position = tempo_position/NOTES[current_note].length
        var next_note = TOQUE[(toque_position + 1) % TOQUE.length]

        var height = TRANSITION[current_note+"-"+next_note]

        if (transition_position == 1/2) {
            return height
        }
        
        var closest_height = NOTES[transition_position < 1/2 ? current_note : next_note].height

        var arranged_height = height - ((height - closest_height) * Math.abs(1/2 - transition_position))
        
        
        return arranged_height;
    }
};

var beat = function() {
    tempo_position += 1 / MARK_PER_BEAT;

    if (tempo_position >= next_note_delay) {
        toque_position += 1 
        toque_position %= TOQUE.length

        current_note = TOQUE[toque_position]

        next_note_delay = NOTES[current_note].length
        tempo_position = 0
    }
}

var note_name = function() {
    if (tempo_position == 0) {
        return current_note;
    }
    return ""
};

////////////////////////////////////

var beat_freq_ms = 60 * 1000 / BPM / MARK_PER_BEAT; 

var toque_position = 0
var tempo_position = 0

var current_note = TOQUE[toque_position]
var next_note_delay = NOTES[current_note].length

var paused = true

var live__on_loaded = function() {
    $(document).keypress(function(e) {
        if (e.which == 13 || e.which == 32) {
            paused = !paused;
        } else if (e.which == 43) {
            beat()
            updateChart()
        } else if (e.which == 100) {
            DEBUG_MODE = !DEBUG_MODE
            //alert("Debug mode: "+DEBUG_MODE)
        } else {
            //alert(e.which)
        }
    })
}
