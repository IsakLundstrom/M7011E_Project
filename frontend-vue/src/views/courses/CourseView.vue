<script setup>
  // https://antoniandre.github.io/vueper-slides/
import { VueperSlides, VueperSlide } from 'vueperslides';
  import 'vueperslides/dist/vueperslides.css';

  import homeImage from "../../images/home_image.png";
  import tokenService from '@/services/token.service';
  import userService from '../../services/user.service';
</script>

<template>
  <main class="about" :key="componentKey">

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
        <img :src=courseIMG_URL alt="Home" />
        <h1 class="textBottomLeft" >{{ courseName }}</h1>
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

            <ShareNetwork
              network="twitter"
              title="Checkout this awesome course!"
              :url="twitterURL"
              hashtags="fitness"
            >
              <a class="twitter-share-button" data-show-count="false">
                Share on Twitter
              </a> 

            </ShareNetwork>
          </div>

          <p>Course created by: {{owner}}</p>

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
            fixed-height="true"
            fixed-width="true"
            arrows-outside 
            bullets-outside 
            :dragging-distance="50" 
            progress>

            <vueper-slide v-for="(slide, i) in slides "
              :key="i" 
              :name="slide.videoName"
              :video="slide.videoURL"
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

    forceRerender() {
      this.componentKey += 1;
    },

    async checkAndUpdateCourseInfo() {
      try {
        const response = await userService.getCourse(this.courseID)
        this.likeRatio = response.data.likeRatio
        this.courseName = response.data.courseName
        this.courseIMG_URL = response.data.courseIMG
        this.longDescription = response.data.longDescription
        this.owner = response.data.owner

      } catch (error) {
        console.log("could not load course data", error)
      }
    },

    async checkAndUpdateCourseVideos() {
      try {
        const response = await userService.getCourseVideos(this.courseID)
        this.slides = response.data
      } catch (error) {
        console.log("could not load videos", error)
      }
    },

    async checkAndUpdateIfSubscribed(){
      try {
        console.log(this.user)
        const response = await userService.getSubscribeData(this.courseID, this.user.user_id)
        console.log("data", response.data)
        if(response.data.status === 'No subscription found') {
          this.userSubID = -1
          this.subscribed = false
        } else {
          this.userSubID = response.data.subID
        this.subscribed = true
        }

      } catch (error) {
        console.log('could not get subscribe data', error)
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
      if(!this.userLikeID && this.userLikeID !== 0) {
        await userService.postLikeValue(this.courseID, this.user.user_id, value)

      } else {
        if(this.userLikeValue === value){
          value = -1
        }
        await userService.putLikeValue(this.courseID, this.user.user_id, this.userLikeID, value)
      }

      this.checkAndupdateLikeValue()

    },

    async updateAllInfo() {
      await this.checkAndUpdateCourseInfo()

      this.user = await tokenService.getUserData()

      this.checkAndUpdateIfSubscribed()

      this.checkAndupdateLikeValue()

      this.checkAndUpdateCourseVideos()
    },

    toggleVisible() {
      this.visible = !this.visible
    }, 
    
  },

  watch: {
    '$route.params.id' (to, from){
      this.courseID = to
      this.updateAllInfo().then(
        this.forceRerender()
      )
      
    }
  },

  mounted(){

    this.updateAllInfo()

  },

  created: function() {
    this.connection = new WebSocket(`ws://localhost:8000/ws/courses/${this.courseID}/`)

    this.connection.onmessage = (event) => {      
      this.likeRatio = JSON.parse(event.data).message
    }

    this.connection.onopen = (event) => {
      console.log("Websocket opened", event)
    }

    this.connection.onclose = (event) => {
      console.log("Websocket closed", event)
    }
  },
  unmounted(){
    this.connection.close()
    this.connection = null;
  },

  data() {
    return {
      componentKey: 0,
      connection: null,
      courseID: this.$route.params.id,
      courseName: "",
      courseIMG_URL: homeImage,
      owner: null,
      error: false,
      likeRatio: NaN,
      user: null,
      visible: false,
      longDescription: "",
      subscribed: undefined,
      userSubID: NaN,
      userLikeValue: NaN,
      userLikeID: NaN,

      twitterURL: window.location.href,

      slides: [ ]
    }
  },
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
.vueperslides--fixed-height { height:100%; }
</style>