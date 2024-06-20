class TileSet {
    constructor(containerElement, words, answer_key) {
        this.containerElement = containerElement;
        this.words = words;
        this.answer_key = answer_key;

        this.wordTiles = [];
        this.clickedWords = [];
        this.clickedTiles = [];

        this.makeTiles = this.makeTiles.bind(this)
        this.clickWord = this.clickWord.bind(this)
        this.checkAnswer = this.checkAnswer.bind(this)

    }

    makeTiles() {
        let index = 0;  
        for (const word of this.words) {
            index ++;
            this.wordTiles[index] = new Tile(this.containerElement, this.clickWord, word, index)
        }
    }

    clickWord(thisTile) {
        this.clickedTiles.push(thisTile)
        if (this.clickedWords.push(thisTile.word) === TILES_PER_ROW) {
            this.checkAnswer()
        }
    }

    checkAnswer() {
        this.clickedWords.sort();

        let correct = false 

        for (let row of this.answer_key) {
            if (JSON.stringify(row) === JSON.stringify(this.clickedWords)) {
                correct = true;
                break;
            }
        }

        if (correct) {
            console.log("Correct!")
        }
        else {
            console.log("Incorrect")
            const resetEvent = new CustomEvent('reset');

            for (let w of this.clickedTiles) {
                w.dispatchEvent(resetEvent);
            }
        }

        this.clickedWords = [];
        this.clickedTiles = [];
    }
}