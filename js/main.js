const PLAYER1 = 'fa-circle';
const PLAYER2 = 'fa-times';
let round = 1;
let moves = {
    'fa-times': [],
    'fa-circle': []
};

let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

const combinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

const boxes = [...document.querySelectorAll('.box')];
boxes.forEach(box => box.addEventListener('click', pick));
const resetButton = document.querySelector("button");
resetButton.addEventListener('click', reset);

function reset(){
    board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];
    moves = {
        'fa-times': [],
        'fa-circle': []
    };
    boxes.forEach(box => box.classList.remove("fa-times"));
    boxes.forEach(box => box.classList.remove("fa-circle"));
    boxes.forEach(box => box.addEventListener('click', pick));
}

function pick(event) {
    const {row, column} = event.target.dataset;
    const turn = round % 2 === 0 ? PLAYER2 : PLAYER1;
    if (board[row][column] !== '') return;
    event.target.classList.add(turn);
    board[row][column] = turn;
    round++;
    console.log(check());
}

function check() {
    const result = board.reduce((total, row) => total.concat(row));
    let winner = null;
    result.forEach((field, index) => moves[field] ? moves[field].push(index) : null);
    combinations.forEach(combination => {
        if (combination.every(index => moves[PLAYER1].indexOf(index) > -1)) {
            winner = 'Winner: Player 1';
            boxes.forEach(box => box.removeEventListener('click', pick));
        }
        if (combination.every(index => moves[PLAYER2].indexOf(index) > -1)) {
            winner = 'Winner: Player 2';
            boxes.forEach(box => box.removeEventListener('click', pick));
        }
    });
    return winner;
}