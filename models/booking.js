import mongoose from "mongoose";
import  connect  from "@/dB.config/mongoconn";
import { json } from "express";
const Schema = mongoose.Schema;

connect();

// Define the Payment schema
const paymentSchema = new Schema({
  price:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  name:{
    type:String,
    required:true
  },
  hotel:{
    type:String,
    required:true
  },
   desc:{
    type:String,
   },
   imageid:{
    type:String,
    required:true

   },
   bookedDate:{
    type:Date,
    default:Date.now
   },

  rid:{
    type:String,
    required:true
  },
  address: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 100
  },

  phonenumber: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 13
  },
  quantity: {
    type: String,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ['cod', 'upi', 'card', 'netbanking'] // Define allowed values
  },
  bank: {
    type: String,
    required: function() {
      return this.paymentMethod === 'netbanking';
    },
    enum: [
      "State Bank of India",
      "HDFC Bank",
      "Karnataka Bank",
      "ICICI Bank",
      "Axis Bank",
      "Punjab National Bank",
      "Bank of Baroda",
      "Kotak Mahindra Bank",
      "IndusInd Bank",
      "Canara Bank",
      "Union Bank of India",
      "IDBI Bank",
      "Bank of India",
      "Central Bank of India",
      "Indian Bank",
      "Yes Bank"
    ]
  },
  upinumber: {
    type: String,
    required: function() {
      return this.paymentMethod === 'upi';
    },
    match: [/^\d{10}@[a-zA-Z]+$/, 'Invalid UPI']
  },
  cardnumber: {
    type: String,
    required: function() {
      return this.paymentMethod === 'card';
    },
    minlength: 16,
    maxlength: 16
  },
  expiryDate: {
    type: String,
    required: function() {
      return this.paymentMethod === 'card';
    },
    match: [/^(0[1-9]|1[0-2])\/\d{2}$/, 'Invalid expiry date']
  },
  cvv: {
    type: String,
    required: function() {
      return this.paymentMethod === 'card';
    },
    minlength: 3,
    maxlength: 3
  },
  // recipe:{
  //   type:json(),
  //   required:true
  // }
});

// Create the Payment model
// const Payment = mongoose.model('Payment', paymentSchema);
const Payment=mongoose.models.Payment || mongoose.model('Payment', paymentSchema);


export default Payment;
