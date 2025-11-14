const mongoose = require("mongoose");

// Conexión MongoDB
const dbCONN = async () => {
    try {
        mongoose.set("strictQuery", true);

        await mongoose.connect(process.env.db_CONN);

        console.log("Conectado a MongoDB");
    } catch (error) {
        console.error("Error en la conexión MongoDB:", error);
        process.exit(1);
    }
};

module.exports = dbCONN;
