class TileSet {
    constructor(containerElement, words) {
        this.containerElement = containerElement;
        this.words = words;
        this.wordTiles = [];
        this.clickedWords = [];

        this.makeTiles = this.makeTiles.bind(this)
        this.clickWord = this.clickWord.bind(this)

    }

    makeTiles() {
        let index = 0;  
        for (const word of this.words) {
            this.wordTiles[index] = new Tile(this.containerElement, this.clickWord, word, index)
        }
    }

    clickWord(word) {
        console.log("Clicked" + " " + word)
    }
}