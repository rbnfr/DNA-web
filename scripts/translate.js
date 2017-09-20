$('.submit-button').click(function() {
  var sequence = getSequence();
  //alert(sequence);

  var type = getType();
  alert(type);
  // if (type == "RNA") {
  //   var trans = translateRNA(sequence);
  //   $('form.result').text(trans);
  // }
  // else if (type == "Protein") {
  //   var trans = translatePROT(sequence);
  //   $('form.result').text(trans);
  // }
});
function getSequence() {
  var form = document.forms["conversor"];
  var seq = form[1].value;
  return seq;
}

function getType(){
  var form = document.forms["conversor"];
  var type = form[3].attr('name');
}
// function translateRNA(sequence){
//
//
// };
// function translatePROT(sequence){
//
// };
