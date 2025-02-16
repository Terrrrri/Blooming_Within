import { useState } from "react";
import DialogueBox from "./DialogueBox";
import "../css/GameIntro.css";

const GameIntro = ({ onNext, setAttributes }) => {
  const dialogues = [
    { character: "npc", text: "Welcome, traveler! This world is full of emotions—some bright and warm, others heavy and tangled. Your journey is to find the most radiant rose, but to do that, you must first understand your own emotions." },
    { character: "player", text: "That sounds challenging... but I'm ready to begin!" },
    { character: "npc", text: "Before we begin, let's figure out where you are on your journey. You'll answer four simple questions, each earning you a starting score based on how you're feeling right now." },
    { character: "player", text: "Alright, let's do this." },
    { character: "npc", text: "As you play, you’ll earn more points through four mini-games, each helping you regulate different emotions. The goal? Reach 100 points and unlock the final Blooming Rose." }
  ];

  const questions = [
    {
      question: "Imagine you’re walking through a mysterious world. What does it look like?",
      answers: [
        { text: "A peaceful meadow, shifting with the breeze. I feel balanced most of the time.", points: { stability: 10 } },
        { text: "A rolling sea—some days are calm, others feel a bit overwhelming, but I manage.", points: { stability: 8 } },
        { text: "A brewing storm—everything feels intense and unpredictable.", points: { stability: 6 } },
        { text: "A vast, empty desert—I feel disconnected, like I’m just drifting.", points: { stability: 5 } },
      ],
    },
    {
      question: "A challenge appears in your path. How do you react?",
      answers: [
        { text: "Face it head-on, adjusting as needed—every challenge is a learning experience.", points: { resilience: 5 } },
        { text: "Pause to think, but eventually move forward—it takes some effort, but I try.", points: { resilience: 4 } },
        { text: "Overthink every step, second-guessing myself until I feel stuck.", points: { resilience: 3 } },
        { text: "Turn around or avoid it entirely—it’s just too overwhelming.", points: { resilience: 2 } },
      ],
    },
    {
      question: "You hear a voice in the distance whispering about a recent mistake you made. What do you do?",
      answers: [
        { text: "Reflect, learn, and move forward—mistakes happen, and that’s okay.", points: { positivity: 5 } },
        { text: "Feel bad about it but try not to let it define me.", points: { positivity: 4 } },
        { text: "Replay it over and over, thinking about what I should’ve done differently.", points: { positivity: 3 } },
        { text: "Let it weigh on me completely—mistakes feel like proof that I’m failing.", points: { positivity: 2 } },
      ],
    },
    {
      question: "You wake up in a strange place, and you’re handed a magical object. What does it do?",
      answers: [
        { text: "It glows softly, bringing me clarity and calm. I know I can face whatever comes next.", points: { connection: 5 } },
        { text: "It flickers—sometimes strong, sometimes dim. I’m still figuring it out.", points: { connection: 4 } },
        { text: "It sparks chaotically—powerful, but hard to control. I feel overwhelmed.", points: { connection: 3 } },
        { text: "It’s cold and silent. I don’t really feel anything at all.", points: { connection:  2} },
      ],
    },
  ];

  const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showQuestion, setShowQuestion] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [currentPhase, setCurrentPhase] = useState("dialogue"); // 'dialogue' | 'question' | 'answer'

  const handleNextDialogue = () => {
    if (currentDialogueIndex < dialogues.length - 1) {
      setCurrentDialogueIndex(currentDialogueIndex + 1);
    } else {
      setShowQuestion(true);
      setCurrentPhase("question");
    }
  };

  const handleAnswerSelect = (answerIndex) => {
    const answer = questions[currentQuestionIndex].answers[answerIndex];

    // 记录玩家选择的答案
    setSelectedAnswer(answer);
    setCurrentPhase("answer");

    // 更新属性值
    setAttributes((prev) => {
      let updatedAttributes = { ...prev };
      Object.keys(answer.points).forEach((key) => {
        updatedAttributes[key] += answer.points[key];
      });
      return updatedAttributes;
    });

    // 进入下一步（下一个问题 or 结束）
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setCurrentPhase("question");
      } else {
        onNext();
      }
    }, 2000); // 2秒后进入下一步
  };

  return (
    <div className="game-intro">
      {/* 对话阶段，NPC 和玩家头像显示 */}
      {currentPhase === "dialogue" && (
        <>
          <div className="characters-container">
            <img
              src="/assets/npc.png"
              alt="NPC"
              className={`character-image ${dialogues[currentDialogueIndex].character === "npc" ? "active" : "inactive"}`}
            />
            <img
              src="/assets/player.png"
              alt="Player"
              className={`character-image ${dialogues[currentDialogueIndex].character === "player" ? "active" : "inactive"}`}
            />
          </div>
          <DialogueBox
            dialogue={dialogues[currentDialogueIndex]}
            onNext={handleNextDialogue}
          />
        </>
      )}

      {/* 选项阶段，隐藏 NPC 和玩家头像 */}
      {currentPhase === "question" && (
        <div className="question-container">
          <DialogueBox dialogue={{ character: "npc", text: questions[currentQuestionIndex].question }} />
          <div className="options">
            {questions[currentQuestionIndex].answers.map((answer, index) => (
              <button key={index} className="option-button" onClick={() => handleAnswerSelect(index)}>
                {answer.text}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 玩家选择后，玩家头像回归，玩家说出答案 */}
      {currentPhase === "answer" && selectedAnswer && (
        <div className="answer-container">
          <div className="characters-container">
            <img src="/assets/player.png" alt="Player" className="character-image active" />
          </div>
          <DialogueBox dialogue={{ character: "player", text: selectedAnswer.text }} />
        </div>
      )}
    </div>
  );
};

export default GameIntro;
