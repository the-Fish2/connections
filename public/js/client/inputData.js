class InputData {
    constructor (container, form, words, answer_titles, answer_key, onClickCallback) {
        this.container = container;
        this.words = words
        this.answer_key = answer_key
        this.answer_titles = answer_titles
        this.onClickCallback = onClickCallback

        this._onSubmit = this._onSubmit.bind(this)

        this.form = form;
        this.form.addEventListener('submit', this._onSubmit)
    }

    _onSubmit (event) {
        event.preventDefault();

        this.words = [];
        this.answer_key = [];
        this.answer_titles = [];

        const title = document.querySelector('#title').value
        const dims = Number(document.querySelector('#dims').value)
        const val = document.querySelectorAll('[data-ind]')
        const col = document.querySelectorAll('[data-col]')

        let valIter = 0;
        for (const item of val) {
            if (valIter < dims) {
                let newElems = item.value.split(",").slice(0, dims)
                while (newElems.length < dims) {
                    newElems.push("[Missing Tile]")
                }
                this.answer_key.push(newElems)
                for (const e of newElems) {
                    this.words.push(e)
                }
            } 
            valIter ++;
        }

        for (const item of col) {
            this.answer_titles.push(item.value)
        }

        for (let row of this.answer_key) {
            row.sort()
        }

        this.onClickCallback(dims, this.words, this.answer_titles, this.answer_key, title)
    }
}