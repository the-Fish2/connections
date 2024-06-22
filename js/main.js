const tilesContainer = document.querySelector('#tilesContainer')

const form = document.querySelector('#connectionsGenerate')
const inputData = new InputData(tilesContainer, form)

let TILES_PER_ROW = 4;

const r = document.querySelector(':root');
r.style.setProperty('--tiles-per-row', TILES_PER_ROW);

/* NEXT STEPS: 
3) set up flexible dimensions
1) set up data manager to make OOP a bit better
2) clear bars on resubmit
4) randomize tile placement (as it stands the game is not very hard...)
5) store previous connections - static database that i only push to
*/