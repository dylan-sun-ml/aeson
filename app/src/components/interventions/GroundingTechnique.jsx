import { useState } from "react";

const steps = [
  {
    number: 5,
    title: "5 things you can SEE",
    instruction:
      "Look around you. What do you notice? A color on the wall, light through a window, the pattern on your shirt...",
    tone: "blue",
  },
  {
    number: 4,
    title: "4 things you can TOUCH",
    instruction:
      "Feel the texture of your clothes, the chair beneath you, your feet on the floor, your hands together...",
    tone: "green",
  },
  {
    number: 3,
    title: "3 things you can HEAR",
    instruction:
      "Listen carefully. Maybe the hum of air conditioning, distant voices, your own breathing...",
    tone: "violet",
  },
  {
    number: 2,
    title: "2 things you can SMELL",
    instruction: "Take a gentle sniff. Perhaps paper, your shampoo, fresh air...",
    tone: "amber",
  },
  {
    number: 1,
    title: "1 thing you can TASTE",
    instruction:
      "Notice the taste in your mouth. Maybe mint from toothpaste, coffee, or just the taste of calm...",
    tone: "rose",
  },
];

function GroundingTechnique({ onClose }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedItems, setCompletedItems] = useState({});
  const [isComplete, setIsComplete] = useState(false);

  const step = steps[currentStep];

  const handleItemComplete = (stepIndex, itemIndex) => {
    const key = `${stepIndex}-${itemIndex}`;
    setCompletedItems((prev) => ({ ...prev, [key]: true }));

    const stepItems = Array.from({ length: steps[stepIndex].number }, (_, i) => `${stepIndex}-${i}`);
    const allComplete = stepItems.every((k) => k === key || completedItems[k]);

    if (allComplete) {
      if (stepIndex < steps.length - 1) {
        setCurrentStep(stepIndex + 1);
      } else {
        setIsComplete(true);
      }
    }
  };

  const reset = () => {
    setCurrentStep(0);
    setCompletedItems({});
    setIsComplete(false);
  };

  return (
    <section className="app-intervention app-grounding-page">
      <div className="app-grounding__progress">
        {steps.map((item, idx) => (
          <span
            key={item.title}
            className={`app-grounding__progress-bar app-grounding__progress-bar--${item.tone}${
              idx < currentStep ? " is-complete" : idx === currentStep ? " is-current" : ""
            }`}
          />
        ))}
      </div>

      <header className="app-intervention__header">
        <h2>5-4-3-2-1 Grounding</h2>
        <p>Reconnect with the present moment.</p>
      </header>

      {!isComplete ? (
        <div className="app-grounding">
          <div className={`app-grounding__card app-grounding__card--${step.tone}`}>
            <div className={`app-grounding__icon app-grounding__icon--${step.tone}`}>
              {step.number}
            </div>
            <h3>{step.title}</h3>
            <p>{step.instruction}</p>
            <div className="app-grounding__grid">
              {Array.from({ length: step.number }, (_, i) => {
                const key = `${currentStep}-${i}`;
                const isChecked = completedItems[key];
                return (
                  <button
                    key={key}
                    className={`app-grounding__item${isChecked ? ` is-checked is-checked--${step.tone}` : ""}`}
                    type="button"
                    onClick={() => handleItemComplete(currentStep, i)}
                  >
                    {isChecked ? "✓" : i + 1}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="app-grounding__steps">
            {steps.map((item, idx) => (
              <span
                key={item.title}
                className={`app-grounding__step app-grounding__step--${item.tone}${
                  idx === currentStep ? " is-active" : ""
                }${idx < currentStep ? " is-done" : ""}`}
              >
                {item.number}
              </span>
            ))}
          </div>

          <div className="app-intervention__actions">
            <button className="app-intervention__ghost" type="button" onClick={reset}>
              Start Again
            </button>
            <button className="app-intervention__ghost" type="button" onClick={onClose}>
              Back
            </button>
          </div>
        </div>
      ) : (
        <div className="app-grounding__complete">
          <div className="app-grounding__complete-icon">✓</div>
          <h3>Well done 💚</h3>
          <p>You&apos;ve grounded yourself in the present. Take a moment to notice how you feel now.</p>
          <div className="app-intervention__actions">
            <button className="app-intervention__primary" type="button" onClick={reset}>
              Start Again
            </button>
            <button className="app-intervention__ghost" type="button" onClick={onClose}>
              Back
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default GroundingTechnique;
