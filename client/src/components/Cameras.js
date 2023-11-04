import { useState } from "react";
import { Modal, Button } from "antd";
import { ZoomInOutlined, ZoomOutOutlined } from "@ant-design/icons";
import ReactPlayer from "react-player/youtube";

export default function Cameras({
  mapZoom,
  setMapZoom,
  showTraffic,
  setShowTraffic,
  showFire,
  setShowFire,
}) {
  const [modalTitle, setModalTitle] = useState("");
  const [modalVideoID, setModalVideoID] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const mapZoomIn = () => {
    setMapZoom(mapZoom + 1);
  };
  const mapZoomOut = () => {
    setMapZoom(mapZoom - 1);
  };
  const showTrafficHandler = () => {
    setShowTraffic(!showTraffic);
  };

  const showFireHandler = () => {
    setShowFire(!showFire);
  };

  const showCameraModal = (modalTitle, videoID) => {
    setModalTitle(modalTitle);
    setModalVideoID(videoID);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div style={{ marginTop: "2px", textAlign: "center" }}>
      <Button
        type="primary"
        shape="circle"
        icon={<ZoomInOutlined />}
        onClick={() => {
          mapZoomIn();
        }}
        style={{
          position: "absolute",
          right: 100,
          top: 15,
        }}
      />
      <Button
        type="primary"
        shape="circle"
        icon={<ZoomOutOutlined />}
        onClick={() => {
          mapZoomOut();
        }}
        style={{
          position: "absolute",
          right: 50,
          top: 15,
        }}
      />
      <Button
        type="primary"
        onClick={showTrafficHandler}
        style={{
          position: "absolute",
          right: 50,
          top: 55,
        }}
      >
        {showTraffic ? "Απόκρυψη κίνησης" : "Προβολή κίνησης"}
      </Button>
      <Button
        type="primary"
        onClick={showFireHandler}
        style={{
          position: "absolute",
          right: 210,
          top: 55,
        }}
      >
        {showFire ? "Απόκρυψη πυρκαγιών" : "Προβολή πυρκαγιών"}
      </Button>

      <table>
        <tbody>
          <tr style={{ height: "200px" }}>
            <td style={{ paddingRight: "10px" }}>
              <Button
                type="primary"
                shape="circle"
                icon={<ZoomInOutlined />}
                onClick={() => {
                  showCameraModal("Live Camera 1", "AdUw5RdyZxI");
                }}
                style={{
                  position: "absolute",
                  right: 275,
                  top: 317,
                  zIndex: 10,
                }}
              />
              <ReactPlayer
                url="https://www.youtube.com/watch?v=AdUw5RdyZxI"
                width="150px"
                height="150px"
                playing={true}
                muted={true}
                style={{
                  position: "absolute",
                  right: 220,
                  top: 184,
                }}
              />
            </td>
            <td>
              <Button
                type="primary"
                shape="circle"
                icon={<ZoomInOutlined />}
                onClick={() => {
                  showCameraModal("Live Camera 2", "Ap8hVtVTjRI");
                }}
                style={{
                  position: "absolute",
                  right: 120,
                  top: 317,
                  zIndex: 10,
                }}
              />
              <ReactPlayer
                url="https://www.youtube.com/watch?v=Ap8hVtVTjRI"
                width="150px"
                height="150px"
                playing={true}
                muted={true}
                style={{
                  position: "absolute",
                  right: 60,
                  top: 184,
                }}
              />
            </td>
          </tr>
          <tr>
            <td style={{ paddingRight: "10px" }}>
              <Button
                type="primary"
                shape="circle"
                icon={<ZoomInOutlined />}
                onClick={() => {
                  showCameraModal("Live Camera 3", "KGuCGd726RA");
                }}
                style={{
                  position: "absolute",
                  right: 275,
                  top: 495,
                  zIndex: 10,
                }}
              />
              <ReactPlayer
                url="https://www.youtube.com/watch?v=7d65JPkiLSA"
                width="150px"
                height="150px"
                playing={true}
                muted={true}
                style={{
                  position: "absolute",
                  right: 60,
                  top: 360,
                }}
              />
            </td>
            <td>
              <Button
                type="primary"
                shape="circle"
                icon={<ZoomInOutlined />}
                onClick={() => {
                  showCameraModal("Live Camera 4", "RnhnRHc7yYY");
                }}
                style={{
                  position: "absolute",
                  right: 120,
                  top: 495,
                  zIndex: 10,
                }}
              />
              <ReactPlayer
                url="https://www.youtube.com/watch?v=d66NPsy_MPg"
                width="150px"
                height="150px"
                playing={true}
                muted={true}
                style={{
                  position: "absolute",
                  right: 220,
                  top: 360,
                }}
              />
            </td>
          </tr>
        </tbody>
      </table>

      <Modal
        title={modalTitle}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1000}
        cancelButtonProps={{ style: { display: "none" } }}
        style={{ display: "flex", textAlign: "center", alignItems: "center" }}
      >
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${modalVideoID}`}
          width="650px"
          height="650px"
          playing={true}
          muted={true}
        />
      </Modal>
    </div>
  );
}
