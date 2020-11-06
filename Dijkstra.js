class Dijkstra{ //TODO: nije klasa
    constructor(graph,rootNode,goalNode){
        this.graph = graph;
        this.Q = new Set();

        this.graph.forEach(node => {
            node.distance = 9999;
            node.previousNode = null;
            this.Q.add(node);
        })
        //TODO: rootNode i goalNode su koordinate pa se nadje u lokanoj kopiji ?
        rootNode.distance = 0;
        while (this.Q.size != 0){

            
            let distArray = [];
            console.log(this.getMin()); //trebalo bi da vrati objekat
            //this.Q.forEach(vertexNode => distArray.push(vertexNode.distance))
            /*
            //let u = vertex in Q with min dist[u]
            //Q.remove(u)
            //if(u.hasGoal()) break;
            //forEach neighbor v in u{
            alt = dist[u]+ length(u,v) //length je 1 za direkntog neoghboura i sabira se za ostale
            if (alt < dist[v]){
                dist[v] = alt;
                prev[v] = u;
            }
        }
    }return dist[], prev[];
            //}*/
        }
    }
    getMin() {
        return this.Q.reduce((min, p) => p.distance < min ? p.distance : min, this.Q[0].distance);
      }
}