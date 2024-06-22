class Bar {
    constructor(container, color, firstElem) {
        this.bar = document.createElement('div')
        this.bar.classList.add('bar')
        this.bar.style.backgroundColor = color
        firstElem.container.before(this.bar)
        
    }
}