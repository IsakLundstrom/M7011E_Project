<script setup>
  import userService from '@/services/user.service';
  import { decodeCredential } from 'vue3-google-login';
</script>

<template>
  <main class="login">
    <div class="loginContent">
        <h1>Login page</h1>
        <form @submit.prevent="handleSubmit(email, password)">
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

        <GoogleLogin :callback="googleLogin"/>

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
    googleLogin(response) {
      const userData = decodeCredential(response.credential)
      console.log("Handle the userData", userData)

      let user = {}
      user.email = userData.email
      user.password = userData.sub
      user.fName = userData.given_name
      user.lName = userData.family_name

      this.$store.dispatch("auth/login", user).then(
        () => {
          this.$router.push({ name: 'Profile'});
        },
        (error) => {
          console.log("new account?", error)  

          userService.postRegisterProfile(user.fName, user.lName, user.email, user.password).then(
            () => {
              this.$store.dispatch("auth/login", user).then(
                () => {
                  this.$router.push({ name: 'Profile'});
                },
                (error) => {
                  alert(`google login did not work, please contact webpage owner`)
                  console.log(error)
                }
              )           
            },  
            (error) => {
              alert(`could not create profile, please contact webpage owner`)
              console.log(error)
            }
          )
        },
      )
    },

    async handleSubmit(email, password) {
      let user = {}
      user.email = email
      user.password = password    

      this.$store.dispatch("auth/login", user).then(
        () => {
          this.$router.push({ name: 'Profile'});
        },
        (error) => {
          this.error = true;
          this.password = '';
          console.log(error)
          throw error.message
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
