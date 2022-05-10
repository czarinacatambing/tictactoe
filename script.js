


// sets up contents of the gameboard array to webpage
const gameBoard = (block) => {
    
    let moveCount=0;

    const render = () => {
        const blocks = document.querySelectorAll('.block');
        blocks.forEach( item => {
            i = Math.floor((Math.random() * 2) + 1);
            console.log(i)
            sign = (i==1)? 'X' : 'O'
            item.innerHTML=sign
        })
        
    }

    const getSign = (block) => {

    }

    const getCount = () => moveCount


    return {render, getCount}



    


}

// allows players to mark spots on the board and tie it to DOM
const Player = (sign) => {

    let _sign = sign;

    const getSign = () => _sign;




    return { getSign }
}

// logic to control gameboard. main function
const gameboardController = (() => {

    const playerX = Player('X')
    const playerO = Player('O')
    let _startingPlayer;
    let _nextPlayer;
    let _moveCount=0; 

    const pickPlayerStart = () => {
        t =  Math.floor((Math.random() * 2) + 1);
        console.log("picking....", t)
        return (t==1)? playerX : playerO
    
    }

    const playerXMove = (block) => {
        console.log('setting mark...', 'X')
        block.target.innerHTML = 'X'
        // console.log(block)
    }
    const playerOMove = (block) => {
        console.log('setting mark...', 'O')
        block.target.innerText = 'O'
        // console.log(block)
    }


    const startRound = (block) => {
        
        console.log('Starting round....')
        _startingPlayer = pickPlayerStart()
        newGame = gameBoard(); 
       
        (_startingPlayer === playerX)? playerXMove(block) : playerOMove(block)
    }


    const gameOver = () => {
        // check if draw

        // if not draw, no winner
    }


    return { startRound}
})()



// logic to manage interface
const interfaceController = (() => {
    const blocks = document.querySelectorAll('.block')
    const gameBoard = document.querySelector('game-board')
    

    // starts here, not set to a variable because it will be immediately invoked 
    
    blocks.forEach(item => {
        item.addEventListener('click', function(e){
        const key = document.querySelector(`#${e.target.id}`)
        // instantiate new game here
        if (!gameBoard) gameboardController.startRound(e) 
        else {
            // find out whose turn it is and make them move
        }


        })
    })



    // return {}
})()


// gameboardController.reset()