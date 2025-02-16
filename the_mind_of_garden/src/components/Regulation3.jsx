import React, { useState } from "react";
import "../css/Regulation.css";
import DialogueBox from "./DialogueBox";

const Regulation3 = ({ onNextStage, setAttributes }) => {
  const [clickCount, setClickCount] = useState(0);
  const [dialogue, setDialogue] = useState({
    character: "npc",
    text: "Your heart isn't cold—it's just been forgotten for too long. Hold down to warm up the monster’s heart and restore its warmth."
  });

  const handleClick = () => {
    if (clickCount < 10) {
      setClickCount((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (clickCount >= 10) {
      onNextStage(); // 进度完成后进入下一阶段
    } else {
      alert("Keep clicking until the progress bar is full!");
    }
    setAttributes((prev) => ({ ...prev, stability: prev.stability + 4,
      resilience: prev.resilience + 4,
      positivity: prev.positivity + 4,
      connection: prev.connection +12,
     }));
  };

  const progressPercentage = (clickCount / 10) * 100;

  return (
    <div className="icon-container">
      <div className="monster-container" onClick={handleClick}>
      <img src="/assets/icons/g4 heart.png" alt="Monster" className="monster-image" />

      </div>

      <div className="progress-bar">
        <div
          className="progress-bar-fill"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>

      <DialogueBox dialogue={dialogue} onNext={handleNext} />
    </div>
  );
};

export default Regulation3;