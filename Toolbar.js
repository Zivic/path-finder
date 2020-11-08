class Toolbar {
    constructor(){
        console.log('Test constructor...');
    }

    draw(parent){
        if(!parent) throw new Error("Parent container not defined!");

        let navbar = document.createElement("nav");
        navbar.className = "";
        parent.appendChild(navbar);

        let btnToggleDrawMode = document.createElement("button")
        btnToggleDrawMode.className = "btnToggleDrawMode";
        btnToggleDrawMode.innerText = "Toggle!";
        btnToggleDrawMode.onclick = () => this.toggleDrawMode();
        navbar.appendChild(btnToggleDrawMode);

        
    }

    toggleDrawMode = () => {
        console.log(mode);

        if(mode === "DRAW_WALLS")
        mode = "DELETE_WALLS";

        else if (mode === "DELETE_WALLS")
        mode = "DRAW_WALLS";
    }

    
    
}
var mouseDown = () => {
    currentlyDrawing = true;
}

var mouseUp = () => {
    currentlyDrawing = false;
}
var mode = "DRAW_WALLS";
var currentlyDrawing = false;
export {Toolbar, mode, currentlyDrawing, mouseDown, mouseUp};
