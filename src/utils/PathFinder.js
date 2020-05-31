const findShortestPath = (graph, start, end) => {
  //LLeva un segumiento del origen al destino con un mapa
  let distances = { };
  distances[end] = "Infinity";
  distances = Object.assign(distances, graph[start].adyacents);

  //Guardamos los caminos
  let parents = { end: null };
  for (let adyacent in graph[start].adyacents) {
    parents[adyacent] = start;
  }
    
  let visited = []; //se guardan los visitados
  let node = shortestDistanceNode(distances, visited); // nos quedamos con el mas cercano

  while (node) {
    //Calculamos al distancia entre el nodo y sus aledaños
    let distance = distances[node]; 
    if(graph[node]){   
      let adyacentsNodes = graph[node].adyacents;
        for(let adyacent in adyacentsNodes){
          if (adyacent !== start) { //Nos aseguramos que no son el mismo nodo
            //Calculamos la distancia desde el principio al nodo
            let newdistance = distance+adyacentsNodes[adyacent];

            /*Si no hay calculado un coto del nodo principal al nodo adyacente, o si el costo 
            es mayor que el nuevo costo. Se  guarda el costo y el nodo*/
            var actualDistance = distances[adyacent];
            if (!actualDistance || actualDistance > newdistance) {
              distances[adyacent] = newdistance;
              parents[adyacent] = node;
            }
          }
        }
        
      }
      visited.push(node); //guardamos el nodo como visitado
      node = shortestDistanceNode(distances, visited); //saltamos el mas cercano
  }

  // Guardamos el camino mas corto del origen al destino
  let shortestPath = [end];
  let parent = parents[end];
  while (parent) {
    shortestPath.push(parent);
    parent = parents[parent];
  }
  //Invertimos la lisa para que quede el camino del origen al destino y la retornamos.
  return shortestPath.reverse();
};

const shortestDistanceNode = (distances, visited) => {
  let shortest = null;

  for (let node in distances) {
    //Si es el camino mas corto y no fue visitado lo guardamos como el mas cercano
    if ((shortest === null || distances[node] < distances[shortest])
        && !visited.includes(node)) {
      shortest = node;
    }
  }
  
  return shortest;
};

export default findShortestPath;