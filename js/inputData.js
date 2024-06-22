class InputData {
    constructor (container, form) {
        this.container = container;
        this.words = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p'];
        this.answer_key =  [['a', 'b', 'c', 'd'], ['e', 'f', 'g', 'h'], ['i', 'j', 'k', 'l'], ['m', 'n', 'o', 'p']];

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

        for (let row of this.answer_key) {
            row.sort()
        }

        console.log(this.answer_key)
        console.log(this.words)

        const tileSet = new TileSet(tilesContainer, this.words, this.answer_key)
        tileSet.makeTiles();

        // NEED TO HIDE BARS. ALSO MAKE THIS SO MUCH BETTER W/ CALL BACK BC UNIVERSLA VARS BAD
    }
}