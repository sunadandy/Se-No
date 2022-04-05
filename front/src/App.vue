<template>
  <div id="app">
    <button @click="AppInitilize">初期化</button>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    AppInitilize(){
      this.$store.commit('StoreInit')
    }
  }
}
</script>