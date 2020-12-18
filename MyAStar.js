async function AStar(graph,root,goal){
    let openSet = new Set();
    graph.grid.forEach(row => {
        row.forEach(node => {
            node.f = 9999;
            node.g = 9999;
            node.previousNode = null;
            openSet.add(node);
        })
    })
    let closedSet = new Set();
    let cameFrom = []; //it's supposed to be a map
    root.g = 0;
    root.f = root.g + heuristicCostEstimate(root,goal);
    let iterations = 0;

    while(openSet.size > 0 && iterations < 1000){
        var promise2 = new Promise((resolve, reject) => {
            //console.log('AAAAAAAAAALLLLLLLLLLLOOO');
            iterations++;
            let interval = 1;
            var promise = Promise.resolve();
            let itemsProcessed = 0;
            let nonVisitedNodes = [];


        let currentMinimalNode = getMinFScore(openSet);
        if (currentMinimalNode.value.isEndNode === true) {
            iterations = 9999;
            console.error("Pronadjen kraj");
        }
        openSet.delete(currentMinimalNode.value);
        closedSet.add(currentMinimalNode.value);

        graph.generateNeighbours(currentMinimalNode.value.x, currentMinimalNode.value.y);
        currentMinimalNode.value.neighbours.forEach((neighborNode) => {
            if (neighborNode.visited === false) {
                nonVisitedNodes.push(neighborNode);
            }
        })
        console.log(nonVisitedNodes);

        if (nonVisitedNodes.length === 0)
                resolve();
                let tentativeGScore = 0;
                nonVisitedNodes.forEach((neighborNode, index, array) => {
                    promise = promise.then(() => {
                            if (!neighborNode.isWall) {
                                // neighborNode.distance = currentMinimalNode.value.distance + 1;
                                // neighborNode.previous = currentMinimalNode.value;
                                console.error(currentMinimalNode.value.g);
                                tentativeGScore = currentMinimalNode.value.g + 1;

                                if(closedSet.has(neighborNode) && tentativeGScore >= neighborNode.g){
                                    console.error("case 1");
                                return;//continue
                                }

                                if(!openSet.has(neighborNode) || tentativeGScore < neighborNode.g){
                                    console.error("case 2");
                                    neighborNode.previous = currentMinimalNode;
                                    neighborNode.g = tentativeGScore;
                                    neighborNode.f = neighborNode.g + heuristicCostEstimate(neighborNode, goal);
                                    if(!openSet.has(neighborNode))
                                    openSet.add(neighborNode);
                                }
                            }
                            neighborNode.visitNode();
                            return new Promise(resolve => setTimeout(resolve, interval));
                        })
                        .then(() => {
                            itemsProcessed++
                            console.log("Items processed: " + itemsProcessed)
                            if (itemsProcessed === array.length) {
                                resolve();
                            }
                        })
                })
            })
            await promise2;
    }
    console.log("a* complete!");
    recursiveChangeOfColor(goal);
    return;
}

 function heuristicCostEstimate(pos0, pos1) {
     console.log(pos0.x);
     console.log(pos1.x);
    // This is the Manhattan distance
    var d1 = Math.abs (pos1.x - pos0.x);
    var d2 = Math.abs (pos1.y - pos0.y);
    return d1 + d2;
  }

async function recursiveChangeOfColor(startingNode) {
    if (startingNode.previous.isStartNode)
        return;
    let promise = new Promise(resolve => setTimeout(resolve, 10));
    await promise
        .then(() => {
            startingNode.previous.node.className = "traversed flip-in-ver-right";
            recursiveChangeOfColor(startingNode.previous);
        })
}

function getMinFScore(set) {
    var iterator = set.values();
    let min = iterator.next();
    let current = min;
    iterator = null;
    iterator = set.values();

    set.forEach(node => {
        current = iterator.next();
        let a = min.value.f;
        if (a > current.value.f)
            min = current;
    })
    return min;
}
export default AStar;