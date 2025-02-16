import { useState, useEffect } from "react";
import "../css/PiecebyPeace.css";

const gridSize = 3;
const pieceSize = 200;
const imageSrc = "/assets/pieces.png";

function shuffleArray(array) {
  let shuffled;
  do {
    shuffled = [...array]
      .map((value) => ({ ...value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ sort, ...value }) => value);
  } while (shuffled.every((piece, index) => piece.id === index));
  return shuffled;
}

function PiecebyPeace({ attributes, setAttributes, onGameEnd }) {
  const [pieces, setPieces] = useState([]);
  const [solved, setSolved] = useState(false);
  const [showIntro, setShowIntro] = useState(true); // 初始显示介绍界面
  const [showCongrats, setShowCongrats] = useState(false); // 成功界面

  const initializePieces = () => {
    let initialPieces = [];
    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        initialPieces.push({
          id: row * gridSize + col,
          correctX: col,
          correctY: row,
        });
      }
    }

    let shuffledPieces = shuffleArray(initialPieces);

    shuffledPieces = shuffledPieces.map((piece, index) => ({
      ...piece,
      x: index % gridSize,
      y: Math.floor(index / gridSize),
    }));

    setPieces(shuffledPieces);
    setSolved(false);
  };

  useEffect(() => {
    if (!showIntro) {
      initializePieces();
    }
  }, [showIntro]);

  useEffect(() => {
    if (solved) {
      setShowCongrats(true);
      setTimeout(() => {
        setShowCongrats(false);
        setShowIntro(true); // 回到菜单
        initializePieces();
        onGameEnd(); // 游戏结束
      }, 4000); // 4秒后自动回到菜单
    }
  }, [solved]);

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData("pieceId", id);
  };

  const handleDrop = (e, targetId) => {
    const draggedId = parseInt(e.dataTransfer.getData("pieceId"), 10);
    if (draggedId === targetId) return;

    let updatedPieces = [...pieces];
    let draggedPiece = updatedPieces.find((p) => p.id === draggedId);
    let targetPiece = updatedPieces.find((p) => p.id === targetId);

    [draggedPiece.x, targetPiece.x] = [targetPiece.x, draggedPiece.x];
    [draggedPiece.y, targetPiece.y] = [targetPiece.y, draggedPiece.y];

    setPieces([...updatedPieces]);
    checkCompletion(updatedPieces);
  };

  const checkCompletion = (pieces) => {
    const isSolved = pieces.every(
      (piece) => piece.x === piece.correctX && piece.y === piece.correctY
    );
    if (isSolved) {
      setSolved(true);
      setAttributes((prev) => ({
        ...prev,
        stability: prev.stability + 4,
        resilience: prev.resilience + 4,
        positivity: prev.positivity + 12,
        connection: prev.connection + 4,
      }));
    }
  };

  return (
    <div className="puzzle-container">
      {/* 介绍页面 */}
      {showIntro ? (
        <div className="intro-container">
          <h2>Piece by Peace 🧩</h2>
          <p>Rearrange the puzzle pieces to restore the complete image.</p>
          <p>Drag and drop the pieces into their correct positions.</p>
          <p>Once all pieces are in place, you will complete the game and earn rewards!</p>
          <button className="start-button" onClick={() => setShowIntro(false)}>
            Start Game
          </button>
        </div>
      ) : showCongrats ? (
        // 🎉 Congrats 界面
        <div className="congrats-container">
          <h2>🎉 Congratulations! 🎉</h2>
          <p>You've completed the puzzle! Great job!</p>
          <button className="menu-button" onClick={() => setShowIntro(true)}>
            Return to Menu
          </button>
        </div>
      ) : (
        // 游戏界面
        <div className="puzzle-board">
          {pieces.map((piece) => (
            <div
              key={piece.id}
              className="puzzle-piece"
              draggable={!solved}
              onDragStart={(e) => handleDragStart(e, piece.id)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDrop(e, piece.id)}
              style={{
                backgroundImage: `url(${imageSrc})`,
                backgroundSize: `${gridSize * pieceSize}px ${gridSize * pieceSize}px`,
                backgroundPosition: `-${piece.correctX * pieceSize}px -${piece.correctY * pieceSize}px`,
                left: `${piece.x * pieceSize}px`,
                top: `${piece.y * pieceSize}px`,
              }}
            ></div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PiecebyPeace;
