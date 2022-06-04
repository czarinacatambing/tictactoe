


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
    const getCount = () => {
        x = content.filter(item => item.length>0 )
        console.log("count -->", x)
        return x.length
    }
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

    const findWinner = () => {
        return checkDiagonalWin()
    }


    const checkDiagonalWin = () => {
        let winner;
        items = newGame.getContent()
    

        diagonal1 = [items[0], items[4], items[8]] 
        diagonal2 = [items[2], items[4], items[6]]
      // if specific blocks are prefilled with same characters
        
        if (checkPattern(diagonal1)) {
            winner = diagonal1[0]
        } else if (checkPattern(diagonal2)) {
            winner = diagonal2[0]
        } else {

        }

        return (winner)? winner : null
    }

    const checkHorizontalWin = () => {
        // if 3 blocks that are 3 blocks apart are continuously the same character
        
        items = newGame.getContent()
        // if 3 blocks are continuously the same character
        let x = []
        let o = []
        let prevItem;
        let winner;

        
        for( let i =0; i<items.length; i++) {
            item = items[i]
            prevItem = (i-3 < 0)? null : items[i-3] // 
            if (i===0) prevItem = item;
            if (winner) {
                break
            }
            if(item==='X' && ( x.length===0 || prevItem===item) ) {
                x.push(item)
                prevItem = item
                winner = (checkPattern(x)) ? 'x': null;
            } else if (item==='O' &&  ( o.length===0 || prevItem===item)) {
                o.push(item)
                prevItem = item
                winner = (checkPattern(o)) ? 'o': null;
            }
            else {
                // reset the count if pattern is broken
                // x = []
                // o = []
            }
        }

        return (winner)? winner : null
    }

    const allEqual = arr => arr.every( v => v === arr[0] )

    const checkPattern = (arr) => {
        if(arr.length===3 && allEqual(arr)) return true
        else false
    }

    const checkVerticalWin = () => {
        
        items = newGame.getContent()
        // if 3 blocks are continuously the same character
        let x = []
        let o = []
        let prevItem;
        let winner;

        
        for( let i =0; i<items.length; i++) {
            item = items[i]
            if (i===0) prevItem = item;
            if (winner) {
                break
            }
            if(item==='X' && ( x.length===0 || prevItem===item) ) {
                x.push(item)
                prevItem = item
                winner = (checkPattern(x)) ? 'x': null;
            } else if (item==='O' &&  ( o.length===0 || prevItem===item)) {
                o.push(item)
                prevItem = item
                winner = (checkPattern(o)) ? 'o': null;
            }
            else {
                // reset the count if pattern is broken
            }
        }

        return (winner)? winner : null
    }


    const selectNextPlayer = () => {
    
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
        } else {
            playerOMove(block)
        }

        return newGame
    }


    const gameOver = () => {
        // check if draw

        // if not draw, no winner
    }


    return { startRound, getGame, selectNextPlayer, playerOMove, playerXMove, findWinner }
})()



// logic to manage interface
const interfaceController = (() => {
    const blocks = document.querySelectorAll('.block')
    let game;
    let winner;
 

    // starts here, not set to a variable because it will be immediately invoked 
    
    blocks.forEach(item => {
        item.addEventListener('click', function(e){
        const key = document.querySelector(`#${e.target.id}`)
        console.log(gameboardController.getGame())
        if (typeof gameboardController.getGame() === 'undefined') {
            game = gameboardController.startRound(e) 
            updateGameboard()
        } else {
            // find out whose turn it is and make them move
            if (e.target.innerText==='') {
                player = gameboardController.selectNextPlayer()
                console.log(player.getSign())
                if (player.getSign()==='X'){ 
                    gameboardController.playerXMove(e) }
                else gameboardController.playerOMove(e)
                updateGameboard()
                winner = gameboardController.findWinner()
            } else {
                console.log("Can't play this tile")
            }
        }

    if(winner) console.log('WINNING --> ', winner)
    const blockPlay = () => { 
    
        
    }


        })
    })

    // update contents of gameboard after every playermove 
    const updateGameboard = () => {
        blocks.forEach( (item, i) => {
            if (item.innerText!=='')  {
                console.log('ITEM:',item)
                console.log('I:',i)
                game.updateContent(item.innerText, i) }
                
        })

    }



    // return {}
})()


// gameboardController.reset()