import {Grid} from "./Grid.js";
let newGrid = new Grid(30,45);
newGrid.draw(document.body);
newGrid.setStartNode(15,5);
newGrid.setEndNode(20,27);