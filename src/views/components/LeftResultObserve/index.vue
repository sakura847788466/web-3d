<!--
 * @Descripttion: 右侧结果搜索
 * @version: 1.0
 * @Author: Ada
 * @Date: 2021-11-16 17:25:07
 * @LastEditors: Ada
 * @LastEditTime: 2022-04-07 12:31:09
-->
<template>
    <div class="right-result">
        <!-- 单站点:1 区域:2 -->
        <div
            :class="['result-box', { 'result-box-screenStatus': screenStatus }]"
        >
            <div class="title">
                <span>{{ data.stationName }}综合监测站</span>
            </div>
            <div v-if="Object.keys(data).length != 0" class="result-content">
                <div class="station-position">
                    <div class="station-left">
                        <div class="left-item">
                            <span>数据时间</span>
                            <span>{{
                                data.collectTime | dateFormat("yyyy-MM-dd")
                            }}</span>
                        </div>
                        <div class="left-item">
                            <span>经纬度</span>
                            <span>{{ latitude }}N&nbsp;&nbsp;{{
                                longitude
                            }}E</span>
                        </div>
                    </div>
                    <div class="station-right">
                        <span>站点状态</span>
                        <p :class="{ err: data.status != 1 }"></p>
                        <span :class="['green', { err: data.status != 1 }]">{{
                            data.status == 1 ? "正常" : "异常"
                        }}</span>
                    </div>
                </div>
                <div class="ele-list">
                    <div class="ele-title">
                        <span>监测要素</span>
                    </div>
                    <div class="monitor-ele-list">
                        <div
                            v-for="(item, index) in data.ingredientRespList"
                            :key="index"
                            class="ele-list-item"
                        >
                            <div class="item-title">
                                <img
                                    src="../../../assets/images/ele-sign.png"
                                    alt=""
                                />
                                <span class="title-sign">{{
                                    item.type | elemType
                                }}</span>
                            </div>
                            <div class="ele-list-box">
                                <div
                                    v-for="(
                                        subItem, subIndex
                                    ) in item.ingredientList"
                                    :key="subIndex"
                                    class="list-box-item"
                                >
                                    <div
                                        :class="[
                                            'list-item-title',
                                            {
                                                'list-item-isActive':
                                                    subItem.ingredientStatus ===
                                                    1,
                                            },
                                        ]"
                                    >
                                        <span
                                            :class="{
                                                'text-design':
                                                    subItem.ingredientName ===
                                                    '生物密度(网采)',
                                            }"
                                        >{{ subItem.ingredientName }}
                                            <template
                                                v-if="subItem.unit"
                                            >({{ subItem.unit }})</template>
                                            <template v-else>(-)</template>
                                        </span>
                                    </div>
                                    <div class="item-number">
                                        <span
                                            v-if="
                                                subItem.value &&
                                                    subItem.value >= 100 &&
                                                    subItem.ingredientName ===
                                                    '生物密度(网采)'
                                            "
                                            style="position: relative"
                                        >
                                            {{
                                                getThouthsNumber(
                                                    subItem.value,
                                                    1
                                                )
                                            }}&times;10
                                            <p
                                                style="
                                                    display: inline-block;
                                                    font-size: 20px;
                                                    transform: scale(0.5);
                                                "
                                            >
                                                {{
                                                    getThouthsNumber(
                                                        subItem.value,
                                                        2
                                                    )
                                                }}
                                            </p>
                                        </span>
                                        <span v-else>{{
                                            subItem.value || "---"
                                        }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div
                v-else
                :class="{
                    'result-content-empty': true,
                    'screen-empty': screenStatus,
                }"
            >
                <div v-if="rightShowStatus" class="empty-box">
                    <!-- <img src="../../../assets/images/empty_table.png" alt="" /> -->
                    <span>暂无站点详情!</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { ToDegrees } from "@/utils"
import { getDataConfigList } from "@/api/dataManage"
export default {
    name: "LeftResultObserve",
    components: {},
    props: {
        screenStatus: {
            type: Boolean,
            default: false,
        },
        menuNum: {
            type: String,
            default: "0",
        },
        data: {
            type: Object,
            default: {},
        },
        rightShowStatus: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            longitude: null,
            latitude: null,
        }
    },
    watch: {
        data: function(data) {
            if (data) {
                this.longitude = ToDegrees(data.longitude)
                this.latitude = ToDegrees(data.latitude)
            }
        },
    },
    created() {},
    methods: {
        getThouthsNumber(value, type) {
            if (value && value >= 100) {
                var p = Math.floor(Math.log(value) / Math.LN10)
                var n = (value * Math.pow(10, -p)).toFixed(2)
                if (type === 1) {
                    return n
                } else {
                    return p
                }
            } else {
                return value
            }
        },
    },
}
</script>

<style lang="scss" scoped>
@import "./index.scss";
.result-content-empty {
    color: #ccc;
    text-align: center;
    line-height: 100px;
}
</style>
