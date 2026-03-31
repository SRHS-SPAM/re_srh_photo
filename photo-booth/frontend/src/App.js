import "./App.css";
import { useEffect, useState } from "react";

import mainIntro from "./assets/main.png";

import tutorialStrip from "./assets/tutorial_strip.png";
import blackBar from "./assets/blackbar.png";
import peopleIcon from "./assets/people_icon.png";

import frameBg from "./assets/frame_bg.png";

import frame1 from "./assets/frame1.png";
import frame2 from "./assets/frame2.png";
import frame3 from "./assets/frame3.png";
import frame4 from "./assets/frame4.png";
import frame5 from "./assets/frame5.png";
import frame6 from "./assets/frame6.png";

import shutterBar from "./assets/shutter_bar.png";

import five from "./assets/5.png";
import four from "./assets/4.png";
import three from "./assets/3.png";
import two from "./assets/2.png";
import one from "./assets/1.png";

import qrBox from "./assets/qr_box.png";
import bubble from "./assets/bubble.png";
import printBubble from "./assets/print_bubble.png";
import decorateBubble from "./assets/decorate_bubble.png";

import timer90 from "./assets/timer_90.png";
import printVertical from "./assets/print_button.png";

/* 촬영 화면용 분리 이미지 */
import shootLight1 from "./assets/조명1.png";
import shootLight2 from "./assets/조명2.png";
import shootCardOnly from "./assets/card.png";

/* 꾸미기 화면용 스티커 통이미지 */
import stickerPanel from "./assets/sticker_panel.png";

/* 필터 화면용 */
import nextButton from "./assets/next_button.png";
import filterNormal from "./assets/filter_normal.png";
import filterSoft from "./assets/filter_soft.png";
import filterWarm from "./assets/filter_warm.png";
import filterSunset from "./assets/filter_sunset.png";
import filterCool from "./assets/filter_cool.png";
import filterBw from "./assets/filter_bw.png";

const COUNTDOWN_IMAGES = [five, four, three, two, one];

const FILTER_ITEMS = [
  { id: "normal", label: "일반", image: filterNormal },
  { id: "soft", label: "부드러운", image: filterSoft },
  { id: "warm", label: "따뜻한", image: filterWarm },
  { id: "sunset", label: "노을", image: filterSunset },
  { id: "cool", label: "차가운", image: filterCool },
  { id: "bw", label: "흑백", image: filterBw },
];

/* ======================
   INTRO PAGE
====================== */

function IntroPage({ onNext }) {
  return (
    <div className="intro-page">
      <div className="intro-wrap">
        <div className="intro-image-box">
          <img
            src={mainIntro}
            alt="SPAM 첫 화면"
            className="intro-main-image"
          />

          <button
            type="button"
            className="intro-start-hitbox"
            onClick={onNext}
            aria-label="시작하기"
          />
        </div>
      </div>
    </div>
  );
}

/* ======================
   TUTORIAL PAGE
====================== */

function TutorialPage({ onNext }) {
  return (
    <div className="app">
      <div className="main-card">
        <h1 className="title">HOW TO USE</h1>

        <div className="content-row">
          <div className="image-area">
            <div className="frame">
              <img src={tutorialStrip} alt="" className="tutorial-image" />
              <img src={blackBar} alt="" className="bottom-bar" />
              <img src={peopleIcon} alt="" className="people-icon" />
            </div>
          </div>

          <div className="text-area">
            <p>• 촬영 전 마음에 드는 프레임을 골라 주세요.</p>
            <p>
              • 5초에 한 번씩 네 번의 사진이 촬영됩니다.
              <br />
              시간에 맞추어 포즈를 취해 주세요!
            </p>
            <p>
              • 완성된 스팸네컷을 출력 하거나 다운로드하여
              <br />
              간직하세요.
            </p>
          </div>
        </div>

        <button className="next-button" onClick={onNext}>
          다음
        </button>
      </div>
    </div>
  );
}

/* ======================
   FRAME PAGE
====================== */

function FramePage({ onNext, selectedFrame, setSelectedFrame }) {
  const frames = [frame1, frame2, frame3, frame4, frame5, frame6];

  return (
    <div className="app">
      <div className="main-card frame-page">
        <h1 className="title">FRAME</h1>

        <div className="frame-stage">
          <img src={frameBg} alt="" className="frame-bg" />
            <div className="frame-overlay">
              <div className='scroll-box'>
                {frames.map((frame) => (
                  <img
                    key={frame}
                    src={frame}
                    alt=""
                    className={`frame-item ${selectedFrame === frame ? "active" : ""}`}
                    onClick={() => setSelectedFrame(frame)}
                  />
                ))}
              </div>
            </div>
        </div>    

        <button
          className="next-button"
          onClick={() => {
            if (!selectedFrame) {
              alert("프레임을 선택하세요");
              return;
            }
            onNext();
          }}
        >
          촬영하기
        </button>
      </div>
    </div>
  );
}

/* ======================
   SHOOT PAGE
====================== */

