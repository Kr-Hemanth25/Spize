import { NextResponse } from 'next/server';
import Payment from '@/models/booking'; // Adjust the import path if necessary

export async function POST(request) {
    try {
        const re = await request.json();
        // console.log(re)
        const history= await Payment.find({email:re.email})
        // console.log(history)
     return NextResponse.json({mission:"succesfull",history:history,status:200});
} catch (e) {
        console.error("Error creating payment:", e);
        return NextResponse.json({ status: 500, error: 'Internal Server Error', details: e.message });
    }
}