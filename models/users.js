import mongoose from 'mongoose';
import { createHmac, randomBytes } from 'crypto';
import connect from "../dB.config/mongoconn"
import { type } from 'os';
// import { createHmac,randomBytes } from 'crypto';
connect();

const Schema = mongoose.Schema;

// Define the User schema
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
    // required: true,
  },
  password: {
    type: String,
    required: true,
  },
  idolname:{
    type:String,
    required:true,
  }
}, { timestamps: true });


userSchema.pre('save', async function (next) {
  const user=this
  if (!user.isModified('password')) {
    return;
  }

    const salt = await randomBytes(16).toString();
    const hash = await createHmac('sha256',salt).update(user.password).digest('hex');
    const hid = await createHmac('sha256',salt).update(user.idolname).digest('hex');

    this.password = hash;
    this.salt = salt;
    this.idolname=hid;
    next();
});

userSchema.static("matchPassword",async function(email,password)
{
  const user= await this.findOne({email})
  if(!user) return false;
  const salt=await user.salt
  const hashpassword=await user.password
  const provided= await createHmac('sha256',salt).update(password).digest('hex')
  if(hashpassword!==provided) {return false}
  return {email:user.email,name:user.name,isuser:true}
})

userSchema.static("Forgot",async function(email,idolname)
{
  const user= await this.findOne({email})
  if(!user) return false;
  const salt=await user.salt
  const hashpassword=await user.idolname
  const provided= await createHmac('sha256',salt).update(idolname).digest('hex')
  if(hashpassword!==provided) {return false}
  return {email:user.email,name:user.name,isuser:true}
})

userSchema.static("Reset",async function(email,password)
{
  const user= await this.findOne({email})
  if(!user) return false;
  const salt=await user.salt
  const pass= await createHmac('sha256',salt).update(password).digest('hex')
  this.password=pass
  return true
})

const Users = mongoose.models.users || mongoose.model('users', userSchema);
Users.matchPassword = userSchema.statics.matchPassword;
Users.Forgot = userSchema.statics.Forgot;
Users.Reset = userSchema.statics.Reset;



export default Users;
