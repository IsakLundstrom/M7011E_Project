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
    <div class="fiveCards" v-for="course in courses" :key="course.id">

      <router-link :to="{name: 'Course', params: {id: course.id}}" class="card courseCard">
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
  data() {
    return{
      courses : [],
    }
  }
}
</script>