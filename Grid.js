import Node from "./Node.js";
class Grid {
    constructor(dimX, dimY) {
        this.dimX = dimX;
        this.dimY = dimY;
        this.grid = [];
        for (let i = 0; i < dimX; i++) {
            this.grid.push([]);
            for (let j = 0; j < dimY; j++)
                this.grid[i].push(new Node());
        }
        console.log(this.grid);
    }

    draw(parent){
        if(!parent) throw new Error("Parent container not defined!");

        let grid = document.createElement("div");
        grid.className = "grid";
        grid.style.gridTemplateColumns = `repeat(${this.dimY}, 20px)`;
        grid.style.gridTemplateRows = `repeat(${this.dimX}, 20px)`;
        grid.style.width = `${this.dimX * 20}px`;

        parent.appendChild(grid);

        this.grid.forEach(row => 
            row.forEach(col => col.draw(grid)))
    }

    setStartNode(x,y){
        this.grid[x][y].setAsStartNode();
    }
    setEndNode(x,y){
        this.grid[x][y].setAsEndNode();
    }
}
var mode = "DRAW_WALLS";
export {Grid, mode};