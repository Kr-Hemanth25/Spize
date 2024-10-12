import mongoose from 'mongoose';

const connect = async () => {
    try {
        await mongoose.connect('mongodb+srv://Kr-Hemanth25:Hemanth252005@spize.170tsem.mongodb.net/');
        console.log('MongoDB connected successfully');
    } catch (e) {
        console.log('MongoDB connection error:', e);
    }
};
export default connect;
