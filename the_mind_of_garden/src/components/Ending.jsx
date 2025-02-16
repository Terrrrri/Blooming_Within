import { useState, useEffect } from "react";
import "../css/Ending.css";
import fullBloomRose from "/assets/rose3.png"; 

const Ending = () => {
    const [showIntro, setShowIntro] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);
    const [showFirstText, setShowFirstText] = useState(true);

    

    useEffect(() => {
        const timer = setTimeout(() => {
            setFadeOut(true);
            setTimeout(() => {
                setShowIntro(false);
                setFadeOut(false); 
            }, 800);
        }, 2500); 
    
        return () => clearTimeout(timer);
    }, []);
    

    const handleMoreInfo = () => {
        setFadeOut(true);
        setTimeout(() => {
            setShowFirstText(false);
            setFadeOut(false);
        }, 800);
    };

    return (
        <div className="ending-container">
            {showIntro ? (
                
                <div className={`ending-intro ${fadeOut ? "fade-out" : ""}`}>
                    <h2>🌹 Congratulations! 🌹</h2>
                    <p>Your rose has fully bloomed. You are about to enter the ending.</p>
                    <img src={fullBloomRose} alt="Fully Bloomed Rose" className="bloomed-rose" />
                    <button className="continue-button" onClick={() => setShowIntro(false)}>
                        Enter Ending
                    </button>
                </div>
            ) : (
                
                <>
                    
                    <button className="more-info-btn" onClick={handleMoreInfo}>
                        More Info
                    </button>

                    {/* 结局文本 */}
                    <div className={`text-box ${fadeOut ? "fade-out" : ""}`}>
                        {showFirstText ? (
                            <p>
                                The beast is no longer alone. The rose garden has been restored, vibrant and full of life. <br /><br />
                                “Emotions never truly disappear; they just wait to be found again. See? Your heart is blooming too.”
                            </p>
                        ) : (
                            <p>
                                The four quiz questions are designed to assess different aspects of emotional well-being, each tied to one of the four core skills developed in the mini-games:
                                <br /><br />
                                🌬 <b>Stability (Anger Regulation)</b> – The question on handling frustration reflects how well a player manages anger and emotional outbursts. Players who struggle with control may benefit more from breathing exercises to calm the storm.
                                <br /><br />
                                🌊 <b>Resilience (Depressive Thoughts)</b> – The question on negative thinking patterns measures how a player responds to self-doubt and setbacks. Those who tend to dwell on negativity will learn cognitive restructuring techniques to challenge unhelpful thoughts.
                                <br /><br />
                                🧩 <b>Positivity (Anxiety Management)</b> – The question on coping with stress and overthinking assesses how well a player stays focused and engaged. If they struggle with racing thoughts, they can practice flow-state exercises through a simple puzzle.
                                <br /><br />
                                ✨ <b>Connection (Emotional Numbness)</b> – The question on emotional engagement gauges how connected a player feels to their surroundings and feelings. Those feeling detached can activate their senses to rediscover warmth, sound, and color.
                                <br /><br />
                                Each quiz result sets the player’s starting score and guides their journey, ensuring they engage with all four areas to grow, heal, and thrive. 🌸
                            </p>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default Ending;
