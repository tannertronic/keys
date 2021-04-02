//initialize notes, scales
const rootNotes = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
const majorScale = [2, 2, 1, 2, 2, 2, 1];
const minorScale = [2, 1, 2, 2, 1, 2, 2];

//grab nodes
let stringCountContainer = document.getElementById('string-count');
let fretCountContainer = document.getElementById('fret-count');
let openFretsContainer = document.getElementById('strings-open');
let fretboardContainer = document.getElementById('fretboard');

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
    renderTuningDrop();
    renderFretboard();
}

function stringCountUp(){
    let stringCount = stringCountContainer.innerHTML;
    stringCount++;
    stringCountContainer.innerHTML = stringCount;
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

//render string tuning dropdown on changing string count
function renderTuningDrop(){

    //last step re-render fretboard with new string count
    //renderFretboard(); //shouldn't need this now since i'm calling renderFretboard in stringCountDown/Up
}

//apply key marks- loop through frets and mark as active/marked
    //if align with selected key
function markFrets(){

}

//render fretboard- will be called on any change trigger and on init
function renderFretboard(){
    console.log('called renderFretboard');
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

renderFretboard();