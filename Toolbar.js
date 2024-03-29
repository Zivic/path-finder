import {newGrid as gridObject} from "./main.js";
class Toolbar {
    constructor(){
        console.log('Test constructor...');
    }

    draw(parent){
        if(!parent) throw new Error("Parent container not defined!");

        let navbar = document.createElement("nav");
        navbar.className = "";
        parent.appendChild(navbar);

        let btnToggleDrawMode = document.createElement("button");
        btnToggleDrawMode.className = "btnToggleDrawMode";
        btnToggleDrawMode.innerText = "Toggle!";
        btnToggleDrawMode.onclick = () => this.toggleDrawMode();
        navbar.appendChild(btnToggleDrawMode);

        let btnToggleSelectEndpointsMode = document.createElement("button");
        btnToggleSelectEndpointsMode.className = "btnToggleSelectEndpointsMode";
        btnToggleSelectEndpointsMode.innerText = "Toggle select endpoints!";
        btnToggleSelectEndpointsMode.onclick = () => this.toggleSelectEndpointsMode();
        navbar.appendChild(btnToggleSelectEndpointsMode);

        let btnStartDijkstra = document.createElement("button");
        btnStartDijkstra.innerText = "Start Dijkstra!";
        btnStartDijkstra.onclick = () => {
            gridObject.runDijkstra();
        }
        navbar.appendChild(btnStartDijkstra);

        let btnStartAStar = document.createElement("button");
        btnStartAStar.innerText = "Start A*!";
        btnStartAStar.onclick = () => {
            gridObject.runAStar();
        }
        navbar.appendChild(btnStartAStar);

        let btnClear = document.createElement("button");
        btnClear.innerText = "Clear grid";
        btnClear.onclick = () => gridObject.clearGrid();
        navbar.appendChild(btnClear);
        
    }

    toggleDrawMode = () => {
        console.log(mode);

        if(mode === "DRAW_WALLS")
        mode = "DELETE_WALLS";

        else if (mode === "DELETE_WALLS")
        mode = "DRAW_WALLS";
    }

    toggleSelectEndpointsMode = () => {
        console.log(mode);
        if(mode != "SELECT_START_NODE")
        mode = "SELECT_START_NODE";

        else mode = "DRAW_WALLS";
    }
    
    
}
var mouseDown = () => {
    currentlyDrawing = true;
}

var mouseUp = () => {
    currentlyDrawing = false;
}

var changeMode = (newMode) => {
    mode = newMode;
}
var mode = "DRAW_WALLS";
var currentlyDrawing = false;
export {Toolbar, mode, changeMode, currentlyDrawing, mouseDown, mouseUp};
