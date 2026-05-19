import React, { useRef } from 'react';
import Draggable from 'react-draggable';
import '../App.css';
import bubble from "../assets/bubble.png";
import qrBox from "../assets/qr_box.png";
import { getPhotoGridStyle, getPhotoScale } from '../frameConfig';

export default function ResultPage({ finalFrame, photos, photoOffsets, setPhotoOffsets, onDecorate, onReset }) {
  const photoRefs = useRef([
    React.createRef(), React.createRef(), React.createRef(), React.createRef()
  ]);

  return (
    <div className="result-app">
      <div className="result-screen">
        <div className="result-left">
          <div style={{ position: 'relative', display: 'inline-block', width: '520px' }}>
            {/* 높이 확보용 */}
            <img src={finalFrame} alt="" style={{ width: '100%', display: 'block', visibility: 'hidden' }} />

            <div style={{ ...getPhotoGridStyle(finalFrame), overflow: 'hidden' }}>
              {photos && photos.map((photo, i) => (
                <Draggable
                  key={i}
                  nodeRef={photoRefs.current[i]}
                  position={photoOffsets?.[i] || { x: 0, y: 0 }}
                  onStop={(e, data) => {
                    const newOffsets = [...(photoOffsets || [])];
                    newOffsets[i] = { x: data.x, y: data.y };
                    setPhotoOffsets(newOffsets);
                  }}
                >
                  <div ref={photoRefs.current[i]} style={{ width: '100%', height: '100%' }}>
                    <img
                      src={photo}
                      alt=""
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', cursor: 'grab', transform: `scale(${getPhotoScale(finalFrame)})` }}
                    />
                  </div>
                </Draggable>
              ))}
            </div>

            {/* 프레임 오버레이 */}
            <img src={finalFrame} alt="" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 2 }} />
          </div>

          <button
            className="common-button decorate-button"
            onClick={onDecorate}
          >
            꾸미기
          </button>

          <img src={bubble} alt="" className="left-bubble-image" />
        </div>

        <div className="result-right">
          <div className="qr-card">
            <div className="qr-guide-text">
              QR 코드를 스캔해 완성본을
              <br />
              저장하세요!
            </div>

            <div className="qr-card-image-wrap">
              <img src={qrBox} alt="" className="qr-box-image" />
            </div>
          </div>

          <div className="button-group">
            <button className="final-button" onClick={onReset}>처음으로</button>
            <button className="final-print-button">출력하기</button>
          </div>
        </div>
      </div>
    </div>
  );
}
