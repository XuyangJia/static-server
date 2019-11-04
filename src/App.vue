<template>
  <div id="app">
    <Directory path="Welcome"/>
  </div>
</template>

<script>
import Directory from './components/Directory'

export default {
  name: 'app',
  components: {
    Directory
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
