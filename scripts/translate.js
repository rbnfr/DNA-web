$(document).ready(function() {
  $('select').material_select();

  $('.submit-button').click(function() {
    var sequence = document.forms["conversor"][1].value;
    var type = $('select').val();
    // var mutate = $('input[name="mutation"]:checked').val();
    var mutate = document.getElementById('mutation_switch').checked;
    alert(mutate);
    var frequency = $('input[name="freq"]').val();

    if (type == "RNA") {
      var before = new Date().getTime();
      var trans = translateRNA(sequence, mutate, frequency);
      var after = new Date().getTime();
      var duration = after-before;
      $('.result1').val(trans);
      $('.result1').trigger('autoresize');
      $('#time').text(duration+' miliseconds');
    }
    else if (type == "Protein") {
      var before = new Date().getTime();
      var protein = translatePROT(sequence, mutate, frequency);

      var letters = protein[0];
      var chain = protein[1];
      var three_letter = protein[2];

      $('.result1').val(letters);
      $('.result1').trigger('autoresize');
      $('.result2').val(chain);
      $('.result2').trigger('autoresize');
      $('.result3').val(three_letter);
      $('.result3').trigger('autoresize');

      ////////////////////////////
      // PROPERTIES             //
      ////////////////////////////
      updateProperties(letters);
      var after = new Date().getTime();
      var duration = after-before;
      $('#time').text(duration+' miliseconds');
      }
      else {
        Materialize.toast('Select a translation type!',2000);
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

      if      ( /GC./i.test(codon))        { protein += 'A'; chain += 'Alanine'+'-|-';       three_letter += "Ala-"} //Alanine
      else if ( /TG[TC]/i.test(codon))     { protein += 'C'; chain += 'Cysteine'+'-|-';      three_letter += "Cys-"} // Cysteine
      else if ( /GA[TC]/i.test(codon))     { protein += 'D'; chain += 'Aspartic_Acid'+'-|-'; three_letter += "Asx-"} // Aspartic Acid
      else if ( /GA[AG]/i.test(codon))     { protein += 'E'; chain += 'Glutamic_Acid'+'-|-'; three_letter += "Glx-"} // Glutamic Acid
      else if ( /TT[TC]/i.test(codon))     { protein += 'F'; chain += 'Phenylalanine'+'-|-'; three_letter += "Phe-"} // Phenylalanine
      else if ( /GG./i.test(codon))        { protein += 'G'; chain += 'Glycine'+'-|-';       three_letter += "Gly-"} // Glycine
      else if ( /CA[TC]/i.test(codon))     { protein += 'H'; chain += 'Histidine'+'-|-';     three_letter += "His-"} // Histidine
      else if ( /AT[TCA]/i.test(codon))    { protein += 'I'; chain += 'Isoleucine'+'-|-';    three_letter += "Ile-"} // Isoleucine
      else if ( /AA[AG]/i.test(codon))     { protein += 'K'; chain += 'Lysine'+'-|-';        three_letter += "Lys-"} // Lysine
      else if ( /TT[AG]|CT./i.test(codon)) { protein += 'L'; chain += 'Leucine'+'-|-';       three_letter += "Leu-"} // Leucine
      else if ( /ATG/i.test(codon))        { protein += 'M'; chain += 'Methionine'+'-|-';    three_letter += "Met-"} // Methionine
      else if ( /AA[TC]/i.test(codon))     { protein += 'N'; chain += 'Asparagine'+'-|-';    three_letter += "Asn-"} // Asparagine
      else if ( /CC./i.test(codon))        { protein += 'P'; chain += 'Proline'+'-|-';       three_letter += "Pro-"} // Proline
      else if ( /CA[AG]/i.test(codon))     { protein += 'Q'; chain += 'Glutamine'+'-|-';     three_letter += "Gln-"} // Glutamine
      else if ( /CG.|AG[AG]/i.test(codon)) { protein += 'R'; chain += 'Arginine'+'-|-';      three_letter += "Arg-"} // Arginine
      else if ( /TC.|AG[TC]/i.test(codon)) { protein += 'S'; chain += 'Serine'+'-|-';        three_letter += "Ser-"} // Serine
      else if ( /AC./i.test(codon))        { protein += 'T'; chain += 'Threonine'+'-|-';     three_letter += "Thr-"} // Threonine
      else if ( /GT./i.test(codon))        { protein += 'V'; chain += 'Valine'+'-|-';        three_letter += "Val-"} // Valine
      else if ( /TGG/i.test(codon))        { protein += 'W'; chain += 'Tryptophan'+'-|-';    three_letter += "Trp-"} // Tryptophan
      else if ( /TA[TC]/i.test(codon))     { protein += 'Y'; chain += 'Tyrosine'+'-|-';      three_letter += "Tyr-"} // Tyrosine
      else if ( /TA[AG]|TGA/i.test(codon)) { protein += '_'; chain += 'STOP'+'-|-';          three_letter += "STOP-"}// Stop
      else {alert("Unrecognized codon starting at position " + i + " : " + codon);}
    }

    return [protein, chain, three_letter];
  }

  ////////////////////////////////////////////////
  // PROPERTIES                                 //
  ////////////////////////////////////////////////

  /*
    Count each type of amino acid in the sequence.
    Determine the mass, isoelectric point, net charge, hydrophobicity, and extinction coefficient
    All functions here are based or refactored from Thomas Freeman algorythms. Most of them remain unchanged */

  /* Global variables*/
  var seq = "";
  var ec1;
  var ec2;
  var pI;
  var hydrophobicity;
  var mass;
  var charge;
  var rescounts = new Array();
  var aminos = {
      'A':{   '3letter':  'Ala',
        'sc_mass':  15.0234,
        'pk1':      2.35,
        'pk2':      9.87,
        'sc_hphob': 0.5},

      'R':{   '3letter':  'Arg',
        'sc_mass':  100.0873,
        'pk1':      1.82,
        'pk2':      8.99,
        'pk3':      12.48,
        'sc_hphob': 1.81},

      'N':{   '3letter':  'Asn',
        'sc_mass':  58.0292,
        'pk1':      2.14,
        'pk2':      8.72,
        'sc_hphob': 0.85},

      'D':{   '3letter':  'Asp',
        'sc_mass':  59.0132,
        'pk1':      1.99,
        'pk2':      9.9,
        'pk3':      3.9,
        'sc_hphob': 3.64},

      'C':{   '3letter':  'Cys',
        'sc_mass':  46.9955,
        'pk1':      1.92,
        'pk2':      10.7,
        'pk3':      8.3,
        'sc_hphob': -0.02,
        'extco':    125},

      'Q':{   '3letter':  'Gln',
        'sc_mass':  72.0448,
        'pk1':      2.17,
        'pk2':      9.13,
        'sc_hphob': 0.77},

      'E':{   '3letter':  'Glu',
        'sc_mass':  73.0288,
        'pk1':      2.1,
        'pk2':      9.47,
        'pk3':      4.07,
        'sc_hphob': 3.63},

      'G':{   '3letter':  'Gly',
        'sc_mass':  1.0078,
        'pk1':      2.35,
        'pk2':      9.78,
        'sc_hphob': 1.15},

      'H':{   '3letter':  'His',
        'sc_mass':  81.0452,
        'pk1':      1.8,
        'pk2':      9.33,
        'pk3':      6.04,
        'sc_hphob': 2.33},

      'I':{   '3letter':  'Ile',
        'sc_mass':  57.0702,
        'pk1':      2.32,
        'pk2':      9.76,
        'sc_hphob': -1.12},

      'L':{   '3letter':  'Leu',
        'sc_mass':  57.0702,
        'pk1':      2.33,
        'pk2':      9.74,
        'sc_hphob': -1.25},

      'K':{   '3letter':  'Lys',
        'sc_mass':  72.0811,
        'pk1':      2.16,
        'pk2':      9.06,
        'pk3':      10.54,
        'sc_hphob': 2.8},

      'M':{   '3letter':  'Met',
        'sc_mass':  75.0267,
        'pk1':      2.13,
        'pk2':      9.28,
        'sc_hphob': -0.67},

      'F':{   '3letter':  'Phe',
        'sc_mass':  91.0546,
        'pk1':      2.2,
        'pk2':      9.31,
        'sc_hphob': -1.71},

      'P':{   '3letter':  'Pro',
        'sc_mass':  41.039,
        'pk1':      1.95,
        'pk2':      10.64,
        'sc_hphob': 0.14},

      'S':{   '3letter':  'Ser',
        'sc_mass':  31.0183,
        'pk1':      2.19,
        'pk2':      9.21,
        'sc_hphob': 0.46},

      'T':{   '3letter':  'Thr',
        'sc_mass':  45.0339,
        'pk1':      2.09,
        'pk2':      9.1,
        'sc_hphob': 0.25},

      'W':{	'3letter':  'Trp',
        'sc_mass':  130.0655,
        'pk1':      2.46,
        'pk2':      9.41,
        'sc_hphob': -2.09,
        'extco':    5500},

      'Y':{   '3letter':  'Tyr',
        'sc_mass':  107.0495,
        'pk1':      2.2,
        'pk2':      9.21,
        'pk3':      10.07,
        'sc_hphob': -0.71,
        'extco':    1490},

      'V':{   '3letter':  'Val',
        'sc_mass':  43.0546,
        'pk1':      2.39,
        'pk2':      9.74,
        'sc_hphob': -0.46}};

        $('#submit-button').click(function() {

          updateProperties();
        });

  /* Count each type of amino acid in the sequence and store in rescounts */
  function count_aminos(sequence){
    var aminos_list = ['A','R','N','D','C','Q','E','G','H','I','L','K','M','F','P','S','T','W','Y','V'];

    for (var i = 0; i < aminos_list.length; i++) {
      rescounts[aminos_list[i]] = CharCount(sequence, aminos_list[i])
    }
  }


  function CharCount(theString,theChar){
    var result = 0;

    for (var i = 0; i < theString.length; i++) {

      if (theString.charAt(i) == theChar)	{
        result++;
      }

    }

    return result;
  }


  function calcmass(counts) {
    alphamass = 56.0136;
    h2o_mass = 18.0105;
    mass = alphamass*seq.length + h2o_mass;
      for (key in counts) {
        mass += counts[key]*aminos[key]['sc_mass'];
      }

      mass = mass.toFixed(4);
  }


  function calcec(counts) {
    ec2 = counts['W']*aminos['W']['extco'] + counts['Y']*aminos['Y']['extco'] ;
    ec1 = ec2 + cystine_count(counts['C'])*aminos['C']['extco'];
    ec1 = ec1 + " M<sup>-1</sup> * cm<sup>-1</sup>";
    ec2 = ec2 + " M<sup>-1</sup> * cm<sup>-1</sup>";
  }


  function cystine_count(cysteines) {
    return (cysteines-(cysteines%2))/2;
  }


  function calcpi(counts, sequence) {
    first_res = sequence[0];
    last_res = sequence[sequence.length-1];

    acids = {   'C-term': {'count': 1,           'pk':aminos[first_res]['pk1']},
    'D':      {'count': counts['D'], 'pk':aminos['D']['pk3']},
    'E':      {'count': counts['E'], 'pk':aminos['E']['pk3']},
    'C':      {'count': counts['C'], 'pk':aminos['C']['pk3']},
    'Y':      {'count': counts['Y'], 'pk':aminos['Y']['pk3']}};

    bases = {   'N-term': {'count': 1,           'pk':aminos[last_res]['pk2']},
    'K':      {'count': counts['K'], 'pk':aminos['K']['pk3']},
    'R':      {'count': counts['R'], 'pk':aminos['R']['pk3']},
    'H':      {'count': counts['H'], 'pk':aminos['H']['pk3']}};

    for (var pH = 0; pH < 13.99; pH += 0.01) {
      var c = net_charge(acids, bases, pH);
      if (c <= 0) break;
    }

    pI = pH.toFixed(2);
    charge = Math.round(net_charge(acids, bases, 7));
    charge = add_signum(charge);
  }


  function net_charge(a, b, pH) {
    var c = 0;
    for (key in a) {
      if (a[key]['count'] > 0) {
        c += -a[key]['count']/(1 + Math.pow(10, (a[key]['pk']-pH)));
      }
    }

    for (key in b) {
      if (b[key]['count'] > 0) {
        c += b[key]['count']/(1 + Math.pow(10, (pH - b[key]['pk'])));
      }
    }

    c = c.toFixed(3);
    return c;
  }


  function calchphob(counts) {
    hydrophobicity = 7.9;

    for (key in counts) {
      hydrophobicity += counts[key] * aminos[key]['sc_hphob'];
    }
    hydrophobicity = hydrophobicity.toFixed(2);
    hydrophobicity = add_signum(hydrophobicity);
    hydrophobicity = hydrophobicity + " Kcal * mol <sup>-1</sup>";
  }


  function add_signum(x) {
    if (x > 0) { return ("+"+x);}
    else       { return x; }
  }

  function updateProperties(seq) {
    count_aminos(seq);
    console.log("Counting aminoacids: Done");

    calcmass(rescounts);
    console.log("Calculating mass: Done");

    calcpi(rescounts, seq);
    console.log("Calculating isoelectric point: Done");

    calcec(rescounts);
    console.log("Calculating extinction coefficients: Done");

    calchphob(rescounts);
    console.log("Calculating hidrophobicity: Done");

    document.getElementById('length').innerHTML = seq.length;
    document.getElementById('mass').innerHTML = mass + " amu";
    document.getElementById('pI').innerHTML = pI;
    document.getElementById('charge').innerHTML = charge;
    document.getElementById('hydrophobicity').innerHTML = hydrophobicity;
    document.getElementById('extinction1').innerHTML = ec1;
    document.getElementById('extinction2').innerHTML = ec2;
  }
});
