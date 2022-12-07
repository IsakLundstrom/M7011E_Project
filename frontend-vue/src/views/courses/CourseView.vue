<script setup>
  // https://antoniandre.github.io/vueper-slides/
  import { VueperSlides, VueperSlide } from 'vueperslides';
  import 'vueperslides/dist/vueperslides.css';

  import homeImage from "../../images/home_image.png";
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

            <button v-if="subscribed" @click="postSubsribe(user)">
              <p>Subscribe</p>
            </button>




            <!-- HÄR ÄR JAG efter lunch: ta reda på hur argument skickas -->
            <button @click="putLike(user)">
              <p>👍 </p>
            </button>
            <button @Click="putDislike(user)">
              <p> 👎</p>
            </button>
          </div>
          <div class="courseDescription">
            <button @click="toggleVisible(!visible)">
               
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
    postSubsribe(user) {

    },
    putLike(user) {
      //skicka putLike värde 1
    },
    putDislike(user) {
      //skicka putlike värde 0
    },
    toggleVisible() {
      this.visible = !this.visible
    }
  },
  data() {
    return {
      id: this.$route.params.id,
      courseName: "to be changed",
      error: false,
      likeRatio: -1,
      user: false,
      subscribed: false,
      visible: false,
      longDescription: "this must be fixed cause its not implemented",

      slides: [
    {
      id: 1,
      title: 'Slide #1',
      content: 'Slide 1 content.',
      image: 'https://i3.ytimg.com/vi/tgbNymZ7vqY/maxresdefault.jpg',
      video: {
        url: 'https://www.youtube.com/embed/tgbNymZ7vqY',
        props: {
          allow: 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
        }
      }
    },
    
    {
      id: 2,
      title: 'Slide #1',
      content: 'Slide 1 content.',
      image: 'https://i3.ytimg.com/vi/tgbNymZ7vqY/maxresdefault.jpg',
      video: {
        url: 'https://www.youtube.com/embed/tgbNymZ7vqY',
        props: {
          allow: 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
        }
      }
    },
    {
      id: 3,
      title: 'Aurora Borealis',
      content: 'This Youtube video has params in the URL and extra attributes on the iframe.',
      image: 'https://i.ytimg.com/vi_webp/ehJg_OlcjpE/maxresdefault.webp',
      video: {
        url: 'https://www.youtube.com/embed/ehJg_OlcjpE?rel=0&showinfo=0&controls=0&fs=0&modestbranding=1&color=white&iv_load_policy=3&autohide=1&enablejsapi=1',
        props: {
          allow: 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
        }
      }
    },
    {
      id: 4,
      title: 'Fjords',
      content: 'This video can\'t be interacted with.',
      image: 'https://i.ytimg.com/vi/2sr9MGkkeks/maxresdefault.jpg',
      video: {
        url: 'https://www.youtube.com/embed/2sr9MGkkeks?controls=0&fs=0&modestbranding=1&color=white&iv_load_policy=3&autohide=1&enablejsapi=1',
        props: {
          allow: 'autoplay'
        },
        pointerEvents: false
      }
    }
  ]
    }
  }
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