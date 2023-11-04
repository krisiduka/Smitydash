const mongoose = require("mongoose");

const airQualitySchema = new mongoose.Schema({
	aqi: Number,
	co: Number,
	no2: Number,
	o3: Number,
	so2: Number,
	pm2_5: Number,
	pm10: Number,
	dt: Date,
});

module.exports = mongoose.model("AirQuality", airQualitySchema);
