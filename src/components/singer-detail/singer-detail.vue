<template>
    <transition name="slide">
        <div class="singer-detail"></div>
    </transition>
</template>
<script>
export default {
    
}
</script>
<style lang="less" scoped>
.singer-detail{
    position:fixed;
    z-index: 100;
    left:0;
    right:0;
    top:0;
    bottom:0;
    background-color: khaki;
}
.slide-enter-active,.slide-leave-active{
    transition: all .3s;
}
.slide-enter,.slide-leave-to{
    transform: translate3d(100%,0,0)
}
</style>

