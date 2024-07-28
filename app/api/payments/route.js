import { NextResponse } from 'next/server';
import Payment from '@/models/booking'; // Adjust the import path if necessary
// import Twilio from 'twilio/lib/rest/Twilio';
import * as nodemailer from "nodemailer" 

export async function POST(request) {
    try {
        const re = await request.json();
        const newPayment = await Payment.create(re);
        console.log("Payment created:", newPayment)
    //  return NextResponse.json({mission:"succesfull"});
     try{
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.EMAIL_USER, // Use environment variable for email
              pass: process.env.EMAIL_PASS  // Use environment variable for password
            }
          });
          
          // Define the email options
          const mailOptions = {
            from: process.env.EMAIL_USER, // Sender address
            to: re.email, // List of recei
            subject: 'Payment Confirmation',
                text: 'Your payment has been successfully processed.',
                html: '<b>Your payment has been successfully processed.Refresh page or 5 Minutes delay is Done</b>'
          };
          
          // Send the email
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
          });
     }
     catch(e){
        console.log("error from nodemailer")

     }
     return NextResponse.json({mission:"succesfull"});

} catch (e) {
        console.error("Error creating payment:", e);
        return NextResponse.json({ status: 500, error: 'Internal Server Error', details: e.message });
    }
}

