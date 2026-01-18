import { Link } from "react-router-dom";

function SiteFooter() {
  const handlePolicyClick = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  };

  return (
    <footer className="site-footer">
      <div className="container footer__inner">
        <div className="footer__left">
          <div className="footer__brand">
            <Link className="footer__logo footer__logo-link" to="/" onClick={handlePolicyClick}>
              Aeson
            </Link>
            <span className="footer__tagline">Support begins here.</span>
          </div>
          <p className="footer__copy">
            With Aeson, every part of the experience is designed to bring
            clarity and grounding - not just reassurance, but real support in
            the moment.
          </p>
          <div className="footer__divider" />
          <div className="footer__contact">
            <span className="footer__label">[ Email ]</span>
            <a className="footer__link" href="mailto:aeson.ca@gmail.com">
              aeson.ca@gmail.com
            </a>
          </div>
        </div>
        <div className="footer__rule" aria-hidden="true" />
        <div className="footer__right">
          <div className="footer__feedback">
            <h4>Additional Feedback</h4>
            <p>Click the link to give us additional feedback</p>
            <a
              className="footer__link"
              href="https://tinyurl.com/aeson-ca"
              target="_blank"
              rel="noreferrer"
            >
              Feedback Form
            </a>
          </div>
          <div className="footer__links">
            <div className="footer__column">
              <span className="footer__title">Social</span>
              <a className="footer__link" href="https://x.com" target="_blank" rel="noreferrer">
                Twitter
              </a>
              <a
                className="footer__link"
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
              >
                Instagram
              </a>
              <a
                className="footer__link"
                href="https://www.linkedin.com/company/aesonmh"
                target="_blank"
                rel="noreferrer"
              >
                Linked In
              </a>
            </div>
            <div className="footer__column">
              <span className="footer__title">Additionals</span>
              <Link className="footer__link" to="/terms-of-service" onClick={handlePolicyClick}>
                Terms of Service
              </Link>
              <Link className="footer__link" to="/privacy-policy" onClick={handlePolicyClick}>
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="container footer__legal">
        <span>© 2025 Aeson. All rights reserved.</span>
      </div>
    </footer>
  );
}

export default SiteFooter;
