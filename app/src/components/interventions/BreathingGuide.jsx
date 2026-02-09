import { useEffect, useMemo, useRef, useState } from "react";

const breathingPatterns = {
  box: { inhale: 4, hold1: 4, exhale: 4, hold2: 4, name: "Box Breathing", description: "Equal breathing for balance" },
  calm: { inhale: 4, hold1: 2, exhale: 6, hold2: 2, name: "Calming Breath", description: "Longer exhale to relax" },
  relaxing: { inhale: 4, hold1: 0, exhale: 8, hold2: 0, name: "4-8 Relaxing", description: "Deep relaxation breath" },
};

function BreathingGuide({ onClose }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [pattern, setPattern] = useState("calm");
  const [phase, setPhase] = useState("ready");
  const [counter, setCounter] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  const intervalRef = useRef(null);
  const currentPattern = breathingPatterns[pattern];

  const phases = useMemo(
    () =>
      [
        { name: "inhale", duration: currentPattern.inhale, label: "Breathe In", tone: "inhale" },
        { name: "hold1", duration: currentPattern.hold1, label: "Hold", tone: "hold" },
        { name: "exhale", duration: currentPattern.exhale, label: "Breathe Out", tone: "exhale" },
        { name: "hold2", duration: currentPattern.hold2, label: "Hold", tone: "hold" },
      ].filter((item) => item.duration > 0),
    [currentPattern]
  );

  useEffect(() => {
    if (!isPlaying) {
      clearInterval(intervalRef.current);
      return;
    }

    let phaseIndex = 0;
    let count = phases[0].duration;
    setPhase(phases[0].name);
    setCounter(count);

    intervalRef.current = setInterval(() => {
      count -= 1;
      if (count <= 0) {
        phaseIndex = (phaseIndex + 1) % phases.length;
        count = phases[phaseIndex].duration;
        setPhase(phases[phaseIndex].name);
      }
      setCounter(count);
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [isPlaying, pattern, phases]);

  const currentPhase = phases.find((item) => item.name === phase) || phases[0];

  const circleScale = useMemo(() => {
    if (!isPlaying) return 1;
    if (phase === "inhale") return 1.4;
    if (phase === "exhale") return 0.82;
    return phase === "hold1" ? 1.4 : 0.82;
  }, [phase, isPlaying]);

  return (
    <section className="app-intervention app-breathing-guide">
      <header className="app-intervention__header app-breathing-guide__header">
        <div className="app-breathing-guide__icon">〰️</div>
        <div>
          <h2>Guided Breathing</h2>
          <p>Follow the circle and breathe.</p>
        </div>
      </header>

      <div className="app-breathing-guide__patterns">
        {Object.entries(breathingPatterns).map(([key, val]) => (
          <button
            key={key}
            type="button"
            onClick={() => {
              setPattern(key);
              setIsPlaying(false);
              setPhase("ready");
              setCounter(0);
            }}
            className={`app-breathing-guide__pattern${pattern === key ? " is-active" : ""}`}
          >
            <div className="app-breathing-guide__pattern-title">{val.name}</div>
            <div className="app-breathing-guide__pattern-desc">{val.description}</div>
          </button>
        ))}
      </div>

      <div className="app-breathing-guide__circle-wrap">
        <div className={`app-breathing-guide__glow app-breathing-guide__glow--${currentPhase?.tone || "inhale"}`} />
        <div
          className={`app-breathing-guide__circle app-breathing-guide__circle--${currentPhase?.tone || "inhale"}`}
          style={{ transform: `scale(${circleScale})`, transitionDuration: `${currentPhase?.duration || 1}s` }}
        >
          <div className="app-breathing-guide__circle-inner">
            <div className="app-breathing-guide__count">{isPlaying ? counter : "•"}</div>
            <div className="app-breathing-guide__label">{isPlaying ? currentPhase?.label : "Ready"}</div>
          </div>
        </div>
      </div>

      <div className="app-breathing-guide__controls">
        <button
          className="app-breathing-guide__control"
          type="button"
          onClick={() => setIsMuted((prev) => !prev)}
        >
          {isMuted ? "Muted" : "Sound"}
        </button>
        <button
          className="app-breathing-guide__control app-breathing-guide__control--primary"
          type="button"
          onClick={() => setIsPlaying((prev) => !prev)}
        >
          {isPlaying ? "Pause" : "Play"}
        </button>
        <button
          className="app-breathing-guide__control"
          type="button"
          onClick={() => {
            setIsPlaying(false);
            setPhase("ready");
            setCounter(0);
          }}
        >
          Reset
        </button>
      </div>

      <div className="app-breathing-guide__tip">
        <p>Try AI Meditation for a personalized guided session based on how you feel.</p>
      </div>

      <div className="app-intervention__actions">
        <button className="app-intervention__ghost" type="button" onClick={onClose}>
          Back
        </button>
      </div>
    </section>
  );
}

export default BreathingGuide;
