<script setup>
  import homeImage from "../images/home_image.png";
  import dumbellSvg from "../images/dumbell_svg.svg";
  import runSvg from "../images/run_svg.svg";
  import fotballSvg from "../images/fotball_svg.svg";
  import userService from "@/services/user.service";
  import TwitterTimeline from 'vue-twitter-timeline';
</script>

<template>
  <main>
  <div class="homeImageContainer">
    <div class="imageGradient"></div>
    <img :src=homeImage alt="Home" />
    <h1 class="homeH1 textBottomLeft">The Sweat Zone</h1>
  </div>

  <h2 class="homeH2"> We are fitness! </h2>

  <div class="threeCards threeMotivationCards">
    <div class="card motivationCard">
      <img :src=dumbellSvg alt="Dumbell" />
      <div class="cardTextContainer">
        <h3>
          <b>Gym training!</b>
        </h3>
        <p>Train at the gym with different exercises every week 🏋️!</p>
      </div>
    </div>

    <div class="card motivationCard">
      <img :src=runSvg alt="Run" />
      <div class="cardTextContainer">
        <h3>
          <b>Run every day!</b>
        </h3>
        <p>
          Get free running tips every day or come alnog and run with us 🏃‍♀️!
        </p>
      </div>
    </div>

    <div class="card motivationCard">
      <img :src=fotballSvg alt="Fotball" />
      <div class="cardTextContainer">
        <h3>
          <b>Sports!</b>
        </h3>
        <p>
          We have many different sports that you can try with us! ⚽, 🏀,
          ⚾, 🏒, 🎾, 🏌️‍♂️, 🤣, 🚴‍♀️ and much more!
        </p>
      </div>
    </div>
  </div>

  <h2 class="homeH2"> Our 3 latest courses</h2>

  <div v-if="courses" class="threeCards">
    <router-link 
      v-for="n, index in 3" :key="index"
      :to="{ name: 'Course', params: {id:courses[index].courseID}}" 
      class="card courseCard"
    >
      <div >
        <img :src=courses[index].courseIMG alt="course" />
        <div class="cardTextContainer">
          <h3>
            <b> {{ courses[index].courseName }} </b>
          </h3>
          <p> {{ courses[index].shortDescription }} </p>
        </div>
      </div>
    </router-link>
    
  </div>

  <h2 className="homeH2">News</h2>

  <br />

  <TwitterTimeline
    url="LTUniv?ref_src=twsrc%5Etfw"
    height="400"
    description="Loading Twitter..."
  />
  
</main>
</template>

<script>

export default {
  name: 'HomeView',

  data() {
    return {
      courses: null,
      ordering: '-courseID',
      search: '',
    }
  },
  
  async created() {
    const response = await userService.getCourses(this.ordering, this.search)
    this.courses = response.data
  }
}
</script>
