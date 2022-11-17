import Header from "./components/Header";
import Footer from "./components/Footer";

import HomePage from "./pages/HomePage";
import CoursesPage from "./pages/CoursesPage";
import CoursePage from "./pages/CoursePage";
import AboutPage from "./pages/AboutPage";
import AdminPage from "./pages/AdminPage";
import ProfilePage from "./pages/ProfilePage";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/courses" element={<CoursesPage />} />

        <Route path="/course/:id" element={<CoursePage />} />

        <Route path="/about" element={<AboutPage />} />

        <Route path="/admin" element={<AdminPage />} />

        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
