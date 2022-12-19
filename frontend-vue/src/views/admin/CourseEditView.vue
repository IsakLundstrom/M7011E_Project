<script setup>
  import userService from '@/services/user.service';
</script>

<template>
  <main>
    <h1>Edit Course</h1>
    <form @submit.prevent="patchCourse">
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
        v-model="course.courseName"
      />

      <br />

      <label htmlFor="shortDescription">Short description</label>
      <br />
      <input
        class="inputField"
        required
        type="text"
        name="shortDescription"
        v-model="course.shortDescription"
      />

      <br />

      <label htmlFor="longDescription">Long description</label>
      <br />
      <textarea
        class="inputField"
        required
        name="longDescription"
        rows="5"
        v-model="course.longDescription"
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
      <div v-if="updated" class="successBox">Course updated!</div>
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
            <td> {{ video.videoURL }} </td>
            <td>
              <button>❌</button>
            </td>
          </tr>

      </tbody>
    </table>

    <br />

    <h3>Add new videos to the course</h3>

    <br />

    <form @submit.prevent="postVideo">
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

    <button 
      class="profileButton deleteButton" 
      @click="deletePressed = true"
    >
      Delete course
    </button>
    
    <div v-if="deletePressed" className="confirmBox">
      <p>Do you really want to delete this course?</p>
      <button className="profileButton deleteButton" @click="">
        Yes
      </button>
      <button
        className="profileButton profileUpdateButton"
        @click="deletePressed = false"
      >
        No
      </button>
    </div>

  </main>
</template>

<script>

  export default {
    name: 'CourseEditView',
    components: {  },
    methods: {
      patchCourse() {
        userService.patchCourse(
          this.cID, 
          this.course.courseName, 
          this.course.shortDescription,
          this.course.longDescription,
          this.newCourseIMG,
        ) //courseID, courseName, shortDesc, longDesc, courseIMG
        this.updated = true
      },
      setCImage(event){
        this.newCourseIMG = event.target.files[0]
      },
      postVideo() {
        alert(`not implemented`)
      },
      async getCourse() {
        const response = await userService.getCourse(this.cID)
        console.log(response.data)
        this.course = response.data
      }
    },
    data() {
      return {
        cID: this.$route.params.id,
        course: [
          {
            courseName: '',
            shortDescription: '',
            longDescription: '',
            courseIMG: '',
          }
        ],
        newCourseIMG: null,
        newVidName: '',
        newVidUrl: '',

        videos: null,
        deletePressed: false,
        updated: false,
      }
    },
    watch: {
    '$route.params.id': {
      async handler() {
        await this.getCourse()
      },
      immediate: true
      
    },
  }
  }
</script>