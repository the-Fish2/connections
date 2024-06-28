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
        this.unClickWord = this.unClickWord.bind(this)

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
            this.wordTiles[index] = new Tile(this.containerElement, this.clickWord, word, index, this.unClickWord)
            index ++;
        }
    }

    clickWord(thisTile) {
        
        // console.log(this.clickedWords)
        this.clickedTiles.push(thisTile)
        this.clickedWords.push(thisTile.word)
        if (this.clickedWords.length === TILES_PER_ROW) {
            this.checkAnswer()
        }
    }

    unClickWord(thisTile) {

        // console.log(this.clickedWords)

        let clickedTiles2 = this.clickedTiles
        let clickedWords2 = this.clickedWords

        for (const ind in this.clickedTiles) {
            if (thisTile.word == this.clickedTiles[ind].word) {
                clickedTiles2.splice(ind, 1)
            }
        }

        const ind1 = clickedWords2.indexOf(thisTile.word)
        // console.log(ind1)
        clickedWords2.splice(ind1, 1)

        this.clickedTiles = clickedTiles2
        this.clickedWords = clickedWords2
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