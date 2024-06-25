class TileSet {
    constructor(containerElement, barContainer, words, answer_key) {
        this.containerElement = containerElement;
        this.barContainer = barContainer;
        this.words = words;
        this.answer_key = answer_key;

        this.wordTiles = [];
        this.clickedWords = [];
        this.clickedTiles = [];
        this.bars = [];

        this.makeTiles = this.makeTiles.bind(this)
        this.clickWord = this.clickWord.bind(this)
        this.checkAnswer = this.checkAnswer.bind(this)
        this.barPrep = this.barPrep.bind(this)
        this.wordsToOutput = this.wordsToOutput.bind(this)

    }

    makeTiles() {
        this.containerElement.innerHTML=''
        this.barContainer.innerHTML=''
        
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

    barPrep(correctInd, oldSendWords) {
        const correctMatchups = {0: "lightyellow", 1:"lightgreen", 2:"lightblue", 3:"mediumpurple", 4:"lightcoral"}
        const sendWords = this.wordsToOutput(oldSendWords)
        return new Bar(this.barContainer, correctMatchups[correctInd], "HI", sendWords)
    }

    wordsToOutput(newWords) {
        let strWords = "";
        for (let i = 0; i < newWords.length - 1; i++) {
            strWords += newWords[i].toUpperCase() + ", "
        }
        strWords += newWords[newWords.length-1].toUpperCase();
        return strWords;
    }

    checkAnswer() {
        this.clickedWords.sort();

        let correct = false 
        let correctInd = -1;

        for (let row of this.answer_key) {
            correctInd ++;
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

            this.barPrep(correctInd, this.clickedWords)

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