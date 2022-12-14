<script setup>
  import userService from '../../services/user.service';
</script>
<template>

  <h2>Search for courses</h2>
    <input
      className="inputField"
      type="text"
      placeholder="Search.."
      v-model="search"
    />
    <table className="subnavTable">

      <thead>
        <tr>
          <th>Course</th>
          <th>Short Description</th>
        </tr>
      </thead>
      <tbody>

        <tr v-for="course in courses" :key="course.courseID">
          <td>
            <router-link :to="{name: 'Course', params: {id:course.courseID}}">
              {{ course.courseName }}
            </router-link>
          </td>
          <td> {{ course.shortDescription }} </td>
        </tr>

      </tbody>

    </table>



</template>

<script>

export default {
  name: 'CoursesHeaderView',
  methods: {
    async fetchCourses() {
      const visibleCourses = 3
      userService.getCourses(this.ordering, this.search).then(
        (response) => {

          if(response.data.length < visibleCourses){
            this.courses = response.data
          } else {
            for (let i = 0; i < visibleCourses; i++) {
              this.courses[i] = response.data[i]
            }
          }
        }
      )
    }
  },
  data() {
    return {
      ordering: '-courseID',
      search: '', 
      courses : []
    }
  },
  mounted() {
    this.fetchCourses()
  },
  watch: {
    search() {
      this.fetchCourses()
    },
  }
}
</script>