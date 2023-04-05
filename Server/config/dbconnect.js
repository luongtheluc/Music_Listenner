const { default: mongoose } = require('mongoose');

const dbConnect = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        if (conn.connection.readyState === 1) {
            console.log("Db connection is successfully");
        }
        else {
            console.log("Db is connecting");
        }
    } catch (error) {
        console.log("Db connect fail")
        throw new Error(error);
    }
}

module.exports = dbConnect
