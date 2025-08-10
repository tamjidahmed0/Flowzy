import getCookie from "./getCookie";


const updateProject = async ({ project_id, nodes, edges }) => {

    const newNodes = nodes.map(({ icon, color, ...rest }) => rest)


    const accessToken = (await getCookie({ name: 'token' })).value
    const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/project/${project_id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
            nodes: newNodes,
            edges
        })


    })

    return result.json();



}

export default updateProject