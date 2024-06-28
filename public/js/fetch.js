async function showAGame(event) {
    // console.log(event.currentTarget)
    // console.log(event.currentTarget.textContent)
    const response = await fetch('/pastGames/' + event.currentTarget.textContent)
    const json = await response.json()

    inputDataManager._buildBoard(json.dimensions, json.words, json.answer_key);
}


async function saveGame(event) {
    event.preventDefault();

    const inputInfo = {
        title: "Must Update Funcitonality",
        dimensions: TILES_PER_ROW,
        words: inputDataManager.words,
        answer_key: inputDataManager.answer_key,
    }

    if (inputInfo.words.length != 0) {

        const fetchOptions = {
            method: 'POST',
            headers: {
                // 'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(inputInfo)
        }

        console.log(fetchOptions)

        await fetch('/saveGame/' + inputInfo.title, fetchOptions);
    }
}


const generatePastGames = async () => {

    const response = await fetch('/pastGames')
    const json = await response.json()
    const gameTitles = json.gameTitles

    const gamesList = document.querySelector('#pastGamesList')
    for (const item of gameTitles) {
        const newGame = document.createElement('button')
        newGame.appendChild(document.createTextNode(item))
        newGame.addEventListener('click', showAGame)
        
        gamesList.appendChild(newGame)
    }

}

generatePastGames()

const saveGameButton = document.querySelector('#saveGame')
saveGameButton.addEventListener('click', saveGame)
