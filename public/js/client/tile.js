class Tile {
    constructor(container, onClickCallback, word, index, color, onUnClickCallback) {
        this.container = container;
        this.onClickCallback = onClickCallback;
        this.onUnClickCallback = onUnClickCallback;

        this._onClick = this._onClick.bind(this);
        this._reset = this._reset.bind(this);
        this._finish = this._finish.bind(this);
        this._onUnClick = this._onUnClick.bind(this);
        this._display = this._display.bind(this);

        this.hintMode = false;

        this.tile = document.createElement('div')
        this.tile.classList.add('tile')
        this.tile.dataset.index = index;
        this.tile.color = color;
        this.tile.innerHTML = word;
        this.tile.word = word;
        this.tile.solved = false;

        this.tile.addEventListener('click', this._onClick)
        this.tile.addEventListener('reset', this._reset) 
        this.tile.addEventListener('finish', this._finish) 
        this.tile.addEventListener('hintMode', function (e) {
            this.hintMode = !this.hintMode
            this.hintCallBack = e.detail.callback
        }.bind(this)) 
    }

    _display() {
        this.container.appendChild(this.tile)
    }

    _onClick() {
        if (this.hintMode) {
            this._hint()
        }
        else {
            this.tile.classList.add('clicked')
            this.onClickCallback(this.tile);
            this.tile.removeEventListener('click', this._onClick)
            this.tile.addEventListener('click', this._onUnClick)
        }
        
    }
    _hint() {
        this.tile.style.backgroundColor = this.tile.color;
        this.hintCallBack()
    }

    _onUnClick() {
        if (this.hintMode) {
            this._hint()
        }
        else {
            this.tile.classList.remove('clicked')
            this.onUnClickCallback(this.tile);
            this.tile.removeEventListener('click', this._onUnClick)
            this.tile.addEventListener('click', this._onClick)
        }
    }

    _finish() {
        this.tile.solved = true;
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