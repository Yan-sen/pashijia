import { Routes, Route, Navigate } from "react-router";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Species from "./pages/Species";
import SpeciesDetail from "./pages/SpeciesDetail";
import Availability from "./pages/Availability";
import Shipping from "./pages/Shipping";
import Compliance from "./pages/Compliance";
import About from "./pages/About";
import Inquiry from "./pages/Inquiry";
import Admin from "./pages/Admin";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/species" element={<Species />} />
        <Route path="/species/:id" element={<SpeciesDetail />} />
        <Route path="/availability" element={<Availability />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/compliance" element={<Compliance />} />
        <Route path="/about" element={<About />} />
        <Route path="/inquiry" element={<Inquiry />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
