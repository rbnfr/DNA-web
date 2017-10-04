$('#cleaner').click(function () {
    $('#seq-id').val("");
    $('#seq-id').trigger('autoresize');
    $('#seq-id1').val("");
    $('#seq-id2').val("");
    $('#seq-id3').val("");
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
