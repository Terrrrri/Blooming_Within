import { useState, useEffect } from "react";
import GameIntro from "./components/GameIntro";
import GameMenu from "./components/GameMenu";
import CalmTheStorm from "./components/CalmTheStorm";
import EchoesInRiver from "./components/EchoesInRiver";
import PiecebyPeace from "./components/PiecebyPeace";
import Regulation from "./components/Regulation";
import Regulation2 from "./components/Regulation2";
import Regulation3 from "./components/Regulation3";
import Ending from "./components/Ending"; 
import DialogueBox from "./components/DialogueBox";
import "./css/App.css"; 

// Background images
import introBg from "/assets/game_intro_bg.png";
import gardenBg from "/assets/bg_menu.png";
import stormBg from "/assets/game1_bg.png";
import riverBg from "/assets/river.png"; 
import regulationBg from "/assets/game4-1bg.png";
import endingBg from "/assets/endding_bg.png";

// Flower images
import seedImg from "/assets/rose0.png";
import sproutImg from "/assets/rose1.png";
import budImg from "/assets/rose2.png";
import bloomImg from "/assets/rose3.png";

// Attribute icons
import stabilityIcon from "/assets/icons/G1.png";
import resilienceIcon from "/assets/icons/G2.png";
import positivityIcon from "/assets/icons/g3.png";
import connectionIcon from "/assets/icons/g4.png";

function App() {
  const [gameStage, setGameStage] = useState("intro");
  const [background, setBackground] = useState(introBg);
  const [dialogue, setDialogue] = useState(null);

  // Rose attributes
  const [attributes, setAttributes] = useState({
    stability: 0,
    resilience: 0,
    positivity: 0,
    connection: 0,
  });

  // Calculate total attributes
  const totalAttributes =
    attributes.stability + attributes.resilience + attributes.positivity + attributes.connection;

  // Automatically go to the ending when totalAttributes reaches 100
  useEffect(() => {
    if (totalAttributes >= 100) {
      setGameStage("end");
      setBackground(endingBg);
    }
  }, [totalAttributes]);

  // 🌱 Determine the flower growth stage
  const getFlowerImage = () => {
    if (totalAttributes < 40) return seedImg;
    if (totalAttributes < 60) return sproutImg;
    if (totalAttributes < 99) return budImg;
    return bloomImg;
  };

  // 🔄 Handle stage transitions
  const handleStageChange = (stage) => {
    setGameStage(stage);
    if (stage === "menu") setBackground(gardenBg);
    if (stage === "calm") setBackground(stormBg);
    if (stage === "game2") setBackground(riverBg);
    if (stage === "game3") setBackground(gardenBg);
    if (stage === "game4") setBackground(regulationBg);
    if (stage === "end") setBackground(endingBg);
  };

  return (
    <div className="app-container" style={{ backgroundImage: `url(${background})` }}>
      {/* Show flower status only if not in the ending stage */}
      {gameStage !== "end" && (
        <div className="flower-status">
          <img src={getFlowerImage()} alt="Flower Stage" className="flower-image" />
          <div className="attribute-summary">
            <p>
              <img src={stabilityIcon} alt="Stability Icon" className="attribute-icon" />
              <strong> Stability:</strong> {attributes.stability}
            </p>
            <p>
              <img src={resilienceIcon} alt="Resilience Icon" className="attribute-icon" />
              <strong> Resilience:</strong> {attributes.resilience}
            </p>
            <p>
              <img src={positivityIcon} alt="Positivity Icon" className="attribute-icon" />
              <strong> Positivity:</strong> {attributes.positivity}
            </p>
            <p>
              <img src={connectionIcon} alt="Connection Icon" className="attribute-icon" />
              <strong> Connection:</strong> {attributes.connection}
            </p>
          </div>
          <button className="menu-button" onClick={() => handleStageChange("menu")}>
            Return to Menu
          </button>
        </div>
      )}

      {/* 🎮 Game Content */}
      <div className="game-content">
        {gameStage === "intro" && (
          <GameIntro 
            onNext={() => handleStageChange("menu")}
            setAttributes={setAttributes}
          />
        )}
        {gameStage === "menu" && <GameMenu onStartGame={(game) => handleStageChange(game)} />}
        {gameStage === "calm" && (
          <CalmTheStorm
            attributes={attributes}
            setAttributes={setAttributes}
            setDialogue={setDialogue}
            onGameEnd={() => handleStageChange("menu")}
          />
        )}
        {gameStage === "game2" && (
          <EchoesInRiver
            attributes={attributes}
            setAttributes={setAttributes}
            setDialogue={setDialogue}
            onNext={() => handleStageChange("menu")}
          />
        )}
        {gameStage === "game3" && (
          <PiecebyPeace
            attributes={attributes}
            setAttributes={setAttributes}
            setDialogue={setDialogue}
            onGameEnd={() => handleStageChange("menu")}
          />
        )}
        {gameStage === "game4" && (
          <Regulation
            attributes={attributes}
            setAttributes={setAttributes}
            setDialogue={setDialogue}
            onNextStage={() => handleStageChange("game4-1")}
          />
        )}
        {gameStage === "game4-1" && (
          <Regulation2
            attributes={attributes}
            setAttributes={setAttributes}
            setDialogue={setDialogue}
            onNextStage={() => handleStageChange("game4-2")}
          />
        )}
        {gameStage === "game4-2" && (
          <Regulation3
            attributes={attributes}
            setAttributes={setAttributes}
            setDialogue={setDialogue}
            onNextStage={() => handleStageChange("menu")}
          />
        )}

        {/* Show Ending screen when in end stage */}
        {gameStage === "end" && <Ending />}
      </div>

      {/* 💬 Dialogue Box - Pinned to Bottom */}
      {dialogue && <DialogueBox dialogue={dialogue} onNext={() => setDialogue(null)} />}
    </div>
  );
}

export default App;
