const tilesContainer = document.querySelector('#tilesContainer')
let TILES_PER_ROW = 4;

const inputDataManager = new InputDataManager(tilesContainer);
inputDataManager._buildForm();


/* NEXT STEPS: 
5) DONE - set up flexible dimensions
6) DONE - add words to bars (basically just cleaning it up to make it more like connections)
7) add in title feature (for future links)
8) allow un-click for buttons
1) DONE - set up data manager to make OOP a bit better
2) DONE - clear bars on resubmit
4) DONE - randomize tile placement (as it stands the game is not very hard...)
10) store previous connections - static database that i only push to
9) container-ize kinda - have different sections for form submit, play connections, past games
*/