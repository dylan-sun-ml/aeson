import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SiteHeader from "../components/SiteHeader.jsx";
import SiteFooter from "../components/SiteFooter.jsx";

const emptyState = { email: "", password: "" };

function LoginPage() {
  const [form, setForm] = useState(emptyState);
  const [status, setStatus] = useState({ type: "idle", message: "" });
  const [user, setUser] = useState(null);

  useEffect(() => {
    document.title = "Aeson - Login";
  }, []);

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ type: "loading", message: "Signing you in..." });

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });
      const data = await response.json();

      if (!response.ok) {
        setStatus({ type: "error", message: data.error || "Login failed." });
        return;
      }

      setUser(data.user);
      setStatus({ type: "success", message: "You are signed in." });
      setForm(emptyState);
    } catch (error) {
      setStatus({ type: "error", message: "Login failed. Try again." });
    }
  };

  return (
    <div className="page auth-page">
      <main>
        <section className="auth-hero">
          <div className="container auth-hero__inner">
            <span className="eyebrow">Account access</span>
            <h1>Welcome back.</h1>
          </div>
        </section>

        <section className="auth-panel">
          <div className="container auth-panel__inner">
            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="auth-field">
                <label className="auth-label" htmlFor="login-email">
                  Email
                </label>
                <input
                  id="login-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={updateField}
                  required
                />
              </div>
              <div className="auth-field">
                <label className="auth-label" htmlFor="login-password">
                  Password
                </label>
                <input
                  id="login-password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={form.password}
                  onChange={updateField}
                  minLength={8}
                  required
                />
              </div>
              <button className="auth-button" type="submit" disabled={status.type === "loading"}>
                Sign in
              </button>
              {status.message && (
                <p className={`auth-status auth-status--${status.type}`}>{status.message}</p>
              )}
              {user && (
                <p className="auth-success">
                  Signed in as <strong>{user.email}</strong>.
                </p>
              )}
            </form>
            <div className="auth-panel__aside">
              {/* <p className="auth-panel__lead">New here?</p>
              <p className="auth-panel__copy">
                Create an account to save sessions and unlock future features.
              </p>
              <Link className="auth-link" to="/register">
                Create an account
              </Link> */}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

export default LoginPage;
