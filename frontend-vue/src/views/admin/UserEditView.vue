<script setup>
  import userService from '@/services/user.service';
</script>

<template>
  <main>
    <h1>Edit User</h1>
    <form @submit.prevent="updateUser()">
      <label htmlFor="id">ID</label>
      <br />
      <input
        class="inputField"
        required
        type="text"
        name="id"
        disabled="disabled"
        v-model="id"
      />

      <br />

      <label htmlFor="fname">First name</label>
      <br />
      <input
        class="inputField"
        required
        type="text"
        name="fname"
        v-model="fName"
      />

      <br />

      <label htmlFor="lname">Last name</label>
      <br />
      <input
        class="inputField"
        required
        type="text"
        name="lname"
        v-model="lName"
      />

      <br />

      <label htmlFor="email">Email</label>
      <br />
      <input
        class="inputField"
        required
        type="email"
        name="email"
        v-model="email"
      />

      <br />

      <label htmlFor="npassword">New Password</label>
      <br />
      <input 
        class="inputField" 
        type="password" 
        name="npassword" 
        v-model="password"
      />

      <br />

      <label htmlFor="rpassword">Repeat Password</label>
      <br />
      <input 
        class="inputField" 
        type="password" 
        name="rpassword" 
        v-model="rpassword"
      />

      <br />

      <input 
        class="checkboxField" 
        type="checkbox" 
        name="staff" 
        v-model="is_staff" 
        :checked="is_staff" 
      />
      <label htmlFor="staff">is Staff?</label>

      <br />

      <input 
        class="checkboxField" 
        type="checkbox" 
        name="admin" 
        v-model="is_superuser" 
        @click="is_staff = !is_superuser || is_staff"
        :checked="is_superuser"
      />
      <label htmlFor="admin">is Admin?</label>

      <br />
        <div class="successBox" v-if="updated">User updated!</div>
      <br />

      <input
        class="profileButton profileUpdateButton"
        type="submit"
        value="Update user"
      />

      <br />
      <br />
    </form>
    <button class="profileButton deleteButton" @click="deletePressed = true">Delete user</button>

    <div v-if="deletePressed" class="confirmBox">
      <p>Do you really want to delete this user?</p>
      <button class="profileButton deleteButton" @click="deleteUser()">
        Yes
      </button>
      <button
        class="profileButton profileUpdateButton" @click="deletePressed = false">
        No
      </button>
    </div>

  </main>
</template>

<script>

export default{
  
  data() {
    return{
      id: this.$route.params.id,
      fName: '',
      lName: '',
      email: '',
      is_staff: false,
      is_superuser: false,
      password: '',
      rpassword: '',
      updated: false,
      deletePressed: false,
    }
  },

  methods:{
    async updateUser(){
      if(this.password !== ""){
        if(this.password !== this.rpassword){
          alert("password and repeated password did not match")
          return
        }
        userService.patchPassword(this.id, this.password)
      }
      await userService.patchUpdateUser(this.id, this.fName, this.lName, this.email, this.is_staff, this.is_superuser)
      this.updated = true
    },

    async deleteUser() {
      await userService.deleteUser(this.id)
      this.$router.push({name: 'UserList'})
    }
  },

  watch: {
    '$route.params.id': {
      async handler() {
        const response = await userService.getUser(this.id)
        console.log(response)
        this.fName = response.data.fName
        this.lName = response.data.lName
        this.email = response.data.email
        this.is_staff = response.data.is_staff
        this.is_superuser = response.data.is_superuser
      },
      immediate: true
      
    },
  }
}

</script>