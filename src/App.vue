<template>
  <div id="app">
    <router-link to="pethome">topethome</router-link>
    <router-link to="search">tosearch</router-link>
    <router-link to="knowledgecard">toknowledgecard</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
const axios=require('axios');
export default {
  name:'App'
}
</script>

<style>

.el-table--border th.gutter:last-of-type { display: block!important; width: 17px!important; }
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
