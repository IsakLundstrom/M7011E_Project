<script setup>
  import homeImage from '../../images/home_image.png'
</script>

<template>
  <main>
    <h1>Our courses</h1>
    <form class="coursesSearchForm" action="">
      <input class="inputField" type="text" placeholder="Search.." />

      <label for="cars">Sort by: </label>

      <select class="inputField" name="casortrs">
        <option value="A-Z">A-Z</option>
        <option value="likeRatio">Like ratio</option>
        <option value="date">Date created</option>
      </select>

      <input class="coursesSortButton" type="submit" value="Sort" />
    </form>
    <div class="fiveCards">

      <router-link v-for="course in courses" 
      :key="course.courseID" 
      :to="{name: 'Course', params: {id: course.courseID}}" 
      class="card courseCard"
      >
        <div>
          <img :src=homeImage alt="course" />
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
      const response = await fetch("http://127.0.0.1:8000/courses/");
      console.log("response", response)
      const parsed = await response.json();
      console.log("parsed", parsed);
      this.courses = parsed;
      console.log("courses", this.courses)
    }
  },
  data() {
    return{
      courses : [],
    }
  },
  mounted() {
    this.fetchCourses()
  }
}
</script>