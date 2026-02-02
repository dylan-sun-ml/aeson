import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SiteHeader from "../components/SiteHeader.jsx";
import SiteFooter from "../components/SiteFooter.jsx";

const emptyState = { email: "", password: "" };

function RegisterPage() {
  const [form, setForm] = useState(emptyState);
  const [status, setStatus] = useState({ type: "idle", message: "" });
  const [user, setUser] = useState(null);

  useEffect(() => {
    document.title = "Aeson - Create account";
  }, []);

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ type: "loading", message: "Creating your account..." });

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });
      const data = await response.json();

      if (!response.ok) {
        setStatus({ type: "error", message: data.error || "Registration failed." });
        return;
      }

      setUser(data.user);
      setStatus({ type: "success", message: "Account created." });
      setForm(emptyState);
    } catch (error) {
      setStatus({ type: "error", message: "Registration failed. Try again." });
    }
  };

  return (
    <div className="page auth-page">
      <main>
        <section className="auth-hero">
          <div className="container auth-hero__inner">
            <span className="eyebrow">Join Aeson</span>
            <h1>Create your account.</h1>
          </div>
        </section>

        <section className="auth-panel">
          <div className="container auth-panel__inner">
            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="auth-field">
                <label className="auth-label" htmlFor="register-email">
                  Email
                </label>
                <input
                  id="register-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={updateField}
                  required
                />
              </div>
              <div className="auth-field">
                <label className="auth-label" htmlFor="register-password">
                  Password
                </label>
                <input
                  id="register-password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  value={form.password}
                  onChange={updateField}
                  minLength={8}
                  required
                />
              </div>
              <button className="auth-button" type="submit" disabled={status.type === "loading"}>
                Create account
              </button>
              {status.message && (
                <p className={`auth-status auth-status--${status.type}`}>{status.message}</p>
              )}
              {user && (
                <p className="auth-success">
                  Account created for <strong>{user.email}</strong>.
                </p>
              )}
            </form>
            <div className="auth-panel__aside">
              <p className="auth-panel__lead">Already have an account?</p>
              <p className="auth-panel__copy">
                Use your email and password to sign in.
              </p>
              <Link className="auth-link" to="/login">
                Back to login
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

export default RegisterPage;
