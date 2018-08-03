<template>
  <div id="app">
    <m-header></m-header>
    <tap></tap>
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
import MHeader from './components/m-header/m-header'
import Tap from './components/tap/tap'


export default {
 
  components: {
      MHeader,
      Tap
    }
}
</script>

<style lang="less" scoped>
#app{
  background-color: #ccc;;
}
</style>

