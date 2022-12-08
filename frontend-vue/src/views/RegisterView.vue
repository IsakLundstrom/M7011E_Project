<template>
    <main class="register">
      <div class="loginContent">

        <h1>Register page</h1>

        <form @submit="handleSubmit">
          <br />

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
        alert(`${this.fName}, ${this.lName}, ${this.email}, ${this.password}, ${this.rpassword}`)
      }
    },
    data() {
      return {
        fName: 'first name',
        lName: 'last name',
        email: 'example@example.com',
        password: '',
        rpassword: '',
      }
    }
  }
</script>