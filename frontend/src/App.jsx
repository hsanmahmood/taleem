import "./i18n";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Upload from "./pages/upload";
import View from "./pages/view";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/upload/:courseId" element={<Upload />} />
        <Route path="/" element={<View />} />
      </Routes>
    </BrowserRouter>
  );
}