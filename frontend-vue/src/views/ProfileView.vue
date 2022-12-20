<script setup>
  import profileImage from "../images/default_profile.png";

  import UserService from "../services/user.service";
  import tokenService from "../services/token.service";
</script>

<template>
    <main class="profile">
      <h1>Profile</h1>
      <div class="profileContent">
        <form @submit.prevent="patchUser">
        
        <div class="profileUploadContaienr">
          <div class="profileImageContainer">
            <img :src=profileImage alt="Profile" />
          </div>

          <input
              type="file"
              id="image"
              :style="{ visibility: 'hidden' }"
              accept="image/jpeg,image/png,image/gif"
              @change="handleImageChange()"
            />
            <label
              htmlFor="image"
              className="profileButton profileUploadButton"
            >
              Upload ⬆
            </label>
        </div>

        <div class="profileFormContainer">
            <div class="twoForm">
              <div>
                <label htmlFor="fname">Name</label>
                <br />
                <input
                  class="inputField"
                  type="text"
                  name="fname"
                  v-model="user.fName"
                />
              </div>

              <div>
                <label htmlFor="lname"></label>
                <br />
                <input
                  class="inputField"
                  required
                  type="text"
                  name="lname"
                  v-model="user.lName"
                />
              </div>
            </div>

            <br />
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
            <br />

            <div class="twoForm">
              <div>
                <label htmlFor="npassword">Password</label>
                <br />
                <input
                  class="inputField"
                  type="password"
                  name="npassword"
                  placeholder="New password"
                  v-model="user.password"
                />
              </div>

              <div>
                <label htmlFor="rpassword"></label>
                <br />
                <input
                  class="inputField"
                  type="password"
                  name="rpassword"
                  placeholder="Reapeat new password"
                  v-model="user.rpassword"
                />
              </div>

              <br />
            </div>
            <input
              class="profileButton profileUpdateButton"
              type="submit"
              value="Update profile"
            />
          </div>
        </form>
      </div>

      <br />

      <h2>Subscriptions</h2>
      <div class="threeCards">

        <router-link v-for="subscription in user.subscriptions"
          :key="subscription.courseID"
          :to="{ name: 'Courses', params:{id: subscription.courseID}}"
          class="card courseCard"
        >
          <div>
            <img :src="subscription.courseIMG" alt="course" />
            <div class="cardTextContainer">
              <h3>
                <b> {{ subscription.courseName }} </b>
              </h3>
              <p> {{ subscription.shortDescription }} </p>
            </div>
          </div>
        </router-link>

      </div>

      <button class="profileButton profileDeleteButton deleteButton">
        Delete profile
      </button>
    </main>
  </template>
  
  <script>
  
  export default {
    name: 'ProfileView',
    components: {  },
    methods: {
      patchUser() {
        alert(`not implemented`)
      },
    },
    computed: {
      
    },
    data() {
      return {
        user: {
          fName: '',
          lName: '',
          email: '',
          password: '',
          rpassword: '',
          uImageURL: profileImage,
          subscriptions: [ ],
        },
        
        
      }
    },
    computed: {
      currentUser() {
        return this.$store.state.auth.user;
      }
    },
    async mounted() {
      const userID = await tokenService.getUserData().user_id
      UserService.getProfile(userID).then(
        (response) => {
          console.log("räspåns", response)
          this.user = response.data;
          this.user.password = ''

        },
        (error) => {
          this.content =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
      }
    );
      if (!this.currentUser) {
        this.$router.push({name: 'Login'});
      }

      UserService.getSubscriptions(userID).then(
        (response) => {
          this.user.subscriptions = response.data;
        }
      )
    },
  }
  </script>
  