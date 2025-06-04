function $(id){return document.getElementById(id);}

function createSequence(size){
    const chars=['A','T','C','G'];
    let seq='';
    for(let i=0;i<size;i++) seq+=chars[Math.floor(Math.random()*chars.length)];
    return seq;
}

function generate(){
    const len=parseInt($('seq_length').value)||Math.floor(Math.random()*1000)+3;
    const seq=createSequence(len);
    $('seq-id').value=seq;
    $('length-meter').textContent='Length: '+seq.length;
}

function clearAll(){
    $('seq-id').value='';
    $('seq-id1').value='';
    $('seq-id2').value='';
    $('seq-id3').value='';
    $('seq_length').value='';
    $('length').textContent='';
    $('mass').textContent='';
    $('pI').textContent='';
    $('charge').textContent='';
    $('hydrophobicity').textContent='';
}

async function translate(){
    const sequence=$('seq-id').value;
    const type=$('conversion_type').value;
    const mutate=$('mutation_switch').checked;
    const freq=parseFloat($('freq').value)||0;
    if(!sequence){alert('Insert sequence first!');return;}
    if(!type){alert('Select a translation type!');return;}
    const body={sequence,type,mutate,frequency:freq};
    const res=await fetch('/api/translate',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});
    const data=await res.json();
    if(type==='RNA'){
        $('seq-id1').value=data.rna;
    }else{
        $('seq-id1').value=data.letters;
        $('seq-id2').value=data.names;
        $('seq-id3').value=data.three;
        const p=data.properties;
        if(p){
            $('length').textContent=p.length;
            $('mass').textContent=p.mass+' amu';
            $('pI').textContent=p.pI;
            $('charge').textContent=p.charge;
            $('hydrophobicity').textContent=p.hydrophobicity;
        }
    }
}

document.addEventListener('DOMContentLoaded',()=>{
    $('generator').addEventListener('click',generate);
    $('cleaner').addEventListener('click',clearAll);
    $('submit-button').addEventListener('click',translate);
    $('mutation_switch').addEventListener('change',()=>{
        $('freq').disabled=!$('mutation_switch').checked;
    });
});
