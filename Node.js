import {mode, mouseDown, mouseUp, currentlyDrawing} from "./Toolbar.js";
export default class Node{
    constructor(){
        this.visited = false;
        this.isStartNode = false;
        this.isEndNode = false;
        this.isWall = false;
        this.node = null;
        this.neighbors = [];
    }
    draw(parent){
        if(!parent) throw new Error("Parent container not defined!");

        this.node = document.createElement("div");
        this.node.className = "emptyNode";
        this.node.onmouseenter = () => this.onEnterHandler();
        this.node.onmousedown = () => this.onMouseDownHandler();
        this.node.onmouseup = () => this.onMouseUpHandler();
        //TODO: implement these 2 next time.
        parent.appendChild(this.node);
    }

    onEnterHandler = () => {
        this.drawWallNode();
    }

    onMouseDownHandler = () => {
        mouseDown();
        this.drawWallNode();
    }

    onMouseUpHandler = () => {
        mouseUp();
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
            if(!this.node.isWall)
                this.node.isWall = true;
            if(this.node.className == "emptyNode")
                this.node.className = "wallNode";
        }
        else if (mode === "DELETE_WALLS"){
            if(this.node.isWall)
                this.node.isWall = false;
            if(this.node.className == "wallNode")
                this.node.className = "emptyNode";
            }
        }
    }
