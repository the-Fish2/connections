class InputDataManager {
    constructor(containerElement) {
        this.container = containerElement
        this.barContainer = new BarSet(document.querySelector("#bars"))
        
        this._buildForm = this._buildForm.bind(this)
        this._buildBoard = this._buildBoard.bind(this)
        this._makeBar = this._makeBar.bind(this)
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

        const tileSet = new TileSet(tilesContainer, this._makeBar, this.words, this.answer_key)
        tileSet.makeTiles();
    }
    
    _makeBar(correctInd, clickedWords) {
        this.barContainer._makeBar(correctInd, clickedWords, this.answer_titles[correctInd])
    }

}