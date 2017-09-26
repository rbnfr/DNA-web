$('.submit-button').click(function() {
  var sequence = document.forms["conversor"][1].value;
  var type = $('input[name="type"]:checked').val();
  var mutate = $('input[name="mutation"]:checked').val();
  var frequency = $('input[name="freq"]').val();




  if (type == "RNA") {
    var trans = translateRNA(sequence, mutate, frequency);
    $('.result1').val(trans);
  }
  else if (type == "Protein") {
    var protein = translatePROT(sequence, mutate, frequency);
    var letters = protein[0];
    var chain = protein[1];
    $('.result1').val(letters);
    $('.result2').val(chain);
    }
});

// function getSequence() {
//   return document.forms["conversor"][1].value;
//
// var form = document.forms["conversor"];
// var seq = form[1].value;
// return seq;
// }

function translateRNA(sequence, mutate, frequency){
  var translation = {
    'A':'U',
    'T':'A',
    'C':'G',
    'G':'C'
  }

  var seq = sequence.toUpperCase().replace(/\s/g, '');
  var i;
  var trans = "";
  $('#seq-id').val(seq);

  for (var i = 0; i < seq.length; i++) {
    var char = seq.substring(i, i+1);
    if (translation[char] === undefined) {
      alert("Unrecognized base at position " + i + " : " + char);
    }
    else {
      trans+=translation[char];
    }

  }


  if (mutate == "Yes" && frequency && 0!= frequency) {
    var chars = ["A","U","C","G"];
    var freq_per = 100/frequency;
    var freq =(Math.floor(Math.random()*freq_per));

    for (var i = 0; i < sequence.length; i = i + (Math.floor(Math.random()*freq))+1 ) {
      var char = chars[Math.floor((Math.random() * chars.length))];
      trans=trans.replaceAt(i, char);
    }

    return trans;

    // return mutate(seq, frequency);
  }

  else {
    return trans;
  }

}

// function mutate(sequence, frequency){
//   var chars = ["A","U","C","G"];
//   var freq_per = 100/frequency;
//   var freq =(Math.floor(Math.random()*freq_per));
//
//   for (var i = 0; i < sequence.length; i = i + (Math.floor(Math.random()*freq))+1 ) {
//     var char = chars[Math.floor((Math.random() * chars.length))];
//     sequence=sequence.replaceAt(i, char);
//   }
//
//   return sequence;
// }

String.prototype.replaceAt=function(index, replacement) {
    return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
}

function translatePROT(sequence, mutate, frequency){
  var protein = "";
  var chain = ""
  var i;
  var sequence = sequence.toUpperCase().replace(/\s/g, '');
  $('#seq-id').val(sequence);

  if (mutate == "Yes" && frequency && 0!= frequency) {
    var chars = ["A","T","C","G"];
    var freq_per = 100/frequency;
    var freq =(Math.floor(Math.random()*freq_per));

    for (var i = 0; i < sequence.length; i = i + (Math.floor(Math.random()*freq))+1 ) {
      var char = chars[Math.floor((Math.random() * chars.length))];
      sequence=sequence.replaceAt(i, char);
    }
  }

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
    else {alert("Unrecognized codon starting at position " + i + " : " + codon);}
  }

  return [protein, chain];
}
