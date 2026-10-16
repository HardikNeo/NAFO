import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./components/Home.jsx";
import About from "./components/About.jsx";
import NAFO from "./components/NAFO.jsx";
import DistrictPage from "./components/DistrictPage.jsx";
import Results from "./components/Results.jsx";
import ResultsList from "./components/ResultsList.jsx";
import Notices from "./components/Notices.jsx";
import NoticeDetail from "./components/NoticeDetail.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);

  return null;
}

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/nafo" element={<NAFO />} />
          <Route path="/nafo/:district" element={<DistrictPage />} />
          <Route path="/nafo/:district/results" element={<Results />} />
          <Route path="/nafo/:district/results/:list" element={<ResultsList />} />
          <Route path="/notices" element={<Notices />} />
          <Route path="/notices/:id" element={<NoticeDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
