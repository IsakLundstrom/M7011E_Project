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
      handleSubmit() {
        alert(`${this.cName}, ${this.shortDescription}, ${this.longDescription}`);
      },
      setCImage(event){
        this.$emit('update:modelValue', event.target.files[0]); 
      }
    },
    data() {
      return {
        cName: "Example Course",
        shortDescription: "short description",
        longDescription: "long description",
      }
    }
  }
</script>