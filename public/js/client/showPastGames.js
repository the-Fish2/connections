function showPastGames() {
    spg.textContent = 'Hide Past Games'
    spg.removeEventListener('click', showPastGames)
    spg.addEventListener('click', hidePastGames)
    pg.classList.remove('hidden')
}

function hidePastGames() {
    spg.textContent = 'Show Past Games'
    spg.removeEventListener('click', hidePastGames)
    spg.addEventListener('click', showPastGames)
    pg.classList.add('hidden')
}

const spg = document.querySelector('#showPastGames')
const pg = document.querySelector('#pastGamesList')

spg.addEventListener('click', showPastGames)