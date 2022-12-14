<script setup>
  // https://antoniandre.github.io/vueper-slides/
import { VueperSlides, VueperSlide } from 'vueperslides';
  import 'vueperslides/dist/vueperslides.css';

  import homeImage from "../../images/home_image.png";
  import tokenService from '@/services/token.service';
  import userService from '../../services/user.service';
</script>

<template>
  <main class="about">

    <div v-if="error">
      <p>
        This course does not exist, but you check out all our other
        courses&nbsp;
        <router-link :to="{name: 'Courses' }" > here </router-link>.
      </p>
    </div>
    <div v-else>
      <div class="courseImageContainer">
        <div class="imageGradient"></div>
        <img :src=homeImage alt="Home" />
        <h1 class="textBottomLeft">{{ courseName }}</h1>
        <p class="textBottomRight">Like ratio: {{ likeRatio }}% </p>
      </div>

      <div class="courseContent">
        <div class="courseLeftContent">

          <div v-if="user" class="courseButtons">

            <button v-if="subscribed" @click="deleteSubscribe()">
              <p >Unsubscribe</p>
            </button>
            <button v-else @click="postSubsribe()">
              <p> Subscribe</p>
            </button>

            <button @click="putLikeValue(1)" :class="[ userLikeValue===1 ? 'coursesSortButtonActive' : '']">
              <p>👍</p>
            </button>
            <button @click="putLikeValue(0)" :class="[ userLikeValue===0 ? 'coursesSortButtonActive' : '']">
              <p>👎</p>
            </button>
          </div>
          <div class="courseDescription">
            <button @click="toggleVisible()">
               
              <div v-if="visible"> Description ▲ </div> 
              <div v-else> Description ▼ </div> 
            </button>
            <div v-if="visible" class="courseDescriptionTextBox ">
              <p> {{ longDescription }} </p>
            </div>
          </div>
        </div>
        <div class="courseVideos">
          <vueper-slides 
            arrows-outside 
            bullets-outside 
            :dragging-distance="50" 
            progress>

            <vueper-slide v-for="(slide, i) in slides "
              :key="i" 
              :video="slide.video"
              :image="slide.image"/>

            </vueper-slides>
        </div>

      </div>
    </div>

  </main>
</template>

<script>

export default {
  name: 'CourseView',
  components: { VueperSlides, VueperSlide },
  methods: {

    async checkAndUpdateIfSubscribed(){
      try {
        const response = await userService.getSubscribeData(this.courseID, this.user.user_id)
        console.log("resp", response.data)
        this.userSubID = response.data.subID
        this.subscribed = true

      } catch (error) {

        this.userSubID = -1
        this.subscribed = false

      }
    },
    async checkAndupdateLikeValue() {
      try {
        const response = await userService.getLikeValue(this.courseID, this.user.user_id) //courseID, userID
        this.userLikeValue = response.data.like
        this.userLikeID = response.data.likeID

      } catch (error) {
        console.log(error)
        this.userLikeValue = -1
        this.userLikeID = NaN
      }
    },
    async postSubsribe() {
      try {
        const response = await userService.postSubscribe(this.courseID, this.user.user_id)
        this.checkAndUpdateIfSubscribed()
      } catch (error) {
        console.log(error)
      }
      
    },
    async deleteSubscribe() {
      try {
        const response = await userService.deleteSubscribe(this.courseID, this.userSubID)
        this.checkAndUpdateIfSubscribed()

      } catch (error) {
        console.log(error)
      }
    },

    //1 = like, 0 = dislike
    async putLikeValue(value) {
      console.log("HÄRRÅÅÅ!!", value)
      if(this.userLikeValue === NaN) {
        await userService.postLikeValue(this.courseID, this.user.user_id, value)

      } else {
        if(this.userLikeValue === value){
          value = -1
        }
        await userService.putLikeValue(this.courseID, this.user.user_id, this.userLikeID, value)
      }

      this.checkAndupdateLikeValue()

    },

    toggleVisible() {
      this.visible = !this.visible
    }, 
    
  },
  computed: {
    
  },
  async mounted(){
    this.user = await tokenService.getUserData()

    this.checkAndUpdateIfSubscribed()

    this.checkAndupdateLikeValue()

  },

  data() {
    return {
      connection: null,
      courseID: this.$route.params.id,
      courseName: "",
      error: false,
      likeRatio: NaN,
      user: null,
      visible: false,
      longDescription: "",
      subscribed: undefined,
      userSubID: NaN,
      userLikeValue: NaN,
      userLikeID: NaN,

      slides: [
        // {
        //   id: 1,
        //   title: 'Slide #1',
        //   content: 'Slide 1 content.',
        //   image: 'https://i3.ytimg.com/vi/tgbNymZ7vqY/maxresdefault.jpg',
        //   video: {
        //     url: 'https://www.youtube.com/embed/tgbNymZ7vqY',
        //     props: {
        //       allow: 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
        //     }
        //   }
        // },
      ]
    }
  },
  // created: function() {

  //   console.log("connecting to websocket")
  //   this.connection = new WebSocket(`ws://localhost:8000/ws/courses/2/`)

  //   this.connection.onmessage = function(event) {
  //     console.log(event);
  //   }

  //   this.connection.onopen = function(event) {
  //     console.log(event)
  //     console.log("Successfully connected to the echo websocket server...")
  //   }
  // }
}

</script>

<style>

  .vueperslides__progress {
  background: rgba(0, 0, 0, 0.25);
  color: var(--main-color);
}
.courseVideos,
.vueperslides {
  width: 100%;
  aspect-ratio: 16/9;
}
</style>