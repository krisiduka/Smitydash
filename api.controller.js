const axios = require("axios");
const moment = require("moment");
const timestamp = require("unix-timestamp");
const Weather = require("./models/weather.model");
const AirQuality = require("./models/airQuality.model");

const secondsInADay = 86400;

module.exports = {
  async getCurrentWeatherData(req, res) {
    await axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=40.63&lon=20.95&appid=${process.env.WEATHER_API_KEY}&units=metric`
      )
      .then(function (response) {
        res.status(200).json({
          success: true,
          data: response.data,
        });
      })
      .catch(function (error) {
        return res.status(500).json({ success: false, data: error });
      });
  },
  async getWeatherDataFromDb(req, res) {
    let avgDailyWeatherData = [];
    const weather_data = await Weather.find({}).sort("day");

    weather_data.forEach((day) => {
      let avgTemp = 0;
      let avgHumidity = 0;

      day.data.forEach((hourlyData) => {
        avgTemp = hourlyData.temp + avgTemp;
        avgHumidity = hourlyData.humidity + avgHumidity;
      });
      avgTemp = Math.round(avgTemp / 24);
      avgHumidity = Math.round(avgHumidity / 24);

      avgDailyWeatherData.push({
        _id: day._id,
        day: day.day,
        avgTemp: avgTemp,
        avgHumidity: avgHumidity,
      });
    });

    res.status(200).json({
      success: true,
      data: avgDailyWeatherData,
    });
  },
  async getRemoteWeatherDataSaveLocal(req, res) {
    const currentDayUnixTime = Math.round(timestamp.now());
    const daysToGetDataFor = [
      currentDayUnixTime - 5 * secondsInADay,
      currentDayUnixTime - 4 * secondsInADay,
      currentDayUnixTime - 3 * secondsInADay,
      currentDayUnixTime - 2 * secondsInADay,
      currentDayUnixTime - 1 * secondsInADay,
    ];

    await daysToGetDataFor.forEach((day) => {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=40.63&lon=20.95&dt=${day}&appid=${process.env.WEATHER_API_KEY}&units=metric`
        )
        .then(function (response) {
          let aDaysData = [];
          let weatherDataForADay = [];
          let dateOfDay = new Date(day * 1000);

          for (const hourlyData of response.data.hourly) {
            let {
              dt,
              temp,
              feels_like,
              humidity,
              clouds,
              wind_speed,
              weather,
            } = hourlyData;

            aDaysData.push({
              dt,
              temp,
              feels_like,
              humidity,
              clouds,
              wind_speed,
              weather,
            });
          }

          weatherDataForADay.push({
            day: dateOfDay,
            data: aDaysData,
          });

          Weather.create(weatherDataForADay, function (err, weatherData) {
            if (err) res.status(500).json({ success: false, data: error });
          });
        })
        .catch(function (error) {
          return res.status(500).json({ success: false, data: error });
        });
    });
    res
      .status(200)
      .json({ success: true, data: "weather data save succesfully" });
  },
  async getCurrentAirQualityData(req, res) {
    await axios
      .get(
        `http://api.openweathermap.org/data/2.5/air_pollution?lat=40.63&lon=20.95&appid=${process.env.WEATHER_API_KEY}`
      )
      .then(function (response) {
        let filteredData = {
          aqi: response.data.list[0].main.aqi,
          co: response.data.list[0].components.co,
          no2: response.data.list[0].components.no2,
          o3: response.data.list[0].components.o3,
          so2: response.data.list[0].components.so2,
          pm2_5: response.data.list[0].components.pm2_5,
          pm10: response.data.list[0].components.pm10,
          dt: new Date(response.data.list[0].dt * 1000),
        };

        res.status(200).json({ success: true, data: filteredData });
      })
      .catch(function (error) {
        return res.status(500).json({ success: false, data: error });
      });
  },
  async getAirQualityDataFromDb(req, res) {
    const airQuality_data = await AirQuality.find({}).sort("dt");

    const finalAggregatedData = dataAggregation(airQuality_data);

    res.status(200).json({
      success: true,
      data: finalAggregatedData,
    });
  },
  async getRemoteAirQualityDataSaveLocal(req, res) {
    const currentDayUnixTime = Math.round(timestamp.now());
    const startDateToGetData = currentDayUnixTime - 5 * secondsInADay;
    const endDateToGetData = currentDayUnixTime - 1 * secondsInADay;

    await axios
      .get(
        `http://api.openweathermap.org/data/2.5/air_pollution/history?lat=40.63&lon=20.95&start=${startDateToGetData}&end=${endDateToGetData}&appid=${process.env.WEATHER_API_KEY}`
      )
      .then(function (response) {
        let airQualityDataPerHour = [];

        for (const hourlyData of response.data.list) {
          let { co, no2, o3, so2, pm2_5, pm10 } = hourlyData.components;

          airQualityDataPerHour.push({
            aqi: hourlyData.main.aqi,
            co,
            no2,
            o3,
            so2,
            pm2_5,
            pm10,
            dt: new Date(hourlyData.dt * 1000),
          });
        }

        AirQuality.create(
          airQualityDataPerHour,
          function (err, airQualityData) {
            if (err) res.status(500).json({ success: false, data: error });
            else res.status(200).json({ success: true, data: airQualityData });
          }
        );
      })
      .catch(function (error) {
        return res.status(500).json({ success: false, data: error });
      });
  },
};

const dataAggregation = (arrayToAggregate) => {
  let finalAggregatedArray = [];

  for (let i = 0; i < arrayToAggregate.length; i++) {
    if (i !== arrayToAggregate.length - 1) {
      let formatedDateA = moment(arrayToAggregate[i].dt).format("DD MMM YYYY");
      let formatedDateB = moment(arrayToAggregate[i + 1].dt).format(
        "DD MMM YYYY"
      );

      if (formatedDateA !== formatedDateB) {
        finalAggregatedArray.push(arrayToAggregate[i]);
      }
    }
  }
  return finalAggregatedArray;
};
