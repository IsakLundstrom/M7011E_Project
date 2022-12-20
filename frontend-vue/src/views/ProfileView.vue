<script setup>
  import profileImage from "../images/default_profile.png";

  import tokenService from "../services/token.service";
  import userService from "../services/user.service";
</script>

<template>
    <main class="profile">
      <h1>Profile</h1>
      <div class="profileContent">
        <form @submit.prevent="patchUser">
        
        <div class="profileUploadContaienr">
          <div class="profileImageContainer">
            <img :src="user.userIMG" alt="Profile" />
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

            <label htmlFor="2fa">2 Factor Authentication </label>
            <input
              class="checkboxField"
              type="checkbox"
              name="2fa"
              @change="async (e) => setHas2FA(e.target.checked)"
            />

            <br />
            <br />

            <input
              class="profileButton profileUpdateButton"
              type="submit"
              value="Update profile"
            />
          </div>
        </form>
      </div>

      <div v-if="updated" class="successBox">Profile updated!</div>
      <div v-if="errorText !== ''" class="errorBox"> {{ errorText }} </div>

      <br />

      <h2>Your Subscriptions</h2>
      <div class="threeCards">

        <p v-if="user.subscriptions && user.subscriptions.length===0">
          You have not subscribed to any courses
          <br />
          <br />
        </p>
        <p v-if="!user.subscriptions">
          Loading Subscriptions...
          <br />
          <br />
        </p>

        <router-link v-for="subscription in user.subscriptions"
          :key="subscription.courseID"
          :to="{ name: 'Course', params:{id: subscription.courseID}}"
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




      
      <div v-if="user.is_staff">
        <h2>Your Courses</h2>
        <br />
        <router-link class="coursesSortButton" :to="{name: 'CourseCreate'}">
          Create new course
        </router-link>
        <br />
        <br />
        <table class="adminTable">
          <tbody>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Short description</th>
              <th>Like Ratio</th>
              <th>Edit</th>
            </tr>

            <tr v-for="course in ownCourses" :key="course.courseID">
              <td>{{course.courseID}}</td>
              <td>{{course.courseName}}</td>
              <td>{{course.shortDescription}}</td>
              <td>{{`${course.likeRatio}%`}}</td>
              <td>
                <router-link :to="{name: 'CourseEdit', params: {id: course.courseID}}">
                  &#x270D;
                </router-link>
              </td>
            </tr>

          </tbody>
        </table>

        <br />
        <br />
      </div>




      <button class="profileButton profileDeleteButton deleteButton"
        @click="deletePressed = true"
      >
        Delete profile
      </button>

      <div v-if="deletePressed" class="confirmBox">
        <p>Do you really want to delete your profile?</p>
        <button class="profileButton deleteButton" @click="deleteUser">
          Yes
        </button>
        <button
          class="profileButton profileUpdateButton"
          @click="deletePressed = false"
        >
          No
        </button>
      </div>

    </main>
  </template>
  
  <script>
  
  export default {
    name: 'ProfileView',
    components: {  },
    methods: {
      async patchUser() {
        await userService.patchUser(this.user.id, this.user.fName, this.user.lName, this.user.email)
        this.updated = true
      },
      async deleteUser() {
        await userService.deleteUser(this.user.id)
        await this.$store.dispatch("auth/logout", this.user)
        this.$router.push({name: 'Home'})

        
      },
    },

    data() {
      return {
        user: {
          fName: '',
          lName: '',
          email: '',
          password: '',
          rpassword: '',
          userIMG: profileImage,
          subscriptions: {},
        },
        ownCourses: {},

        deletePressed: false,
        updated: false,
        errorText: '',
      }
    },
    computed: {
      currentUser() {
        return this.$store.state.auth.user;
      }
    },
    async mounted() {
      const userID = await tokenService.getUserData().user_id
      await userService.getProfile(userID).then(
        (response) => {
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

      userService.getSubscriptions(userID).then(
        (response) => {
          this.user.subscriptions = response.data;
        }
      )

      userService.getCoursesFromOwner(userID).then(
        (response) => {
          this.ownCourses = response.data
        }
      )

    },
  }
  </script>
  