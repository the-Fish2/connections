const tilesContainer = document.querySelector('#tilesContainer')
let TILES_PER_ROW = 4;

const inputDataManager = new InputDataManager(tilesContainer);
inputDataManager._buildForm();

const r = document.querySelector(':root');
r.style.setProperty('--tiles-per-row', TILES_PER_ROW);

/* NEXT STEPS: 
6) set up flexible dimensions
1) DONE - set up data manager to make OOP a bit better
2) DONE - clear bars on resubmit
4) DONE - randomize tile placement (as it stands the game is not very hard...)
5) store previous connections - static database that i only push to
*/