class BarSet {
    constructor(barCont) {
        this.barCont = barCont
        this.bars = []
        this._makeBar = this._makeBar.bind(this)
        this.wordsToOutput = this.wordsToOutput.bind(this)
    }

    _reset() {
        this.bars = []
        this.barCont.innerHTML = ''
    }

    _makeBar(correctInd, clickedWords, title) {
        const sendWords = this.wordsToOutput(clickedWords)
        const newBar = new Bar(this.barCont, correctMatchups[correctInd], title, sendWords)
        this.bars.push(newBar)
    }

    wordsToOutput(newWords) {
        let strWords = "";
        for (let i = 0; i < newWords.length - 1; i++) {
            strWords += newWords[i].toUpperCase() + ", "
        }
        strWords += newWords[newWords.length-1].toUpperCase();
        return strWords;
    }
}