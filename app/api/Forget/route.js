import { NextResponse } from 'next/server';
import Users from '@/models/users';
export async function POST(request) {
    const {email,idolname}=await request.json()
    let id=idolname.toLowerCase()
    try {
        const isuser= await Users.Forgot(email,id)
        if(isuser.isuser){
        return NextResponse.json({mission:"password reset possible",status:200,user:true,email:isuser.email});


        }
        
        else
        return NextResponse.json({mission:"Email or idolname is mismatching",status:200,user:false});

} catch (e) {
        console.error("Error creating payment:", e.message);
        return NextResponse.json({ status: 500, error: 'Internal Server Error', details: e.message });
    }
}
