<template>
  <div id="app">
    <v-app>
      <navigation-main />
      <v-content>
        <router-view />
      </v-content>
    </v-app>
  </div>
</template>

<script>
import NavigationMain from './components/navigation/Main'

export default {
  components: {
    NavigationMain
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
