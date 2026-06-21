import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "@/pages/LoginPage";
import OutsourcingPage from "@/pages/OutsourcingPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/outsourcing" element={<OutsourcingPage />} />
      </Routes>
    </Router>
  );
}
