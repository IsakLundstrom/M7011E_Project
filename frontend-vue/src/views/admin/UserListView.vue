<script setup>
  import userService from '@/services/user.service';
</script>

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
        <div v-if="!users"> Loading Users...</div>
        <tr v-for="user in users" :key=user.id>
          <td>{{ user.id }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.fName }}</td>
          <td>{{ user.lName }}</td>
          <td v-if="user.is_staff">Yes</td> <td v-else>No</td>
          <td v-if="user.is_superuser">Yes</td> <td v-else>No</td>
          <td>
            <router-link :to="{name: 'UserEdit', params:{id: user.id} }">&#x270D;</router-link>
          </td>
        </tr>

      </tbody>
    </table>
  </main>
</template>

<script>

  export default{
    data() {
      return{
        users: null,
      }
    },
    async mounted() {
      const response = await userService.getUserList();
      this.users = response.data

    },
  }
</script>