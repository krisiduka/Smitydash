import { useState } from "react";
import { Button } from "antd";
import {
	CheckCircleTwoTone,
	ClockCircleTwoTone,
	ExclamationCircleTwoTone,
	ReloadOutlined,
} from "@ant-design/icons";

export default function Parking() {
	let initialParkingData = [
		{
			id: 0,
			area: "Κέντρο",
			spots: 500,
			icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
		},
		{
			id: 1,
			area: "Καλαμαριά",
			spots: 500,
			icon: <ClockCircleTwoTone twoToneColor="#ff8000" />,
		},
		{
			id: 2,
			area: "Εύοσμος",
			spots: 500,
			icon: <ExclamationCircleTwoTone twoToneColor="#ff0000" />,
		},
		{
			id: 3,
			area: "Θέρμη",
			spots: 500,
			icon: <ExclamationCircleTwoTone twoToneColor="#ff0000" />,
		},
		{
			id: 4,
			area: "Σταυρούπολη",
			spots: 500,
			icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
		},
	];

	const [parkingData, setParkingData] = useState(initialParkingData);

	const changeParkingData = () => {
		let randomSpots = Math.floor(Math.random() * 1000);
		let parkingId = Math.floor(Math.random() * 5);
		let newParkingData;

		if (randomSpots < 400) {
			newParkingData = parkingData.map((parking) => {
				if (parking.id === parkingId) {
					const updatedParking = {
						...parking,
						spots: randomSpots,
						icon: <ExclamationCircleTwoTone twoToneColor="#ff0000" />,
					};
					return updatedParking;
				}
				return parking;
			});
		} else if (randomSpots > 800) {
			newParkingData = parkingData.map((parking) => {
				if (parking.id === parkingId) {
					const updatedParking = {
						...parking,
						spots: randomSpots,
						icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
					};
					return updatedParking;
				}
				return parking;
			});
		} else {
			newParkingData = parkingData.map((parking) => {
				if (parking.id === parkingId) {
					const updatedParking = {
						...parking,
						spots: randomSpots,
						icon: <ClockCircleTwoTone twoToneColor="#ff8000" />,
					};
					return updatedParking;
				}
				return parking;
			});
		}
		setParkingData(newParkingData);
	};

	return (
		<div
			style={{
				marginTop: "10px",
				position: "absolute",
				right: 300,
				top: 600,
				left: 100,
			}}
		>
			<table
				style={{
					width: "100%",
				}}
			>
				<tbody>
					<tr>
						<td style={{ padding: "5px" }}>
							<Button
								type="primary"
								size={"small"}
								onClick={changeParkingData}
								style={{
									position: "absolute",
									right: -25,
									top: 29,
								}}
							>
								<ReloadOutlined />
							</Button>
						</td>
						<td
							style={{
								textAlign: "center",
								verticalAlign: "middle",
								fontWeight: "800",
								textDecoration: "underline",
								right: 180,
								padding: "30px",
							}}
						>
							Περιοχή
						</td>
						<td
							style={{
								textAlign: "center",
								verticalAlign: "middle",
								fontWeight: "800",
								textDecoration: "underline",
								right: 10,
								padding: "25px",
							}}
						>
							Θέσεις
						</td>
					</tr>
					{parkingData.map((parking) => (
						<tr key={parking.id}>
							<td style={{ padding: "0px 35px 5px 5px" }}>{parking.icon}</td>
							<td style={{ textAlign: "center" }}>{parking.area}</td>
							<td style={{ textAlign: "center" }}>{parking.spots}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
