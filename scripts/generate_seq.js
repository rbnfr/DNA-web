
$('#generator').click(function(){
  var seq_length = $('#seq_length').val();  

  if (seq_length) {
    var sequence = createSequence(seq_length);
  }
  else {
    var sequence = createSequence(Math.floor((Math.random() * 1000) + 3));
  }

  $('#sequence').val(sequence);
  $('#sequence').trigger('autoresize');
});

function createSequence(size){
  alert('create_sequence');
  var sequence = "";
  for(var i = 0 ; i < size; i++){
    sequence += getRandomChar();
  }
  return sequence;
}

function getRandomChar(){
  alert('random');
  var chars = ["A","T","C","G"];
  return chars[Math.floor((Math.random() * chars.length))];
}
