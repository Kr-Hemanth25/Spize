import Users from '@/models/users'; // Adjust the path to your User model
import { NextResponse } from 'next/server';
import * as nodemailer from "nodemailer"


export async function POST(request) {
    try {
        const users = await request.json();
        const { email, password } = users
        const exist = await Users.findOne({ email:email });

        if (exist) {
            const user = await Users.Reset(email, password)
            if (user)
                try {
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
                        to: email, // List of receivers
                        subject: 'Password Reset- Spize', // Subject line
                        text: 'This is a plain text message', // Plain text body
                        html: '<b>Password Has Been Reseted For Your Account</b>' // HTML body
                    };

                    // Send the email
                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            return console.log(error);
                        }
                        console.log('Message sent: %s', info.messageId);
                    });
                }
                catch (e) {
                    console.log("error from nodemailer")

                }
            return NextResponse.json({ message: 'Password Reseted successfully', user: true, status: 200 });

        }

        return NextResponse.json({ message: 'Password reset unsuccessfully', user: false, status: 500 });
    } catch (error) {
        console.error('Error creating user:', error.message);
        return NextResponse.json({ status: 500, error: 'Internal Server Error', details: error.message });
    }
}