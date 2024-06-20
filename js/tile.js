class Tile {
    constructor(container, onClickCallback, word, index) {
        this.container = container;
        this.onClickCallback = onClickCallback;

        this._onClick = this._onClick.bind(this);
        this._reset = this._reset.bind(this);

        this.tile = document.createElement('div')
        this.tile.classList.add('tile')
        this.tile.dataset.index = index;
        this.tile.innerHTML = word;
        this.tile.word = word;
        this.tile.addEventListener('click', this._onClick)
        this.tile.addEventListener('reset', this._reset) 
        container.appendChild(this.tile)
    }

    _onClick() {
        this.tile.classList.add('clicked')
        this.tile.removeEventListener('click', this._onClick)

        this.onClickCallback(this.tile);
    }

    _reset() {
        this.tile.classList.add('fadeout')

        this.tile.classList.remove('clicked')
        this.tile.addEventListener('click', this._onClick)         
    }
}