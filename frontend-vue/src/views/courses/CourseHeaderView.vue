<script setup>
  import userService from '../../services/user.service';
</script>
<template>

    <tr v-for="course in courses" :key="course.courseID">
      <td>
        <router-link :to="{name: 'Course', params: {id:course.courseID}}">
          {{ course.courseName }}
        </router-link>
      </td>
      <td> {{ course.shortDescription }} </td>
    </tr>

</template>

<script>

export default {
  name: 'CoursesHeaderView',
  methods: {
    async fetchCourses() {

      userService.getCourses(this.ordering, this.search).then(
        (response) => {

          if(response.data.length < 3){
            this.courses = response.data
          } else {
            for (let i = 0; i < 3; i++) {
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
}
</script>