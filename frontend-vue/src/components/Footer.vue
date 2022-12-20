<script setup>
  import twitterSvg from "../images/icons8-twitter.svg";
  import facebookSvg from "../images/icons8-facebook.svg";
  import instagramSvg from "../images/icons8-instagram.svg";
</script>

<template>
  <footer>
      <div class="socialContainer">
        <RouterLink class="socialLink" to="/">
          <div class="socialSvg">
            <img :src="facebookSvg" alt="Facebook" />
          </div>
        </RouterLink>
        <RouterLink class="socialLink" to="/">
          <div class="socialSvg">
            <img :src="twitterSvg" alt="Twitter" />
          </div>
        </RouterLink>
        <RouterLink class="socialLink" to="/">
          <div class="socialSvg">
            <img :src="instagramSvg" alt="Instagram" />
          </div>
        </RouterLink>
      </div>

      <p>© 2022 The Sweat Zone</p>
    </footer>
</template>
<script>
  export default{
    name:'Footer',
    data() {
      return {      }
    },
  }
</script>