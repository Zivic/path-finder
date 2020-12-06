async function Dijkstra(graph, rootNode, endNode) {

    let Q = new Set();
    let iterations = 0;
    graph.grid.forEach(row => {
        row.forEach(node => {
            node.distance = 9999;
            node.previousNode = null;
            Q.add(node);
        })
    })
    rootNode.distance = 0;

    while (Q.size != 0 && iterations < 1200) {
        var promise2 = new Promise((resolve, reject) => {
            iterations++;
            let interval = 1;
            var promise = Promise.resolve();
            let itemsProcessed = 0;
            let nonVisitedNodes = [];

            let currentMinimalNode = getMin(Q);
            Q.delete(currentMinimalNode.value);

            if (currentMinimalNode.value.isEndNode === true) {
                iterations = 9999;
                console.error("Pronadjen kraj");
            }

            graph.generateNeighbours(currentMinimalNode.value.x, currentMinimalNode.value.y);
            currentMinimalNode.value.neighbours.forEach((neighborNode) => {
                if (neighborNode.visited === false) {
                    nonVisitedNodes.push(neighborNode);
                }
            })

            if (nonVisitedNodes.length === 0)
                resolve();

            nonVisitedNodes.forEach((neighborNode, index, array) => {
                promise = promise.then(() => {
                        if (!neighborNode.isWall) {
                            neighborNode.distance = currentMinimalNode.value.distance + 1;
                            neighborNode.previous = currentMinimalNode.value;
                        }
                        neighborNode.visitNode();
                        return new Promise(resolve => setTimeout(resolve, interval));
                    })
                    .then(() => {
                        itemsProcessed++
                        if (itemsProcessed === array.length) {
                            resolve();
                        }
                    })
            })
        })
        await promise2;
    }
    console.log("Dijkstra complete!");
    recursiveChangeOfColor(endNode);
    return;
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


function getMin(set) {
    var iterator = set.values();
    let min = iterator.next();
    let current = min;
    iterator = null;
    iterator = set.values();

    set.forEach(node => {
        current = iterator.next();
        let a = min.value.distance;
        if (a > current.value.distance)
            min = current;
    })
    return min;
}

export default Dijkstra;