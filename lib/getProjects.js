import getCookie from "./getCookie";


const getProjects = async () => {

    const accessToken = (await getCookie({ name: 'token' })).value
    const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/projects`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },


    })

    return result.json();



}

export default getProjects