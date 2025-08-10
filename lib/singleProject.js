import getCookie from "./getCookie";


const singleProject = async ({project_id}) => {


    const accessToken = (await getCookie({ name: 'token' })).value
    const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/project/${project_id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },


    })

    return result.json();



}

export default singleProject