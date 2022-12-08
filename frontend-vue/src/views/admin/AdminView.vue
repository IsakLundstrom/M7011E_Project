<template>
  <main class="adminView">
      <h1>Admin pages</h1>
    <router-link :to="{name: 'UserList' }">User List Page</router-link>
    <br />
    <router-link :to="{name: 'CourseList' }">Course List Page</router-link>
  </main>
</template>
  
<script>
  
  export default {
    name: 'AdminView',
    components: {  }
  }
</script>