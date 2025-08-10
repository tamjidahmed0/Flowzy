'use server'
import { createCookie } from "@/lib/setCookie";
import { redirect } from 'next/navigation'


const ValidateToken = async ({
    accessToken,
}) => {




    const result = await fetch(`http://localhost:9000/api/validate-token`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },


    })

    if (result.status === 201) {
        await createCookie({ name: 'token', value: accessToken, maxAge: 60 * 60 * 3 })
        redirect('/dashboard')
    }




    return result.json();



}

export default ValidateToken