function ShootPage({ onComplete }) {
  const [photoIndex, setPhotoIndex] = useState(1);
  const [countIndex, setCountIndex] = useState(0);
  const [showCountdown, setShowCountdown] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!showCountdown) return;

    if (countIndex >= COUNTDOWN_IMAGES.length - 1) {
      const finishTimer = setTimeout(() => {
        setShowCountdown(false);

        if (photoIndex < 4) {
          setPhotoIndex((prev) => prev + 1);
        } else {
          setTimeout(() => {
            onComplete();
          }, 800);
        }
      }, 1000);

      return () => clearTimeout(finishTimer);
    }

    const nextTimer = setTimeout(() => {
      setCountIndex((prev) => prev + 1);
    }, 1000);

    return () => clearTimeout(nextTimer);
  }, [showCountdown, countIndex, photoIndex, onComplete]);

  useEffect(() => {
    if (!hasStarted) return;
    if (showCountdown) return;
    if (photoIndex === 1) return;
    if (photoIndex > 4) return;

    const autoTimer = setTimeout(() => {
      setCountIndex(0);
      setShowCountdown(true);
    }, 1200);

    return () => clearTimeout(autoTimer);
  }, [photoIndex, hasStarted, showCountdown]);

  const startShoot = () => {
    if (hasStarted) return;

    setHasStarted(true);
    setCountIndex(0);
    setShowCountdown(true);
  };

  return (
    <div className="shoot-app">
      <div className="shoot-screen">
        <div className="frame-preview-box">
          <div className="frame-slot">
            <img src={shootLight1} alt="" className="shoot-light shoot-light-1" />
            <img src={shootLight2} alt="" className="shoot-light shoot-light-2" />
            <img src={shootCardOnly} alt="" className="shoot-card-image" />

            {showCountdown && (
              <img
                src={COUNTDOWN_IMAGES[countIndex]}
                alt=""
                className="countdown-image"
              />
            )}
          </div>
        </div>

        <div className="shoot-control">
          <div className="shoot-count">{photoIndex}/4</div>

          <button
            className="shutter-button-reset"
            onClick={startShoot}
            disabled={hasStarted}
          >
            <img src={shutterBar} alt="" className="shutter-bar-image" />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ======================
   RESULT PAGE
====================== */

function ResultPage({ finalFrame, onDecorate }) {
  return (
    <div className="result-app">
      <div className="result-screen">
        <div className="result-left">
          <img src={finalFrame} alt="" className="result-frame-image" />

          <button
            className="result-image-button decorate-button"
            onClick={onDecorate}
          >
            <img src={decorateBubble} alt="" className="decorate-image" />
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

          <button className="result-image-button print-button">
            <img src={printBubble} alt="" className="print-bubble-image" />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ======================
   DECORATE PAGE
====================== */

function DecoratePage({ finalFrame, onNext }) {
  return (
    <div className="decorate-page">
      <img src={timer90} alt="" className="decorate-timer-image" />

      <div className="decorate-layout">
        <button
          type="button"
          onClick={onNext}
          className="decorate-next-button-reset"
        >
          <img
            src={printVertical}
            alt="넘어가기"
            className="decorate-print-button-image"
          />
        </button>

        <img src={finalFrame} alt="" className="decorate-frame-image" />

        <img
          src={stickerPanel}
          alt=""
          className="decorate-sticker-panel-image"
        />
      </div>
    </div>
  );
}

/* ======================
   FILTER PAGE
====================== */

function FilterPage({ finalFrame, onNext }) {
  return (
    <div className="filter-page">
      <img src={timer90} alt="" className="filter-timer-image" />

      <div className="filter-top-area">
        <img src={finalFrame} alt="" className="filter-main-frame-image" />

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
            <div key={item.id} className="filter-item">
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

/* ======================
   FINAL PAGE
====================== */

function FinalPage({ finalFrame }) {
  return (
    <div className="final-page">
      <div className="final-layout">
        <div className="final-left">
          <img src={finalFrame} alt="" className="final-frame-image" />
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

          <button type="button" className="final-print-button">
            출력하기 &gt;
          </button>
        </div>
      </div>
    </div>
  );
}

/* ======================
   APP
====================== */

export default function App() {
  const [page, setPage] = useState("intro");
  const [selectedFrame, setSelectedFrame] = useState(frame1);

  if (page === "intro") {
    return <IntroPage onNext={() => setPage("tutorial")} />;
  }

  if (page === "tutorial") {
    return <TutorialPage onNext={() => setPage("frame")} />;
  }

  if (page === "frame") {
    return (
      <FramePage
        onNext={() => setPage("shoot")}
        selectedFrame={selectedFrame}
        setSelectedFrame={setSelectedFrame}
      />
    );
  }

  if (page === "shoot") {
    return <ShootPage onComplete={() => setPage("result")} />;
  }

  if (page === "result") {
    return (
      <ResultPage
        finalFrame={selectedFrame}
        onDecorate={() => setPage("decorate")}
      />
    );
  }

  if (page === "decorate") {
    return (
      <DecoratePage
        finalFrame={selectedFrame}
        onNext={() => setPage("filter")}
      />
    );
  }

  if (page === "filter") {
    return (
      <FilterPage
        finalFrame={selectedFrame}
        onNext={() => setPage("final")}
      />
    );
  }

  return <FinalPage finalFrame={selectedFrame} />;
}