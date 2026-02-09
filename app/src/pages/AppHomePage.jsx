import { useEffect, useMemo, useState } from "react";
import AppNav from "../components/AppNav.jsx";
import InterventionSelector from "../components/InterventionSelector.jsx";
import BreathingGuide from "../components/interventions/BreathingGuide.jsx";
import GroundingTechnique from "../components/interventions/GroundingTechnique.jsx";
import EmergencyContacts from "../components/interventions/EmergencyContacts.jsx";
import TemperatureControl from "../components/interventions/TemperatureControl.jsx";
import AIMeditation from "../components/interventions/AIMeditation.jsx";
import "./AppHomePage.css";

const defaultInterventions = ["breathing", "grounding", "ai_meditation", "contacts", "temperature"];

function AppHomePage() {
  const [stage, setStage] = useState("sos");
  const [activeIntervention, setActiveIntervention] = useState(null);

  useEffect(() => {
    document.title = "Aeson App";
  }, []);

  const content = useMemo(() => {
    if (stage === "selector") {
      return (
        <InterventionSelector
          enabledInterventions={defaultInterventions}
          onSelect={(id) => {
            setActiveIntervention(id);
            setStage("intervention");
          }}
          onClose={() => setStage("sos")}
        />
      );
    }

    if (stage === "intervention") {
      const handleClose = () => {
        setActiveIntervention(null);
        setStage("selector");
      };

      return (
        <div className="app-intervention__frame">
          {activeIntervention === "breathing" && <BreathingGuide onClose={handleClose} />}
          {activeIntervention === "grounding" && <GroundingTechnique onClose={handleClose} />}
          {activeIntervention === "ai_meditation" && <AIMeditation onClose={handleClose} />}
          {activeIntervention === "contacts" && <EmergencyContacts onClose={handleClose} />}
          {activeIntervention === "temperature" && <TemperatureControl onClose={handleClose} />}
        </div>
      );
    }

    return (
      <div className="app-home__screen">
        <div className="app-home__intro">
          <h1>You&apos;re safe here</h1>
          <p className="app-home__subtitle">Press the button when you need support</p>
        </div>
        <div className="app-home__sos-wrap">
          <button className="app-home__sos-btn" type="button" onClick={() => setStage("selector")}>
            <span className="app-home__sos-text">SOS</span>
            <span className="app-home__sos-subtext">Tap for help</span>
          </button>
        </div>
        <p className="app-home__note">This feeling is temporary. You have the tools to get through this.</p>
      </div>
    );
  }, [stage, activeIntervention]);

  return (
    <div className="app-shell app-home">
      <div className="app-shell__glow" aria-hidden="true" />
      <main className="app-home__panel">{content}</main>
      <AppNav />
    </div>
  );
}

export default AppHomePage;
