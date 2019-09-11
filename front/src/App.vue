<template>
  <div id="app">
    <img src="./assets/logo.png">
    <div v-for="e in elastic" class="movie" v-bind:key="e._id">
      <p>{{e._index}}</p>
      <span>title : {{e._source.title}}</span> | <span>content : {{e._source.content}}</span>
      <p>{{e.reg_date}}</p>
    </div>
    <editor></editor>
    <!-- <ckeditor type="classic" v-model="value1"></ckeditor> -->
    <router-view/>
  </div>
</template>

<script>
import editor from '@/components/CKEditor'

export default {
  created () {
    this.$http.get('/api/elastic')
      .then((response) => {
        console.log(response.data)
        this.elastic = response.data
      })
  },
  data () {
    return {
      elastic: []
    }
  },
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
