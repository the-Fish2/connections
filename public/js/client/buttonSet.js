class ButtonSet {
    constructor (buttonContainer, buttonList) {
        this.buttonList = buttonList;
        this.buttonContainer = buttonContainer
        this.buttonContainer.innerHTML = ''

        this._generate = this._generate.bind(this)

        // console.log(buttonList)

        for (const b in buttonList) {
            const currButton = buttonList[b]
            this._generate(currButton.name, currButton.id, currButton.callBack)
        }
    }
    
    _generate(name, id, callBack) {
        let newButton = document.createElement('button')
        newButton.innerHTML = name;
        newButton.id = id;
        newButton.addEventListener('click', callBack)
        // console.log(newButton.id)
        this.buttonContainer.appendChild(newButton)
    }
}


// <button id="hint"> Hint </button> <br>
// <button id="clear"> Clear </button> <br>
// <button id="shuffle"> Shuffle </button> <br>
// <button id="saveGame"> Save Game </button> <br>