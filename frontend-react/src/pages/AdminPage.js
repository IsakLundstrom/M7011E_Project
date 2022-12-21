import React from "react";
import { Link } from "react-router-dom";

const AdminPage = () => {
  return (
    <main>
      <h1>Admin pages</h1>
      <br />
      <br />
      <h2>
        <Link to="/admin/users">List, edit and delete users</Link>
      </h2>
      <br />
      <br />
      <h2>
        <Link to="/admin/courses">Create, list, edit and delete courses</Link>
      </h2>
      <br />
      <br />
    </main>
  );
};

export default AdminPage;
