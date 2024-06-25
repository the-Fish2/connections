const tilesContainer = document.querySelector('#tilesContainer')
let TILES_PER_ROW = 4;

const inputDataManager = new InputDataManager(tilesContainer);
inputDataManager._buildForm();


/* NEXT STEPS: 
5) DONE - set up flexible dimensions
6) add in title feature (for future links), add words to bars (basically just cleaning it up to make it more like connections)
1) DONE - set up data manager to make OOP a bit better
2) DONE - clear bars on resubmit
4) DONE - randomize tile placement (as it stands the game is not very hard...)
6) store previous connections - static database that i only push to
7) make pretty like title :)
*/