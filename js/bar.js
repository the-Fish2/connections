class Bar {
    constructor(container, color) {
        this.bar = document.createElement('div')
        this.bar.classList.add('bar')
        this.bar.style.backgroundColor = color
        container.append(this.bar)
    }
}