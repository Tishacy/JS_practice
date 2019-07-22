const rockTag = document.getElementsByClassName('rock')[0];
const paperTag = document.getElementsByClassName('paper')[0];
const scissorsTag = document.getElementsByClassName("scissors")[0];
const userScoreTag = document.getElementsByClassName('user-score')[0];
const computerScoreTag = document.getElementsByClassName('computer-score')[0];
const descriptionTag = document.getElementsByClassName('description')[0];
let userScore = 0,
    computerScore = 0;


function getComputerChoice() {
    let choices = ['rock', 'paper', 'scissors'];
    let randomNumber = Math.floor(Math.random() * 3);
    let computerChoice = choices[randomNumber];
    return computerChoice
}

function game(userChoice, computerChoice) {
    let userComp = userChoice+computerChoice;
    if (userComp === "rockscissors" || userComp === "scissorspaper" || userComp === "paperrock") {
        displayResult('win', userChoice, computerChoice);
    }else if (userComp === "rockpaper" || userComp === "paperscissors" || userComp === "scissorsrock") {
        displayResult('lose', userChoice, computerChoice);
    }else {
        displayResult('draw', userChoice, computerChoice);
    }
}

function displayResult(res, userChoice, computerChoice) {
    let resData = {
        'win': {
            'audio': 'win-audio',
            'borderStyle': 'green-glow',
            'descWord': 'covers',
            'desc': 'You win! 🔥'
        },
        'lose': {
            'audio': 'lose-audio',
            'borderStyle': 'red-glow',
            'descWord': 'lose',
            'desc': 'You lost! 😢'
        },
        'draw': {
            'audio': 'draw-audio',
            'borderStyle': 'orange-glow',
            'descWord': 'equals',
            'desc': 'It\'s a draw. 😄'
        }
    }

    let smallUser = 'user'.fontsize(3).sup(),
        smallComp = 'comp'.fontsize(3).sup(),
        userChoiceTag = document.getElementsByClassName(userChoice)[0],
        audioTag = document.getElementsByClassName(resData[res].audio)[0];

    if (res === "win") {
        userScore ++;
        userScoreTag.innerHTML = userScore;
    }else if (res === "lose" ) {
        computerScore ++;
        computerScoreTag.innerHTML = computerScore;
    }
    userChoice = userChoice[0].toUpperCase() + userChoice.slice(1);
    computerChoice = computerChoice[0].toUpperCase() + computerChoice.slice(1);
    descriptionTag.innerHTML = `${userChoice}${smallUser} ${resData[res].descWord} ${computerChoice}${smallComp}. ${resData[res].desc}`
    userChoiceTag.classList.add(resData[res].borderStyle);
    setTimeout(()=>userChoiceTag.classList.remove(resData[res].borderStyle), 300);
    audioTag.play();
}

rockTag.addEventListener('click', () => {
    game(userChoice='rock', computerChoice=getComputerChoice());
}, false);

paperTag.addEventListener('click', () => {
    game(userChoice='paper', computerChoice=getComputerChoice());
}, false);

scissorsTag.addEventListener('click', () => {
    game(userChoice='scissors', computerChoice=getComputerChoice());
}, false);

