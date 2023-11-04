import logoSrc from "../assets/smitydash-logo.jpg";

export default function Logo({ height, logoWidth }) {
	return (
		<div
			style={{
				textAlign: "center",
				verticalAlign: "middle",
				height: height,
				margin: "5px 0px 15px 25px",
			}}
		>
			<img
				src={logoSrc}
				alt="smitydash logo"
				style={{
					height: "auto",
					width: logoWidth,
					bottom: "90%",
					borderRadius: "100px",
					marginTop: "4px",
					paddingBottom: "50px",
				}}
			/>
		</div>
	);
}
