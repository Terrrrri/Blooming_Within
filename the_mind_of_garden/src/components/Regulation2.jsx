import React, { useState } from "react";
import "../css/Regulation.css";
import DialogueBox from "./DialogueBox";

const images = [
  {
    id: "flower",
    image: "/assets/icons/flowers_none.png",
    colorImage: "/assets/icons/flowers.png",
    tooltip: "Bring this flower back to life."
  },
  {
    id: "birds",
    image: "/assets/icons/birds_none.png",
    colorImage: "/assets/icons/birds.png",
    tooltip: "Restore the color of these birds."
  },
  {
    id: "bell",
    image: "/assets/icons/bell_none.png",
    colorImage: "/assets/icons/bell.png",
    tooltip: "Bring the color back to the bell."
  }
];

function Regulation2({ onNextStage }) {
  const [clickedIcons, setClickedIcons] = useState(new Set());
  const [dialogue, setDialogue] = useState({
    character: "npc",
    text: "You think the world is colorless, but it's just waiting for you to light it up. Click on each icon to bring them back to life."
  });

  const handleIconClick = (iconId) => {
    setClickedIcons((prev) => new Set(prev).add(iconId));
  };

  const handleNext = () => {
    if (clickedIcons.size === images.length) {
      onNextStage(); // 调用 onNextStage，跳转到 Regulation3
    } else {
      alert("Please click all icons to unlock the next step.");
    }
  };

  const positions = [
    { left: "5%", top: "36%" },
    { left: "55%", top: "25%", transform: "translateX(-50%)" },
    { right: "1%", top: "5%" }
  ];

  return (
    <div className="icon-container">
      {images.map((icon, index) => (
        <div
          key={icon.id}
          className={`icon-wrapper ${clickedIcons.has(icon.id) ? "bounce" : ""}`}
          style={{
            position: "absolute",
            ...positions[index]
          }}
          onClick={() => handleIconClick(icon.id)}
        >
          <img
            src={clickedIcons.has(icon.id) ? icon.colorImage : icon.image}
            alt={icon.id}
            className="icon-image-regulation2"
          />
          <div className="tooltip">{icon.tooltip}</div>
        </div>
      ))}
      <DialogueBox dialogue={dialogue} onNext={handleNext} />
    </div>
  );
}

export default Regulation2;