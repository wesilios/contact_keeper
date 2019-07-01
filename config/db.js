const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: true
    });
    console.log('MongoDB connected...');
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }

  //   mongoose
  //     .connect(db, {
  //       useNewUrlParser: true,
  //       useCreateIndex: true,
  //       useFindAndModify: true
  //     })
  //     .then(() => console.log('MongoDb connected'))
  //     .catch(err => {
  //       console.log(err.message);
  //       process.exit(1);
  //     });
};

module.exports = connectDB;
