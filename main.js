import {Grid} from "./Grid.js";
import {Toolbar} from "./Toolbar.js";


let toolbar = new Toolbar();
toolbar.draw(document.body);

let newGrid = new Grid(30,45);
newGrid.draw(document.body);
newGrid.setStartNode(15,5);
newGrid.setEndNode(20,27);

//newGrid.generateNeighbours(15,5);
//newGrid.runDijkstra();

export {newGrid};
