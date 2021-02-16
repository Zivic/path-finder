import {mode, changeMode, mouseDown, mouseUp, currentlyDrawing} from "./Toolbar.js";
import {Grid} from "./Grid.js";
export default class Node{
    constructor(x,y, parentGridObject){
        this.x = x;
        this.y = y;
        this.grid = parentGridObject;
        this.visited = false;
        this.isStartNode = false;
        this.isEndNode = false;
        this.isWall = false;
        this.node = null;
        this.neighbours = [];
    }
    draw(parent){
        if(!parent) throw new Error("Parent container not defined!");

        this.node = document.createElement("div");
        this.node.className = "emptyNode";
        this.node.onmouseenter = () => this.onEnterHandler();
        this.node.onmousedown = () => this.onMouseDownHandler();
        this.node.onmouseup = () => this.onMouseUpHandler();
        this.node.onclick = () => this.onMouseClickHandler();
        //TODO: implement these 2 next time.
        parent.appendChild(this.node);
    }

    onEnterHandler = () => {
        if(mode === "DRAW_WALLS" || "DELETE_WALLS")
        this.drawWallNode();
    }

    onMouseDownHandler = () => {
        mouseDown();
        this.drawWallNode();
    }

    onMouseUpHandler = () => {
        mouseUp();
    }

    onMouseClickHandler = () => {
        if(mode === "SELECT_START_NODE"){
            this.grid.setStartNode(this.x, this.y);
            changeMode("SELECT_END_NODE");
        }
        else if(mode === "SELECT_END_NODE"){
            this.grid.setEndNode(this.x, this.y);
            changeMode("DRAW_WALLS");
        }
    }

    setAsStartNode(){
        this.isStartNode = true;
        this.node.className = "startNode";
    }
    setAsEndNode(){
        this.isEndNode = true;
        this.node.className = "endNode";
    }

    drawWallNode = () => {
        if((mode != "DRAW_WALLS" && mode !="DELETE_WALLS") 
        || currentlyDrawing === false )
        return;

        if (mode === "DRAW_WALLS"){
            if(!this.isWall)
                this.isWall = true;
            if(this.node.className == "emptyNode")
                this.node.className = "wallNode";
        }
        else if (mode === "DELETE_WALLS"){
            if(this.isWall)
                this.isWall = false;
            if(this.node.className == "wallNode")
                this.node.className = "emptyNode";
            }
        }

        visitNode =  () => {
                
                console.log("Visited!");
                this.visited = true;
                if(this.node.className === "emptyNode")
                this.node.className = "visited flip-in-ver-right";
                //this.node.innerText = this.distance;

        }
    
        addNeighbours =  (neighbours) => {
            this.neighbours = [...neighbours];
            console.log(this.neighbours)
            
            // this.neighbours.forEach( nb => {
                
            //     console.log("ZZZZZZZ");
            //     nb.visitNode();
            // });
        }
    }
