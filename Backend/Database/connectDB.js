const mongoose = require("mongoose");

async function connectMongoDB() {
  await mongoose
    .connect(
      "mongodb+srv://makodelakshya101:EzDFwCLo6eupxazy@cluster0.gymtp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    )
    .then(() => {
      console.log("MongoDB Database is Connected");
    })
    .catch((error) => {
      console.log("Error connecting the Database: ", error);
    });
}

module.exports = connectMongoDB;
