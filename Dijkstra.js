    function Dijkstra(graph,rootNode,goalNode){
        let localGraph = graph;
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
        
        while (this.Q.size != 0){

            
            let distArray = [];
            //console.log(getMin()); //trebalo bi da vrati objekat
            this.Q.forEach(vertexNode => distArray.push(vertexNode.value.distance))
            
            //let u = vertex in Q with min dist[u]
            let u = getMin(Q);

            Q.remove(u)
            
            //if(u.hasGoal()) break;
            if(u.isEndNode === true) break;

            forEach neighbor v in u{
            alt = dist[u]+ length(u,v) //length je 1 za direkntog neoghboura i sabira se za ostale
            if (alt < dist[v]){
                dist[v] = alt;
                prev[v] = u;
            }
        }
    }return dist[], prev[];
            }
        } 
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
        console.log(min.value);
        return min;
      }

export default Dijkstra;