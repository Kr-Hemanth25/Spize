import mongoose from 'mongoose';

const connect = async () => {
    try {
        await mongoose.connect(process.env.mongodb, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully');
    } catch (e) {
        console.log('MongoDB connection error:', e);
    }
};
export default connect;
