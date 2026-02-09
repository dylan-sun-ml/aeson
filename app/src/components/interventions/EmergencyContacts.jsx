import { useState } from "react";

const contacts = [
  { id: 1, name: "Jordan Lee", relationship: "Friend", phone: "(555) 260-1123" },
  { id: 2, name: "Dr. Patel", relationship: "Counselor", phone: "(555) 772-8822" },
  { id: 3, name: "Samantha Ortiz", relationship: "Sibling", phone: "(555) 661-3021" },
];

function EmergencyContacts({ onClose }) {
  const [sendingTo, setSendingTo] = useState(null);
  const [sentTo, setSentTo] = useState({});

  const sendMessage = (contact) => {
    setSendingTo(contact.id);
    setTimeout(() => {
      setSendingTo(null);
      setSentTo((prev) => ({ ...prev, [contact.id]: true }));
    }, 800);
  };

  return (
    <section className="app-intervention">
      <header className="app-intervention__header">
        <h2>Contact Someone</h2>
        <p>Reach out to your support network.</p>
      </header>

      <div className="app-contacts">
        {contacts.map((contact) => (
          <div key={contact.id} className="app-contacts__card">
            <div>
              <div className="app-contacts__name">{contact.name}</div>
              <div className="app-contacts__meta">{contact.relationship} • {contact.phone}</div>
            </div>
            <button
              type="button"
              className="app-intervention__primary"
              onClick={() => sendMessage(contact)}
              disabled={sendingTo === contact.id}
            >
              {sendingTo === contact.id ? "Sending…" : "Message"}
            </button>
            {sentTo[contact.id] && <div className="app-contacts__sent">Message sent</div>}
          </div>
        ))}
      </div>

      <div className="app-intervention__actions">
        <button className="app-intervention__ghost" type="button" onClick={onClose}>
          Back
        </button>
      </div>
    </section>
  );
}

export default EmergencyContacts;
