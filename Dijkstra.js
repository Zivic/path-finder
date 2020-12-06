async function Dijkstra(graph, rootNode, endNode) {

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
    let breakFlag = false;


    while (Q.size != 0 && iterations < 1200) {
        

        var promise2 = new Promise((resolve, reject) => {
            iterations++;

            Q.forEach(vertexNode => {
                distanceDictionary[`${vertexNode.x},${vertexNode.y}`] = vertexNode.distance;
                previousDictionary[`${vertexNode.x},${vertexNode.y}`] = null;
                //console.log(distanceDictionary);
            });

            let currentMinimalNode = getMin(Q);
            Q.delete(currentMinimalNode.value);

            //if(u.hasGoal()) break;
            //TODO: Vrati ovo
            if(currentMinimalNode.value.isEndNode === true) {
                iterations = 9999;
                console.error("Pronadjen kraj");
            }

            graph.generateNeighbours(currentMinimalNode.value.x, currentMinimalNode.value.y);

            let interval = 1;
            var promise = Promise.resolve();
            let itemsProcessed = 0;
            let nonVisitedNodes = [];

            currentMinimalNode.value.neighbours.forEach((neighborNode) => {
                if (neighborNode.visited === false) {
                    nonVisitedNodes.push(neighborNode);
                }
            })

            if(nonVisitedNodes.length === 0)
            resolve();

            nonVisitedNodes.forEach((neighborNode, index, array) => {
                promise = promise.then(() => {

                        if (!neighborNode.isWall){
                            neighborNode.distance = currentMinimalNode.value.distance + 1;
                            neighborNode.previous = currentMinimalNode.value;
                        }
                        neighborNode.visitNode();
                        let alt = currentMinimalNode.value.distance 
                        + lengthBetweenNodes(currentMinimalNode.value, neighborNode);
                        console.log("Alt: " + alt + "dist: " + neighborNode.distance);

                        if (alt < neighborNode.distance) {
                            console.error("CHanged");
                            distanceDictionary[`${neighborNode.x},${neighborNode.y}`] = alt;
                            previousDictionary[`${neighborNode.x},${neighborNode.y}`] = currentMinimalNode.value;
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
    // previousDictionary.forEach((obj) =>{
    //     if(obj.value != null)
    //     console.log("Found");
    // })
    
    console.log("Dijkstra complete!");
    console.log(distanceDictionary);
    console.log(previousDictionary);

    recursiveChangeOfColor(endNode);

    return distanceDictionary, previousDictionary;
}

async function recursiveChangeOfColor(startingNode) {
    let promise = new Promise(resolve => setTimeout(resolve, 10));
    await promise
    .then(()=> {
        startingNode.previous.node.className = "traversed flip-in-ver-right";
        recursiveChangeOfColor(startingNode.previous);
    })
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