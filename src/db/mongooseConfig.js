const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
});

process.on('SIGINT', function () {
    mongoose.connection.close(function () {
        console.log(
            termination(
                'Mongoose default connection is disconnected due to application termination'
            )
        );
        process.exit(0);
    });
});
