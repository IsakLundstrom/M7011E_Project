import Header from "./components/Header";
import Footer from "./components/Footer";

import HomePage from "./pages/HomePage";
import CoursesPage from "./pages/CoursesPage";
import CoursePage from "./pages/CoursePage";
import AboutPage from "./pages/AboutPage";
import AdminPage from "./pages/AdminPage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UserListPage from "./pages/UserListPage";
import UserEditPage from "./pages/UserEditPage";
import CourseListPage from "./pages/CourseListPage";
import CourseEditPage from "./pages/CourseEditPage";
import CourseCreatePage from "./pages/CourseCreatePage";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/course" element={<CoursesPage />} />

        <Route path="/course/:id" element={<CoursePage />} />

        <Route path="/about" element={<AboutPage />} />

        <Route path="/admin" element={<AdminPage />} />

        <Route path="/profile" element={<ProfilePage />} />

        <Route path="/login" element={<LoginPage />} />

        <Route path="/register" element={<RegisterPage />} />

        <Route path="admin/userList" element={<UserListPage />} />

        <Route path="admin/userEdit/:id" element={<UserEditPage />} />

        <Route path="admin/courseList" element={<CourseListPage />} />

        <Route path="admin/courseEdit/:id" element={<CourseEditPage />} />

        <Route path="admin/courseCreate" element={<CourseCreatePage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
