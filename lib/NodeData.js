
const NodeData = async({
    node,
    edge
}) => {

    const result  = await fetch(`http://localhost:9000`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            node: node,
            edge: edge 

        })

    })


    return result.json();


  
}

export default NodeData