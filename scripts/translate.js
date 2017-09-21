$('.submit-button').click(function() {
  // alert("Try again");
  // alert("First line");
  var sequence = getSequence();
  // alert(sequence);
  var type = $('input[name="type"]:checked').val();
  // alert(type);
  if (type == "RNA") {
    var trans = translateRNA(sequence);
    // alert("RNA");
    $('.result').val(trans);
  }
  else if (type == "Protein") {
    alert("Protein");
    var protein = translatePROT(sequence);
    $('.result').val(protein);
    }
});

function getSequence() {
  var form = document.forms["conversor"];
  var seq = form[1].value;
  return seq;
}

function translateRNA(sequence){
  // alert("Begin translateRNA");
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
}

function translatePROT(sequence){
  var protein = "";
  var i;
  alert("Bucle");
  for (var i = 0; i < (sequence.length-2); i=i+3) {
    var codon = sequence.substring(i, i+3);
    // alert(codon);
    // if (codon = (/A*/i)) { protein+='A' }
    // else if (codon == 'TTT') { protein+='T' }
    // alert(codon.match(/GC./i));
    // var match = codon.match(/GC./i);

    if      ( /GC./i.test(codon))        { protein += 'A'; }    //Alanine    
    else if ( /TG[TC]/i.test(codon))     { protein += 'C'; }    // Cysteine
    else if ( /GA[TC]/i.test(codon))     { protein += 'D'; }    // Aspartic Acid
    else if ( /GA[AG]/i.test(codon))     { protein += 'E'; }    // Glutamic Acid
    else if ( /TT[TC]/i.test(codon))     { protein += 'F'; }    // Phenylalanine
    else if ( /GG./i.test(codon))        { protein += 'G'; }    // Glycine
    else if ( /CA[TC]/i.test(codon))     { protein += 'H'; }    // Histidine
    else if ( /AT[TCA]/i.test(codon))    { protein += 'I'; }    // Isoleucine
    else if ( /AA[AG]/i.test(codon))     { protein += 'K'; }    // Lysine
    else if ( /TT[AG]|CT./i.test(codon)) { protein += 'L'; }    // Leucine
    else if ( /ATG/i.test(codon))        { protein += 'M'; }    // Methionine
    else if ( /AA[TC]/i.test(codon))     { protein += 'N'; }    // Asparagine
    else if ( /CC./i.test(codon))        { protein += 'P'; }    // Proline
    else if ( /CA[AG]/i.test(codon))     { protein += 'Q'; }    // Glutamine
    else if ( /CG.|AG[AG]/i.test(codon)) { protein += 'R'; }    // Arginine
    else if ( /TC.|AG[TC]/i.test(codon)) { protein += 'S'; }    // Serine
    else if ( /AC./i.test(codon))        { protein += 'T'; }    // Threonine
    else if ( /GT./i.test(codon))        { protein += 'V'; }    // Valine
    else if ( /TGG/i.test(codon))        { protein += 'W'; }    // Tryptophan
    else if ( /TA[TC]/i.test(codon))     { protein += 'Y'; }    // Tyrosine
    else if ( /TA[AG]|TGA/i.test(codon)) { protein += '_'; }    // Stop
    else {alert("[-El codon introducido no se corresponde con ningun aminoacido]-");}
  }

  return protein;
}
