import { useState } from "react";

function BetaSection() {
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const sheetEndpoint = import.meta.env.VITE_SHEET_WEBHOOK_URL;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!sheetEndpoint) {
      setStatus("error");
      setError("Form endpoint is missing.");
      return;
    }

    const formData = new FormData(event.currentTarget);
    const payload = new URLSearchParams();
    payload.set("name", String(formData.get("name") || "").trim());
    payload.set("email", String(formData.get("email") || "").trim());
    payload.set("story", String(formData.get("story") || "").trim());
    const payloadBody = payload.toString();

    setStatus("loading");

    try {
      if (navigator.sendBeacon) {
        const beaconBody = new Blob([payloadBody], {
          type: "application/x-www-form-urlencoded;charset=UTF-8",
        });
        const beaconSent = navigator.sendBeacon(sheetEndpoint, beaconBody);
        if (beaconSent) {
          event.currentTarget.reset();
          setStatus("success");
          return;
        }
      }

      await fetch(sheetEndpoint, {
        method: "POST",
        mode: "no-cors",
        body: payloadBody,
      });

      event.currentTarget.reset();
      setStatus("success");
    } catch (submitError) {
      setStatus("error");
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <section className="beta" id="beta">
      <div className="container beta__grid">
        <div className="beta__label">
          <span className="beta__badge">
            <span className="beta__badge-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" role="presentation" aria-hidden="true">
                <path
                  d="M19.4 3.1L4.5 9.2c-.7.3-.7 1.3 0 1.6l5.5 2.1 2.1 5.5c.3.7 1.3.7 1.6 0l6.1-14.9c.2-.6-.4-1.2-1.0-1.0Z"
                  fill="currentColor"
                />
              </svg>
            </span>
            Beta
          </span>
        </div>
        <div className="beta__content">
          <h2 className="beta__headline">
            If moments feel overwhelming, support isn't available when you need
            it, or you're tired of tools that don't help in real time, Aeson is
            here to support you.
          </h2>
          <p className="beta__intro">
            Join the beta to access support that's built with care and shaped by
            real experiences. No pressure, no setup hassle - just a simple way
            to get started.
          </p>
          <form className="beta__form" onSubmit={handleSubmit}>
            <div className="form-row">
              <label className="form-field">
                <span className="form-label">Name *</span>
                <input
                  type="text"
                  name="name"
                  autoComplete="name"
                  required
                  placeholder=""
                />
              </label>
              <label className="form-field">
                <span className="form-label">E-mail *</span>
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  placeholder=""
                />
              </label>
            </div>
            <label className="form-field">
              <span className="form-label">What is your story (Optional)</span>
              <textarea name="story" rows="4" />
            </label>
            <button className="button button--ghost" type="submit" disabled={status === "loading"}>
              {status === "loading" ? "Sending..." : "Join Beta"}
            </button>
            {status === "success" ? (
              <p className="beta__status" role="status">
                Thanks! You're on the list.
              </p>
            ) : null}
            {status === "error" ? (
              <p className="beta__status beta__status--error" role="status">
                {error}
              </p>
            ) : null}
          </form>
        </div>
      </div>
    </section>
  );
}

export default BetaSection;
