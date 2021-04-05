//initialize notes, scales
const rootNotes = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
const rootNotesObj = [
    {sharp: 'A', flat: 'A'},
    {sharp: 'A♯', flat: 'B♭'},
    {sharp: 'B', flat: 'B'},
    {sharp: 'C', flat: 'C'},
    {sharp: 'C♯', flat: 'D♭'},
    {sharp: 'D', flat: 'D'},
    {sharp: 'D♯', flat: 'E♭'},
    {sharp: 'E', flat: 'E'},
    {sharp: 'F', flat: 'F'},
    {sharp: 'F♯', flat: 'G♭'},
    {sharp: 'G', flat: 'G'},
    {sharp: 'G♯', flat: 'A♭'}
];

let sharp = true;

const majorScale = [2, 2, 1, 2, 2, 2, 1];
const minorScale = [2, 1, 2, 2, 1, 2, 2];
//init tuning
let tuning = ['E', 'A', 'D', 'G'];

//grab nodes
const stringCountContainer = document.getElementById('string-count');
const fretCountContainer = document.getElementById('fret-count');
const openFretsContainer = document.getElementById('strings-open');
const fretboardContainer = document.getElementById('fretboard');
const tuningWrapperContainer = document.getElementById('tuning-wrapper');
const tuningDropContainer = document.getElementById('tuning-drop');

//toggles for settings slideouts
document.getElementById('key-wrapper').addEventListener('click', () => {
    document.getElementById('container').classList.toggle('key-drop--open');
});
document.getElementById('tuning-wrapper').addEventListener('click', () => {
    document.getElementById('container').classList.toggle('tuning-drop--open');
});

//tie functions (defined further down) to buttons
document.getElementById('string-count-down').addEventListener('click', stringCountDown);
document.getElementById('string-count-up').addEventListener('click', stringCountUp);
document.getElementById('fret-count-down').addEventListener('click', fretCountDown);
document.getElementById('fret-count-up').addEventListener('click', fretCountUp);

function stringCountDown(){
    let stringCount = stringCountContainer.innerHTML;
    stringCount--;
    stringCountContainer.innerHTML = stringCount;
    tuning.pop();
    renderTuningDrop();
    renderFretboard();
}

function stringCountUp(){
    let stringCount = stringCountContainer.innerHTML;
    stringCount++;
    stringCountContainer.innerHTML = stringCount;
    tuning.push('E');
    renderTuningDrop();
    renderFretboard();
}

function fretCountDown(){
    let fretCount = fretCountContainer.innerHTML;
    fretCount--;
    fretCountContainer.innerHTML = fretCount;
    renderFretboard();
}

function fretCountUp(){
    let fretCount = fretCountContainer.innerHTML;
    fretCount++;
    fretCountContainer.innerHTML = fretCount;
    renderFretboard();
}

//update tuning array
function updateTuning(){
    let stringContainers = tuningDropContainer.children;
    let tempArr = [];
    for (let i = 0; i < stringContainers.length; i++){
        tempArr.unshift(stringContainers[i].querySelector('.string-note').innerHTML);
    }
    tuning = tempArr;
}

//render string tuning dropdown on changing string count
function renderTuningDrop(){
    let stringCount = +stringCountContainer.innerHTML;
    tuningDropContainer.innerHTML = '';
    let node;
    for (let i = 1; i <= stringCount; i++){
        node = document.createElement('div');
        node.classList.add('tuning-string');
        node.setAttribute('id', 'string' + i);
        node.innerHTML = `
        <span class="string-tuning-count">${i}</span>
        <span id="tune-down-${i}"><i class="fas fa-caret-left fa-lg"></i></span>
        <span class="string-note">${tuning[i - 1]}</span>
        <span id="tune-up-${i}"><i class="fas fa-caret-right fa-lg"></i></span>
        `
        tuningDropContainer.prepend(node);

        //tie functionality to tune-down/tune-up
        document.getElementById('tune-down-' + i).addEventListener('click', tuneDown);
        document.getElementById('tune-up-' + i).addEventListener('click', tuneUp);
    }

    //also update view in tuning-wrapper
    updateTuningView();

    //last step re-render fretboard with new string count
    //renderFretboard(); //shouldn't need this now since i'm calling renderFretboard in stringCountDown/Up
}

function updateTuningView(){
    tuningWrapperContainer.querySelector('.info').innerHTML = tuning.join('');
}

function tuneDown(e){
    let stringNoteContainer = e.target.closest('.tuning-string').querySelector('.string-note');
    let originalNote = stringNoteContainer.innerHTML;
    let newNote = rootNoteDown(originalNote);
    stringNoteContainer.innerHTML = newNote;
    updateTuning();
    updateTuningView();
}

function tuneUp(e){
    let stringNoteContainer = e.target.closest('.tuning-string').querySelector('.string-note');
    let originalNote = stringNoteContainer.innerHTML;
    let newNote = rootNoteUp(originalNote);
    stringNoteContainer.innerHTML = newNote;
    updateTuning();
    updateTuningView();
}

function rootNoteDown(note){
    let index;
    let newIndex;
    for (let i = 0; i < rootNotesObj.length; i++){
        if (note === rootNotesObj[i].sharp || note === rootNotesObj[i].flat){
            index = i;
            break;
        }
    }
    if (index === 0){
        newIndex = rootNotesObj.length - 1;
    } else {
        newIndex = index - 1;
    }
    if (sharp){
        return rootNotesObj[newIndex].sharp;
    } else {
        return rootNotesObj[newIndex].flat;
    }
}

function rootNoteUp(note){
    let index;
    let newIndex;
    for (let i = 0; i < rootNotesObj.length; i++){
        if (note === rootNotesObj[i].sharp || note === rootNotesObj[i].flat){
            index = i;
            break;
        }
    }
    if (index === rootNotesObj.length - 1){
        newIndex = 0;
    } else {
        newIndex = index + 1;
    }
    if (sharp){
        return rootNotesObj[newIndex].sharp;
    } else {
        return rootNotesObj[newIndex].flat;
    }
}

//apply key marks- loop through frets and mark as active/marked
    //if align with selected key
function markFrets(){

}

//render fretboard- will be called on any change trigger and on init
function renderFretboard(){
    //console.log('called renderFretboard');
    //get settings
    let stringCount = +stringCountContainer.innerHTML;
    let fretCount = +fretCountContainer.innerHTML;

    //clear fretboard containers
    openFretsContainer.innerHTML = '';
    fretboardContainer.innerHTML = '';

    //build frets
    //open frets first separately
    let note;
    for (let i = 1; i <= stringCount; i++){
        note = document.createElement('div');
        note.classList.add('note', 'open');
        //note.setAttribute('id', 'string' + i + '-fret0');
        note.dataset.string = i;
        note.dataset.fret = 0;
        openFretsContainer.prepend(note);
    }

    //generate and add rest of frets according to settings
    let fret;
    let spacer;
    for (let i = 1; i <= fretCount; i++){
        fret = document.createElement('div');
        fret.classList.add('fret');
        let spacerBottom = document.createElement('div');
        spacerBottom.classList.add('spacer', 'bottom');
        fretboardContainer.append(fret);
        fret.prepend(spacerBottom);
        for (let j = 1; j <= stringCount; j++){
            spacer = document.createElement('div');
            spacer.classList.add('spacer');
            note = document.createElement('div');
            note.classList.add('note');
            note.dataset.string = j;
            note.dataset.fret = i;
            fret.prepend(note);
            fret.prepend(spacer);
        }
    }

    //call apply key marks here
    markFrets();

}

renderTuningDrop();
renderFretboard();