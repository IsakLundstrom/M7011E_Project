<script setup>
  import tokenService from '@/services/token.service';
import userService from '@/services/user.service';
</script>

<template>
  <main>
    <h1>Create Course</h1>
    <form @submit.prevent="handleSubmit">
      <label htmlFor="cname">Name</label>
      <br />
      <input
        class="inputField"
        required
        type="text"
        name="cname"
        v-model="cName"
      />

      <br />

      <label htmlFor="shortDescription">Short description</label>
      <br />
      <input
        class="inputField"
        required
        type="text"
        name="shortDescription"
        v-model="shortDescription"
      />

      <br />

      <label htmlFor="longDescription">Long description</label>
      <br />
      <textarea
        class="inputField"
        required
        name="longDescription"
        rows="5"
        v-model="longDescription"
      ></textarea>

      <br />

      <label htmlFor="image">Image</label>
      <br />
      <input
        class=""
        required
        type="file"
        name="image"
        v-on:change="setCImage($event)"
      />

      <br />
      <br />

      <input
        class="profileButton profileUpdateButton"
        type="submit"
        value="Create course"
      />
    </form>
  </main>
</template>

<script>

  export default {
    name: 'CourseCreateView',
    components: {  },
    methods: {
      async handleSubmit() {
        userService.postCourse(this.cName, this.shortDescription, this.longDescription, this.courseIMG)
        const user = await tokenService.getUserData()
        if (user.is_superuser){
          this.$router.push({name: 'CourseList'})
        } else if (user.is_staff) {
          this.$router.push({name: 'Profile'})
        }
        
        
      },
      setCImage(event){
        this.courseIMG = event.target.files[0]
      }
    },
    data() {
      return {
        cName: "",
        shortDescription: "",
        longDescription: "",
        courseIMG: "",

      }
    }
  }
</script>