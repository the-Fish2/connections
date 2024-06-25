class Bar {
    constructor(container, color, category, words) {
        this.bar = document.createElement('div')
        this.bar.innerHTML = `
            <h1> ${category} </h1>
            <p>&nbsp;</p>
            <p> ${words} </p>
        `;
        this.bar.classList.add('bar')
        this.bar.style.backgroundColor = color
        container.append(this.bar)
    }
}