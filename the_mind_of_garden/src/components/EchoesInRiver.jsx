import { useState } from "react";
import DialogueBox from "./DialogueBox";
import "../css/EchoesInRiver.css";

const EchoesInRiver = ({ onNext, setAttributes }) => {
  const dialogues = [
    { character: "npc", text: "This river carries your thoughts. Look at the water—do you notice anything?" },
    { character: "player", text: "I see a lot of questions in the river, and I barely recognize myself in the river. I'm upset." }
  ];

  const questions = {
    text: "What thought is floating through your mind?",
    options: [
      { text: "I'm not good enough", points: { stability: 10, connection: 14 } },
      { text: "I will never succeed", points: { resilience: 8, positivity: 16 } },
      { text: "No one likes me", points: { resilience: 12, positivity: 12 } },
      { text: "If I fail, that means I'm a loser", points: { resilience: 16, positivity: 8 } }
    ]
  };

  const responses = {
    "I'm not good enough": [
      "That's a tough feeling. But how did you come to this conclusion?",
      "Because I always make mistakes.",
      "Everyone makes mistakes. Does making mistakes truly mean you're not good enough? Can you think of a time when you learned from one?"
    ],
    "I will never succeed": [
      "It sounds like you're feeling really discouraged. But 'never' is a big word. Can you be absolutely sure that success is impossible?",
      "I've failed too many times.",
      "That must feel exhausting. Failing can be painful, but does it really mean you'll never succeed? What if failure is just part of the learning process?"
    ],
    "No one likes me": [
      "I hear you, but 'no one' is a strong statement. Are you sure that's completely true?",
      "People don't reach out to me.",
      "Relationships go both ways. Have you tried reaching out to someone first?"
    ],
    "If I fail, that means I'm a loser": [
      "Failure = being a loser? Is that really true, or just a feeling?",
      "Successful people don't fail.",
      "It might seem that way, but is that really true? Think about the last time you succeeded at something—was it perfect from the start?"
    ]
  };

  const [step, setStep] = useState("dialogue");
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [responseIndex, setResponseIndex] = useState(0);

  const handleNext = () => {
    if (step === "dialogue" && dialogueIndex < dialogues.length - 1) {
      setDialogueIndex(dialogueIndex + 1);
    } else if (step === "dialogue") {
      setStep("question");
    } else if (step === "response" && responseIndex < responses[selectedAnswer].length - 1) {
      setResponseIndex(responseIndex + 1);
    } else {
      onNext();
    }
  };

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer.text);
    setAttributes((prev) => {
      let updated = { ...prev };
      Object.entries(answer.points).forEach(([key, value]) => {
        updated[key] += value;
      });
      return updated;
    });
    setStep("response");
  };

  return (
    <div className="game-intro">
      {step === "dialogue" && (
        <>
          <div className="characters-container">
            {dialogues[dialogueIndex].character === "npc" ? (
              <img src="/assets/npc.png" alt="NPC" className="character-image active" />
            ) : (
              <img src="/assets/player.png" alt="Player" className="character-image active" />
            )}
          </div>
          <DialogueBox dialogue={dialogues[dialogueIndex]} onNext={handleNext} />
        </>
      )}

      {step === "question" && (
        <div className="question-container">
          <DialogueBox dialogue={{ character: "npc", text: questions.text }} />
          <div className="answer-options">
            {questions.options.map((option, index) => (
              <button key={index} className="answer-button" onClick={() => handleAnswerSelect(option)}>
                {option.text}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === "response" && selectedAnswer && (
        <>

          <div className="characters-container_test">
            <img
              src="/assets/player.png"
              alt="Player"
              className={`character-image ${responseIndex % 2 === 0 ? "active" : "inactive"}`}
            />
            <img
              src="/assets/npc.png"
              alt="NPC"
              className={`character-image ${responseIndex % 2 !== 0 ? "active" : "inactive"}`}
            />
          </div>


          <DialogueBox
            dialogue={{
              character: responseIndex % 2 === 0 ? "player" : "npc",
              text: responses[selectedAnswer][responseIndex],
            }}
            onNext={handleNext}
          />
        </>
      )}
    </div>
  );
};

export default EchoesInRiver;
