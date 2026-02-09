const interventions = [
  {
    id: "breathing",
    title: "Breathing Exercises",
    description: "Guided breathing patterns to calm your mind",
    tone: "lavender",
    icon: "🌬️",
  },
  {
    id: "grounding",
    title: "5-4-3-2-1 Grounding",
    description: "Reconnect with your senses and the present moment",
    tone: "mint",
    icon: "🧘",
  },
  {
    id: "ai_meditation",
    title: "AI Meditation",
    description: "Personalized meditation based on how you feel",
    tone: "rose",
    icon: "✨",
  },
  {
    id: "contacts",
    title: "Contact Someone",
    description: "Reach out to your support network",
    tone: "peach",
    icon: "💬",
  },
  {
    id: "temperature",
    title: "Temperature Control",
    description: "Adjust your calming device temperature",
    tone: "sky",
    icon: "🌡️",
  },
];

function InterventionSelector({ enabledInterventions, onSelect, onClose }) {
  const available = interventions.filter((item) => enabledInterventions.includes(item.id));

  return (
    <div className="app-intervention app-intervention--selector">
      <div className="app-intervention__top">
        <button className="app-intervention__close" type="button" onClick={onClose}>
          Close
        </button>
      </div>
      <div className="app-home__selector">
        <div className="app-home__selector-badge">💜</div>
        <h1>You&apos;re going to be okay</h1>
        <p className="app-home__subtitle">Choose what feels right for you right now</p>
        <div className="app-home__cards">
          {available.map((card) => (
            <button
              key={card.id}
              className={`app-home__card app-home__card--${card.tone}`}
              type="button"
              onClick={() => onSelect(card.id)}
            >
              <span className="app-home__card-icon app-home__card-icon--emoji">{card.icon}</span>
              <span className="app-home__card-body">
                <span className="app-home__card-title">{card.title}</span>
                <span className="app-home__card-desc">{card.description}</span>
              </span>
            </button>
          ))}
        </div>
        {available.length === 0 && (
          <div className="app-intervention__empty">
            <p>No interventions are enabled.</p>
            <p className="app-intervention__muted">Visit Settings to choose your calming tools.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default InterventionSelector;
