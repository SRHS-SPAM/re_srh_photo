import "./App.css";
// 기존: import { useState } from "react";
import { useState, useEffect } from "react"; // useEffect를 추가해야 합니다!

// import mainIntro from "./assets/main.png"; // 실제 파일명에 맞게 수정

import IntroPage from './page/IntroPage';
import DecoratePage from './page/decoratePage';
import TutorialPage from './page/tutorialPage';
import FramePage from './page/framPage';
import ShootPage from './page/WebcamCapture';
import ResultPage from './page/resultPage';
import FilterPage from './page/filterPage';

/* 프레임 이미지들 */
import frame1 from "./assets/frame1.png";
import frame2 from "./assets/frame2.png";
import frame3 from "./assets/frame3.png";
import frame4 from "./assets/frame4.png";
import frame5 from "./assets/frame5.png";
import frame6 from "./assets/frame6.png";
// /* 촬영 화면용 이미지들 */
// import frameBg from "./assets/frame_bg.png";
// import tutorialStrip from "./assets/tutorial_strip.png";
// import blackBar from "./assets/blackbar.png";
// import peopleIcon from "./assets/people_icon.png";
// /* 꾸미기 화면용 이미지들 */
// import shutterBar from "./assets/shutter_bar.png";
// /* 사진 찍는 화면용 이미지들 */
// import five from "./assets/5.png";
// import four from "./assets/4.png";
// import three from "./assets/3.png";
// import two from "./assets/2.png";
// import one from "./assets/1.png";

// import qrBox from "./assets/qr_box.png";
// import bubble from "./assets/bubble.png";
// import printBubble from "./assets/print_bubble.png";
// import decorateBubble from "./assets/decorate_bubble.png";

// import timer90 from "./assets/timer_90.png";
// import printVertical from "./assets/print_button.png";

// /* 촬영 화면용 분리 이미지 */
// import shootLight1 from "./assets/조명1.png";
// import shootLight2 from "./assets/조명2.png";
// import shootCardOnly from "./assets/card.png";


/* ======================
   APP
====================== */

export default function App() {
  const [page, setPage] = useState("intro"); //나중에 바꾸기
  // const [page, setPage] = useState("decorate"); // 테스트용으로 바로 결과 페이지로 시작
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

  // return <FinalPage finalFrame={selectedFrame} />;
}
