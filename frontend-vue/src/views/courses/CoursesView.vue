<script setup>
  import userService from '../../services/user.service.js';
</script>

<template>
  <main>
    <h1>Our courses</h1>
    <form class="coursesSearchForm">
      <input 
        class="inputField" 
        type="text" 
        placeholder="Search.."
        v-model="search" 
      />

      <label for="cars">Sort by: </label>

      <select class="inputField" name="sort" v-model="ordering">
        <option value="-courseID">Latest</option>
        <option value="courseID">Oldest</option>
        <option value="-likeRatio">Like ratio</option>
        <option value="courseName">Name A-Z</option>
        <option value="-courseName">Name Z-A</option>
      </select>

    </form>
    <div class="fiveCards">

      <router-link v-for="course in courses" 
      :key="course.courseID" 
      :to="{name: 'Course', params: {id: course.courseID}}" 
      class="card courseCard"
      >
        <div>
          <img :src=course.courseIMG alt="course" />
          <div class="cardTextContainer">
            <h3>
              <b> {{ course.courseName }} </b>
            </h3>
            <p> {{ course.shortDescription }} </p>
          </div>
        </div>
      </router-link>

    </div>

  </main>
  </template>

<script>
  
export default {
  name: 'CoursesView',
  components: {  
  },
  methods: {
    async fetchCourses() {
      const response = await userService.getCourses(this.ordering, this.search)
      this.courses = response.data
    }
  },
  data() {
    return{
      courses : [],
      search: '',
      ordering: '-courseID',
    }
  },
  mounted() {
    this.fetchCourses()
  },
  watch: {
    search() {
      this.fetchCourses()
    },
    ordering() {
      this.fetchCourses()
    }
     
  }
}
</script>