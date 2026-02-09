import { useEffect, useMemo } from "react";
import AppNav from "../components/AppNav.jsx";
import "./AppHomePage.css";

const sampleLogs = [
  { type: "breathing", dateOffset: 0 },
  { type: "grounding", dateOffset: 1 },
  { type: "ai_meditation", dateOffset: 1 },
  { type: "contacts", dateOffset: 3 },
  { type: "temperature", dateOffset: 4 },
  { type: "breathing", dateOffset: 6 },
];

const interventionMeta = {
  breathing: { name: "Breathing", icon: "🌬️" },
  grounding: { name: "Grounding", icon: "🧘" },
  contacts: { name: "Reached Out", icon: "💬" },
  temperature: { name: "Temperature", icon: "🌡️" },
  ai_meditation: { name: "AI Meditation", icon: "✨" },
};

const achievements = [
  { id: "first_step", title: "First Step", description: "Used your first intervention", icon: "🌱" },
  { id: "week_warrior", title: "Week Warrior", description: "Used interventions 7 days in a row", icon: "🔥" },
  { id: "breath_master", title: "Breath Master", description: "Completed 10 breathing sessions", icon: "🌬️" },
  { id: "community_builder", title: "Community Builder", description: "Reached out 5 times", icon: "💬" },
];

function AppProgressPage() {
  useEffect(() => {
    document.title = "Aeson App | Progress";
  }, []);

  const breakdown = useMemo(() => {
    return sampleLogs.reduce((acc, log) => {
      acc[log.type] = (acc[log.type] || 0) + 1;
      return acc;
    }, {});
  }, []);

  const last7Days = useMemo(() => {
    const counts = Array.from({ length: 7 }, () => 0);
    sampleLogs.forEach((log) => {
      const idx = Math.max(0, Math.min(6, 6 - log.dateOffset));
      counts[idx] += 1;
    });
    return counts;
  }, []);

  const maxCount = Math.max(...last7Days, 1);

  return (
    <div className="app-shell app-progress">
      <div className="app-shell__glow" aria-hidden="true" />
      <main className="app-progress__panel">
        <header className="app-progress__header">
          <h1>Your Growth Journey</h1>
          <p className="app-home__subtitle">Every step forward makes you stronger</p>
        </header>

        <section className="app-progress__stats">
          <div className="app-progress__stat">
            <div className="app-progress__stat-icon">⚡️</div>
            <div className="app-progress__stat-value">{sampleLogs.length}</div>
            <div className="app-progress__stat-label">Total Sessions</div>
          </div>
          <div className="app-progress__stat">
            <div className="app-progress__stat-icon app-progress__stat-icon--green">📈</div>
            <div className="app-progress__stat-value">3</div>
            <div className="app-progress__stat-label">This Week</div>
          </div>
          <div className="app-progress__stat">
            <div className="app-progress__stat-icon app-progress__stat-icon--purple">💜</div>
            <div className="app-progress__stat-value">5</div>
            <div className="app-progress__stat-label">Completed</div>
          </div>
        </section>

        <section className="app-progress__card">
          <div className="app-progress__card-head">
            <span className="app-progress__card-title">🗓️ Last 7 Days</span>
          </div>
          <div className="app-progress__chart">
            {last7Days.map((count, index) => (
              <div key={index} className="app-progress__bar-col">
                <div
                  className={`app-progress__bar-pill${count ? " app-progress__bar-pill--active" : ""}`}
                  style={{ height: `${(count / maxCount) * 100}%` }}
                >
                  {count > 0 && <span>{count}</span>}
                </div>
                <span className="app-progress__bar-label">{["S", "M", "T", "W", "T", "F", "S"][index]}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="app-progress__card">
          <div className="app-progress__card-head">
            <span className="app-progress__card-title">Your Tools</span>
          </div>
          <div className="app-progress__tools">
            {Object.entries(breakdown).map(([type, count]) => (
              <div key={type} className="app-progress__tool">
                <span className="app-progress__tool-icon">{interventionMeta[type]?.icon}</span>
                <div className="app-progress__tool-body">
                  <div className="app-progress__tool-row">
                    <span>{interventionMeta[type]?.name}</span>
                    <span>{count}</span>
                  </div>
                  <div className="app-progress__tool-bar">
                    <span style={{ width: `${(count / sampleLogs.length) * 100}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="app-progress__card">
          <div className="app-progress__card-head">
            <span className="app-progress__card-title">Achievements</span>
          </div>
          <div className="app-progress__achievements">
            {achievements.map((achievement) => (
              <div key={achievement.id} className="app-progress__achievement">
                <span className="app-progress__achievement-icon">{achievement.icon}</span>
                <div>
                  <div className="app-progress__achievement-title">{achievement.title}</div>
                  <div className="app-progress__achievement-desc">{achievement.description}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <AppNav />
    </div>
  );
}

export default AppProgressPage;
