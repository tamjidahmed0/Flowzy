import { NextResponse } from 'next/server'


export async function middleware(request) {
    const token = request.cookies.get('token')?.value || null
    const isDashboard = request.nextUrl.pathname.startsWith("/dashboard")
    const isProtectedRoute = isDashboard || request.nextUrl.pathname.startsWith("/projects") || request.nextUrl.pathname.startsWith("/settings")
    const isLoginPage = request.nextUrl.pathname === "/"


    if (!token) {

        if (isProtectedRoute) {
            console.log('No token, redirecting to login')
            return NextResponse.redirect(new URL('/', request.url))
        }

        return NextResponse.next()
    }


    try {
        const verifyRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/validate-token`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })



        if (verifyRes.status === 201) {

            if (isLoginPage) {
                return NextResponse.redirect(new URL('/dashboard', request.url))
            }

            return NextResponse.next()
        } else {


            const response = NextResponse.redirect(new URL('/', request.url))
            response.cookies.delete('token')
            return response
        }
    } catch (error) {
        const response = NextResponse.redirect(new URL('/', request.url))
        response.cookies.delete('token')
        return response
    }
}

export const config = {
    matcher: [

        '/dashboard/:path*',
        '/projects/:path*',
        '/profile/:path*',
        '/settings/:path*',
        '/'
    ],
}