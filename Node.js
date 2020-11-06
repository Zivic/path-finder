import {mode} from "./Toolbar.js";
export default class Node{
    constructor(){
        this.visited = false;
        this.isStartNode = false;
        this.isEndNode = false;
        this.isWall = false;
        this.node = null;
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
        if(mode != "DRAW_WALLS")
        return;

        if(this.node.isWall){
            this.node.isWall = !this.node.isWall;
        }
        if(this.node.className == "emptyNode")
            this.node.className = "wallNode";
        //TODO: fix this, can be other classes
        //else this.node.className = "emptyNode"; 

    }
    

    setAsStartNode(){
        this.isStartNode = true;
        this.node.className = "startNode";
    }
    setAsEndNode(){
        this.isEndNode = true;
        this.node.className = "endNode";
    }
}