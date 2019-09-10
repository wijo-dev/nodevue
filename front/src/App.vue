<template>
  <div id="app">
    <img src="./assets/logo.png">
    <editor></editor>
    <!-- <ckeditor type="classic" v-model="value1"></ckeditor> -->
    <router-view/>
  </div>
</template>

<script>
import editor from '@/components/CKEditor'

export default {
  name: 'App',
  components: {
    'editor': editor
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
