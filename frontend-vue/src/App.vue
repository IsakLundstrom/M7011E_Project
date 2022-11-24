<template>
  <header>

    <Header></Header>

    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />

    <h1 @click="changeTitle"> {{title}} </h1>
  </header>

  <main>
    <input type="text" ref="name">
    <button @click="handleClick">Click me</button>
  </main>
</template>

<script>
import Header from './components/Header.vue'

export default {
  name: 'App',
  components: { Header },
  data() {
    return {
      title: 'The Best Free Gym in Luleå'
    }
  }, 
  methods: {
    changeTitle(){
      this.title = 'Hijacked!'
    }, 
    handleClick() {
      console.log(this.$refs.name)
      this.$refs.name.classList.add('active')
      this.$refs.name.focus()
    }
  }
}

</script>




<!-- original code -->
<!-- <script setup>
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />
    </div>
  </header>

  <main>
    <TheWelcome />
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style> -->
