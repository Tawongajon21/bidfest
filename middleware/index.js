import { NextResponse } from "next/server";

export function middleware(request){
    const pathname=request.nextUrl.pathname;
    console.log(pathname);
    const response=NextResponse.next();
    response.headers.set("x-pathname",pathname);

    return response
}

