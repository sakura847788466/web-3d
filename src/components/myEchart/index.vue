<!--
 * @Descripttion: echart卡片组件
 * @version: 1.0
 * @Author: Ada
 * @Date: 2022-03-28 09:17:39
 * @LastEditors: Ada
 * @LastEditTime: 2022-04-08 17:37:07
-->
<template>
    <div class="echart-box">
        <div class="echart-title">
            {{ title }}
        </div>
        <div :id="`${echartId}`" class="echart-main"></div>
    </div>
</template>
<script>
import * as echarts from 'echarts'
import { renderLineEchart } from '../../utils/echarts'
export default {
    name: 'EchartBox',
    components: {},
    props: {
        title: {
            type: String,
            default: () => {
                return ''
            }
        },
        echartId: {
            type: String,
            default: () => {
                return ''
            }
        },
        unit: {
            type: String,
            default: () => {
                return ''
            }
        },
        echartData: {
            type: Array,
            default: () => {
                return []
            }
        }
    },
    data() {
        return {}
    },
    computed: {},
    watch: {
        echartData: {
            deep: true,
            handler(val) {
                let that = this
                that.$nextTick(() => {
                    setTimeout(() => {
                        that.initEchart()
                    }, 1000)
                })
            }
        }
    },
    created() {},
    mounted() {
        // this.initEchart()
        // this.$nextTick(()=>{
        //     console.log(document.getElementById('echartId'))
        //     this.initEchart()
        // })
    },
    methods: {
        initEchart() {
            const that = this
            if (that.title === '实时水位值') {
                renderLineEchart(
                    echarts.init(document.getElementById(that.echartId)),
                    that.echartData,
                    '水位值',
                    that.unit
                )
            } else if (that.title === '潮位变化速度曲线') {
                renderLineEchart(
                    echarts.init(document.getElementById(that.echartId)),
                    that.echartData,
                    '潮位变化速度曲线',
                    that.unit
                )
            } else if (that.title === '电池电压统计') {
                renderLineEchart(
                    echarts.init(document.getElementById(that.echartId)),
                    that.echartData,
                    that.unit,
                    '电池电压'
                )
            }
        }
    }
}
</script>
<style lang='scss'>
@import './index.scss';
</style>
