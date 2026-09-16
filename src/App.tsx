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
import ReptileExportChina from "./pages/landing/ReptileExportChina";
import CitesReptileExport from "./pages/landing/CitesReptileExport";
import ChineseNativeReptiles from "./pages/landing/ChineseNativeReptiles";
import WholesaleReptiles from "./pages/landing/WholesaleReptiles";

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
        <Route path="/reptile-export-china" element={<ReptileExportChina />} />
        <Route path="/cites-reptile-export" element={<CitesReptileExport />} />
        <Route path="/chinese-native-reptiles" element={<ChineseNativeReptiles />} />
        <Route path="/wholesale-reptiles" element={<WholesaleReptiles />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
