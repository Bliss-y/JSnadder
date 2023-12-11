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


function findShortest(place, moves, ladders,snakes, moves_done){
    if(place == 100){
        return [true, moves_done];
    }
    if (place !=100 && (moves_done.length >= 11||moves.reduce((a,v)=>{return a+v}) == 0)) {return [false, moves_done]}
    for(let i = 0; i < 6; i++){
        if(moves[i] >0) {
            const newMove = [...moves];
            newMove[i]--;
            let dest = place + i+1;
            let ladder = ladders.find((e)=>{return e.from == dest});
            if (ladder) {
                console.log("ladder found!!!!")
                dest = ladder.to;
            }
            ladder = snakes.find((e)=>{return e.from == dest});
            if (ladder!= undefined) {
                dest = ladder.to;
            }
            //console.log("moveing to ", dest, i+1, moves, moves_done);
            const res = findShortest(dest,newMove, ladders,snakes, [...moves_done, i+1]);
            //console.log(res);
            if (res[0]) {
                return res;
            }
        }
    }
    return [false, moves_done];
}

const path = findShortest(0,moves, ladder, snakes, [] );
console.log(path);
