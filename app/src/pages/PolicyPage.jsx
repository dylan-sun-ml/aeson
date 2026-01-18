import { useEffect } from "react";
import SiteFooter from "../components/SiteFooter.jsx";

function PolicyPage({ title, intro, sections }) {
  useEffect(() => {
    document.title = `Aeson - ${title}`;
  }, [title]);

  return (
    <div className="page">
      <main>
        <section className="policy-hero">
          <div className="container policy-hero__inner">
            <span className="eyebrow">{title}</span>
            <h1>{intro}</h1>
          </div>
        </section>
        <section className="policy-body">
          <div className="container policy-body__inner">
            {sections.map((section) => (
              <div key={section.heading} className="policy-section">
                <h3>{section.heading}</h3>
                {section.paragraphs.map((paragraph, index) => (
                  <p key={`${section.heading}-${index}`}>{paragraph}</p>
                ))}
              </div>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

export default PolicyPage;
