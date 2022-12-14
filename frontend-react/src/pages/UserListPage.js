import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import useAxios from "../utils/useAxios";

const UserListPage = () => {
  const api = useAxios();

  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await api.get(`/user`);
      setUsers(response.data);
    })();
  }, []);

  return (
    <main>
      <h1>All users</h1>
      <table className="adminTable">
        <tbody>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Name</th>
            <th>Lastname</th>
            <th>isStaff</th>
            <th>isAdmin</th>
            <th>Edit</th>
          </tr>
          {users &&
            users.map((user) => {
              return (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.email}</td>
                  <td>{user.fName}</td>
                  <td>{user.lName}</td>
                  <td>{user.is_staff ? <p>Yes</p> : <p>No</p>}</td>
                  <td>{user.is_superuser ? <p>Yes</p> : <p>No</p>}</td>
                  <td>
                    <Link to={`/admin/user/${user.id}/edit`}>&#x270D;</Link>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </main>
  );
};

export default UserListPage;
