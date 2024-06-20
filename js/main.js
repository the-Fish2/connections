const tilesContainer = document.querySelector('#tilesContainer')
const words = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p']
const answer_key = [['a', 'b', 'c', 'd'], ['e', 'f', 'g', 'h'], ['i', 'j', 'k', 'l'], ['m', 'n', 'o', 'p']]
const TILES_PER_ROW = 4;

const tileSet = new TileSet(tilesContainer, words, answer_key)
tileSet.makeTiles();

// NEXT STEPS: input form for words + dimensions to create customizable connections
// little animations to top of screen + hidden elements that have the actual connections sets
//those can be their own elements that get revealed when these are gone