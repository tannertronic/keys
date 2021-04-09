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
let rootNote = 'E';
let scaleType = 'major';

const majorScale = [2, 2, 1, 2, 2, 2];
const minorScale = [2, 1, 2, 2, 1, 2];
//init tuning
let tuning = ['E', 'A', 'D', 'G'];

//grab nodes
const stringCountContainer = document.getElementById('string-count');
const fretCountContainer = document.getElementById('fret-count');
const openFretsContainer = document.getElementById('strings-open');
const fretboardContainer = document.getElementById('fretboard');
const tuningWrapperContainer = document.getElementById('tuning-wrapper');
const tuningDropContainer = document.getElementById('tuning-drop');
const rootNoteContainer = document.getElementById('root-note');
const keyWrapperContainer = document.getElementById('key-wrapper');

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
document.getElementById('root-note-down').addEventListener('click', changeRootDown);
document.getElementById('root-note-up').addEventListener('click', changeRootUp);

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

function updateKeyView(){
    keyWrapperContainer.querySelector('.info').innerHTML = rootNote + ' ' + scaleType;
}

function tuneDown(e){
    let stringNoteContainer = e.target.closest('.tuning-string').querySelector('.string-note');
    let originalNote = stringNoteContainer.innerHTML;
    console.log(originalNote);
    let newNote = rootNoteDown(originalNote);
    stringNoteContainer.innerHTML = newNote;
    updateTuning();
    updateTuningView();
    renderFretboard();
}

function tuneUp(e){
    let stringNoteContainer = e.target.closest('.tuning-string').querySelector('.string-note');
    let originalNote = stringNoteContainer.innerHTML;
    let newNote = rootNoteUp(originalNote);
    stringNoteContainer.innerHTML = newNote;
    updateTuning();
    updateTuningView();
    renderFretboard();
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

function changeRootDown(){
    let note = rootNoteContainer.innerHTML;
    let newNote = rootNoteDown(note);
    rootNoteContainer.innerHTML = newNote;
    rootNote = newNote;
    updateKeyView();
    renderFretboard();
}

function changeRootUp(){
    let note = rootNoteContainer.innerHTML;
    let newNote = rootNoteUp(note);
    rootNoteContainer.innerHTML = newNote;
    rootNote = newNote;
    updateKeyView();
    renderFretboard();
}

//apply key marks- loop through frets and mark as active/marked
    //if align with selected key
function markFrets(){
    //create new array with notes in current scale
    let intervals;
    let scaleNotes = [];
    if (scaleType === 'major'){
        intervals = majorScale;
    } else if (scaleType === 'minor'){
        intervals = minorScale;
    }
    scaleNotes.push(rootNote);
    let nextNote = rootNote;
    for (let i = 0; i < intervals.length; i++){
        for (let j = 0; j < intervals[i]; j++){
            nextNote = rootNoteUp(nextNote);
        }
        scaleNotes.push(nextNote);
    }

    //loop through all notes on fretboard
    let fretboardNotes = document.querySelectorAll('.note');
    for (let i = 0; i < fretboardNotes.length; i++){
        fretboardNotes[i].classList.remove('marked');
        let currentNote = fretboardNotes[i].dataset.note;
        //if match to a note in current scale, mark
        if (scaleNotes.includes(currentNote)){
            fretboardNotes[i].classList.add('marked');
        }
    }
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

    //init string notes
    //let stringNotes = tuningWrapperContainer.querySelector('.info').innerHTML.split('');
    //instead of just splitting string from tuningWrapperContainer, grab individually from tuningDrop
    //prevents splitting G# to G,#
    let stringNotes = [];
    let strings = document.querySelectorAll('.string-note');
    for (let i = 0; i < strings.length; i++){
        stringNotes.unshift(strings[i].innerHTML);
    }

    //build frets
    //open frets first separately
    let note;
    for (let i = 1; i <= stringCount; i++){
        note = document.createElement('div');
        note.classList.add('note', 'open');
        //note.setAttribute('id', 'string' + i + '-fret0');
        note.dataset.string = i;
        note.dataset.fret = 0;
        note.dataset.note = stringNotes[i - 1];
        openFretsContainer.prepend(note);
    }

    //generate and add rest of frets according to settings
    let fret;
    let spacer;
    let dot = '<div class="dot"></div>';
    let fretChildren;
    for (let i = 1; i <= fretCount; i++){
        //shift stringNotes up 1 step each time we move to a new fret
        for (let s = 0; s < stringNotes.length; s++){
            let stringNote = rootNoteUp(stringNotes[s]);
            stringNotes[s] = stringNote;
        }
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
            note.dataset.note = stringNotes[j - 1];
            fret.prepend(note);
            fret.prepend(spacer);
        }
        //apply fretboard dots
        if (i === 12 || i === 24){
            fretChildren = fret.children;
            fretChildren[stringCount - 1].innerHTML = dot;
            fretChildren[stringCount + 1].innerHTML = dot;
        } else if (i === 3 || i === 5 || i === 7 || i === 9 || i === 15 || i === 17 || i === 19 || i === 21){
            fretChildren = fret.children;
            fretChildren[stringCount].innerHTML = dot;
        }
    }

    //call apply key marks here
    markFrets();

}

renderTuningDrop();
renderFretboard();