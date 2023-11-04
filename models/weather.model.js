const mongoose = require("mongoose");

const weatherSchema = new mongoose.Schema({
	day: Date,
	data: [
		{
			dt: Number,
			temp: Number,
			feels_like: Number,
			humidity: Number,
			clouds: Number,
			wind_speed: Number,
			weather: [
				{
					main: String,
					description: String,
					icon: String,
				},
			],
		},
	],
});

module.exports = mongoose.model("Weather", weatherSchema);
