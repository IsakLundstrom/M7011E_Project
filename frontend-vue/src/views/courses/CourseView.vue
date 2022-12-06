<template>
  <main class="about">
    <h1>This is be dynamic</h1>
    <p>
      Course id is {{ id }}
    </p>
    
  </main>
</template>

<script>

export default {
  name: 'CourseView',
  components: {  },
  data() {
    return {
      id: this.$route.params.id
    }
  }
}

</script>