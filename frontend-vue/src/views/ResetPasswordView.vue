<template>
  <main>
    <div className="loginContent">
      <h1>Reset Password</h1>
      <form @submit="handleSubmit">
        <br />

        {errorText !== "" && <div className="errorBox">{errorText}</div>}

        <label htmlFor="password">New Password</label>
        <br />
        <input
          className="inputField"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <br />
        <br />

        <label htmlFor="rpassword">Repeat password</label>
        <br />
        <input
          className="inputField"
          type="password"
          name="rpassword"
          value={rpassword}
          onChange={(e) => setRPassword(e.target.value)}
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

      }
    }, 
    methods: {
      handleSubmit() {
        
      }
    }
  }
</script>