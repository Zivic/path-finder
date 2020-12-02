
   async function Dijkstra(graph,rootNode,goalNode){

        let localGraph = graph.grid;
        let Q = new Set();

        localGraph.forEach(row => {
            row.forEach(node => {
            node.distance = 9999;
            node.previousNode = null;
            Q.add(node);
            })
        })
        //TODO: rootNode i goalNode su koordinate pa se nadje u lokanoj kopiji ?
        
        rootNode.distance = 0;

        //current
        let x=15;
        let y=5;
        let iterations = 0;

        var promise2 = null;
        while (Q.size != 0 && iterations <10){
            //TODO: This  is hacky, fix it with a proper promise after "promise" finishes
            await new Promise(r => setTimeout(r, 4000));
            //await promise2;
            iterations++;
            
            //TODO:pomeri ovo gore ?? ova 2 reda
            let distanceDictionary = new Object();
            let previousDictionary = new Object();
            //console.log(getMin()); //trebalo bi da vrati objekat
            Q.forEach(vertexNode => {
                distanceDictionary[vertexNode] = vertexNode.distance;
                previousDictionary[vertexNode] = null;
            });
            
            //let u = vertex in Q with min dist[u]
            let currentMinimalNode = getMin(Q);
            Q.delete(currentMinimalNode.value);

            //if(u.hasGoal()) break;
            if(currentMinimalNode.isEndNode === true) break;
            //TODO: pozovi generateneighbors za  currentMinimalnode

            //forEach neighbor v in u{
                //TODO: Generisi neighbors ovde !
            graph.generateNeighbours(currentMinimalNode.value.x, currentMinimalNode.value.y);

            let interval = 1000;
            var promise = Promise.resolve();

            currentMinimalNode.value.neighbours.forEach((neighborNode) => {
                promise = promise.then(() => {
//SVE               console.log('pppp');
           console.log(neighborNode);
           neighborNode.distance = currentMinimalNode.value.distance+1;
           neighborNode.visitNode();
           

           console.log(neighborNode.distance);
           console.log(neighborNode.distance);
           let alt = currentMinimalNode.distance + lengthBetweenNodes(currentMinimalNode,neighborNode);
            if (alt < neighborNode.distance){
                distanceDictionary[v] = alt;
                previousDictionary[v] = currentMinimalNode;
            }
                    return new Promise(resolve => setTimeout(resolve, interval));
                })
           // alt = dist[u]+ length(u,v) //length je 1 za direkntog neoghboura i sabira se za ostale
           
           //promise.then(() => promise2.resolve());


        })
        
        }
        console.log("Dijkstra complete!");
        return distanceDictionary, previousDictionary;
    }


    function getMin(set) {
        var iterator = set.values();
        let min = iterator.next();
        let current = min;
        console.log(current.value);
        iterator = null;
        iterator = set.values(); //test

        set.forEach(node => {
            current = iterator.next();
            let a = min.value.distance;
            if(a > current.value.distance)
            min = current;
        })
        console.log(`Found minimal node : ${min.value.x} , ${min.value.y}`);
        console.log(min);
        return min;
      }
      
      function lengthBetweenNodes(startNode, endNode) {
        return endNode.distance - startNode.distance;
      }

export default Dijkstra;