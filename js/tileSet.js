class TileSet {
    constructor(containerElement, words, answer_key) {
        this.containerElement = containerElement;
        this.words = words;
        this.answer_key = answer_key;

        this.wordTiles = [];
        this.clickedWords = [];
        this.clickedTiles = [];
        this.bars = [];

        this.makeTiles = this.makeTiles.bind(this)
        this.clickWord = this.clickWord.bind(this)
        this.checkAnswer = this.checkAnswer.bind(this)

    }

    makeTiles() {
        this.containerElement.innerHTML=''
        
        this.wordTiles = [];
        this.clickedWords = [];
        this.clickedTiles = [];
        this.bars = [];
        
        let index = 0;  
        for (const word of this.words) {
            this.wordTiles[index] = new Tile(this.containerElement, this.clickWord, word, index)
            index ++;
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
        let correctInd = -1;

        for (let row of this.answer_key) {
            correctInd ++;
            console.log(JSON.stringify(row), JSON.stringify(this.clickedWords))
            if (JSON.stringify(row) === JSON.stringify(this.clickedWords)) {
                correct = true;
                break;
            }
        }

        if (correct) {
            console.log("Correct!")
            const finishEvent = new CustomEvent('finish');
            for (let w of this.clickedTiles) {
                w.dispatchEvent(finishEvent)
            }

            const correctMatchups = {0: "lightyellow", 1:"lightgreen", 2:"lightblue", 3:"mediumpurple", 5:"lightcoral"}
            this.bars.push(new Bar(this.containerElement, correctMatchups[correctInd], this.wordTiles[0]))

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