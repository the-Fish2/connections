const tilesContainer = document.querySelector('#tilesContainer')
let correctMatchups = {0: "lightyellow", 1:"lightgreen", 2:"lightblue", 3:"mediumpurple", 4:"lightcoral"}
let userInfo = document.querySelector('#userInfo')
let TILES_PER_ROW = 4;

const inputDataManager = new InputDataManager(tilesContainer);
inputDataManager._buildForm();

