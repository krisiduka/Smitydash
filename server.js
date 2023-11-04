const express = require("express");
const cors = require("cors");
const app = express();
const connectDB = require("./db");

// Connect to database
connectDB();
// Body parser
app.use(express.json());
// Enable CORS
app.use(cors());

// send app to main router
const router = require("./router");
app.use("/", router);

// run Server
const port = process.env.PORT;
app.listen(port, () => {
	console.log("Server running on port " + port);
});

module.exports = app;
