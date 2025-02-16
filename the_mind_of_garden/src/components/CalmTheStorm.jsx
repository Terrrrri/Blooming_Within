import { useState, useEffect } from "react";
import "../css/CalmTheStorm.css";
import DialogueBox from "./DialogueBox";

const CalmTheStorm = ({ attributes, setAttributes, onGameEnd }) => {
  const stages = ["Inhale", "Hold the Breath", "Exhale"];
  const stageDurations = [4000, 4000, 4000]; // 每个阶段 4 秒
  const [stage, setStage] = useState(0);
  const [progress, setProgress] = useState(0);
  const [dialogue, setDialogue] = useState("The storm is raging. The winds howl, shaking everything around you. Your thoughts are swirling, your body tenses—anger, frustration, chaos. But you have a choice: control the storm, or let it consume you. Please hold down the Enter key to inhale...");
  const [cycleCount, setCycleCount] = useState(0);
  const [isPressing, setIsPressing] = useState(false);
  const [pressStartTime, setPressStartTime] = useState(null);
  const [mustReleaseKey, setMustReleaseKey] = useState(false); // 必须松开 Enter 后才能进入下个阶段
  const [gameEnded, setGameEnded] = useState(false); // 防止无限触发
  const [audio] = useState(new Audio("/sounds/background.mp3")); // 替换为你的音乐路径

  useEffect(() => {
    // 播放背景音乐
    audio.loop = true;
    audio.volume = 0.5; // 调整音量
    audio.play().catch((error) => console.error("Audio play failed:", error));

    return () => {
      // 组件卸载时停止播放
      audio.pause();
      audio.currentTime = 0;
    };
  }, [audio]);

  useEffect(() => {
    if (cycleCount >= 2 && !gameEnded) {
      setGameEnded(true); // 标记游戏已结束，避免无限循环
      setDialogue("Yay! You did it! The little rose stays and sound!");
      setAttributes((prev) => ({ ...prev, stability: prev.stability + 12,
        resilience: prev.resilience + 4,
        positivity: prev.positivity + 4,
        connection: prev.connection +4,
       }));
      setTimeout(onGameEnd, 3000);
    }
  }, [cycleCount, gameEnded, setAttributes, onGameEnd]);
  
  useEffect(() => {
    let interval;
    if (isPressing && pressStartTime) {
      interval = setInterval(() => {
        const elapsedTime = Date.now() - pressStartTime;
        const progressPercentage = (elapsedTime / stageDurations[stage]) * 100;

        if (progressPercentage >= 100) {
          setProgress(100);
          clearInterval(interval);
          setMustReleaseKey(true); // 进入下个阶段前，必须松开 Enter
        } else {
          setProgress(progressPercentage);
        }
      }, 100);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isPressing, pressStartTime, stage]);

  const handleStageTransition = () => {
    if (stage === 2) {
      setCycleCount((prev) => prev + 1);
      setStage(0);
      setProgress(0);
      setDialogue("Take a deep breath. Feel the air enter your lungs. Please hold down the Enter key to inhale...");
    } else {
      setStage((prev) => prev + 1);
      setProgress(0);
      setDialogue(
        stage === 0
          ? "Hold it. Let the storm slow down. Please continue holding down the Enter key to hold your breath..."
          : "Exhale. Let go of the tension. Breathe with me. Please hold down the Enter key to exhale..."
      );
    }
    setMustReleaseKey(false); // 进入新阶段后，取消强制松键要求
  };

  const handleKeyDown = (e) => {
    if (e.code === "Enter") {
      if (mustReleaseKey) {
        setDialogue("Please release the Enter key before continuing!");
        return;
      }
      if (!isPressing) {
        setIsPressing(true);
        setPressStartTime(Date.now());
      }
    }
  };

  const handleKeyUp = (e) => {
    if (e.code === "Enter") {
      setIsPressing(false);
      const elapsedTime = Date.now() - pressStartTime;

      if (elapsedTime < stageDurations[stage]) {
        setDialogue("Did not hold for 4 seconds, stage failed. Restarting...");
        setProgress(0);
      } else {
        handleStageTransition();
      }
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [isPressing, stage, pressStartTime]);

  return (
    <div className="calm-the-storm">
      <h2>Calm the Storm</h2>
      <p className="instruction">
        Current stage {stages[stage]} - progress: {Math.round(progress)}%
      </p>

      {/* 进度条 */}
      <div className="progress-container">
        <div
          className="progress-bar-test"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* DialogueBox show NPC talk */}
      <DialogueBox
        dialogue={{ character: "npc", text: dialogue }}
        onNext={() => setDialogue("Please follow the instructions to continue...")}
      />
    </div>
  );
};

export default CalmTheStorm;

