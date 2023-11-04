import { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, Menu, Dropdown } from "antd";
import {
	HistoryOutlined,
	DownCircleTwoTone,
	LoadingOutlined,
} from "@ant-design/icons";
import { Line } from "react-chartjs-2";
import "./airquality.css";

export default function AirQuality() {
	const [loading, setLoading] = useState(true);
	const [chartData, setChartData] = useState({});
	const [allAqiData, setAllAqiData] = useState([]);
	const [allDataLabels, setAllDataLabels] = useState([]);
	const [airQualityData, setΑirQualityData] = useState([]);
	const [buttonLoading, setButtonLoading] = useState(false);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [datesButtonName, setDatesButtonName] = useState("Όλα");

	const options = {
		scales: {
			yAxes: [
				{
					ticks: {
						beginAtZero: true,
					},
				},
			],
		},
	};

	async function showModal() {
		setButtonLoading(true);
		await getHistoricalAirQualityData();
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
		getAirQualityData();

		setLoading(false);
	}, []);

	async function getAirQualityData() {
		await axios.get("/airquality/current").then(function (response) {
			setΑirQualityData({
				dt: response.data.data.dt,
				aqi: response.data.data.aqi,
				co: response.data.data.co,
				no2: response.data.data.no2,
				o3: response.data.data.o3,
				pm2_5: response.data.data.pm2_5,
				pm10: response.data.data.pm10,
				so2: response.data.data.so2,
			});
		});
	}

	async function getHistoricalAirQualityData() {
		await axios.get("/airquality/history").then(function (response) {
			let aqiData = [];
			let dataLabels = [];

			for (let i = 0; i < response.data.data.length; i++) {
				let stringToDate = new Date(response.data.data[i].dt);
				let changeDateFormat = new Intl.DateTimeFormat("en-GB", {
					year: "numeric",
					month: "2-digit",
					day: "2-digit",
					hour: "2-digit",
					minute: "2-digit",
				}).format(stringToDate);

				dataLabels.push(changeDateFormat);
				aqiData.push(response.data.data[i].aqi);
			}

			setAllAqiData(aqiData);
			setAllDataLabels(dataLabels);

			setChartData({
				labels: dataLabels,
				datasets: [
					{
						label: "AQI",
						data: aqiData,
						fill: false,
						backgroundColor: "rgb(255, 99, 132)",
						borderColor: "rgba(255, 99, 132, 0.2)",
					},
				],
			});
		});
	}

	function handleMenuClick(e) {
		let filteredDataLabels = [];
		let filteredAqiData = [];

		if (e.key === "1") {
			setDatesButtonName("Τελευταίες 5 ημέρες");

			for (let i = 0; i < allDataLabels.length; i++) {
				if (allDataLabels.length - i <= 5) {
					const splitDate = allDataLabels[i].split(",");
					const datePart = splitDate[0];

					filteredDataLabels.push(datePart);
					filteredAqiData.push(allAqiData[i]);
				}
			}

			setChartData({
				labels: filteredDataLabels,
				datasets: [
					{
						label: "AQI",
						data: filteredAqiData,
						fill: false,
						backgroundColor: "rgb(255, 99, 132)",
						borderColor: "rgba(255, 99, 132, 0.2)",
					},
				],
			});
		} else if (e.key === "2") {
			setDatesButtonName("Τελευταίες 10 ημέρες");

			for (let i = 0; i < allDataLabels.length; i++) {
				if (allDataLabels.length - i <= 10) {
					const splitDate = allDataLabels[i].split(",");
					const datePart = splitDate[0];

					filteredDataLabels.push(datePart);
					filteredAqiData.push(allAqiData[i]);
				}
			}

			setChartData({
				labels: filteredDataLabels,
				datasets: [
					{
						label: "AQI",
						data: filteredAqiData,
						fill: false,
						backgroundColor: "rgb(255, 99, 132)",
						borderColor: "rgba(255, 99, 132, 0.2)",
					},
				],
			});
		} else if (e.key === "3") {
			setDatesButtonName("Όλα");

			setChartData({
				labels: allDataLabels,
				datasets: [
					{
						label: "AQI",
						data: allAqiData,
						fill: false,
						backgroundColor: "rgb(255, 99, 132)",
						borderColor: "rgba(255, 99, 132, 0.2)",
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
					<div className="aqi-area">
						<p className="aqi-header">AQI</p>
						<p className="aqi-data">{airQualityData.aqi}</p>
					</div>

					<table style={{ width: "100%", textAlign: "center" }}>
						<tbody>
							<tr>
								<td>
									<div className="airqu-info-area">
										<p className="airqu-secondary-info">CO</p>
										<p className="airqu-main-info">{airQualityData.co}</p>
									</div>
								</td>
								<td>
									<div className="airqu-info-area">
										<p className="airqu-secondary-info">
											NO<span className="airQuality_metrics_pointer">2</span>
										</p>
										<p className="airqu-main-info">{airQualityData.no2}</p>
									</div>
								</td>
							</tr>
							<tr>
								<td>
									<div className="airqu-info-area">
										<p className="airqu-secondary-info">
											O<span className="airQuality_metrics_pointer">3</span>
										</p>
										<p className="airqu-main-info">{airQualityData.o3}</p>
									</div>
								</td>
								<td>
									<div className="airqu-info-area">
										<p className="airqu-secondary-info">
											SO<span className="airQuality_metrics_pointer">2</span>
										</p>
										<p className="airqu-main-info">{airQualityData.so2}</p>
									</div>
								</td>
							</tr>
							<tr>
								<td>
									<div className="airqu-info-area">
										<p className="airqu-secondary-info">PM2.5</p>
										<p className="airqu-main-info">{airQualityData.pm2_5}</p>
									</div>
								</td>
								<td>
									<div className="airqu-info-area">
										<p className="airqu-secondary-info">PM10</p>
										<p className="airqu-main-info">{airQualityData.pm10}</p>
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
											<HistoryOutlined /> Ποιότητα αέρα
										</Button>
									)}
								</td>
							</tr>
						</tbody>
					</table>

					<Modal
						title="Ιστορικά δεδομένα ποιότητας αέρα"
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
