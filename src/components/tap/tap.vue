<template>
    <div class="tap">
        <router-link tag="div" class="tab-item" to="/recommend">
            <span class="tab-link">推荐</span>
        </router-link>
        <router-link tag="div" class="tab-item" to="/singer">
            <span class="tab-link">歌手</span>
        </router-link>
        <router-link tag="div" class="tab-item" to="/rank">
            <span class="tab-link">排行</span>
        </router-link>
        <router-link tag="div" class="tab-item" to="/search">
            <span class="tab-link">搜索</span>
        </router-link>
    </div>
</template>
<script>
    export default {
        
    }
</script>
<style lang="less" scoped>
.tap{
    display:flex;
    height: 44px;
    line-height: 44px;
    font-size:16px;
    .tab-item{
        flex:1;
        text-align:center;
    }
    .router-link-active{
        color:red;
        background-color: skyblue;
    }
}
</style>


