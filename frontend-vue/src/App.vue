<script setup>
import Header from './components/Header.vue'
</script>

<template>
  <nav>
    <Header></Header>
    
  </nav>
  <router-view/>
</template>

<script>

export default {
  name: 'App',
  components: { Header },
  data() {
    return {
      title: 'The Best Free Gym in Luleå'
    }
  }, 
  methods: {  }
}

</script>

<style>
@import "./index.css";

/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
} */


</style>
