const router = require("express").Router();
const apiHandler = require("./api.controller");

router.get("/weather/current", apiHandler.getCurrentWeatherData);
router.get("/weather/history", apiHandler.getWeatherDataFromDb);
router.get("/weather/newData", apiHandler.getRemoteWeatherDataSaveLocal);

router.get("/airquality/current", apiHandler.getCurrentAirQualityData);
router.get("/airquality/history", apiHandler.getAirQualityDataFromDb);
router.get("/airquality/newData", apiHandler.getRemoteAirQualityDataSaveLocal);

module.exports = router;
