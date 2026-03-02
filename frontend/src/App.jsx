import { BrowserRouter, Routes, Route } from "react-router-dom";
import upload from './pages/upload';
import view from './pages/view';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/upload" element={<upload />} />
        <Route path="/" element={<view />} />
      </Routes>
    </BrowserRouter>
  )
}