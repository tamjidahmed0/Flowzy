import getCookie from "./getCookie";

const createProject = async ({
    projectName,
    description
}) => {

    const accessToken = (await getCookie({ name: 'token' })).value


    const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/create-project`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
            projectName,
            description

        })

    })


    return result.json();



}

export default createProject