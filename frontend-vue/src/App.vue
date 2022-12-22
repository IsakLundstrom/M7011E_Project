<script setup>
  import Header from './components/Header.vue'
  import Footer from './components/Footer.vue'
</script>

<template>
  <nav>
    <Header :headerProp="trigger"></Header>
  </nav>

  <router-view @updateHeader="updateHeader"/>
  
  <nav>
    <Footer></Footer>
  </nav>
  
</template>

<script>

  export default {
    name: 'App',
    components: { Header, Footer },
    
    data() {
      return {
        trigger: 0,
      }
    }, 
    methods: {
      updateHeader() {
        this.trigger +=1      
      }
    }
  }
</script>

<style>
  @import "./index.css";
</style>
