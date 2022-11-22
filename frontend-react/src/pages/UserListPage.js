import React from "react";
import { Link } from "react-router-dom";

const UserListPage = () => {
  return (
    <main>
      <h1>All users</h1>
      <table className="adminTable">
        <tr>
          <th>ID</th>
          <th>Email</th>
          <th>Name</th>
          <th>Lastname</th>
          <th>isStaff</th>
          <th>isAdmin</th>
          <th>Edit</th>
        </tr>
        {[...Array(20)].map((e, i) => {
          return (
            <tr>
              <td>{i + 1}</td>
              <td>bob.bobson@gmail.com</td>
              <td>Bob</td>
              <td>Bobson</td>
              <td>No</td>
              <td>No</td>
              <td>
                <Link to={`/admin/userEdit/${i + 1}`}>&#x270D;</Link>
              </td>
            </tr>
          );
        })}
      </table>
    </main>
  );
};

export default UserListPage;
