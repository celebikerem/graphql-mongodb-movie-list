const mongoose = require("mongoose");

module.exports = () => {
  mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

  mongoose.connection.on("open", () => {
    console.log("Mongodb bağlandı");
  });
  mongoose.connection.on("error", (err) => {
    console.log(err);
  });
};
