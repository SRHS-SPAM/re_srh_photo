import '../App.css';

// stickers 프롭스를 추가로 받습니다.
export default function FinalPage({ finalFrame, stickers, onReset }) {
  return (
    <div className="final-page">
      <div className="final-layout">
        <div className="final-left">
          {/* 스티커를 프레임 위에 겹치기 위해 relative 컨테이너가 필요합니다 */}
          <div className="final-frame-container" style={{ position: 'relative', display: 'inline-block' }}>
            <img src={finalFrame} alt="완성된 프레임" className="decorate-frame-image" />

            {/* 스티커 리스트를 맵핑하여 렌더링 */}
            {stickers && stickers.map((sticker) => (
              <div
                key={sticker.id}
                style={{
                  position: 'absolute',
                  // DecoratePage와 동일한 기준점(top: 100, left: 100)과 좌표(x, y) 적용
                  top: `calc(100px + ${sticker.y}px)`,
                  left: `calc(100px + ${sticker.x}px)`,
                  width: sticker.width,
                  height: sticker.height,
                  backgroundImage: `url(${sticker.img})`,
                  backgroundSize: '100% 100%',
                  backgroundRepeat: 'no-repeat',
                  transform: `rotate(${sticker.rotate}deg)`,
                  pointerEvents: 'none', // 마지막 페이지니까 클릭 안 되게 막음
                  zIndex: 10,
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

          <button className="final-reset-button" onClick={onReset}>
              처음으로
          </button>

          <button className="final-print-button">
            출력하기 &gt;
          </button>
        </div>
      </div>
    </div>
  );
}