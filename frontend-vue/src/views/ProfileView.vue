<script setup>
  import homeImage from "../images/home_image.png";
  import profileImage from "../images/default_profile.png";
</script>

<template>
    <main class="profile">
      <h1>Profile</h1>
      <div class="profileContent">
        <div class="profileUploadContaienr">
          <div class="profileImageContainer">
            <img :src=profileImage alt="Profile" />
          </div>

          <form>
            <input
              class="profileButton profileUploadButton"
              type="submit"
              value="Upload ⬆"
            />
          </form>
        </div>

        <div class="profileFormContainer">
          <form @submit.prevent="patchUser">
            <div class="twoForm">
              <div>
                <label htmlFor="fname">Name</label>
                <br />
                <input
                  class="inputField"
                  type="text"
                  name="fname"
                  v-model="fName"
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
                  v-model="lName"
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
              v-model="email"
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
                  v-model="password"
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
                  v-model="rpassword"
                />
              </div>

              <br />
            </div>
            <input
              class="profileButton profileUpdateButton"
              type="submit"
              value="Update profile"
            />
          </form>
        </div>
      </div>

      <br />

      <h2>Subscriptions</h2>
      <div class="threeCards">

        <router-link v-for="subscription in subscriptions"
          :key="subscription.courseID"
          :to="{ name: 'Courses', params:{id: subscription.courseID} }"
          class="card courseCard"
        >
          <div>
            <img :src="homeImage" alt="course" />
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
    data() {
      return {
        fName: 'first name',
        lName: 'last name',
        email: 'example@example.com',
        password: '',
        rpassword: '',
        subscriptions: [
          {
            courseID: -1,
            courseName: "course name",
            shortDescription: "short description",

          }
        ]
      }
    }
  }
  </script>
  