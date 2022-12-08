<template>
  <main class="login">
    <div class="loginContent">
        <h1>Login page</h1>
        <form @submit="handleSubmit">
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

          <input
            class="profileButton profileUpdateButton"
            type="submit"
            value="Login"
          />

          <br />
          <br />
        </form>

        <p>
          Don't have an account? Register&nbsp;
          <router-link :to="{ name: 'Register'}">here</router-link>!
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
      alert(`${this.email}, ${this.password}`)
    }
  },
  data() {
    return {
      email: "example@example.com",
      password: '',

    }
  }
}
</script>
