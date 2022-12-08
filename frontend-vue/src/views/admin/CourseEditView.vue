<template>
  <main>
    <h1>Edit Course</h1>
    <form @submit.prevent="putCourse">
      <label htmlFor="id">ID</label>
      <br />
      <input
        class="inputField"
        required
        type="text"
        name="id"
        disabled="disabled"
        v-model="cID"
      />

      <br />

      <label htmlFor="name">Name</label>
      <br />
      <input
        class="inputField"
        required
        type="text"
        name="name"
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
        @change="setCImage($event)"

      />

      <br />
      <br />

      <input
        class="profileButton profileUpdateButton"
        type="submit"
        value="Update course"
      />

      <br />
      <br />
      <br />
    </form>

    <h2>Current videos in the course</h2>
    <br />

    <table class="adminTable">
      <tbody>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Url</th>
          <th>Delete</th>
        </tr>

          <tr v-for="video in videos" :key="video.videoID">
            <td> {{ video.videoID }} </td>
            <td> {{ video.videoName }} </td>
            <td> {{ video.videoUrl }} </td>
            <td>
              <button>❌</button>
            </td>
          </tr>

      </tbody>
    </table>

    <br />

    <h3>Add new videos to the course</h3>

    <br />

    <form @submit="postVideo">
      <label htmlFor="name">Name</label>
      <br />
      <input
        class="inputField"
        required
        type="text"
        name="name"
        v-model="newVidName"
      />

      <br />

      <label htmlFor="url">Url</label>
      <br />
      <input
        class="inputField"
        required
        type="text"
        name="url"
        v-model="newVidUrl"
      />

      <br />
      <br />

      <input
        class="profileButton profileUpdateButton"
        type="submit"
        value="Add new video"
      />

      <br />
      <br />
    </form>

    <button class="profileButton deleteButton">Delete course</button>
  </main>
</template>

<script>

  export default {
    name: 'CourseEditView',
    components: {  },
    methods: {
      putCourse() {
        alert(`${this.cID}, ${this.cName}, ${this.shortDescription},  ${this.longDescription}`);
      },
      setCImage(event){
        this.$emit('update:modelValue', event.target.files[0]); 
      },
      postVideo() {
        alert(`not implemented`)
      }
    },
    data() {
      return {
        cID: this.$route.params.id,
        cName: 'cName',
        shortDescription: 'shortDesc',
        longDescription: 'longDesc',
        newVidName: 'newVidName',
        newVidUrl: 'newVidUrl',

        videos: [
          {          
            videoID: -1,
            videoName: "videName",
            videoUrl: "videoUrl",
          }
        ]
      }
    }
  }
</script>