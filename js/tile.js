class Tile {
    constructor(container, onClickCallback, word, index) {
        this.container = container;
        this.onClickCallback = onClickCallback;
        this.word = word;

        this._onClick = this._onClick.bind(this);

        this.tile = document.createElement('div')
        this.tile.classList.add('tile')
        this.tile.dataset.index = index;
        this.tile.innerHTML = this.word
        this.tile.addEventListener('click', this._onClick) 
        container.appendChild(this.tile)
    }

    _onClick() {
        this.onClickCallback(this.word);
    }
}