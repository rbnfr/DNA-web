$('.submit-button').click(function() {
  var sequence = $('form.sequence').text();
  var type = $('form.radio').val();
  if (type == "RNA") {
    var trans = translateRNA(sequence);
    $('form.result').text(trans);
  }
  else if (type == "Protein") {
    var trans = translatePROT(sequence);
    $('form.result').text(trans);
  }
});

function translateRNA(sequence){
  
};
function translatePROT(sequence){

};
