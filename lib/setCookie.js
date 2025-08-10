'use server'

import { cookies } from 'next/headers'

export async function createCookie({ name, value,  maxAge}) {
    const cookieStore = await cookies()


    cookieStore.set({
        name,
        value,
        httpOnly: process.env.NODE_ENV !== 'production',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        maxAge
    })
}