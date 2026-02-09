import { useMemo, useState } from "react";

const quickFeelings = [
  "Anxious about exams",
  "Overwhelmed",
  "Panicking",
  "Stressed",
  "Worried",
  "Can't focus",
];

/**
 * Optional future API integration (commented out by request):
 *
 * 1) Add a hosted LLM endpoint that accepts { feeling, prompt } and returns { meditation }.
 * 2) Store your API key in an environment variable and pass it as an Authorization header.
 *
 * Example:
 * const API_URL = import.meta.env.VITE_MEDITATION_API_URL;
 * const API_KEY = import.meta.env.VITE_MEDITATION_API_KEY;
 *
 * async function generateMeditation(feeling) {
 *   const prompt = `Write a short, calming meditation (90-140 words) for: ${feeling}`;
 *   const response = await fetch(API_URL, {
 *     method: "POST",
 *     headers: {
 *       "Content-Type": "application/json",
 *       Authorization: `Bearer ${API_KEY}`,
 *     },
 *     body: JSON.stringify({ feeling, prompt }),
 *   });
 *   const data = await response.json();
 *   return data.meditation;
 * }
 *
 * Notes:
 * - Keep prompts concise and calming.
 * - Do NOT expose real API keys in client code for production use.
 */

function AIMeditation({ onClose }) {
  const [feeling, setFeeling] = useState("");
  const [generated, setGenerated] = useState(false);

  const meditation = useMemo(() => {
    if (!generated) return "";
    const prompt = feeling || "whatever you are carrying right now";
    return `Close your eyes and take a gentle breath in.\n\nNotice ${prompt}. Imagine it resting on a leaf, floating down a calm stream. With every exhale, let your shoulders soften. Count four slow breaths in, and six slow breaths out.\n\nIf your mind wanders, return to the feeling of your breath in your chest. You are here, and you are safe. When you're ready, open your eyes and bring that calm with you.`;
  }, [feeling, generated]);

  const handleGenerate = () => {
    setGenerated(true);
  };

  const handleReset = () => {
    setGenerated(false);
  };

  return (
    <section className="app-intervention app-meditation-page">
      <div className="app-meditation__hero">
        <div className="app-meditation__badge">✨</div>
        <h2>AI Meditation</h2>
        <p>Personalized meditation based on how you feel.</p>
      </div>

      <div className="app-meditation__card">
        <label className="app-meditation__label" htmlFor="feeling">
          How are you feeling right now?
        </label>
        <textarea
          id="feeling"
          rows="3"
          value={feeling}
          onChange={(event) => setFeeling(event.target.value)}
          placeholder="Share a few words..."
        />

        <div className="app-meditation__quick">
          {quickFeelings.map((item) => (
            <button key={item} type="button" onClick={() => setFeeling(item)}>
              {item}
            </button>
          ))}
        </div>

        <div className="app-meditation__actions">
          <button className="app-meditation__cta" type="button" onClick={handleGenerate}>
            Generate meditation
          </button>
          {generated && (
            <button className="app-meditation__ghost" type="button" onClick={handleReset}>
              Try another
            </button>
          )}
        </div>
      </div>

      {generated && (
        <div className="app-meditation__output-card">
          <div className="app-meditation__output-title">Your guided session</div>
          <pre className="app-meditation__output">{meditation}</pre>
        </div>
      )}

      <div className="app-intervention__actions">
        <button className="app-intervention__ghost" type="button" onClick={onClose}>
          Back
        </button>
      </div>
    </section>
  );
}

export default AIMeditation;
