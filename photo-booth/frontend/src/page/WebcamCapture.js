import React, { useRef, useState, useEffect, useCallback } from "react";
import Webcam from "react-webcam";
import "./WebcamCapture.css";

const WebcamCapture = ({ addPhoto, photoCount, clearPhoto }) => {
  // 1. 모든 State와 Ref는 최상단에 위치해야 합니다.
  const webcamRef = useRef(null);
  const [capturing, setCapturing] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [videoDevices, setVideoDevices] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState("");

  // 2. 카메라 장치를 감지하는 함수 (useCallback)
  const getVideoDevices = useCallback(async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoInputs = devices.filter((device) => device.kind === "videoinput");
      setVideoDevices(videoInputs);

      // 외부 웹캠(HDMI/USB) 우선 탐지
      const externalWebcams = videoInputs.filter(
        (device) =>
          !device.label.toLowerCase().includes("built") &&
          !device.label.toLowerCase().includes("internal")
      );

      if (externalWebcams.length > 0) {
        setSelectedDeviceId(externalWebcams[0].deviceId);
      } else if (videoInputs.length > 0) {
        setSelectedDeviceId(videoInputs[0].deviceId);
      }
    } catch (error) {
      console.error("비디오 장치 감지 오류:", error);
    }
  }, []);

  // 3. 컴포넌트 마운트 시 실행되는 Effect
  useEffect(() => {
    getVideoDevices();
    navigator.mediaDevices.addEventListener("devicechange", getVideoDevices);
    return () => {
      navigator.mediaDevices.removeEventListener("devicechange", getVideoDevices);
    };
  }, [getVideoDevices]);

  // 4. 촬영 및 가공 관련 함수들
  const playSound = () => {
    const audio = new Audio("./mp3.mp3");
    audio.play().catch(() => console.log("오디오 재생 실패"));
  };

  const handleAddPhoto = useCallback((imageSrc) => {
    addPhoto(imageSrc);
  }, [addPhoto]);

  const cropImage = (imageSrc) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = imageSrc;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = 1920; 
        canvas.height = 2560;
        const ctx = canvas.getContext("2d");
        const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
        const x = canvas.width / 2 - (img.width / 2) * scale;
        const y = canvas.height / 2 - (img.height / 2) * scale;
        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
        resolve(canvas.toDataURL("image/jpeg", 1.0));
      };
    });
  };

  const capture = () => {
    if (photoCount >= 4 || capturing) return;
    setCapturing(true);
    setCountdown(5);
    setPhotoIndex(0);
  };

  // 5. 자동 촬영 로직 처리 Effect
  useEffect(() => {
    let timer;
    if (capturing && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (
      countdown === 0 &&
      capturing &&
      photoIndex < 4 &&
      !isProcessing
    ) {
      setIsProcessing(true);
      const imageSrc = webcamRef.current?.getScreenshot();

      if (imageSrc) {
        cropImage(imageSrc).then((croppedImage) => {
          handleAddPhoto(croppedImage);
          playSound();
          setPhotoIndex((prev) => prev + 1);
          setCountdown(5);
          setIsProcessing(false);
        });
      } else {
        setIsProcessing(false);
      }
    }

    if (photoIndex >= 4 || photoCount >= 4) {
      setCapturing(false);
    }

    return () => clearTimeout(timer);
  }, [capturing, countdown, handleAddPhoto, photoIndex, photoCount, isProcessing]);

  // 6. 마지막에 딱 한 번만 return 문이 와야 합니다.
  return (
    <div className="webcam-container">
      <img src={`${process.env.PUBLIC_URL}/camera-frame.png`} className="camera-frame" alt="카메라 프레임" />
      
      {selectedDeviceId ? (
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={{
            deviceId: { exact: selectedDeviceId }, // 강제 연결
            width: 960,
            height: 1280,
          }}
          className="webcam"
          onUserMedia={() => console.log("✅ 카메라 연결 성공")}
        />
      ) : (
        <div className="webcam-loading">카메라를 찾는 중...</div>
      )}

      {capturing && countdown > 0 && (
        <div className="countdown-overlay">{countdown}</div>
      )}

      <div className="controls">
        <p>{photoCount}/4</p>
      </div>

      <button className="camera-button" onClick={capture} disabled={!selectedDeviceId || capturing}>
        <img className="camera-icon" src={`${process.env.PUBLIC_URL}/camera.png`} alt="촬영" />
      </button>
    </div>
  );
};

export default WebcamCapture;