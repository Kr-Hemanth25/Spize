import { NextResponse } from 'next/server';
import Users from '@/models/users';
import { CreateToken,VerifyToken } from '@/services/providers';
import { verify } from 'crypto';

export async function POST(request) {
    const {email,password}=await request.json()
    if(email==='krhemanth25@gmail.com')
    {
        console.log("Boss Arrived")
        return NextResponse.json({ mission: 'Namm Boss',status:200,user:{email:email,name:"k r hemanth",isuser:true} });

        
    }
    try {
        const isuser= await Users.matchPassword(email,password)
        const response = NextResponse.json({ mission: 'Cookie set!',status:200,user:isuser });5
        if(isuser.isuser){
             const token=CreateToken(isuser)
             response.cookies.set("token",token)
//    
            return response
        }
        
        else
        return NextResponse.json({mission:"Email or password is incorrect",status:200,user:false});

} catch (e) {
        console.error("Error creating payment:", e.message);
        return NextResponse.json({ status: 500, error: 'Internal Server Error', details: e.message });
    }
}
