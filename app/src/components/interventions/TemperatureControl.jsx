import { useMemo, useState } from "react";

const presets = [
  { name: "Cool Down", temp: 18 },
  { name: "Balanced", temp: 22 },
  { name: "Warm", temp: 26 },
];

function TemperatureControl({ onClose }) {
  const [temperature, setTemperature] = useState(22);
  const [isApplying, setIsApplying] = useState(false);
  const [applied, setApplied] = useState(false);

  const tone = useMemo(() => {
    if (temperature < 20) return "cool";
    if (temperature < 24) return "neutral";
    return "warm";
  }, [temperature]);

  const applyTemperature = () => {
    setIsApplying(true);
    setApplied(false);
    setTimeout(() => {
      setIsApplying(false);
      setApplied(true);
    }, 900);
  };

  return (
    <section className="app-intervention">
      <header className="app-intervention__header">
        <h2>Temperature Control</h2>
        <p>Adjust your calming device temperature.</p>
      </header>

      <div className="app-temp">
        <div className={`app-temp__display app-temp__display--${tone}`}>
          <div className="app-temp__value">{temperature}°C</div>
          <div className="app-temp__label">Comfort level</div>
        </div>

        <div className="app-temp__slider">
          <input
            type="range"
            min="16"
            max="30"
            step="1"
            value={temperature}
            onChange={(event) => setTemperature(Number(event.target.value))}
          />
          <div className="app-temp__range">
            <span>16°C</span>
            <span>30°C</span>
          </div>
        </div>

        <div className="app-temp__presets">
          {presets.map((preset) => (
            <button
              key={preset.name}
              type="button"
              className={`app-temp__preset${temperature === preset.temp ? " is-active" : ""}`}
              onClick={() => setTemperature(preset.temp)}
            >
              <span>{preset.name}</span>
              <strong>{preset.temp}°C</strong>
            </button>
          ))}
        </div>

        <button
          className="app-intervention__primary"
          type="button"
          onClick={applyTemperature}
          disabled={isApplying}
        >
          {isApplying ? "Applying…" : applied ? "Applied" : "Apply Temperature"}
        </button>
        <p className="app-intervention__muted">Temperature changes can help regulate your nervous system.</p>
      </div>

      <div className="app-intervention__actions">
        <button className="app-intervention__ghost" type="button" onClick={onClose}>
          Back
        </button>
      </div>
    </section>
  );
}

export default TemperatureControl;
