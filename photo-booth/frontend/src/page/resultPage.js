import '../App.css';
import bubble from "../assets/bubble.png";
import qrBox from "../assets/qr_box.png";

export default function ResultPage({ finalFrame, onDecorate }) {
  return (
    <div className="result-app">
      <div className="result-screen">
        <div className="result-left">
          <img src={finalFrame} alt="" className="result-frame-image" />

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

          <button className="common-button print-button">
            출력하기 &gt;
          </button>
        </div>
      </div>
    </div>
  );
}