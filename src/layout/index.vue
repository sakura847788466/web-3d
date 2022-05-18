<!--
 * @Descripttion: layout入口文件、项目主图视图
 * @version: 1.0
 * @Author: Ada
 * @Date: 2021-12-30 13:54:09
 * @LastEditors: Ada
 * @LastEditTime: 2022-04-08 12:37:39
-->
<template>
    <div id="main-layout">
        <div class="top">
            <Top />
        </div>
        <div :class="{'changeBg':this.$route.name === 'business','main-content':true}">
            <div class="main-box">
                <router-view />
            </div>
        </div>
    </div>
</template>
<script>
import Top from '../components/top/top'
export default {
    name: 'Layout',
    components: {
        Top
    },
    props: [],
    data() {
        return {}
    },
    computed: {},
    created() {},
    mounted() {
    },
    methods: {},
}
</script>
<style lang='scss' scoped>
@import './index.scss'
</style>