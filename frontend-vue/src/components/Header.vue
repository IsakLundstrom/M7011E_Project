<template>

    <div class="header">

        <router-link :to="{ name: 'Home' }">Home</router-link> |
        <router-link :to="{ name: 'Courses' }">Courses</router-link> |
        <router-link :to="{ name: 'About' }">About</router-link>
    </div>
    </template>
    <script>
    export default{
        name:'Header',
        data() {
        return {
          title: 'The Best Free Gym in Luleå'
        }
      },
    }
    </script>