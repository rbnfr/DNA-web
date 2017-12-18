$('#cleaner').click(function () {
    $('#seq-id').val("");    
    $('#seq-id1').val("");
    $('#seq-id2').val("");
    $('#seq-id3').val("");
    $('#seq_length').val("");
    $('p#length-meter').text("");
    $('textarea').trigger('autoresize');
    
    cleaner();
    
});


$('#generator').click(function () {    
    var seq_length = $('#seq_length').val();
    $('#seq-id1').val("");
    $('#seq-id2').val("");
    $('#seq-id3').val("");
    
    if (seq_length) {
        var sequence = createSequence(seq_length);
    } else {
        var sequence = createSequence(Math.floor((Math.random() * 1000) + 3));
    }
    $('#seq-id').val(sequence);
    $('#seq-id').trigger('autoresize');
    $('p#length-meter').text("Length: " + sequence.length);
});

function createSequence(size) {
    var sequence = "";
    for (var i = 0; i < size; i++) {
        sequence += getRandomChar();
    }
    return sequence;
}

function getRandomChar() {
    var chars = ["A", "T", "C", "G"];
    return chars[Math.floor((Math.random() * chars.length))];
}

function cleaner() {
    document.getElementById('length').innerHTML = "";
    document.getElementById('mass').innerHTML = "";
    document.getElementById('pI').innerHTML = "";
    document.getElementById('charge').innerHTML = "";
    document.getElementById('hydrophobicity').innerHTML = "";
    document.getElementById('extinction1').innerHTML = "";
    document.getElementById('extinction2').innerHTML = "";
}