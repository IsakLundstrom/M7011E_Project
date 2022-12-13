<script setup>
  import profileImage from "../images/default_profile.png"
  import coursesForHeader from "../views/courses/CourseHeaderView.vue"
  import tokenService from "../services/token.service.js"
</script>
<template>
  <nav class="mainNav">
    <ul>

      <li class="floatLeft">
        <router-link :to="{ name: 'Home' }" class='mainLink' >Home</router-link>
      </li>

      <li class="floatLeft">
        <div class="subnav">
          <router-link :to="{ name: 'Courses' }" class='mainLink'>Courses</router-link>
          <div className="subnavContent">
            <h2>Search for courses</h2>
            <input
              className="inputField"
              type="text"
              placeholder="Search.."
            />
            <table className="subnavTable">
              <!-- Following must be translated from React to Vue -->

              <thead>
                <tr>
                  <th>Course</th>
                  <th>Short Description</th>
                </tr>
              </thead>
              <tbody>

                  <coursesForHeader></coursesForHeader>

              </tbody>

            </table>
          </div>
        </div>
      </li>

      <li class="floatLeft">
        <router-link :to="{ name: 'About' }" class='mainLink'>About</router-link>
      </li>

      <li class="floatLeft">
        <router-link :to="{ name: 'AdminView' }" class='mainLink'>Admin Pages</router-link>
      </li>

      <li class="floatRight">
      <router-link v-if="!loggedIn" :to="{ name: 'Register' }" class='mainLink'>Register </router-link>
      </li>

      <li class="floatRight">
        <router-link v-if="loggedIn || true" @click="logOut" :to="{ name: 'Home' }" class='mainLink'>Log out</router-link> <!--should also log out a person and only visible to inlogged person-->
        <router-link v-else :to="{ name: 'Login' }" class='mainLink'>Log in</router-link>
      </li>

      <li class="floatRight">
      <router-link v-if="loggedIn" :to="{ name: 'Profile' }" class='mainLink profileImageLink'>
        <div className="headerProfileImageContainer">
          <img :src="profileImage" alt="Profile" />
        </div>
      </router-link>
      </li>
    </ul>
      
  </nav>
</template>

<script>
  export default{
    name:'Header',
    components: {
      coursesForHeader
    }, 
    computed: {
      loggedIn(){
        console.log(tokenService.getUser())
        return tokenService.getUser()
        // if(tokenService.getUserData()) {
        //   console.log(tokenService.getUserData())
        // } else {
        //   console.log(null)
        // }
        
        // console.log(this.$store.state.auth.user)
        // console.log(jwt_decode(this.$store.state.auth.user.access).is_staff)
        // return this.$store.state.auth.user
      },
    },
    methods: {
      logOut() {
        console.log(tokenService.getUser())
        return tokenService.getUser()
        // this.$store.dispatch("auth/logout").then(
        //   () => {
        //     this.$router.push({ name: 'Home'});
        //   },
        //   (error) => {
        //     this.loading = false;
        //     this.message =
        //       (error.response &&
        //         error.response.data &&
        //         error.response.data.message) ||
        //       error.message ||
        //       error.toString();
        //   }
        // )
      }
    },
    data() {
      return {
        
      }
    },
  }
</script>