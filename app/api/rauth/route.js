import { NextResponse } from "next/server";
import { VerifyToken } from "@/services/providers";
export async function GET(request) {
    try{
    const token=request.cookies.get('token')
    if(!token)
    return NextResponse.json({status:500,isuser:false,token:token})
    console.log("from here",token)
    const user=VerifyToken(token.value)
    if(user)
    return NextResponse.json({status:500,isuser:true,user:user})
    else
    return NextResponse.json({status:500,isuser:false})
    }


    catch(e){
        console.log("error while autentication",e.message)
    return NextResponse.json({status:500,isuser:false,mission:e.message})

    }



}
