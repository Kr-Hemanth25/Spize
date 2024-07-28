import { NextResponse } from 'next/server';
import Payment from '@/models/booking'; // Adjust this path as per your project structure
import * as nodemailer from "nodemailer";

export async function POST(request) {
    try {
        const requestData = await request.json();
        // console.log(requestData)
        const {payment,...rest}=requestData
        // console.log(payment,rest)
       payment.map(async(element)=>{
        const newPayment = await Payment.create({...element,...rest});
        console.log("Payment created:", newPayment)

       })



        // Send confirmation email
        try {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS
                }
            });

            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: requestData.email,
                subject: 'Payment Confirmation',
                text: 'Your payment has been successfully processed.',
                html: '<b>Your payment has been successfully processed.Refresh page or 5 Minutes delay is Done</b>'
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log('Error sending email:', error);
                } else {
                    console.log('Email sent:', info.response);
                }
            });
        } catch (error) {
            console.error('Error sending email:', error);
        }

        return NextResponse.json({ message: "Successfully added payments and sent confirmation email." });
    } catch (error) {
        console.error('Error processing payments:', error);
        return NextResponse.json({ status: 500, error: 'Internal Server Error', details: error.message });
    }
}
