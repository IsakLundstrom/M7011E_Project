<template>

    <tr v-for="course in courses" :key="course.id">
      <td>
        <router-link :to="{name: 'Course', params: {id:course.id}}">
          {{ course.title }}
        </router-link>
      </td>
      <td> {{ course.details }} </td>
    </tr>

</template>

<script>

export default {
  name: 'CoursesView',
  components: {  
  },
  data() {
    return {
      courses : [
      { title: 'course One', id: 1, details: 'no details' },
      { title: 'course Two', id: 2, details: 'no details' },
      { title: 'course Three', id: 3, details: 'no details' },
      ]
    }
  }
}
</script>