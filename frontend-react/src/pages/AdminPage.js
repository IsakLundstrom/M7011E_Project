import React from "react";
import { Link } from "react-router-dom";

const AdminPage = () => {
  return (
    <main>
      <h1>Admin pages</h1>
      <Link to="/admin/users">User List Page</Link>
      <br />
      <Link to="/admin/courses">Course List Page</Link>
    </main>
  );
};

export default AdminPage;
