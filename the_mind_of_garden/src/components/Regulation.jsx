import React, { useState } from "react";
import "../css/Regulation.css";
import DialogueBox from "./DialogueBox";

const images = [
  {
    id: "leaf",
    image: "/assets/icons/leaf.png",
    sound: "/sounds/Nice_wind_chimes.mp3",
    tooltip: "This is the sound of wind chimes."
  },
  {
    id: "water",
    image: "/assets/icons/river.png",
    sound: "/sounds/river.mp3",
    tooltip: "This is the sound of a flowing river."
  },
  {
    id: "bird",
    image: "/assets/icons/bird.png",
    sound: "/sounds/bird_call.mp3",
    tooltip: "This is the sound of a bird singing."
  }
];

// 存储所有 Audio 实例的数组
const activeAudioInstances = [];

function Regulation({ onNextStage }) {
  const [clickedIcons, setClickedIcons] = useState(new Set());
  const [dialogue, setDialogue] = useState({
    character: "npc",
    text: "The world has always been singing. You just couldn't help it. Tap each icon to listen to the sounds of nature and explore the world around you."
  });

  const playSound = (sound, iconId) => {
    const audio = new Audio(sound);
    activeAudioInstances.push(audio); // 将新的 Audio 实例存入数组
    audio.play().catch((error) => {
      console.error("Failed to play sound:", error);
    });

    setTimeout(() => {
      audio.pause();
      audio.currentTime = 0;
    }, 5000);

    setClickedIcons((prev) => new Set(prev).add(iconId));
  };

  const stopAllAudio = () => {
    activeAudioInstances.forEach((audio) => {
      audio.pause();
      audio.currentTime = 0;
    });
    activeAudioInstances.length = 0; // 清空数组
  };

  const handleNext = () => {
    if (clickedIcons.size === images.length) {
      stopAllAudio(); // 停止所有音频
      onNextStage(); // 进入下一个阶段
    } else {
      alert("Please click all icons to unlock the next step.");
    }
  };

  const positions = [
    { left: "5%", top: "5%" },
    { left: "52%", top: "38%", transform: "translateX(-30%)" },
    { right: "5%", top: "5%" }
  ];

  return (
    <div className="icon-container">
      {images.map((icon, index) => (
        <div
          key={icon.id}
          className="icon-wrapper"
          style={{
            position: "absolute",
            ...positions[index]
          }}
          onClick={() => playSound(icon.sound, icon.id)}
        >
          <img src={icon.image} alt={icon.id} className="icon-image" />
          <div className="tooltip">{icon.tooltip}</div>
        </div>
      ))}
      <DialogueBox dialogue={dialogue} onNext={handleNext} />
    </div>
  );
}

export default Regulation;