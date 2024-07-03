class TileSet {
    constructor(containerElement, barCall, words, answer_key) {
        this.containerElement = containerElement;
        this.barCall = barCall
        this.words = words;
        this.answer_key = answer_key;

        this.wordTiles = [];
        this.clickedWords = [];
        this.clickedTiles = [];

        this.makeTiles = this.makeTiles.bind(this)
        this.clickWord = this.clickWord.bind(this)
        this.checkAnswer = this.checkAnswer.bind(this)
        this.unClickWord = this.unClickWord.bind(this)
        this.makeShuffle = this.makeShuffle.bind(this)
        this.makeClear = this.makeClear.bind(this)
        this.hintCall = this.hintCall.bind(this)

        this.containerElement.addEventListener('hintMode', this.hintCall)

    }

    makeTiles() {
        this.containerElement.innerHTML=''
        
        this.wordTiles = [];
        this.clickedWords = [];
        this.clickedTiles = [];
        
        let index = 0; 
        for (const word of this.words) {
            this.wordTiles[index] = new Tile(this.containerElement, this.clickWord, word, index, "yellow", this.unClickWord)
            index ++;
        }
    }

    makeShuffle(words2) {
        this.containerElement.innerHTML=''
        this.wordTiles = []
        const clickedWords2 = this.clickedWords
        this.makeClear()

        let index = 0;  
        for (const word of words2) {
            this.wordTiles[index] = new Tile(this.containerElement, this.clickWord, word.tile.word, index, "yellow", this.unClickWord)
            const maintainClickEvent = new CustomEvent('maintainClick');
            
            for (const clickedWord of clickedWords2) {
                if (clickedWord == word.tile.word) {
                    // console.log(this.wordTiles[index])
                    this.wordTiles[index].tile.dispatchEvent(maintainClickEvent)
                }
            }
            index ++;
        }

    }

    makeClear() {
        this.checkAnswer();
    }

    hintCall() {
        const evCall = new CustomEvent('hintMode', {"detail": {"callback": this.hintCall }})
        for (let w of this.wordTiles) {
            w.tile.dispatchEvent(evCall)
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
            // console.log("Correct!")
            const finishEvent = new CustomEvent('finish');
            for (let w of this.clickedTiles) {
                w.dispatchEvent(finishEvent)
            }

            this.barCall(correctInd, this.clickedWords)

        }
        else {
            // console.log("Incorrect")
            const resetEvent = new CustomEvent('reset');

            for (let w of this.clickedTiles) {
                w.dispatchEvent(resetEvent);
            }
        }

        this.clickedWords = [];
        this.clickedTiles = [];
    }
}