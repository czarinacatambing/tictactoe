


// sets up contents of the gameboard array to webpage
const gameBoard = (block) => {
    
    let content = ['','','','','','','','','']

    const render = () => {
        const blocks = document.querySelectorAll('.block');
        blocks.forEach( item => {
            i = Math.floor((Math.random() * 2) + 1);
            console.log(i)
            sign = (i==1)? 'X' : 'O'
            item.innerHTML=sign
        })
        
    }




    const updateContent = (item, i) => content[i] = item;
    const getCount = () => content.filter(item => item.length>0 )
    const getContent = () => content

    return {render, getCount, updateContent, getContent}



    


}

// allows players to mark spots on the board and tie it to DOM
const Player = (sign) => {

    let _sign = sign;

    const getSign = () => _sign;




    return { getSign }
}

// logic to control gameboard. main function
const gameboardController = (() => {
    let _startingPlayer;
    let _nextPlayer;

    const playerX = Player('X')
    const playerO = Player('O')
    let newGame;


    


    const pickPlayerStart = () => {
        t =  Math.floor((Math.random() * 2) + 1);
        console.log("picking....", t)
        if (t==1){
            _startingPlayer = playerX;
            _nextPlayer = playerO;
            return _startingPlayer}
        else{
            _startingPlayer = playerO
            _nextPlayer = playerX;
            return _startingPlayer
        }
    
    }

    const selectNextPlayer = () => {
        console.log(newGame)
        if (newGame.getCount()==0) {
            console.log(_startingPlayer)
            return _startingPlayer
        } else if (newGame.getCount()%2==0) {
            console.log('player', _startingPlayer)
            return _startingPlayer
        } else {
            console.log('player', _nextPlayer)
            return _nextPlayer
            
        }
    }



    const getGame = () => newGame;

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
        console.log(newGame)
       
        if (_startingPlayer === playerX){
            playerXMove(block)
            _nextPlayer=playerO;
        } else {
            playerOMove(block)
            _nextPlayer=playerX;
        }

        return newGame
    }


    const gameOver = () => {
        // check if draw

        // if not draw, no winner
    }


    return { startRound, getGame, selectNextPlayer, playerOMove, playerXMove }
})()



// logic to manage interface
const interfaceController = (() => {
    const blocks = document.querySelectorAll('.block')
    let game;
 

    // starts here, not set to a variable because it will be immediately invoked 
    
    blocks.forEach(item => {
        item.addEventListener('click', function(e){
        const key = document.querySelector(`#${e.target.id}`)
        console.log(gameboardController.getGame())
        if (typeof gameboardController.getGame() === 'undefined') {
            game = gameboardController.startRound(e) 
        } else {
            // find out whose turn it is and make them move
            if (e.target.innerText==='') {
                player = gameboardController.selectNextPlayer()
                console.log(player.getSign())
                if (player.getSign()==='X'){ 
                    gameboardController.playerXMove(e) }
                else gameboardController.playerOMove(e)
                updateGameboard()
            } else {
                console.log("Can't play this tile")
            }
        }


        })
    })

    // update contents of gameboard after every playermove 
    const updateGameboard = () => {
        blocks.forEach( (item, i) => {
            game.updateContent(item.innerText, i) 
        })

    }



    // return {}
})()


// gameboardController.reset()