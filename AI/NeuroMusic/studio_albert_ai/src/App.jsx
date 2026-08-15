import { Route, Routes } from "react-router";
import SiteLayout from "./layouts/SiteLayout.jsx";
import Home from "./pages/Home.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Studio from "./pages/Studio.jsx";
import Devices from "./pages/Devices.jsx";
import SignalFlow from "./pages/SignalFlow.jsx";
import Cabling from "./pages/Cabling.jsx";
import Knowledge from "./pages/Knowledge.jsx";
import Errors from "./pages/Errors.jsx";
import Documentation from "./pages/Documentation.jsx";
import Management from "./pages/Management.jsx";
import Verification from "./pages/Verification.jsx";
import Learning from "./pages/Learning.jsx";
import Quiz from "./pages/Quiz.jsx";

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">404</h1>
        <p className="text-gray-400 text-lg">Seite nicht gefunden</p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/studio" element={<Studio />} />
        <Route path="/devices" element={<Devices />} />
        <Route path="/signal-flow" element={<SignalFlow />} />
        <Route path="/cabling" element={<Cabling />} />
        <Route path="/knowledge" element={<Knowledge />} />
        <Route path="/errors" element={<Errors />} />
        <Route path="/documentation" element={<Documentation />} />
        <Route path="/management" element={<Management />} />
        <Route path="/verification" element={<Verification />} />
        <Route path="/learning" element={<Learning />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
