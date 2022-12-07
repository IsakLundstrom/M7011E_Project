<script setup>
  // https://antoniandre.github.io/vueper-slides/
  import { VueperSlides, VueperSlide } from 'vueperslides'
  import 'vueperslides/dist/vueperslides.css'
</script>

<template>
  <main class="about">
    <h1>This is dynamic</h1>
    <p>
      Course id is {{ id }}
    </p>
    <vueper-slides bullets-outside :dragging-distance="50" progress>


      <vueper-slide v-for="(slide, i) in slides"
        :key="i" 
        :video="slide.video"
        :image="slide.image"/>

      

    </vueper-slides>
  </main>
</template>

<script>

export default {
  name: 'CourseView',
  components: { VueperSlides, VueperSlide },
  data() {
    return {
      id: this.$route.params.id, 
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
      title: 'Slide #2',
      content: 'Slide 2 content.',
      image: 'https://i.ytimg.com/vi_webp/ehJg_OlcjpE/maxresdefault.webp',
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
</style>