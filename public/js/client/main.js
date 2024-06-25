const tilesContainer = document.querySelector('#tilesContainer')
let TILES_PER_ROW = 4;

const inputDataManager = new InputDataManager(tilesContainer);
inputDataManager._buildForm();

