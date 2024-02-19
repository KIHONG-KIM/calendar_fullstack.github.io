const mongoose = require('mongoose');
require('dotenv').config();

module.exports = {
    db : async () => {
        try {
            await mongoose.connect(process.env.MONGODB_URI, {
                dbName: 'model',
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
            });
            console.log('Database Connected');
        } catch (err) {
            console.log(err);
        }
    },
    close: () => mongoose.connection.close(),
};