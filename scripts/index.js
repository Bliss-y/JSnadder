let totalNumberOfMoves = 11;

const moves = [0, 2, 0, 5, 5, 1];
const snakes = [
    {
        id: 1,
        from: 27,
        to: 6
    },

    {
        id: 2,
        from: 48,
        to: 29
    },

    {
        id: 3,
        from: 71,
        to: 32
    },
    {
        id: 4,
        from: 76,
        to: 67
    },
    {
        id: 5,
        from: 84,
        to: 78
    },
    {
        id: 6,
        from: 81,
        to: 42
    },
    {
        id: 6,
        from: 96,
        to: 90
    },
];
const ladder = [
    {
        id: 1,
        from: 3,
        to: 44,
    },
    {
        id: 2,
        from: 12,
        to: 46,
    },
    {
        id: 3,
        from: 14,
        to: 57,
    },
    {
        id: 4,
        from: 22,
        to: 61,
    },
    {
        id: 5,
        from: 34,
        to: 70,
    },
    {
        id: 6,
        from: 74,
        to: 99,
    }
];


function findShortest(place, moves, ladders,snakes, moves_done, cap_move){
    if(place == 100){
        return [true, moves_done];
    }
    if (place !=100 && (moves_done.length >= cap_move||moves.reduce((a,v)=>{return a+v}) == 0)) {return [false, moves_done]}
    for(let i = 0; i < 6; i++){
        if(moves[i] >0) {
            const newMove = [...moves];
            newMove[i]--;
            let dest = place + i+1;
            let ladder = ladders.find((e)=>{return e.from == dest});
            if (ladder) {
                dest = ladder.to;
            }
            ladder = snakes.find((e)=>{return e.from == dest});
            if (ladder!= undefined) {
                dest = ladder.to;
            }
            //console.log("moveing to ", dest, i+1, moves, moves_done);
            const res = findShortest(dest,newMove, ladders,snakes, [...moves_done, i+1], cap_move);
            //console.log(res);
            if (res[0]) {
                return res;
            }
        }
    }
    return [false, moves_done];
}

// x1 and x2 are in percentage
function getNum(x1, y1) {
    const gameboard =  document.getElementById("GameBoard"); // just doing in case it changes the board size somehow..?
    const hOffset = gameboard.clientHeight / 10
    const wOffset = gameboard.clientWidth / 10;
    const x = Math.floor(x1 / wOffset) + 1;
    const y = 9 - Math.floor(y1 / hOffset);
    if(y % 2 == 1){
        // go the opposite 
        console.log(y, x, y*10 + (10 - x) + 1);
        return y*10 + (10 - x) + 1;
    }
    else {
        console.log(y, x);
        return y*10 + x;
    }
}
async function move(solve){
    console.log("here");
    const gameboard =  document.getElementById("GameBoard");
    const snadders = document.getElementsByClassName("Snadder");
    const ladders = [];
    const snakes = [];
    const moves = [];
    const move_elements = [];
    for(let i = 1; i <=6; i++){
        move_elements.push(document.getElementById(""+i))
        moves.push(parseInt(move_elements[i-1].parentElement.innerText.split("\n\nx")[1])); // probably better to take last child for future safety
    }
    const numberOfMoves = document.getElementsByClassName("w-2.5").length
    for (let i of snadders) {
        const laddertype = i.childNodes[i.childNodes.length-1]
        if (laddertype.tagName == "line" ) {
                ladders.push({from: getNum(laddertype.x1.animVal.value,
                    laddertype.y1.animVal.value), to: getNum(laddertype.x2.animVal.value, laddertype.y2.animVal.value)});
        } else {
            // its a snake!!!
            const snake = i.firstElementChild?.firstElementChild;
            if (snake) {
                d = snake.firstElementChild.getAttribute("d");
                d = d.split(" ");
                const from = getNum(d[1], d[2]);
                d = snake.lastElementChild.getAttribute("d");
                d = d.split(" ");
                const to = getNum(d[d.length - 3],d[d.length - 2]);
                snakes.push({from, to});
            }
        }
    }
    console.log("here");
    console.log("ladders: ", ladders);
    console.log("snakes: ", snakes);
    console.log("moves", moves);
    console.log("number of moves", numberOfMoves);
    const solvedMoves = findShortest(0,moves,ladders, snakes, [], numberOfMoves );
    console.log(solvedMoves)
    if(solve) {
        for(let i of solvedMoves[1]) {
            await sleep(1000);
            move_elements[i - 1].click();
        }
    }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

move(false);
//const path = findShortest(0,moves, ladder, snakes, [] );
//console.log(path);
console.log("here");
const btn = document.createElement("button");
btn.innerText = "Solve It!";
btn.onclick=()=>move(true);
const checkbtn = document.createElement("button");
checkbtn.innerText = "Check the positions";
checkbtn.onclick = ()=>move(false)
document.body.appendChild(btn);
document.body.appendChild(checkbtn);
