import { useEffect, useState } from "react";

const GameMenu = ({ onStartGame }) => {
    const [fadeIn, setFadeIn] = useState(false);

    useEffect(() => {
        setFadeIn(true);
    }, []);

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                position: "relative",
                color: "black",
                fontFamily: "'Cormorant Garamond', serif",
                overflow: "hidden",
            }}
        >
            {/* Menu Box (保持中心对齐，但去掉背景颜色) */}
            <div
                style={{
                    textAlign: "center",
                    padding: "40px",
                    borderRadius: "12px",
                    opacity: fadeIn ? 1 : 0,
                    transform: fadeIn ? "scale(1)" : "scale(0.9)",
                    transition: "opacity 1s ease-out, transform 0.8s ease-out",
                    zIndex: 10,
                }}
            >
                <h2 
                    style={{ 
                        fontSize: "36px", 
                        marginBottom: "10px",
                    }}
                >
                    Choose   one    Path
                </h2>
                <p 
                    style={{ 
                        fontSize: "20px", 
                        marginBottom: "20px", 
                    }}
                >
                </p >

                <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                    {[
                        { id: "calm", label: "Calm the Storm", color: "#FFB6C1" },  // 轻柔粉
                        { id: "game2", label: "Echoes in the River", color: "#AEEEEE" }, // 马卡龙蓝
                        { id: "game3", label: "Piece By Peace", color: "#98FB98" }, // 薄荷绿
                        { id: "game4", label: "Finding the Spark", color: "#FFD700" }, // 奶油黄
                        
                    ].map((game) => (
                        <button
                            key={game.id}
                            onClick={() => onStartGame(game.id)}
                            style={{
                                padding: "12px 25px",
                                fontSize: "18px",
                                fontWeight: "bold",
                                background: game.color,
                                color: "black",
                                border: "none",
                                borderRadius: "10px",
                                cursor: "pointer",
                                transition: "transform 0.2s, box-shadow 0.3s ease-in-out",
                                boxShadow: "0 3px 8px rgba(0, 0, 0, 0.2)",
                                position: "relative",
                            }}
                            onMouseOver={(e) => {
                                e.target.style.transform = "scale(1.08)";
                                e.target.style.boxShadow = "0 8px 16px rgba(255, 255, 255, 0.3)";
                            }}
                            onMouseOut={(e) => {
                                e.target.style.transform = "scale(1)";
                                e.target.style.boxShadow = "0 3px 8px rgba(0, 0, 0, 0.2)";
                            }}
                        >
                            {game.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GameMenu;