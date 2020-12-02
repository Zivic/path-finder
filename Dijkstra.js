async function Dijkstra(graph, rootNode, goalNode) {

    let localGraph = graph.grid;
    let Q = new Set();

    localGraph.forEach(row => {
        row.forEach(node => {
            node.distance = 9999;
            node.previousNode = null;
            Q.add(node);
        })
    })
    rootNode.distance = 0;

    let x = 15;
    let y = 5;
    let iterations = 0;
    let distanceDictionary = new Object();
    let previousDictionary = new Object();


    while (Q.size != 0 && iterations < 20) {

        var promise2 = new Promise((resolve, reject) => {
            iterations++;

            Q.forEach(vertexNode => {
                distanceDictionary[vertexNode] = vertexNode.distance;
                previousDictionary[vertexNode] = null;
            });

            let currentMinimalNode = getMin(Q);
            Q.delete(currentMinimalNode.value);

            //if(u.hasGoal()) break;
            //TODO: Vrati ovo
            //if(currentMinimalNode.isEndNode === true) break;

            graph.generateNeighbours(currentMinimalNode.value.x, currentMinimalNode.value.y);

            let interval = 200;
            var promise = Promise.resolve();
            let itemsProcessed = 0;
            let nonVisitedNodes = [];

            currentMinimalNode.value.neighbours.forEach((neighborNode) => {
                if (neighborNode.visited === false) {
                    nonVisitedNodes.push(neighborNode);
                }
            })

            nonVisitedNodes.forEach((neighborNode, index, array) => {
                promise = promise.then(() => {

                        if (!neighborNode.isWall)
                            neighborNode.distance = currentMinimalNode.value.distance + 1;
                        neighborNode.visitNode();
                        let alt = currentMinimalNode.distance + lengthBetweenNodes(currentMinimalNode, neighborNode);
                        if (alt < neighborNode.distance) {
                            distanceDictionary[v] = alt;
                            previousDictionary[v] = currentMinimalNode;
                        }
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
    return distanceDictionary, previousDictionary;
}


function getMin(set) {
    var iterator = set.values();
    let min = iterator.next();
    let current = min;
    //console.log(current.value);
    iterator = null;
    iterator = set.values(); //test

    set.forEach(node => {
        current = iterator.next();
        let a = min.value.distance;
        if (a > current.value.distance)
            min = current;
    })
    //console.log(`Found minimal node : ${min.value.x} , ${min.value.y}`);
    //console.log(min);
    return min;
}

function lengthBetweenNodes(startNode, endNode) {
    return endNode.distance - startNode.distance;
}

export default Dijkstra;