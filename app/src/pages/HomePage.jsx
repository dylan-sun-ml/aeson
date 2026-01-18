import { useEffect } from "react";
import SiteHeader from "../components/SiteHeader.jsx";
import BetaSection from "../components/BetaSection.jsx";
import SiteFooter from "../components/SiteFooter.jsx";

function HomePage() {
  useEffect(() => {
    document.title = "Aeson";
  }, []);

  return (
    <div className="page">
      <SiteHeader />
      <main>
        <section className="hero" id="top">
          <div className="hero__bg" aria-hidden="true" />
          <div className="hero__shade" aria-hidden="true" />
          <div className="container hero__inner">
            <div className="hero__copy">
              <p className="hero__headline">
                <span>Not just another app.</span>
                <span>Not just another routine.</span>
                <span className="muted">
                  Aeson helps you turn your distress into actionable control.
                </span>
              </p>
            </div>
            <div className="hero__card">
              <div className="hero__card-media" aria-hidden="true" />
              <div className="hero__card-overlay" aria-hidden="true" />
              <span className="hero__card-label">Built for you</span>
            </div>
          </div>
        </section>

        <section className="about" id="about">
          <div className="container about__grid">
            <div className="about__label">
              <span className="eyebrow">About us</span>
            </div>
            <div className="about__copy">
              <h2>
                We build grounded, real-time support for moments that demand more than words. Every detail is intentionally crafted to help you feel present, supported, and capable in the moment.
              </h2>
            </div>
          </div>
        </section>

        <BetaSection />
      </main>
      <SiteFooter />
    </div>
  );
}

export default HomePage;
