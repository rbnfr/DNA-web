$('.submit-button').click(function() {
  var sequence = getSequence();
  //alert(sequence);

  var type = $('input[name="type"]:checked').val();

  if (type == "RNA") {
    var trans = translateRNA(sequence);
    // alert("RNA");
    $('.result').text(trans);
  }
  else if (type == "Protein") {
    // var trans = translatePROT(sequence);
    // alert("Protein");
    $('.result').text(type);
  }
});


function getSequence() {
  var form = document.forms["conversor"];
  var seq = form[1].value;
  return seq;
}


function translateRNA(sequence){
  var translation = {
    'A':'U',
    'T':'A',
    'C':'G',
    'G':'C'
  }
  var seq = sequence.toUpperCase().replace(/\s/g, '');
  var i;
  var trans = "";

  for (var i = 0; i < seq.length; i++) {
    var char = seq.substring(i, i+1);
    trans+=translation[char];
  }

  return trans;

};
// function translatePROT(sequence){
//
// };
