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

        const saveGame = document.querySelector('#saveGame')
        saveGame.classList.remove('hidden')

        const r = document.querySelector(':root');
        r.style.setProperty('--tiles-per-row', TILES_PER_ROW);
        
        const titleDisplay = document.querySelector('#titleDisplay')
        titleDisplay.textContent = this.title

        this.barContainer._reset()

        const buttonContainer = document.querySelector('#buttonContainer')
        const buttonList = {
            "hint": {name: "Hint", id: "hint", callBack: this._makeHint},
            "clear": {name: "Clear", id: "clear", callBack: this._makeClear},
            "shuffle": {name: "Shuffle", id: "shuffle", callBack: this._makeShuffle},
        }

        this.tileSet = new TileSet(tilesContainer, this._makeBar, this.words, this.answer_key)
        this.tileSet.makeTiles();

        const buttonSet = new ButtonSet(buttonContainer, buttonList)
    }
    
    _makeBar(correctInd, clickedWords) {
        this.barContainer._makeBar(correctInd, clickedWords, this.answer_titles[correctInd])
    }

    _makeHint() {
        //need several components
        //first, background screen is grayed out and new text that says "pick a tile"
        //then, a tile needs to be clicked without triggering the onclick function. 
        //then, that tile reveals its color, and returns to the game board. everything remains selected
        //note: clicking should not take away the color!
        const hintMode = new CustomEvent('hintMode');
        this.tileSet.containerElement.dispatchEvent(hintMode)
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