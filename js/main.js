const tilesContainer = document.querySelector('#tilesContainer')
const words = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p']
const answer_key = [['a', 'b', 'c', 'd'], ['e', 'f', 'g', 'h'], ['i', 'j', 'k', 'l'], ['m', 'n', 'o', 'p']]
const TILES_PER_ROW = 4;

const tileSet = new TileSet(tilesContainer, words, answer_key)
tileSet.makeTiles();