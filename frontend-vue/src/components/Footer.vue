<script setup>
  import twitterSvg from "../images/icons8-twitter.svg";
  import facebookSvg from "../images/icons8-facebook.svg";
  import instagramSvg from "../images/icons8-instagram.svg";
</script>

<template>
  <footer>
      <div class="socialContainer">
        <a class="socialLink" href="https://www.facebook.com/">
          <div class="socialSvg">
            <img :src="facebookSvg" alt="Facebook" />
          </div>
        </a>
        <a class="socialLink" href="https://www.twitter.com/">
          <div class="socialSvg">
            <img :src="twitterSvg" alt="Twitter" />
          </div>
        </a>
        <a class="socialLink" href="https://www.instagram.com/">
          <div class="socialSvg">
            <img :src="instagramSvg" alt="Instagram" />
          </div>
        </a>
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