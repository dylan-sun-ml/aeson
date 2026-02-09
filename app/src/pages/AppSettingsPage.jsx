import { useEffect, useState } from "react";
import AppNav from "../components/AppNav.jsx";
import "./AppHomePage.css";

const interventions = [
  { id: "breathing", title: "Breathing Exercises", color: "violet" },
  { id: "grounding", title: "5-4-3-2-1 Grounding", color: "green" },
  { id: "ai_meditation", title: "AI Meditation", color: "purple" },
  { id: "contacts", title: "Emergency Contacts", color: "rose" },
  { id: "temperature", title: "Temperature Control", color: "blue" },
];

const initialContacts = [
  { id: 1, name: "Jordan Lee", phone: "(555) 260-1123", relationship: "Friend" },
  { id: 2, name: "Dr. Patel", phone: "(555) 772-8822", relationship: "Counselor" },
];

function AppSettingsPage() {
  const [enabled, setEnabled] = useState(["breathing", "grounding", "ai_meditation", "contacts", "temperature"]);
  const [contacts] = useState(initialContacts);

  useEffect(() => {
    document.title = "Aeson App | Settings";
  }, []);

  const toggle = (id) => {
    setEnabled((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  return (
    <div className="app-shell app-settings">
      <div className="app-shell__glow" aria-hidden="true" />
      <main className="app-settings__panel">
        <header className="app-settings__header">
          <div className="app-settings__icon">⚙️</div>
          <div>
            <h1>Settings</h1>
            <p className="app-home__subtitle">Customize your experience</p>
          </div>
        </header>

        <section className="app-settings__card">
          <div className="app-settings__card-head">
            <h2>My Calming Tools</h2>
            <p>Choose which interventions appear when you press SOS</p>
          </div>
          <div className="app-settings__toggle-list">
            {interventions.map((item) => {
              const isEnabled = enabled.includes(item.id);
              return (
                <div key={item.id} className={`app-settings__toggle ${isEnabled ? "is-enabled" : ""}`}>
                  <div className={`app-settings__toggle-icon app-settings__toggle-icon--${item.color}`} />
                  <span>{item.title}</span>
                  <label className="app-settings__switch">
                    <input
                      type="checkbox"
                      checked={isEnabled}
                      onChange={() => toggle(item.id)}
                    />
                    <span className="app-settings__switch-track" />
                  </label>
                </div>
              );
            })}
          </div>
          <button className="app-settings__save" type="button">Save Preferences</button>
        </section>

        <section className="app-settings__card">
          <div className="app-settings__card-head app-settings__card-head--row">
            <div>
              <h2>Emergency Contacts</h2>
              <p>People who can support you during difficult moments</p>
            </div>
            <button className="app-settings__add" type="button">+ Add</button>
          </div>
          <div className="app-settings__contacts">
            {contacts.map((contact) => (
              <div key={contact.id} className="app-settings__contact">
                <div>
                  <div className="app-settings__contact-name">{contact.name}</div>
                  <div className="app-settings__contact-meta">{contact.relationship} • {contact.phone}</div>
                </div>
                <button className="app-settings__contact-action" type="button">Message</button>
              </div>
            ))}
          </div>
        </section>
      </main>
      <AppNav />
    </div>
  );
}

export default AppSettingsPage;
