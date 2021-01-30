class CrossGame{

    constructor(rows = 50, columns = 50, players = 2){
        this.rows = rows;
        this.columns = columns;
        this.initiated = false;
        this.totalPlayers = players;
        this.currentPlayer = 1;
        this.checkBlocks = [[0,0],[0,1],[0,-1],[1,-1],[1,0],[1,1],[-1,-1],[-1,0],[-1,1]]

    }

    init = ()=>{
        if (this.totalPlayers == 0){
            console.log("Player count is  zero: can't initialize");
            return ;
        }
        this.state = new Array( this.rows);
        for(let i=0; i < this.rows; i++){
            this.state[i] = new Array( this.columns).fill(0);
        }
        this.initiated = true;
    }

    tickBlock = (row, column) => {
        
        if(this.initiated && this.canMove(row,column)){
            console.log("set ",row,column, " to ", this.currentPlayer);
            this.state[row][column] = this.currentPlayer++;
            if(this.currentPlayer > this.totalPlayers)
                this.currentPlayer = 1;
            return true;
        }
        console.log("cannot tick");
        return false;
    }

    isValidCordinate = (row, column)=>{
        if(row < 0 || column  < 0) return false;
        if (row >= this.rows || column >= this.columns) return false;
        return true;
    }

    canMove  =  (row, column)=>{
        
        // box already filled.
        if( !this.isValidCordinate(row,column) || this.state[row][column] != 0){
            console.log("cannot move");
             return false;
        }

        for(let cords of this.checkBlocks){
            let x = row + cords[0];
            let y = column + cords[1];
            if(this.isValidCordinate(x,y) && !this.check(x,y) ){
                console.log("cannot move");
                return false;
            }
        }
        return true;
    }
    check = (row, column) => {

        if(this.state[row][column] == 0 || this.state[row][column] == this.currentPlayer) return true;
        return false;
    }
}

