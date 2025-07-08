
const RunFlow = async({
    nodes,
    edges
}) => {

    const newNodes = nodes.map(({icon, color, ...rest})=> rest )
    console.log(newNodes)


    const result  = await fetch(`http://localhost:9000/api/runFlow`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nodes: newNodes,
            edges: edges

        })

    })

    


    return result.json();


  
}

export default RunFlow