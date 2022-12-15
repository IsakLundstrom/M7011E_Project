<script setup>
  import userService from "../services/user.service"
</script>

<template>
    <main class="register">
      <div class="loginContent">

        <h1>Register</h1>

        <form @submit.prevent="handleSubmit">
          <br />

          <div v-if="errorText" class="errorBox"> {{ errorText }} </div>

          <label htmlFor="fname">Name</label>
          <br />
          <input
            class="inputField"
            required
            type="text"
            name="fname"
            v-model="fName"
          />

          <br />
          <br />

          <label htmlFor="lname">Lastname</label>
          <br />
          <input
            class="inputField"
            required
            type="text"
            name="lname"
            v-model="lName"
          />

          <br />
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
          <br />

          <label htmlFor="password">Password</label>
          <br />
          <input
            class="inputField"
            required
            type="password"
            name="password"
            v-model="password"
          />

          <br />
          <br />

          <label htmlFor="rpassword">Repeat password</label>
          <br />
          <input
            class="inputField"
            required
            type="password"
            name="rpassword"
            v-model="rpassword"
          />

          <br />
          <br />

          <input
            class="profileButton profileUpdateButton"
            type="submit"
            value="Register"
          />

          <br />
          <br />
        </form>
        <p>
          Already have an account? Login&nbsp;
          <router-link :to="{ name: 'Login'}">here</router-link>!
        </p>
      </div>
    </main>
  </template>
  
<script>
  export default {
    name: 'LoginView',
    components: {  },
    methods: {
      handleSubmit() {
        if(this.password != this.rpassword){
          this.errorText = "Password and repeated password must match"
          this.password = ''
          this.rpassword = ''
          return
        }
        try {
          userService.postRegisterProfile(this.fName, this.lName, this.email, this.password)
          this.$router.push({ name: 'Login'});
        } catch (error) {
          
        }
      }
    },
    data() {
      return {
        fName: '',
        lName: '',
        email: '',
        password: '',
        rpassword: '',
        errorText: '',
      }
    }
  }
</script>