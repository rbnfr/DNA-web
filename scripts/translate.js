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
    if (codon = (/A*/i)) { protein+='A' }
    else if (codon == 'TTT') { protein+='T' }

    // if        ( codon =~ (/GC./i))        { protein += 'A'; }    # Alanine
    //   else if ( codon =~ (/TG[TC]/i))     { protein += 'C'; }    # Cysteine
    //   else if ( codon =~ (/GA[TC]/i))     { protein += 'D'; }    # Aspartic Acid
    //   else if ( codon =~ (/GA[AG]/i))     { protein += 'E'; }    # Glutamic Acid
    //   else if ( codon =~ (/TT[TC]/i))     { protein += 'F'; }    # Phenylalanine
    //   else if ( codon =~ (/GG./i))        { protein += 'G'; }    # Glycine
    //   else if ( codon =~ (/CA[TC]/i))     { protein += 'H'; }    # Histidine
    //   else if ( codon =~ (/AT[TCA]/i))    { protein += 'I'; }    # Isoleucine
    //   else if ( codon =~ (/AA[AG]/i))     { protein += 'K'; }    # Lysine
    //   else if ( codon =~ (/TT[AG]|CT./i)) { protein += 'L'; }    # Leucine
    //   else if ( codon =~ (/ATG/i))        { protein += 'M'; }    # Methionine
    //   else if ( codon =~ (/AA[TC]/i))     { protein += 'N'; }    # Asparagine
    //   else if ( codon =~ (/CC./i))        { protein += 'P'; }    # Proline
    //   else if ( codon =~ (/CA[AG]/i))     { protein += 'Q'; }    # Glutamine
    //   else if ( codon =~ (/CG.|AG[AG]/i)) { protein += 'R'; }    # Arginine
    //   else if ( codon =~ (/TC.|AG[TC]/i)) { protein += 'S'; }    # Serine
    //   else if ( codon =~ (/AC./i))        { protein += 'T'; }    # Threonine
    //   else if ( codon =~ (/GT./i))        { protein += 'V'; }    # Valine
    //   else if ( codon =~ (/TGG/i))        { protein += 'W'; }    # Tryptophan
    //   else if ( codon =~ (/TA[TC]/i))     { protein += 'Y'; }    # Tyrosine
    //   else if ( codon =~ (/TA[AG]|TGA/i)) { protein += '_'; }    # Stop
    //   else {alert("[-El codon introducido no se corresponde con ningun aminoacido]-");
    // }
  }

  return protein;
}
