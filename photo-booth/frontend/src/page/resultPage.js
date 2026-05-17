import '../App.css';
import bubble from "../assets/bubble.png";
import qrBox from "../assets/qr_box.png";

export default function ResultPage({ finalFrame, photos, onDecorate, onReset }) {
  return (
    <div className="result-app">
      <div className="result-screen">
        <div className="result-left">
          <div style={{ position: 'relative', display: 'inline-block', width: '400px' }}>
            {/* 높이 확보용 */}
            <img src={finalFrame} alt="" style={{ width: '100%', display: 'block', visibility: 'hidden' }} />

            {/* 사진 2x2 그리드 */}
            <div style={{
              position: 'absolute',
              top: '6%', left: '5%', right: '5%', bottom: '21%',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gridTemplateRows: '1fr 1fr',
            }}>
              {photos && photos.map((photo, i) => (
                <img key={i} src={photo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              ))}
            </div>

            {/* 프레임 오버레이 */}
            <img src={finalFrame} alt="" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }} />
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
          {/* <button className="common-button print-button">
            출력하기
          </button> */}
        </div>
      </div>
    </div>
  );
}