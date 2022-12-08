<template>
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



            <tr v-for="i in 20" :key=i>
              <td>{{ i }}</td>
              <td>bob.bobson@gmail.com</td>
              <td>Bob</td>
              <td>Bobson</td>
              <td>No</td>
              <td>No</td>
              <td>
                <router-link :to="{name: 'UserEdit', params:{id: i} }">&#x270D;</router-link>
              </td>
            </tr>

      </tbody>
    </table>
  </main>
</template>