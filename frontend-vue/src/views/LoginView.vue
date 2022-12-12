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
    async handleSubmit(user) {
      user.email = this.email
      user.password = this.password      

      this.$store.dispatch("auth/login", user).then(
        () => {
          this.$router.push({ name: 'Profile'});
        },
        (error) => {
          this.loading = false;
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        }
      );

// OLD CODE REMOVE WHEN FETCHING WORKS AS IT SHOULD
      // const response = await fetch("http://127.0.0.1:8000/auth/login/", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     email: this.email,
      //     password: this.password,
      //   }),
      // });
      // const data = await response.json();
      // console.log(data)
      // // alert(`${this.email}, ${this.password}`)
    },
  },
  data() {
    return {
      email: "test@test.com",
      password: 'test',

    }
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/profile");
    }
  },
}
</script>
