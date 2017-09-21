$('.submit-button').click(function() {
  var sequence = getSequence();
  var type = $('input[name="type"]:checked').val();
  if (type == "RNA") {
    var trans = translateRNA(sequence);
    $('.result').val(trans);
  }
  else if (type == "Protein") {
    var protein = translatePROT(sequence);
    var letters = protein[0];
    var chain = protein[1];
    $('.result1').val(letters);
    $('.result2').val(chain);
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
}

function translatePROT(sequence){
  var protein = "";
  var chain = ""
  var i;
  for (var i = 0; i < (sequence.length-2); i=i+3) {
    var codon = sequence.substring(i, i+3);

    if      ( /GC./i.test(codon))        { protein += 'A'; chain += 'Alanine'+'-'; }         //Alanine
    else if ( /TG[TC]/i.test(codon))     { protein += 'C'; chain += 'Cysteine'+'-';}         // Cysteine
    else if ( /GA[TC]/i.test(codon))     { protein += 'D'; chain += 'Aspartic_Acid'+'-';}    // Aspartic Acid
    else if ( /GA[AG]/i.test(codon))     { protein += 'E'; chain += 'Glutamic_Acid'+'-';}    // Glutamic Acid
    else if ( /TT[TC]/i.test(codon))     { protein += 'F'; chain += 'Phenylalanine'+'-';}    // Phenylalanine
    else if ( /GG./i.test(codon))        { protein += 'G'; chain += 'Glycine'+'-';}          // Glycine
    else if ( /CA[TC]/i.test(codon))     { protein += 'H'; chain += 'Histidine'+'-';}        // Histidine
    else if ( /AT[TCA]/i.test(codon))    { protein += 'I'; chain += 'Isoleucine'+'-';}       // Isoleucine
    else if ( /AA[AG]/i.test(codon))     { protein += 'K'; chain += 'Lysine'+'-';}           // Lysine
    else if ( /TT[AG]|CT./i.test(codon)) { protein += 'L'; chain += 'Leucine'+'-';}          // Leucine
    else if ( /ATG/i.test(codon))        { protein += 'M'; chain += 'Methionine'+'-';}       // Methionine
    else if ( /AA[TC]/i.test(codon))     { protein += 'N'; chain += 'Asparagine'+'-';}       // Asparagine
    else if ( /CC./i.test(codon))        { protein += 'P'; chain += 'Proline'+'-';}          // Proline
    else if ( /CA[AG]/i.test(codon))     { protein += 'Q'; chain += 'Glutamine'+'-';}        // Glutamine
    else if ( /CG.|AG[AG]/i.test(codon)) { protein += 'R'; chain += 'Arginine'+'-';}         // Arginine
    else if ( /TC.|AG[TC]/i.test(codon)) { protein += 'S'; chain += 'Serine'+'-';}           // Serine
    else if ( /AC./i.test(codon))        { protein += 'T'; chain += 'Threonine'+'-';}        // Threonine
    else if ( /GT./i.test(codon))        { protein += 'V'; chain += 'Valine'+'-';}           // Valine
    else if ( /TGG/i.test(codon))        { protein += 'W'; chain += 'Tryptophan'+'-';}       // Tryptophan
    else if ( /TA[TC]/i.test(codon))     { protein += 'Y'; chain += 'Tyrosine'+'-';}         // Tyrosine
    else if ( /TA[AG]|TGA/i.test(codon)) { protein += '_'; chain += 'STOP'+'-';}             // Stop
    else {alert("[-El codon introducido no se corresponde con ningun aminoacido]-");}
  }

  return [protein, chain];
}
