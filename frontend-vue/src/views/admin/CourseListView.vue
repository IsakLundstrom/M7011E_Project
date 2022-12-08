<template>
  <main>
      <h1>All courses</h1>

      <br />
      <router-link class="coursesSortButton" :to="{ name: 'CourseCreate'}" >
        Create new course
      </router-link>
      <br />
      <br />

      <table class="adminTable">
        <tbody>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Short description</th>
            <th>Like Ratio</th>
            <th>Edit</th>
          </tr>
            <tr v-for="course in courses" :key=course.id>
              <td> {{ course.id }} </td>
              <td> {{ course.courseName }} </td>
              <td> {{ course.shortDescription }} </td>
              <td> {{ course.likeRatio }} % </td>
              <td>
                <router-link :to="{name: 'CourseEdit', params: {id: course.id}}">
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
        courses: [
          {
            id: 1,
            courseName: "fåbåll",
            shortDescription: "play fåbåll",
            likeRatio: -1,
          },
        ]
      }
    }
  }
</script>