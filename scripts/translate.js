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
  var seq = sequence;
  var length = seq.length;
  alert(length);
  var trans = "";
  var i;
  for (var i = 0; i < length; i++) {
    var codon = seq.substring(0,i+3);
    trans += codon;
  }
  return trans;

};
// function translatePROT(sequence){
//
// };
