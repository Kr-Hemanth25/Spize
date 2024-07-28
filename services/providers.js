import jwt from "jsonwebtoken"
const secret="krHemanth@252005"

export function CreateToken(user){
    const payload={
        email:user.email,
        name:user.name,
        isuser:user.isuser
    }
    console.log("from services",payload)
    const token=jwt.sign(payload,secret)
    return token
}

export function VerifyToken(token)
{
    const user=jwt.verify(token,secret)
    console.log("from verify",user)
    return user

}