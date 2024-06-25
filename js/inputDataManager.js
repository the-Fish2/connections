class InputDataManager {
    constructor(containerElement) {
        this.container = containerElement
        
        this._buildForm = this._buildForm.bind(this)
        this._buildBoard = this._buildBoard.bind(this)
    }

    _buildForm() {
        this.words = []
        this.answer_key = []
        const form = document.querySelector('#connectionsGenerate')
        const inputData = new InputData(this.container, form, this.words, this.answer_key, this._buildBoard)
    }

    _buildBoard(dims, words, answer_key) {
        TILES_PER_ROW = dims;
        
        const r = document.querySelector(':root');
        r.style.setProperty('--tiles-per-row', TILES_PER_ROW);

        const barCont = document.querySelector("#bars")
        words.sort(() => Math.random() - 0.5);

        const tileSet = new TileSet(tilesContainer, barCont, words, answer_key)
        tileSet.makeTiles();
    }
    

}