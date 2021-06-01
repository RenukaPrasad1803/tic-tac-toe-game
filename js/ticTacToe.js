let lookUp = {}

const checks = [
  ['00', '01', '02'],
  ['10', '11', '12'],
  ['20', '21', '22'],
  ['00', '10', '20'],
  ['01', '11', '21'],
  ['02', '12', '22'],
  ['00', '11', '22'],
  ['20', '11', '02']
]

function buildGame() {
  let tableSize = 3
  let container = document.getElementById('game-block')
  let table  = document.createElement('table')
  container.appendChild(table)
  for (let i=0; i<tableSize; i++){
    let tableRow = document.createElement('tr')
    table.appendChild(tableRow)
    for(let j=0; j<tableSize; j++) {
      let tableData = document.createElement('td')
      tableData.classList.add('cell_' +i+j)
      tableData.addEventListener('click', (event) => {
        addData(event)
      })
      tableRow.appendChild(tableData)
    }
  }
}

buildGame()

function addData(event) {
  let player = document.getElementById('player').innerHTML.split(' ')[1]
  event.target.innerHTML = player
  let cellData = event.target.classList.value.split('_')[1]
  if (lookUp[player]) {
    lookUp[player].push(cellData)
  } else {
    lookUp[player] = [cellData]
  }
  checkWinner(lookUp, player)
  player = (player == 0) ? 1 : 0
  document.getElementById('player').innerHTML = 'Player '+ player
}

function checkWinner(lookUp, player) {
  let check = false
  if (lookUp[player].length > 2) {
    for (let i=0; i<checks.length; i++) {
      check = checks[i].every(el => {
        return lookUp[player].indexOf(el) !== -1
      })
      if (check) {
        alert('Winner is Player ' + player)
        break
      }
    }
  }
}
