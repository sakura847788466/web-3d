<!--
 * @Descripttion: 顶部导航栏组件
 * @version: 1.0
 * @Author: Ada
 * @Date: 2021-12-30 13:56:07
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-04-11 17:28:11
-->
<template>
    <div class="top-part">
        <div
            :class="{ 'monitor-part': true, isActive: '/main/monitor' == nowTagRoute }"
            @click="changeCurrentMenu('/main/monitor', 1)"
        >
            监测数据
        </div>
        <div class="top-title">风暴潮预警体系三维可视化大屏</div>
        <div
            :class="{ 'forecast-part': true, isActive: '/main/forecast' == nowTagRoute }"
            @click="changeCurrentMenu('/main/forecast', 2)"
        >
            预报数据
        </div>
    </div>
</template>
<script>
export default {
    name: "Top",
    data() {
        return {
            currentActive: '/main/monitor'
        }
    },
    computed:{
        nowTagRoute() {
            return this.$route.path
        }
    },
    methods: {
        changeCurrentMenu(route, val) {
            this.currentActive = route
            this.$router.push({ path: route })
        }
    }
}
</script>

<style lang="scss" scoped>
@import "./top.scss";
</style>
