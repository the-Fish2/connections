const tilesContainer = document.querySelector('#tilesContainer')

const form = document.querySelector('#connectionsGenerate')
const inputData = new InputData(tilesContainer, form)

let words = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p']
let answer_key = [['a', 'b', 'c', 'd'], ['e', 'f', 'g', 'h'], ['i', 'j', 'k', 'l'], ['m', 'n', 'o', 'p']]
let TILES_PER_ROW = 4;

const r = document.querySelector(':root');
r.style.setProperty('--tiles-per-row', TILES_PER_ROW);

let tileSet = new TileSet(tilesContainer, words, answer_key)
tileSet.makeTiles();

// NEXT STEPS: input form for words + dimensions to create customizable connections