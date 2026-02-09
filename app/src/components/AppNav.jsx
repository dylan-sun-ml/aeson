import { NavLink } from "react-router-dom";

const navItems = [
  { label: "Home", to: "/app", icon: HomeIcon },
  { label: "Progress", to: "/app/progress", icon: ProgressIcon },
  { label: "Settings", to: "/app/settings", icon: SettingsIcon },
];

function AppNav() {
  return (
    <nav className="app-nav" aria-label="App navigation">
      <div className="app-nav__inner">
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.to}
            end={item.to === "/app"}
            className={({ isActive }) =>
              `app-nav__link${isActive ? " app-nav__link--active" : ""}`
            }
          >
            <span className="app-nav__icon" aria-hidden="true">
              <item.icon />
            </span>
            <span className="app-nav__label">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path
        d="M4 11.2 12 5l8 6.2V19a2 2 0 0 1-2 2h-4.5v-5h-3v5H6a2 2 0 0 1-2-2z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ProgressIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path
        d="M4 16l5-5 4 3 6-7"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M20 7v6h-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path
        d="M12 8.4a3.6 3.6 0 1 0 0 7.2 3.6 3.6 0 0 0 0-7.2Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M4 12a8 8 0 0 1 .2-1.7l2.1-.4a6.6 6.6 0 0 1 1-1.8l-1.2-1.8A8 8 0 0 1 8.7 4l1.6 1.4a6.7 6.7 0 0 1 2-.3l.8-2a8 8 0 0 1 2.6.6l-.2 2.1c.6.4 1.2.9 1.7 1.5l2-.6A8 8 0 0 1 20 9.2l-1.7 1.3c.1.5.2 1 .2 1.5s-.1 1-.2 1.5l1.7 1.3a8 8 0 0 1-.7 2.5l-2-.6c-.5.6-1.1 1.1-1.7 1.5l.2 2.1a8 8 0 0 1-2.6.6l-.8-2c-.7 0-1.4-.1-2-.3L8.7 20a8 8 0 0 1-2.4-1.4l1.2-1.8a6.6 6.6 0 0 1-1-1.8l-2.1-.4A8 8 0 0 1 4 12Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default AppNav;
