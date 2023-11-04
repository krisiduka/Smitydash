import { useState, useEffect } from "react";
import { Row, Col } from "antd";
import axios from "axios";
import "./App.css";

import Logo from "./components/Logo";
import Weather from "./components/Weather";
import AirQuality from "./components/AirQuality";
import Map from "./components/Map";
import Cameras from "./components/Cameras";
import Parking from "./components/Parking";
import Loader from "./components/Loader";

const App = () => {
  const [showTraffic, setShowTraffic] = useState(false);
  const [showFire, setShowFire] = useState(false);
  const [mapZoom, setMapZoom] = useState(13);
  const [loading, setLoading] = useState(true);
  const [fireData, setFireData] = useState([]);

  setTimeout(() => {
    setLoading(false);
  }, 5000);

  useEffect(() => {
    async function fetchFireData() {
      await axios
        .get("https://eonet.sci.gsfc.nasa.gov/api/v3/events?category=wildfires")
        .then(function (response) {
          response.data.events.push(
            {
              geometry: [
                {
                  coordinates: ["23.05", "40.68"],
                },
              ],
            },
            {
              geometry: [
                {
                  coordinates: ["23.03", "40.69"],
                },
              ],
            },
            {
              geometry: [
                {
                  coordinates: ["23.035", "40.68"],
                },
              ],
            },
            {
              geometry: [
                {
                  coordinates: ["23.04", "40.67"],
                },
              ],
            },
            {
              geometry: [
                {
                  coordinates: ["23.005", "40.687"],
                },
              ],
            }
          );

          setFireData(response.data.events);
        });
    }

    fetchFireData();
  }, []);

  return (
    <>
      {loading ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: "10%",
          }}
        >
          <Logo height={""} logoWidth={"50%"} />
          <Loader />
        </div>
      ) : (
        <Row style={{ height: "100vh" }}>
          <Map
            fireData={fireData}
            showFire={showFire}
            showTraffic={showTraffic}
            mapZoom={mapZoom}
          />

          <Col
            span={5}
            style={{
              backgroundImage:
                "linear-gradient(to right, rgb(20, 20, 20), transparent)",
              height: "100%",
            }}
          >
            <Logo height={"35px"} logoWidth={"18%"} />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
                paddingLeft: "1em",
              }}
            >
              <Weather />
              <AirQuality />
            </div>
          </Col>
          <Col span={14}>{/* <Map /> */}</Col>
          <Col
            span={5}
            style={{
              backgroundImage:
                "linear-gradient(to left, rgb(20, 20, 20), transparent)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
              textAlign: "right",
              paddingRight: "1em",
              height: "100%",
            }}
          >
            <Cameras
              mapZoom={mapZoom}
              setMapZoom={setMapZoom}
              showTraffic={showTraffic}
              setShowTraffic={setShowTraffic}
              showFire={showFire}
              setShowFire={setShowFire}
            />
            <Parking />
          </Col>
        </Row>
      )}
    </>
  );
};

export default App;
