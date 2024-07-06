class InputDataManager {
    constructor(containerElement) {
        this.container = containerElement
        this.barContainer = new BarSet(document.querySelector("#bars"))
        this.connectionsContainer = document.querySelector('.rightCol')
        
        this._buildForm = this._buildForm.bind(this)
        this._buildBoard = this._buildBoard.bind(this)
        this._makeBar = this._makeBar.bind(this)

        this._makeHint = this._makeHint.bind(this)
        this._makeClear = this._makeClear.bind(this)
        this._makeShuffle = this._makeShuffle.bind(this)
        this._checkSet = this._checkSet.bind(this)
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
            "clear": {name: "Deselect all", id: "clear", callBack: this._makeClear},
            "shuffle": {name: "Shuffle", id: "shuffle", callBack: this._makeShuffle},
            "submit": {name: "Submit", id: "submitGame", callBack: this._checkSet}
        }

        this.tileSet = new TileSet(tilesContainer, this._makeBar, this.words, this.answer_key)
        this.tileSet.makeTiles();

        const buttonSet = new ButtonSet(buttonContainer, buttonList)
    }
    
    _makeBar(correctInd, clickedWords) {
        this.barContainer._makeBar(correctInd, clickedWords, this.answer_titles[correctInd])
    }

    _makeHint() {
        if (this.connectionsContainer.classList.contains('hint-mode')) {
            this.connectionsContainer.classList.remove('hint-mode')
            userInfo.textContent = ""
        }
        else {
            this.connectionsContainer.classList.add('hint-mode')
            userInfo.textContent = "Select a tile!"
        }
        
        const hintMode = new CustomEvent('hintMode', {"detail": {container: this.connectionsContainer}});
        this.tileSet.containerElement.dispatchEvent(hintMode)
    }

    _makeClear() {
        this.tileSet.makeClear()
    }

    _makeShuffle() {
        // const remainingWords = this.tileSet.wordTiles.filter((tile) => !tile.tile.solved)
        // remainingWords.sort(() => Math.random() - 0.5);
        this.tileSet.makeShuffle()
        //remainingWords
    }

    _checkSet() {
        this.tileSet.checkAnswer()
    }

}