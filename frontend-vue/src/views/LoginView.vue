<template>
  <main class="login">
    <div class="loginContent">
        <h1>Login page</h1>
        <form @submit.prevent="handleSubmit">
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
    async handleSubmit() {
      const response = await fetch("http://127.0.0.1:8000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: this.email,
          password: this.password,
        }),
      });
      const data = await response.json();
      console.log(data)
      // alert(`${this.email}, ${this.password}`)
    }
  },
  data() {
    return {
      email: "test@test.com",
      password: 'test',

    }
  }
}
</script>
