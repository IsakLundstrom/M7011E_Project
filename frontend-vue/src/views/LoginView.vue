<script setup>
  import userService from '@/services/user.service';
  import { decodeCredential } from 'vue3-google-login';
</script>

<template>
  <main class="login">
    <div class="loginContent">
        <h1>Login page</h1>
        <form @submit.prevent="handleSubmit()">
          <br />
          <div v-if="error" class="errorBox">Wrong email or password</div>

          <label htmlFor="email">Email</label>
          <br />
          <input
            class="inputField"
            required
            type="email"
            name="email"
            v-model="user.email"
          />

          <br />
          <br />

          <label htmlFor="password">Password</label>
          <br />
          <input
            class="inputField"
            type="password"
            name="password"
            v-model="user.password"
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

        <p>
          Forgot your password? Click&nbsp;
          <a href="#resetPasswordPopup">here</a>.
        </p>
      </div>
  </main>

  <div id="resetPasswordPopup" class="popupContainer">
    <div id="popup" class="popup">
      <div class="resetPasswordContent">
        <h2>Reset password</h2>


        <p v-if="resetSent">
          Link to reset your password has been sent to <b>{{user.email}}</b>
        </p>

        <form @submit.prevent="sendResetEmail">
          <br />

          <label htmlFor="email">Email</label>
          <br />
          <input
            class="inputField"
            required
            type="email"
            name="email"
            v-model="user.email"
          />

          <br />
          <br />

          <input
            class="profileButton profileUpdateButton"
            type="submit"
            value="Send"
          />

          <br />
          <br />
        </form>
        <p>
          <a href="#" style="color:black, textDecoration:none">
            ❌
          </a>
        </p>
      </div>
    </div>
  </div>

  <div v-if="user.has2FA" class="popupContainer resetPopupContainer">
    <div id="popup" class="popup">
      <div class="resetPasswordContent">
        <div v-if="error2fa" class="errorBox">Wrong code</div>
        <h2>2FA</h2>
        <p>
          Two factor authentication nedded, the code has been sent to{{" "}}
          <b> {{ user.email }} </b>.
        </p>
        <form @submit.prevent="send2FA">
          <br />

          <label htmlFor="2fa">Code</label>
          <br />
          <input
            class="inputField"
            required
            autoComplete="off"
            type="text"
            name="2fa"
            v-model="user.token"
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
          <a
            @click="user.has2FA = false"
            style="
            color: black;
            textDecoration: none; 
            cursor: pointer;
            " 
          >
            ❌
          </a>
        </p>
      </div>
    </div>
  </div>



</template>

<script>

export default {
  name: 'LoginView',
  components: {  },
  
  data() {
    return {

      user: {
        email: "",
        password: '',
        has2FA: null,
        token: null,
      },
      error: false,
      error2fa: false,
      
      resetSent: false,
    }
  },

  methods: {
    sendResetEmail() {
      this.resetSent = true
      this.$store.dispatch("auth/resetPassword", this.user).then(
        (res) => {

          },
          (error) => {
          console.log(error)
          }
      )
      
    },

    async send2FA() {
      
      this.$store.dispatch("auth/login2fa", this.user).then(
        (res) => {
          this.error2fa = false
          this.$router.push({name: 'Profile'})
          },
          (error) => {
          this.error2fa = true;
          console.log(error)
          throw error.message
          }
      )
    },

    googleLogin(response) {
      const userData = decodeCredential(response.credential)
      console.log("Handle the userData", userData)

      this.user.email = userData.email
      this.user.password = userData.sub
      this.user.fName = userData.given_name
      this.user.lName = userData.family_name

      this.$store.dispatch("auth/login", this.user).then(
        (res) => {
          if(res.details === '2FA required') {
            this.user.has2FA = true
          } else {
            this.$router.push({ name: 'Profile'});
          }
        },
        (error) => {
          console.log("new account?", error)  

          userService.postRegisterProfile(this.user.fName, this.user.lName, this.user.email, this.user.password).then(
            () => {
              this.$store.dispatch("auth/login", this.user).then(
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

    async handleSubmit() {  

      this.$store.dispatch("auth/login", this.user).then(
        (res) => {
          this.error = false
          if(res.details === '2FA required') {
            this.user.has2FA = true
          } else {
            this.$router.push({ name: 'Profile'});
          }
        },
        (error) => {
          this.error = true;
          this.user.password = '';
          console.log(error)
          throw error.message
        }
      );
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push({ name: 'Profile'});
    }
  },
}
</script>
