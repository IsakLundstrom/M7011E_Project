<script setup>
  import profileImage from "../images/default_profile.png"
  import coursesForHeader from "../views/courses/CourseHeaderView.vue"
  import tokenService from "@/services/token.service";
import userService from "@/services/user.service";
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

            <coursesForHeader></coursesForHeader>

          </div>
        </div>
      </li>

      <li class="floatLeft">
        <router-link :to="{ name: 'About' }" class='mainLink'>About</router-link>
      </li>

      <li class="floatLeft">
        <router-link v-if="loggedIn && superUser" :to="{ name: 'AdminView' }" class='mainLink'> Admin </router-link>
      </li>

      <li class="floatRight">
      <router-link v-if="!loggedIn" :to="{ name: 'Register' }" class='mainLink'>Register </router-link>
      </li>
      <li class="floatRight">
      <router-link v-if="loggedIn" :to="{ name: 'Profile' }" class='mainLink profileImageLink'>
        <div className="headerProfileImageContainer">
          <img :src="userIMG" alt="Profile" />
        </div>
      </router-link>
      </li>

      <li class="floatRight">
        <router-link v-if="loggedIn" @click="logOut" :to="{ name: 'Home' }" class='mainLink'>Log out</router-link> <!--should also log out a person and only visible to inlogged person-->
        <router-link v-else :to="{ name: 'Login' }" class='mainLink'>Log in</router-link>
      </li>

    </ul>
      
  </nav>
</template>

<script>
  export default{
    name:'Header',
    props:['headerProp'],
    components: {
      coursesForHeader
    }, 
    computed: {

    },
    methods: {
      isloggedIn(){        
        this.loggedIn = this.$store.state.auth.user
      },
      async getUserInfo(){
        const response = await tokenService.getUserData()
        if(response){
          this.superUser = response.is_superuser

          const user = await userService.getProfile(response.user_id)
          this.userIMG = user.data.userIMG
        }
      },
      async logOut(user) {

        await this.$store.dispatch("auth/logout", user)
        this.$router.push({name: 'Home'})
      }
    },
    data() {
      return {
        loggedIn: false,
        superUser: false,
        userIMG: profileImage,
      }
    },

    watch: {
      '$store.state.auth.user': {
        handler(nq) {
          this.isloggedIn()
          this.getUserInfo()
        },
        immediate: true
      },
      headerProp: function() {
        this.getUserInfo()
      }
    }
  }
</script>