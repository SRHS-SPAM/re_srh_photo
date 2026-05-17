import '../App.css';

function getFilterStyle(filter) {
  switch (filter) {
    case "soft":    return { filter: "brightness(1.1) blur(1px)" };
    case "warm":    return { filter: "sepia(0.4) saturate(1.2)" };
    case "sunset":  return { filter: "hue-rotate(-20deg) saturate(1.5)" };
    case "cool":    return { filter: "hue-rotate(180deg) brightness(0.9)" };
    case "bw":      return { filter: "grayscale(1)" };
    default:        return { filter: "none" };
  }
}

export default function FinalPage({ finalFrame, photos, stickers, selectedFilter, onReset }) {
  return (
    <div className="final-page">
      <div className="final-layout">
        <div className="final-left">
          <div className="final-frame-container" style={{ position: 'relative', display: 'inline-block', width: '520px' }}>
            {/* 높이 확보용 */}
            <img src={finalFrame} alt="완성된 프레임" className="decorate-frame-image" style={{ visibility: 'hidden' }} />

            {/* 사진 2x2 그리드 */}
            <div style={{
              position: 'absolute',
              top: '6%', left: '5%', right: '5%', bottom: '21%',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gridTemplateRows: '1fr 1fr',
              ...getFilterStyle(selectedFilter),
            }}>
              {photos && photos.map((photo, i) => (
                <img key={i} src={photo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              ))}
            </div>

            {/* 프레임 오버레이 */}
            <img src={finalFrame} alt="완성된 프레임" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 2 }} />

            {/* 스티커 */}
            {stickers && stickers.map((sticker) => (
              <div
                key={sticker.id}
                style={{
                  position: 'absolute',
                  top: `calc(100px + ${sticker.y}px)`,
                  left: `calc(100px + ${sticker.x}px)`,
                  width: sticker.width,
                  height: sticker.height,
                  backgroundImage: `url(${sticker.img})`,
                  backgroundSize: '100% 100%',
                  backgroundRepeat: 'no-repeat',
                  transform: `rotate(${sticker.rotate}deg)`,
                  pointerEvents: 'none',
                  zIndex: 999,
                }}
              />
            ))}
          </div>
        </div>

        <div className="final-right">
          <div className="final-qr-card">
            <div className="final-qr-text">
              QR 코드를 스캔해 완성본을
              <br />
              저장하세요!
            </div>
            <div className="final-qr-box">QR</div>
          </div>

          {/* <button className="final-button" onClick={onReset}>
              처음으로
          </button>

          <button className="final-print-button">
            출력하기
          </button> */}

          {/* 두 버튼을 감싸는 새로운 컨테이너 추가 */}
          <div className="button-group">
            <button className="final-button" onClick={onReset}>처음으로</button>
            <button className="final-print-button">출력하기</button>
          </div>
        </div>
      </div>
    </div>
  );
}