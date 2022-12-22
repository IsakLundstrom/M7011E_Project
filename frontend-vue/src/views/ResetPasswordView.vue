<template>
  <main>
    <div className="loginContent">
      <h1>Reset Password</h1>
      <form @submit.prevent="handleSubmit">
        <br />

        <div v-if="errorText !== ''" class="errorBox">{{errorText}}</div>

        <label htmlFor="password">New Password</label>
        <br />
        <input
          className="inputField"
          type="password"
          name="password"
          v-model="user.password"
        />

        <br />
        <br />

        <label htmlFor="rpassword">Repeat password</label>
        <br />
        <input
          className="inputField"
          type="password"
          name="rpassword"
          v-model="rpassword"
        />

        <br />
        <br />

        <input
          className="profileButton profileUpdateButton"
          type="submit"
          value="Reset"
        />

        <br />
        <br />
      </form>
    </div>
  </main>
</template>

<script>

  export default {
    data() {
      return {
        user: {
          password: '',
          uID: this.$route.params.id,
          token: this.$route.params.token
        },
        
        rpassword: '',
        errorText: '',
      }
    }, 
    methods: {
      handleSubmit() {
        if (this.user.password !== this.rpassword) {
          this.errorText = "Password and repeated password must match"
          return
        }

        this.$store.dispatch("auth/resetPasswordConfirm", this.user).then(
          () => {
            this.$router.push({name: 'Login'})
            this.errorText = ''
          }, 
          (error) => {
            alert("could not reset password")
            console.log(error)
          }
        )
      }
    }
  }
</script>