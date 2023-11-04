import GoogleMapReact from "google-map-react";
import LocationMarker from "./LocationMarker";

export default function Map({
  center,
  fireData,
  mapZoom,
  showTraffic,
  showFire,
}) {
  const markers = fireData.map((ev, index) => {
    return (
      <LocationMarker
        key={index}
        lat={ev.geometry[0].coordinates[1]}
        lng={ev.geometry[0].coordinates[0]}
      />
    );
  });

  return (
    <>
      {showTraffic ? (
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_MAPS_API_KEY }}
          layerTypes={["TrafficLayer"]}
          defaultCenter={center}
          zoom={mapZoom}
          style={mapStyle}
        >
          {showFire ? markers : ""}
        </GoogleMapReact>
      ) : (
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_MAPS_API_KEY }}
          defaultCenter={center}
          zoom={mapZoom}
          style={mapStyle}
        >
          {showFire ? markers : ""}
        </GoogleMapReact>
      )}
    </>
  );
}

Map.defaultProps = {
  center: {
    lat: 40.63,
    lng: 22.95,
  },
};

const mapStyle = {
  zIndex: "-1",
  position: "absolute",
  width: "100%",
  height: "100%",
};
