$('.submit-button').click(function() {
  var sequence = document.forms["conversor"][1].value;
  var type = $('input[name="type"]:checked').val();
  var mutate = $('input[name="mutation"]:checked').val();
  var frequency = $('input[name="freq"]').val();

  if (type == "RNA") {
    var before = new Date().getTime();
    var trans = translateRNA(sequence, mutate, frequency);
    var after = new Date().getTime();
    var duration = after-before;
    $('.result1').val(trans);
    $('#time').text(duration+' miliseconds');
  }
  else if (type == "Protein") {
    var before = new Date().getTime();
    var protein = translatePROT(sequence, mutate, frequency);
    var after = new Date().getTime();
    var duration = after-before;
    var letters = protein[0];
    var chain = protein[1];
    var three_letter = protein[2];
    $('.result1').val(letters);
    $('.result2').val(chain);
    $('.result3').val(three_letter);
    $('#time').text(duration+' miliseconds');
    }
});


// $('#save-button').click(function() {
//   var translation_text = "RNA sequence: " + $('#seq-id').val();
//   var blob = new Blob([translation_text+'/nTest'], {type: "text/plain;charset=utf-8"});
//   saveAs(blob, "Translation.txt");
// });

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
  var chain = "";
  var three_letter = "";
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

    if      ( /GC./i.test(codon))        { protein += 'A'; chain += 'Alanine'+'-';       three_letter += "Ala-"} //Alanine
    else if ( /TG[TC]/i.test(codon))     { protein += 'C'; chain += 'Cysteine'+'-';      three_letter += "Cys-"} // Cysteine
    else if ( /GA[TC]/i.test(codon))     { protein += 'D'; chain += 'Aspartic_Acid'+'-'; three_letter += "Asx-"} // Aspartic Acid
    else if ( /GA[AG]/i.test(codon))     { protein += 'E'; chain += 'Glutamic_Acid'+'-'; three_letter += "Glx-"} // Glutamic Acid
    else if ( /TT[TC]/i.test(codon))     { protein += 'F'; chain += 'Phenylalanine'+'-'; three_letter += "Phe-"} // Phenylalanine
    else if ( /GG./i.test(codon))        { protein += 'G'; chain += 'Glycine'+'-';       three_letter += "Gly-"} // Glycine
    else if ( /CA[TC]/i.test(codon))     { protein += 'H'; chain += 'Histidine'+'-';     three_letter += "His-"} // Histidine
    else if ( /AT[TCA]/i.test(codon))    { protein += 'I'; chain += 'Isoleucine'+'-';    three_letter += "Ile-"} // Isoleucine
    else if ( /AA[AG]/i.test(codon))     { protein += 'K'; chain += 'Lysine'+'-';        three_letter += "Lys-"} // Lysine
    else if ( /TT[AG]|CT./i.test(codon)) { protein += 'L'; chain += 'Leucine'+'-';       three_letter += "Leu-"} // Leucine
    else if ( /ATG/i.test(codon))        { protein += 'M'; chain += 'Methionine'+'-';    three_letter += "Met-"} // Methionine
    else if ( /AA[TC]/i.test(codon))     { protein += 'N'; chain += 'Asparagine'+'-';    three_letter += "Asn-"} // Asparagine
    else if ( /CC./i.test(codon))        { protein += 'P'; chain += 'Proline'+'-';       three_letter += "Pro-"} // Proline
    else if ( /CA[AG]/i.test(codon))     { protein += 'Q'; chain += 'Glutamine'+'-';     three_letter += "Gln-"} // Glutamine
    else if ( /CG.|AG[AG]/i.test(codon)) { protein += 'R'; chain += 'Arginine'+'-';      three_letter += "Arg-"} // Arginine
    else if ( /TC.|AG[TC]/i.test(codon)) { protein += 'S'; chain += 'Serine'+'-';        three_letter += "Ser-"} // Serine
    else if ( /AC./i.test(codon))        { protein += 'T'; chain += 'Threonine'+'-';     three_letter += "Thr-"} // Threonine
    else if ( /GT./i.test(codon))        { protein += 'V'; chain += 'Valine'+'-';        three_letter += "Val-"} // Valine
    else if ( /TGG/i.test(codon))        { protein += 'W'; chain += 'Tryptophan'+'-';    three_letter += "Trp-"} // Tryptophan
    else if ( /TA[TC]/i.test(codon))     { protein += 'Y'; chain += 'Tyrosine'+'-';      three_letter += "Tyr-"} // Tyrosine
    else if ( /TA[AG]|TGA/i.test(codon)) { protein += '_'; chain += 'STOP'+'-';          three_letter += "STOP-"}// Stop
    else {alert("Unrecognized codon starting at position " + i + " : " + codon);}
  }

  return [protein, chain, three_letter];
}
