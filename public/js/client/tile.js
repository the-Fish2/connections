class Tile {
    constructor(container, onClickCallback, word, index, onUnClickCallback) {
        this.container = container;
        this.onClickCallback = onClickCallback;
        this.onUnClickCallback = onUnClickCallback;

        this._onClick = this._onClick.bind(this);
        this._reset = this._reset.bind(this);
        this._finish = this._finish.bind(this);
        this._onUnClick = this._onUnClick.bind(this);

        this.tile = document.createElement('div')
        this.tile.classList.add('tile')
        this.tile.dataset.index = index;
        this.tile.innerHTML = word;
        this.tile.word = word;

        this.tile.addEventListener('click', this._onClick)
        this.tile.addEventListener('reset', this._reset) 
        this.tile.addEventListener('finish', this._finish) 

        container.appendChild(this.tile)
    }

    _onClick() {
        
        this.tile.classList.add('clicked')
        this.onClickCallback(this.tile);
        this.tile.removeEventListener('click', this._onClick)
        this.tile.addEventListener('click', this._onUnClick)
    }

    _onUnClick() {
        this.tile.classList.remove('clicked')
        this.onUnClickCallback(this.tile);
        this.tile.removeEventListener('click', this._onUnClick)
        this.tile.addEventListener('click', this._onClick)
    }

    _finish() {
        this.tile.classList.add('hidden')
    }

    _reset() {
        this.tile.classList.add('fadeout')

        setTimeout(function() {
            this.tile.classList.remove('clicked')
            this.tile.removeEventListener('click', this._onUnClick)  
            this.tile.addEventListener('click', this._onClick) 
            this.tile.classList.remove('fadeout')
         
        }.bind(this), 1800)

        // this.tile.onanimationend = () => {

        // };     
    }
}