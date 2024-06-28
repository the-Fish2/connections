class InputData {
    constructor (container, form, words, answer_key, onClickCallback) {
        this.container = container;
        this.words = words
        this.answer_key = answer_key
        this.onClickCallback = onClickCallback

        this._onSubmit = this._onSubmit.bind(this)

        this.form = form;
        this.form.addEventListener('submit', this._onSubmit)
    }

    _onSubmit (event) {
        event.preventDefault();

        this.words = [];
        this.answer_key = [];

        const title = document.querySelector('#title').value
        const dims = Number(document.querySelector('#dims').value)
        const val = document.querySelectorAll('[data-ind]')

        let valIter = 0;
        for (const item of val) {
            if (valIter < dims) {
                const newElems = item.value.split(",")
                this.answer_key.push(newElems)
                for (const e of newElems) {
                    this.words.push(e)
                }
            } 
            valIter ++;
        }

        for (let row of this.answer_key) {
            row.sort()
        }

        this.onClickCallback(dims, this.words, this.answer_key, title)
    }
}