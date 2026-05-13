import React, { useState, useEffect } from "react";
import "./App.css";

/* 페이지 컴포넌트 임포트 */
import IntroPage from './page/IntroPage';
import DecoratePage from './page/decoratePage';
import TutorialPage from './page/tutorialPage';
import FramePage from './page/framePage';
import WebcamCapture from './page/WebcamCapture';
import ResultPage from './page/resultPage';
import FilterPage from './page/filterPage';
import FinalPage from './page/finalPage';

/* 프레임 이미지들 */
import frame1 from "./assets/frame1.png";

export default function App() {
  /* 1. 상태 관리 (State) */
  // const [page, setPage] = useState("intro"); // 현재 페이지 상태 (intro, tutorial, frame, shoot, result, decorate, filter, final 등)
  const [page, setPage] = useState("decorate"); // 🔥 테스트용으로 바로 꾸미기 페이지로 시작
  
  
  const [selectedFrame, setSelectedFrame] = useState(frame1);
  const [photos, setPhotos] = useState([]); // 촬영된 사진들을 담을 배열

  /* 2. 사진 추가 함수 */
  const addPhoto = (imageSrc) => {
    setPhotos((prev) => [...prev, imageSrc]);
    console.log("새 사진 추가됨:", imageSrc);
  };

  // const [stickers, setStickers] = useState([]);
  //이미지 꾸미기 위해 스티커 상태 추가
  // 스티커들을 저장할 배열 상태 (초기값은 로컬스토리지에서 가져옴)
  const [stickers, setStickers] = useState(() => {
    const saved = localStorage.getItem("photo-stickers");
    return saved ? JSON.parse(saved) : [];
  });

  // 스티커가 추가되거나 움직일 때마다 저장하는 함수
  useEffect(() => {
    localStorage.setItem("photo-stickers", JSON.stringify(stickers));
  }, [stickers]);





  /* 3. 페이지 전환 로직 (조건부 렌더링) */
  
  // 메인 인트로
  if (page === "intro") {
    return <IntroPage onNext={() => setPage("tutorial")} />;
  }

  // 튜토리얼
  if (page === "tutorial") {
    return <TutorialPage onNext={() => setPage("frame")} />;
  }

  // 프레임 선택
  if (page === "frame") {
    return (
      <FramePage
        selectedFrame={selectedFrame} 
        setSelectedFrame={setSelectedFrame} 
        onNext={() => setPage("shoot")}
      />
    );
  }

  // 카메라 촬영 (가장 중요한 부분!)
  if (page === "shoot") {
    return (
      <WebcamCapture 
        addPhoto={addPhoto}           // 사진 저장 함수 전달
        photoCount={photos.length}    // 현재 몇 장 찍었는지 전달
        onComplete={() => setPage("result")} // 촬영 완료 시 결과 페이지로
      />
    );
  }

  // 촬영 결과 확인
  if (page === "result") {
    return (
      <ResultPage
        finalFrame={selectedFrame}
        photos={photos}               // 찍은 사진들 전달
        onDecorate={() => setPage("decorate")}
      />
    );
  }

  // 꾸미기 페이지와 필터 페이지 모두에 stickers와 setStickers를 전달합니다.
  if (page === "decorate") {
    return (
      <DecoratePage
        finalFrame={selectedFrame}
        photos={photos}
        stickers={stickers}      // 현재 스티커 목록 전달
        setStickers={setStickers} // 스티커를 추가/수정할 함수 전달
        onNext={() => setPage("filter")}
      />
      
    );
  }
  
  // App.js 내부 페이지 전환 로직
  if (page === "filter") {
    return (
      <FilterPage 
        stickers={stickers}      // ★ 작성하신 코드의 { stickers } 인자로 전달됨
        photos={photos}
        finalFrame={selectedFrame} 
        onNext={() => setPage("final")} 
      />
    );
  }

  if (page === "final") {
    return (
      <FinalPage 
        finalFrame={selectedFrame} 
        stickers={stickers} // 이 부분이 있어야 위 코드가 작동합니다!
        onReset={() => {
          setStickers([]);
          setPage("intro");
        }} 
      />
    );
  }

  return <div>마지막 페이지 (구현 예정)</div>;
}