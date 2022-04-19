<template>
  <v-app>
    <v-app-bar color="success">
      <v-toolbar-title><h2>せーの！</h2></v-toolbar-title>
    </v-app-bar>
    <v-main class="app">
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',
}
</script>

<style scoped>
h2 {
  text-align: center;
}
.app {
  width: 900px;
  margin: auto;
}
</style>