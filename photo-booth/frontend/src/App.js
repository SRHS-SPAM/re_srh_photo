import "./App.css";
import { useState } from "react";

import frame1 from "./assets/frame1.png";

import IntroPage from "./page/IntroPage";
import TutorialPage from "./page/tutorialPage";
import FramePage from "./page/framPage";
import ShootPage from "./page/shootPage";
import ResultPage from "./page/resultPage";
import DecoratePage from "./page/decoratePage";
import FilterPage from "./page/filterPage";
import FinalPage from "./page/finalPage";

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
