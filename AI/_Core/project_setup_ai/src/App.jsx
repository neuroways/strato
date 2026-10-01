import { Route, Routes } from "react-router";
import SiteLayout from "./layouts/SiteLayout";
import Home from "./pages/Home";
import NeuroBalance from "./pages/NeuroBalance";
import NeuroPlay from "./pages/NeuroPlay";
import Info from "./pages/Info";

function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/neurobalance" element={<NeuroBalance />} />
        <Route path="/neuroplay" element={<NeuroPlay />} />
        <Route path="/info" element={<Info />} />
      </Route>
    </Routes>
  );
}

export default App;
