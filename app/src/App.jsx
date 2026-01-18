import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import PolicyPage from "./pages/PolicyPage.jsx";
import { termsPolicy, privacyPolicy } from "./data/policies.js";

const fallback = <HomePage />;

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/terms-of-service" element={<PolicyPage {...termsPolicy} />} />
      <Route path="/privacy-policy" element={<PolicyPage {...privacyPolicy} />} />
      <Route path="/terms-of-service-policy.html" element={<PolicyPage {...termsPolicy} />} />
      <Route path="/privacy-policy-policy.html" element={<PolicyPage {...privacyPolicy} />} />
      <Route path="*" element={fallback} />
    </Routes>
  );
}

export default App;
