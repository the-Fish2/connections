class InputDataManager {
    constructor(containerElement) {
        this.container = containerElement
        this.barContainer = new BarSet(document.querySelector("#bars"))
        
        this._buildForm = this._buildForm.bind(this)
        this._buildBoard = this._buildBoard.bind(this)
        this._makeBar = this._makeBar.bind(this)

        this._makeHint = this._makeHint.bind(this)
        this._makeClear = this._makeClear.bind(this)
        this._makeShuffle = this._makeShuffle.bind(this)
    }

    _buildForm() {
        this.words = []
        this.answer_key = []
        this.answer_titles = []
        const form = document.querySelector('#connectionsGenerate')
        const inputData = new InputData(this.container, form, this.words, this.answer_key, this.answer_titles, this._buildBoard)
    }

    _buildBoard(dims, words, answer_titles, answer_key, title) {
        this.words = words;
        words.sort(() => Math.random() - 0.5);

        this.answer_key = answer_key;
        this.title = title;
        this.answer_titles = answer_titles
        TILES_PER_ROW = dims;

        const r = document.querySelector(':root');
        r.style.setProperty('--tiles-per-row', TILES_PER_ROW);
        
        const titleDisplay = document.querySelector('#titleDisplay')
        titleDisplay.textContent = this.title

        this.barContainer._reset()

        this.tileSet = new TileSet(tilesContainer, this._makeBar, this.words, this.answer_key)
        this.tileSet.makeTiles();

        const buttonContainer = document.querySelector('#buttonContainer')
        const buttonList = {
            "hint": {name: "Hint", id: "hint", callBack: this._makeHint},
            "clear": {name: "Clear", id: "clear", callBack: this._makeClear},
            "shuffle": {name: "Shuffle", id: "shuffle", callBack: this._makeShuffle},
        }
        const buttonSet = new ButtonSet(buttonContainer, buttonList)
    }
    
    _makeBar(correctInd, clickedWords) {
        this.barContainer._makeBar(correctInd, clickedWords, this.answer_titles[correctInd])
    }

    _makeHint() {
        console.log("hi")
        return;
    }

    _makeClear() {
        this.tileSet.makeClear()
    }

    _makeShuffle() {
        const remainingWords = this.tileSet.wordTiles.filter((tile) => !tile.tile.solved)
        remainingWords.sort(() => Math.random() - 0.5);
        this.tileSet.makeShuffle(remainingWords)
    }

}