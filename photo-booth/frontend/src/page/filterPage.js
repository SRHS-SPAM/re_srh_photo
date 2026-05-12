import '../App.css';
import timer90 from "../assets/timer_90.png";
import nextButton from "../assets/next_button.png";
import filterNormal from "../assets/filter_normal.png";
import filterSoft from "../assets/filter_soft.png";
import filterWarm from "../assets/filter_warm.png";
import filterSunset from "../assets/filter_sunset.png";
import filterCool from "../assets/filter_cool.png";
import filterBw from "../assets/filter_bw.png";

import { useState } from "react";

const FILTER_ITEMS = [
  { id: "normal", label: "일반", image: filterNormal },
  { id: "soft", label: "부드러운", image: filterSoft },
  { id: "warm", label: "따뜻한", image: filterWarm },
  { id: "sunset", label: "노을", image: filterSunset },
  { id: "cool", label: "차가운", image: filterCool },
  { id: "bw", label: "흑백", image: filterBw },
];

// ★ 1. 인자(Props)에 stickers를 꼭 추가하세요!
// Props 부분에 stickers를 반드시 추가!
export default function FilterPage({ stickers, finalFrame, onNext }) {

  const [selectedFilter, setSelectedFilter] = useState("normal");

  function getFilterStyle(filter) {
    switch (filter) {
      case "soft": return { filter: "brightness(1.1) blur(1px)" };
      case "warm": return { filter: "sepia(0.4) saturate(1.2)" };
      case "sunset": return { filter: "hue-rotate(-20deg) saturate(1.5)" };
      case "cool": return { filter: "hue-rotate(180deg) brightness(0.9)" };
      case "bw": return { filter: "grayscale(1)" };
      default: return { filter: "none" };
    }
  }

  return (
    <div className="filter-page">
      <img src={timer90} alt="" className="filter-timer-image" />

      <div className="filter-top-area">
        {/* ★ 2. 스티커 좌표의 기준이 될 컨테이너 (position: relative 필수) */}
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <img
            src={finalFrame}
            alt=""
            className="filter-main-frame-image"
            style={getFilterStyle(selectedFilter)}
          />

          {/* ★ 3. 부모에게 받은 스티커 목록을 그대로 다시 렌더링 */}
          {stickers && stickers.map((s) => (
            <img 
              key={s.id} 
              src={s.url} 
              alt="sticker"
              style={{ 
                position: 'absolute', 
                left: s.x, // 꾸미기 페이지에서 정한 x좌표
                top: s.y,  // 꾸미기 페이지에서 정한 y좌표
                width: '100px', // 스티커 크기에 맞게 조절
                pointerEvents: 'none' // 버튼 클릭 방해 방지
              }} 
            />
          ))}
        </div>

        <button
          type="button"
          className="filter-next-button-reset"
          onClick={onNext}
        >
          <img
            src={nextButton}
            alt="넘어가기"
            className="filter-next-button-image"
          />
        </button>
      </div>

      <div className="filter-bottom-panel">
        <div className="filter-list">
          {FILTER_ITEMS.map((item) => (
            <div
              key={item.id}
              className={`filter-item ${selectedFilter === item.id ? "active" : ""}`}
              onClick={() => setSelectedFilter(item.id)}
            >
              <img
                src={item.image}
                alt={item.label}
                className="filter-thumb-image"
              />
              <div className="filter-label">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}