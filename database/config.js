const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CONECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    console.log("DB Connect");
  } catch (error) {
    console.log(error);
    throw new Error("Error en la base de datos - vea los Logs");
  }
};

module.exports = {
  dbConnection,
};
