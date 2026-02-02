import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

function SiteHeader() {
  const [hidden, setHidden] = useState(false);
  const tickingRef = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (tickingRef.current) {
        return;
      }

      tickingRef.current = true;
      window.requestAnimationFrame(() => {
        const currentY = window.scrollY;
        setHidden(currentY > 60);
        tickingRef.current = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const headerClassName = [
    "site-header",
    hidden ? "site-header--hidden" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <header className={headerClassName}>
      <div className="container header__inner">
        <Link to="/" className="logo" aria-label="Aeson home">
          <span className="logo__word">Aeson</span>
          <span className="logo__tagline">Support begins here.</span>
        </Link>
        <nav className="header__actions" aria-label="Account">
          <Link className="header__login" to="/login">
            Login
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default SiteHeader;
