import { NextResponse } from 'next/server';
// import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request) {
  try {
    const cookieStore = cookies();
    const check=cookieStore.get('token')

    // cookieStore.delete('token');
    // // const check=cookieStore.get('token')
    console.log("token no is",check)
    if(check){
      console.log("muser")
    cookieStore.delete('token');
      
    return NextResponse.json({ message: 'Token deleted successfully', status: 200 ,user:true})
    }
    else{
      console.log("github from else")

    return NextResponse.json({ message: 'Github User ', status: 200,user:false });
    }

  } catch (error) {
    console.error('Error deleting cookie:', error);
    // return NextResponse.json({ message: 'Error deleting token', status: 500,user:false });
  }


}
