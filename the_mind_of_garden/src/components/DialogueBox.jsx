import "../css/DialogueBox.css";
import npcImg from "/assets/npc.png";
import playerImg from "/assets/player.png";

const DialogueBox = ({ dialogue, onNext }) => {
  return (
    <div className="dialogue-container">
      <img
        src={dialogue.character === "npc" ? npcImg : playerImg}
        alt="Character"
        className="dialogue-avatar"
      />
      <p className="dialogue-text">{dialogue.text}</p>
      <button onClick={onNext} className="dialogue-next-button">
        next
      </button>
    </div>
  );
};

export default DialogueBox;
