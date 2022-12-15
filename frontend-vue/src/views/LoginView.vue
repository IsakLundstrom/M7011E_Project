<template>
  <main class="login">
    <div class="loginContent">
        <h1>Login page</h1>
        <form @submit.prevent="handleSubmit">
          <br />
          <div v-if="error" class="errorBox">Wrong email or password</div>

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
    async handleSubmit(user) {
      user.email = this.email
      user.password = this.password      

      this.$store.dispatch("auth/login", user).then(
        () => {
          this.$router.push({ name: 'Profile'});
        },
        (error) => {
          this.error = true;
          this.password = '';
          console.log(error)
        }
      );
    },
  },
  data() {
    return {
      error: false,
      email: "test@test.com",
      password: 'test',

    }
  },
  created() {
    if (this.loggedIn) {
      this.$router.push({ name: 'Profile'});
    }
  },
}
</script>
