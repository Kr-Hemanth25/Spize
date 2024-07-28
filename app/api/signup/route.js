import Users from '@/models/users'; // Adjust the path to your User model
import { NextResponse } from 'next/server';
import { createHmac, randomBytes } from 'crypto';
import * as nodemailer from "nodemailer" 


export async function POST(request) {
  try {
    const user = await request.json();
    const exist = await Users.findOne({ email: user.email });
    
    if (exist) {
      return NextResponse.json({message:'user already exist',created:0,exist:1});
    }

    const { email, name, password,idolname } = user;
    const id=idolname.toLowerCase()
    // const salt = randomBytes(16).toString('hex');
    // const hash_p = createHmac('sha256', salt).update(password).digest('hex');
    // console.log(user,id)

    const newUser = new Users({email: email,name: name,password: password,idolname:id});

    await newUser.save();
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
          to: user.email, // List of receivers
          subject: 'Hello from Spize', // Subject line
          text: 'This is a plain text message', // Plain text body
          html: '<b>This is a testing Website Created BY student,So No Realistic Delivery will Be Done</b>' // HTML body
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

    return NextResponse.json({ message: 'User created successfully', user: newUser, status: 200,exist:0,created:1 });
  } catch (error) {
    console.error('Error creating user:', error.message);
    return NextResponse.json({ status: 500, error: 'Internal Server Error', details: error.message });
  }
}







