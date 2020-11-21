import Node from "./Node.js";
import {mode} from "./Toolbar.js";
import Dijkstra from "./Dijkstra.js";

class Grid {
    constructor(dimX, dimY) {
        this.dimX = dimX;
        this.dimY = dimY;
        this.grid = [];
        this.startNode = null;
        this.endNode = null;
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
        this.startNode = this.grid[x][y];
    }
    setEndNode(x,y){
        this.grid[x][y].setAsEndNode();
        this.endNode = this.grid[x][y];
    }

    runDijkstra(){
        Dijkstra(this.grid, this.startNode, this.endNode);
        console.log("Running Dijkstra...");
    }

    generateNeighbours(x,y){
        let neighbours = [];
        if(x != 0)
        neighbours.push(this.grid[x-1][y]);
        if(x != this.dimX)
        neighbours.push(this.grid[x+1][y]);
        if(y != 0)
        neighbours.push(this.grid[x][y-1]);
        if(y != this.dimY)
        neighbours.push(this.grid[x][y+1]);

        this.grid[x][y].addNeighbours(neighbours);
    }
}
export {Grid};