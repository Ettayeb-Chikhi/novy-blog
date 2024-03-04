import { NextResponse } from 'next/server'

// This function can be marked `async` if using `await` inside
const protectedRoutes = ["/novy-blog/create","/novy-blog/profile","/novy-blog/profile/edit"];
export async  function middleware(request) {
    const isAuth = request.cookies.get("next-auth.session-token")?.value != undefined;
    const url = request.nextUrl.pathname;

    // check if user is authenticated an attempts to login
    if(isAuth && url==="/login"){
        return NextResponse.redirect(new URL("/novy-blog",request.url))
    }
    if(!isAuth && protectedRoutes.includes(url)){
        return NextResponse.redirect(new URL("/novy-blog",request.url))
    }

    
    
}