import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import PolicyPage from "./pages/PolicyPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import { termsPolicy, privacyPolicy } from "./data/policies.js";

const fallback = <HomePage />;

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/terms-of-service" element={<PolicyPage {...termsPolicy} />} />
      <Route path="/privacy-policy" element={<PolicyPage {...privacyPolicy} />} />
      <Route path="/terms-of-service-policy.html" element={<PolicyPage {...termsPolicy} />} />
      <Route path="/privacy-policy-policy.html" element={<PolicyPage {...privacyPolicy} />} />
      <Route path="*" element={fallback} />
    </Routes>
  );
}

export default App;
