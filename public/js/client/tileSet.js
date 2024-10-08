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
        this.wordTiles = [];
        this.clickedWords = [];
        this.clickedTiles = [];
        
        let index = 0;
        for (const word of this.words) {
            this.wordTiles[index] = new Tile(this.containerElement, this.clickWord, word, index, correctMatchups[Math.floor(index/TILES_PER_ROW)], this.unClickWord)
            index ++;
        }

        this.makeShuffle();
    }

    makeShuffle() {

        this.containerElement.innerHTML=''
        this.wordTiles.sort(() => Math.random() - 0.5);
        for (const word of this.wordTiles) {
            word._display();
        }

        // console.log(this.answer_key)

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

        // console.log(this.clickedWords)
        // console.log(this.answer_key)

        if (this.clickedWords.length != TILES_PER_ROW) {
            const resetEvent = new CustomEvent('reset');

            for (let w of this.clickedTiles) {
                    w.dispatchEvent(resetEvent);
            }

            this.clickedWords = [];
            this.clickedTiles = [];
            return;
        }

        let correct = false 
        let correctInd = -1;
        let mistakeCounter = 0;

        for (const row of this.answer_key) {
            mistakeCounter = this.countDiffs(this.clickedWords, row);
            correctInd ++;
            if (mistakeCounter == 0) {
                correct = true;
                break;
            }
            else if (mistakeCounter == 1) {
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
            if (mistakeCounter == 1) {
                userInfo.textContent = "One away!"
            }

            setTimeout(() => {
                userInfo.textContent = ""
            }, 3000);

            const resetEvent = new CustomEvent('reset');

            for (let w of this.clickedTiles) {
                w.dispatchEvent(resetEvent);
            }
        }

        this.clickedWords = [];
        this.clickedTiles = [];
    }

    countDiffs(arr1, arr2) {
        const set1 = new Set(arr1);
        const set2 = new Set(arr2);
        
        let differences = 0;
        
        for (const item of set1) {
            if (!set2.has(item)) {
            differences++;
            }
        }
        console.log(differences)
        return differences;
    }
}