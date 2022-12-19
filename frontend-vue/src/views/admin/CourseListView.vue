<script setup>
  import userService from '@/services/user.service';
</script>

<template>
  <main :key="componentKey">
      <h1>All courses</h1>

      <br />
      <router-link class="coursesSortButton" :to="{ name: 'CourseCreate'}" >
        Create new course
      </router-link>
      <br />
      <br />

      <form className="coursesSearchForm" @submit.prevent="handleSearchSubmit()">
        <input
          className="inputField"
          type="text"
          placeholder="Search.."
          v-model="search"
        />

        <label>Sort by: </label>

        <select
          className="inputField"
          name="sort"
          v-model="ordering"
        >
          <option value="courseID">CourseID ⬇</option>
          <option value="-courseID">CourseID ⬆</option>
          <option value="likeRatio">Like ratio ⬇</option>
          <option value="-likeRatio">Like ratio ⬆</option>
          <option value="courseName">Name ⬇</option>
          <option value="-courseName">Name ⬆</option>
          <option value="owner">Owner ⬇</option>
          <option value="-owner">Owner ⬆</option>
        </select>
      </form>

      <br />

      <table class="adminTable">
        <tbody>
          <tr>
            <th>ID</th>
            <th>Owner</th>
            <th>Name</th>
            <th>Short description</th>
            <th>Like Ratio</th>
            <th>Edit</th>
          </tr>
            <div v-if="!courses"> Loading Courses...</div>
            <tr v-for="course in courses" :key=course.courseID>
              <td> {{ course.courseID }} </td>
              <td> {{ course.owner }} </td>
              <td> {{ course.courseName }} </td>
              <td> {{ course.shortDescription }} </td>
              <td> {{ course.likeRatio }}% </td>
              <td>
                <router-link :to="{name: 'CourseEdit', params: {id: course.courseID}}">
                  &#x270D;
                </router-link>
              </td>
            </tr>

        </tbody>
      </table>
    </main>
</template>

<script>

  export default {
    data() {
      return {
        courses: null,
        ordering: '-courseID',
        search: '',

        componentKey: 0,
      }
    },
    methods: {
      async getCourses() {
        const response = await userService.getCourses(this.ordering, this.search)
        this.courses = response.data
      }, 
      forceRerender() {
      this.componentKey += 1;
    },
    },
    watch: {
      search() {
        this.getCourses()
      },
      ordering() {
        this.getCourses()
      },
      
    },
    mounted() {
      this.getCourses()
    }
  }
</script>