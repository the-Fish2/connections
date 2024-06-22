class InputData {
    constructor (container, form) {
        this.container = container;
        this.words = [];
        this.answer_key = [];

        this._onSubmit = this._onSubmit.bind(this)

        this.form = form;
        this.form.addEventListener('submit', this._onSubmit)
    }

    _onSubmit (event) {
        event.preventDefault();
        
        this.words = [];
        this.answer_key = [];

        const val = document.querySelectorAll('[data-ind]')

        for (const item of val) {
            const newElems = item.value.split(",")
            this.answer_key.push(newElems)
            for (const e of newElems) {
                this.words.push(e)
            }
        }

        console.log(this.answer_key)
        console.log(this.words)

        words = this.words
        answer_key = this.answer_key

        tileSet = new TileSet(tilesContainer, words, answer_key)
        tileSet.makeTiles();

        // NEED TO HIDE BARS. ALSO MAKE THIS SO MUCH BETTER W/ CALL BACK BC UNIVERSLA VARS BAD
    }
}