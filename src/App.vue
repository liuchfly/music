<template>
  <div id="app" class="app">
    <m-header></m-header>
    <tap></tap>
    <keep-alive>
      <router-view/>
    </keep-alive>
    <player></player>
  </div>
</template>

<script>
import MHeader from './components/m-header/m-header'
import Tap from './components/tap/tap'
import Player from './components/player/player'


export default {
  components: {
      MHeader,
      Tap,
      Player
    },
    mounted() {
      // document.addEventListener('touchstart', function(event) {
      //     event.preventDefault();
      // },  { passive: false });

    },
}
</script>

<style lang="less" scoped>
#app{
  background-color: #ccc;
  // touch-action: none;
}
</style>

