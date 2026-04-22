const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const connectDB = require('./config/db.js');
const app = require('./app.js');

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDB();
        console.log("DB Connected Successfully");
    } catch (err) {
        console.log("DB Failed ", err);
    }

    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
};

startServer();