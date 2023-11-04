import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { Modal, Button, Menu, Dropdown } from "antd";
import {
	HistoryOutlined,
	DownCircleTwoTone,
	LoadingOutlined,
} from "@ant-design/icons";
import { Line } from "react-chartjs-2";
import "./weather.css";

export default function Weather() {
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [weatherData, setweatherData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [buttonLoading, setButtonLoading] = useState(false);
	const [chartData, setChartData] = useState({});
	const [datesButtonName, setDatesButtonName] = useState("Όλα");
	const [allDataLabels, setAllDataLabels] = useState([]);
	const [allAvgTempData, setAllAvgTempData] = useState([]);
	const [allAvgHumidityData, setAllAvgHumidityData] = useState([]);

	const options = {
		scales: {
			yAxes: [
				{
					type: "linear",
					display: true,
					position: "left",
					id: "y-axis",
				},
			],
		},
	};

	async function showModal() {
		setButtonLoading(true);
		await getHistoricalWeatherData();
		setIsModalVisible(true);
		setButtonLoading(false);
	}

	const handleOk = () => {
		setIsModalVisible(false);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	useEffect(() => {
		getWeatherData();

		// setLoading(false);
	}, []);

	async function getWeatherData() {
		await axios
			.get("http://localhost:5000/weather/current")
			.then(function (response) {
				let currentDateFromUnixTimestamp = new Date(
					response.data.data.dt * 1000
				);

				let currentDate = new Intl.DateTimeFormat("en-GB", {
					year: "numeric",
					month: "2-digit",
					day: "2-digit",
					hour: "2-digit",
					minute: "2-digit",
				}).format(currentDateFromUnixTimestamp);

				setweatherData({
					dt: currentDate,
					temp: response.data.data.main.temp,
					feels_like: response.data.data.main.feels_like,
					humidity: response.data.data.main.humidity,
					clouds: response.data.data.clouds.all,
					wind_speed: response.data.data.wind.speed,
					weatherDescription: response.data.data.weather[0].description,
					weatherIcon: response.data.data.weather[0].icon,
				});

				setLoading(false);
			});
	}

	async function getHistoricalWeatherData() {
		await axios.get("/weather/history").then(function (response) {
			let dataLabels = [];
			let avgTempData = [];
			let avgHumidityData = [];

			for (let i = 0; i < response.data.data.length; i++) {
				let formatedDate = moment(response.data.data[i].day).format(
					"DD MMM YYYY"
				);

				dataLabels.push(formatedDate);
				avgTempData.push(response.data.data[i].avgTemp);
				avgHumidityData.push(response.data.data[i].avgHumidity);
			}

			setAllDataLabels(dataLabels);
			setAllAvgTempData(avgTempData);
			setAllAvgHumidityData(avgHumidityData);

			setChartData({
				labels: dataLabels,
				datasets: [
					{
						label: "Μέση θερμοκρασία",
						data: avgTempData,
						fill: false,
						backgroundColor: "rgb(255, 99, 132)",
						borderColor: "rgba(255, 99, 132, 0.2)",
						yAxisID: "y-axis",
					},
					{
						label: "Μέση υγρασία",
						data: avgHumidityData,
						fill: false,
						backgroundColor: "rgb(54, 162, 235)",
						borderColor: "rgba(54, 162, 235, 0.2)",
						yAxisID: "y-axis",
					},
				],
			});
		});
	}

	function handleMenuClick(e) {
		let filteredDataLabels = [];
		let filteredAvgTempData = [];
		let filteredAvgHumidityData = [];

		if (e.key === "1") {
			setDatesButtonName("Τελευταίες 5 ημέρες");
			for (let i = 0; i < allDataLabels.length; i++) {
				if (allDataLabels.length - i <= 5) {
					filteredDataLabels.push(allDataLabels[i]);
					filteredAvgTempData.push(allAvgTempData[i]);
					filteredAvgHumidityData.push(allAvgHumidityData[i]);
				}
			}
			setChartData({
				labels: filteredDataLabels,
				datasets: [
					{
						label: "Μέση θερμοκρασία",
						data: filteredAvgTempData,
						fill: false,
						backgroundColor: "rgb(255, 99, 132)",
						borderColor: "rgba(255, 99, 132, 0.2)",
						yAxisID: "y-axis",
					},
					{
						label: "Μέση υγρασία",
						data: filteredAvgHumidityData,
						fill: false,
						backgroundColor: "rgb(54, 162, 235)",
						borderColor: "rgba(54, 162, 235, 0.2)",
						yAxisID: "y-axis",
					},
				],
			});
		} else if (e.key === "2") {
			setDatesButtonName("Τελευταίες 10 ημέρες");
			for (let i = 0; i < allDataLabels.length; i++) {
				if (allDataLabels.length - i <= 10) {
					filteredDataLabels.push(allDataLabels[i]);
					filteredAvgTempData.push(allAvgTempData[i]);
					filteredAvgHumidityData.push(allAvgHumidityData[i]);
				}
			}
			setChartData({
				labels: filteredDataLabels,
				datasets: [
					{
						label: "Μέση θερμοκρασία",
						data: filteredAvgTempData,
						fill: false,
						backgroundColor: "rgb(255, 99, 132)",
						borderColor: "rgba(255, 99, 132, 0.2)",
						yAxisID: "y-axis",
					},
					{
						label: "Μέση υγρασία",
						data: filteredAvgHumidityData,
						fill: false,
						backgroundColor: "rgb(54, 162, 235)",
						borderColor: "rgba(54, 162, 235, 0.2)",
						yAxisID: "y-axis",
					},
				],
			});
		} else if (e.key === "3") {
			setDatesButtonName("Όλα");
			setChartData({
				labels: allDataLabels,
				datasets: [
					{
						label: "Μέση θερμοκρασία",
						data: allAvgTempData,
						fill: false,
						backgroundColor: "rgb(255, 99, 132)",
						borderColor: "rgba(255, 99, 132, 0.2)",
						yAxisID: "y-axis",
					},
					{
						label: "Μέση υγρασία",
						data: allAvgHumidityData,
						fill: false,
						backgroundColor: "rgb(54, 162, 235)",
						borderColor: "rgba(54, 162, 235, 0.2)",
						yAxisID: "y-axis",
					},
				],
			});
		}
	}

	const dropdownMenu = (
		<Menu onClick={handleMenuClick}>
			<Menu.Item key="1">
				<span style={{ color: "black" }}>Τελευταίες 5 ημέρες</span>
			</Menu.Item>
			<Menu.Item key="2">
				<span style={{ color: "black" }}>Τελευταίες 10 ημέρες</span>
			</Menu.Item>
			<Menu.Item key="3">
				<span style={{ color: "black" }}>Όλα</span>
			</Menu.Item>
		</Menu>
	);

	return (
		<div>
			{!loading && (
				<div style={{ marginTop: "30px" }}>
					<div className="main-temp-data">
						<p className="city">Thessaloniki</p>
						<p className="date">{weatherData.dt}</p>
						<p className="main-temp">{weatherData.temp} &#8451;</p>
						<p className="main-description">
							<img
								src={`https://openweathermap.org/img/wn/${weatherData.weatherIcon}@2x.png`}
								alt="Weather icon"
							/>
							<span className="weather-description">
								{weatherData.weatherDescription}
							</span>
						</p>
					</div>

					<table style={{ width: "100%", textAlign: "center" }}>
						<tbody>
							<tr>
								<td>
									<div className="info-area">
										<p className="secondary-info">Humidity</p>
										<p className="main-info">{weatherData.humidity} %</p>
									</div>
								</td>
								<td>
									<div className="info-area">
										<p className="secondary-info">Feels like</p>
										<p className="main-info">
											{weatherData.feels_like} &#8451;
										</p>
									</div>
								</td>
							</tr>
							<tr>
								<td>
									<div className="info-area">
										<p className="secondary-info">Clouds</p>
										<p className="main-info">{weatherData.clouds} %</p>
									</div>
								</td>
								<td>
									<div className="info-area">
										<p className="secondary-info">Wind</p>
										<p className="main-info">{weatherData.wind_speed} km/hr</p>
									</div>
								</td>
							</tr>
							<tr>
								<td colSpan="2">
									{buttonLoading ? (
										<Button type="primary" onClick={showModal}>
											<LoadingOutlined />
										</Button>
									) : (
										<Button type="primary" onClick={showModal}>
											<HistoryOutlined /> Θερμοκρασίες
										</Button>
									)}
								</td>
							</tr>
						</tbody>
					</table>

					<Modal
						title="Ιστορικά δεδομένα θερμοκρασιών"
						visible={isModalVisible}
						onOk={handleOk}
						onCancel={handleCancel}
						width={1000}
						cancelButtonProps={{ style: { display: "none" } }}
					>
						<Dropdown overlay={dropdownMenu} trigger={["click"]}>
							<Button>
								<span style={{ color: "black" }}>{datesButtonName}</span>{" "}
								<DownCircleTwoTone twoToneColor="" />
							</Button>
						</Dropdown>
						<Line data={chartData} options={options} />
					</Modal>
				</div>
			)}
		</div>
	);
}
