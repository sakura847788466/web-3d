<!--
 * @Descripttion: This is one of the pages for object
 * @version: 1.0
 * @Author: Ada
 * @Date: 2021-11-16 17:25:07
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-03-31 15:53:10
-->
<template>
    <div class="left-search">
        <el-tabs
            :class="[
                'left-search-tabs',
                { 'search-result-table': currentTableActive === 1 },
            ]"
            v-model="activeName"
            type="card"
            @tab-click="handleClick"
        >
            <!-- 单站点 -->
            <el-tab-pane label="单站点" name="1">
                <div
                    :class="[
                        'left-search-box',
                        { 'left-search-screenStatus': screenStatus },
                    ]"
                >
                    <div class="left-search-box-content">
                        <el-form
                            ref="form"
                            :model="singleStationForm"
                            :inline="screenStatus"
                            label-width="100px"
                        >
                            <el-form-item label="采集时间">
                                <el-date-picker
                                    class="search-time"
                                    :popper-class="
                                        beyondMap == 'left'
                                            ? 'down-left'
                                            : 'down-right'
                                    "
                                    :clearable="false"
                                    value-format="yyyy-MM-dd"
                                    v-model="singleStationForm.timeTempSection"
                                    type="daterange"
                                    align="right"
                                    unlink-panels
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    @change="timeSelect"
                                    :picker-options="pickerOptions"
                                >
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item
                                label="区域选择"
                                placeholder="请选择区域"
                            >
                                <el-select
                                    popper-class="fullScreen-option"
                                    v-model="singleStationForm.region"
                                    @change="stationSearch"
                                >
                                    <el-option
                                        label="全部"
                                        :key="0"
                                        :value="0"
                                    ></el-option>
                                    <el-option
                                        v-for="item in areaList"
                                        :label="item.label"
                                        :key="item.value"
                                        :value="item.value"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-form>
                        <div class="table-title">监测站</div>
                        <section class="ces-table-page common-table">
                            <div
                                class="table-loading"
                                v-if="singleStationForm.tableLoading"
                            >
                                <i class="el-icon-loading" />加载中...
                            </div>
                            <el-table
                                :data="singleStationForm.list"
                                border
                                @row-click="rowClick"
                                ref="singleStationTable"
                                :highlight-current-row="true"
                                class="table-config"
                                style="width: 100%; max-height: 500px"
                            >
                                <el-table-column
                                    prop="stationName"
                                    label="站点名称"
                                >
                                </el-table-column>
                                <el-table-column
                                    prop="areaName"
                                    label="所属区域"
                                >
                                </el-table-column>
                            </el-table>
                        </section>
                        <div
                            class="pageshow"
                            v-if="singleStationForm.pages.total > 1"
                        >
                            <el-pagination
                                layout="prev, pager, next"
                                @current-change="handleCurrentChange"
                                :current-page.sync="
                                    singleStationForm.pages.current
                                "
                                :page-size="singleStationForm.pages.size"
                                :total="singleStationForm.pages.total"
                            >
                            </el-pagination>
                        </div>
                    </div>
                </div>
            </el-tab-pane>

            <!-- 区域 -->
            <el-tab-pane label="区域" name="2">
                <div
                    :class="[
                        'left-search-box',
                        { 'left-search-region': screenStatus },
                    ]"
                >
                    <div class="left-search-box-content">
                        <el-form
                            ref="regionForm"
                            :rules="rules"
                            :hide-required-asterisk="true"
                            :model="orgionStationForm"
                            :inline="screenStatus"
                            label-width="100px"
                        >
                            <el-form-item
                                class="form-type"
                                label="监测方式筛选"
                            >
                                <el-radio-group
                                    class="type-radio"
                                    v-model="orgionStationForm.type"
                                    @change="typeChange"
                                >
                                    <el-radio :label="'1'">常规监测</el-radio>
                                    <el-radio :label="'2'">应急监测</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item
                                label="采集时间"
                                prop="timeTempSection"
                            >
                                <el-date-picker
                                    :type="orgionStationForm.timeType"
                                    class="search-time"
                                    :popper-class="
                                        beyondMap == 'left'
                                            ? 'down-left'
                                            : 'down-right'
                                    "
                                    :value-format="orgionStationForm.timeFormat"
                                    @change="timeSelect"
                                    v-model="orgionStationForm.timeTempSection"
                                    align="right"
                                    unlink-panels
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    :picker-options="
                                        orgionStationForm.pickerOptions
                                    "
                                >
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="区域选择" prop="region">
                                <el-select
                                    popper-class="fullScreen-option"
                                    v-model="orgionStationForm.region"
                                    placeholder="请选择区域"
                                    @change="regionSelect"
                                >
                                    <el-option
                                        label="全部"
                                        :key="0"
                                        :value="0"
                                    ></el-option>
                                    <el-option
                                        v-for="item in areaList"
                                        :label="item.label"
                                        :key="item.value"
                                        :value="item.value"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item class="search-bottom">
                                <el-button
                                    class="search-reset"
                                    round
                                    @click="reset()"
                                    >重置</el-button
                                >
                                <el-button
                                    class="search-submit"
                                    type="primary"
                                    round
                                    @click="regionSearch()"
                                    >检索</el-button
                                >
                            </el-form-item>
                        </el-form>
                        <template
                            v-if="orgionStationForm.areaReportList.length > 0"
                        >
                            <div class="table-title" style="font-weight: bold">
                                检索结果
                            </div>
                            <div class="table-title region-status">
                                <el-row :gutter="24">
                                    <el-col
                                        :span="14"
                                        class="table-title-radio"
                                    >
                                        区域状态
                                        <el-radio
                                            v-if="
                                                orgionStationForm.status === 1
                                            "
                                            :checked="true"
                                            >正常</el-radio
                                        >
                                        <el-radio
                                            v-else
                                            class="station-error"
                                            :checked="true"
                                            >异常</el-radio
                                        >
                                    </el-col>
                                    <el-col :span="10" class="table-title-text">
                                        <a @click="openMonitorPdf">
                                            <i class="el-icon-bg"></i
                                            >{{
                                                orgionStationForm.type == 1
                                                    ? "常规监测"
                                                    : "应急监测"
                                            }}报告
                                        </a>
                                    </el-col>
                                </el-row>
                            </div>
                            <section class="region-table">
                                <div class="region-table-header">
                                    <el-row>
                                        <el-col :span="9"> 数据时间 </el-col>
                                        <el-col :span="15" class="header-right">
                                            影像图
                                            <el-checkbox
                                                class="header-right-form"
                                                v-model="showStation"
                                                @change="drawStation()"
                                                >显示站点</el-checkbox
                                            >
                                        </el-col>
                                    </el-row>
                                </div>
                                <div class="region-table-content">
                                    <el-row>
                                        <el-col
                                            class="region-table-content-radio"
                                            :span="9"
                                        >
                                            <el-radio-group
                                                class="type-radio"
                                                v-model="
                                                    orgionStationForm.reportType
                                                "
                                            >
                                                <el-radio
                                                    :class="{
                                                        'station-error':
                                                            item.status == 2,
                                                    }"
                                                    v-for="(
                                                        item, index
                                                    ) in orgionStationForm.areaReportList"
                                                    :label="item.id"
                                                    :key="index"
                                                    @change="
                                                        getReportPicture(item)
                                                    "
                                                    >{{
                                                        item.collectTime
                                                    }}</el-radio
                                                >
                                            </el-radio-group>
                                        </el-col>
                                        <el-col
                                            :span="15"
                                            class="region-table-content-file"
                                        >
                                            <div
                                                class="table-loading"
                                                v-if="
                                                    orgionStationForm.tableLoading
                                                "
                                            >
                                                <i
                                                    class="el-icon-loading"
                                                />加载中...
                                            </div>
                                            <div
                                                v-if="
                                                    orgionStationForm
                                                        .reportPictureList
                                                        .length > 0
                                                "
                                                class="
                                                    region-table-content-file-box
                                                "
                                            >
                                                <template
                                                    v-for="(
                                                        item, index
                                                    ) in orgionStationForm.reportPictureList"
                                                >
                                                    <div
                                                        :class="{
                                                            acitive:
                                                                activeIndex ==
                                                                index,
                                                        }"
                                                        :key="index"
                                                        @click="
                                                            addLayerActive(
                                                                item,
                                                                index
                                                            )
                                                        "
                                                    >
                                                        {{ item.picName }}
                                                    </div>
                                                </template>
                                            </div>
                                            <div
                                                v-if="
                                                    orgionStationForm
                                                        .reportPictureList
                                                        .length == 0 &&
                                                    !orgionStationForm.tableLoading
                                                "
                                                class="
                                                    region-table-content-file-empty
                                                "
                                            >
                                                暂无数据
                                            </div>
                                        </el-col>
                                    </el-row>
                                </div>
                            </section>
                        </template>
                        <!-- <template v-else>
                <div class="table-title">检索结果</div>
                <div class="table-title region-status">
                  暂无数据
                </div>
           </template> -->
                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import { stationList, areaReport, reportPicture, reportStation } from "@/api"
import TimeRange from "@/components/TimeRange"
import {
    addStation,
    removeEntitiesByName,
    stationActive,
    addPolygons,
    addRect,
    getRect,
} from "@/utils/map"
import { dateFormat } from "@/filters"
import { mapGetters } from "vuex"
import searchMinxin from "@/views/minxin/searchMinxin"
import {
    Rectangle,
    SingleTileImageryProvider,
    ScreenSpaceEventHandler,
    ScreenSpaceEventType,
    Math,
} from "cesium/Cesium"
export default {
    name: "LeftSearchObserve",
    mixins: [searchMinxin],
    props: {
        screenStatus: {
            type: Boolean,
            default: false,
        },
        menuNum: {
            //专题类型【1：褐潮监测；2：赤潮监测；3：水母监测；4：海冰监测】	需要+1
            type: String,
            default: "0",
        },
        beyondMap: {
            type: String,
            default: "left",
        },
    },
    components: {
        TimeRange,
    },
    data() {
        return {
            // 单站点表单
            singleStationForm: {
                startDate: "",
                endDate: "",
                region: 0, //选择的区域
                regionMapName: "左区域",
                tableLoading: false, //表格loading
                list: [],
                timeTempSection: [], //默认时间
                pages: {
                    current: 1,
                    size: 10,
                    total: 0,
                },
            },
            stationName: "左站点",
            activeName: "1", //显示单站点
            currentTableActive: 0, //当前tabs选中
            //====== 区域表单=============//
            orgionStationForm: {
                startDate: "",
                endDate: "",
                type: "1", //监测类型
                status: 1, // 站点是否正常
                region: 0, //选择区域
                tableLoading: false,
                timeFormat: "yyyy-MM",
                timeType: "monthrange",
                areaReportList: [],
                reportPictureList: [],
                reportType: 1, //报告类型
                monitorReportUrl: "", //pdf报告
                timeTempSection: [], //默认时间
                imgPro: null, //贴图
                pickerOptions: {
                    shortcuts: [
                        {
                            text: "最近一个月",
                            onClick(picker) {
                                const end = new Date()
                                const start = new Date()
                                start.setTime(
                                    start.getTime() - 3600 * 1000 * 24 * 30
                                )
                                picker.$emit("pick", [start, end])
                            },
                        },
                        {
                            text: "最近三个月",
                            onClick(picker) {
                                const end = new Date()
                                const start = new Date()
                                start.setTime(
                                    start.getTime() - 3600 * 1000 * 24 * 90
                                )
                                picker.$emit("pick", [start, end])
                            },
                        },
                        {
                            text: "最近一年",
                            onClick(picker) {
                                const end = new Date()
                                const start = new Date()
                                start.setTime(
                                    start.getTime() - 3600 * 1000 * 24 * 365
                                )
                                picker.$emit("pick", [start, end])
                            },
                        },
                        {
                            onPick: (obj) => {
                                this.minDate = obj.minDate // 选中的时间较小的一个
                                this.maxDate = obj.maxDate // 选中的时间较大的一个
                                // if (obj.maxDate) {
                                //   _this.$emit('endCallBack', obj, _this.timeId)
                                // }
                            },
                            disabledDate: (time) => {
                                // 设置禁用状态，参数为当前日期，要求返回 Boolean 返回为true禁用
                                const nowDate = new Date().getTime()
                                // 能查看几年前的时间 单位是年 （当前是10年）
                                const maxTimeYear = 365 * 5 * 24 * 3600 * 1000
                                // 最小时间的时间戳
                                const minTime = nowDate - maxTimeYear
                                // 时间跨度 当前是6个月
                                //   const month = 7 * 24 * 3600 * 1000
                                // 当前的23点59分59秒
                                const nowLast = new Date(
                                    new Date(new Date().getTime()).setHours(
                                        23,
                                        59,
                                        59,
                                        999
                                    )
                                ).getTime()
                                if (this.minDate) {
                                    return (
                                        time.getTime() > nowLast ||
                                        time.getTime() < minTime
                                        //   ||
                                        //   time > new Date(this.minDate.getTime() + month) ||
                                        //   time < new Date(this.minDate.getTime() - month)
                                    )
                                }
                                return (
                                    time.getTime() > Date.now() ||
                                    time.getTime() < minTime
                                )
                            },
                        },
                    ],
                },
            },
            rules: {
                region: [
                    { required: true, message: "请选择区域", trigger: "blur" },
                ],
                timeTempSection: [
                    {
                        required: true,
                        message: "请选择开始和结束时间",
                        trigger: "change",
                    },
                ],
            },
            tableData: [
                {
                    satellite: "ZY1-02D",
                    resen: "OLI_TIRS",
                    level: "L2A",
                    time: "2021-10-10",
                },
            ],
            // 全选
            activeIndex: null, // 影象表格激活
            showStation: false,
            startDate: "",
            endDate: "",
        }
    },
    computed: {
        ...mapGetters(["areaList"]),
    },
    watch: {
        menuNum: {
            handler(val, old) {
                if (this.activeName == 1) {
                    //单站点
                    this.initStation()
                } else {
                    this.reset()
                    this.initRegion()
                    this.orgionStationForm.region = 0
                }
            },
        },
    },
    created() {
        this.singleStationForm.timeTempSection[0] = dateFormat(
            new Date().getTime(),
            "yyyy-MM-dd"
        )
        this.singleStationForm.timeTempSection[1] = dateFormat(
            new Date().getTime() + 30 * 24 * 60 * 60 * 1000,
            "yyyy-MM-dd"
        )
        this.initRegion()
    },
    mounted() {
        this.$nextTick(function () {
            this.initStation()
        })
    },
    methods: {
        // 初始化单站点
        initStation() {
            if (this.beyondMap == "right" && this.screenStatus) {
                this.stationName = "右站点"
                this.singleStationForm.regionMapName = "左区域"
            } else {
                this.stationName = "左站点"
                this.singleStationForm.regionMapName = "右区域"
            }
            this.singleStationForm.startDate =
                this.singleStationForm.timeTempSection[0]
            this.singleStationForm.endDate =
                this.singleStationForm.timeTempSection[1]
            this.stationSearch()
        },
        // 切换单站点和区域
        handleClick(e) {
            this.currentTableActive = Number(e.index)
            this.clearStation()
            if (this.currentTableActive == 1) {
                this.$emit("showResultCallback", false, this.beyondMap, true)
            } else {
                this.$emit("showResultCallback", true, this.beyondMap, true)
            }
        },
        // select 画区域
        drawRegionMap() {
            const _this = this
            let paramsArr = []
            this.clearRegionMap()
            this.clearStationRegion()
            this.$emit("showResultCallback", true, this.beyondMap, true)
            if (
                (this.currentTableActive == 0 &&
                    this.singleStationForm.region == 0) ||
                (this.currentTableActive == 1 &&
                    this.orgionStationForm.region == 0)
            ) {
                //单站点
                this.areaList.forEach((item) => {
                    const { xmin, ymin, xmax, ymax } = getRect([
                        [item.topLeftLongitude, item.topLeftLatitude, 0],
                        [
                            item.bottomRightLongitude,
                            item.bottomRightLatitude,
                            0,
                        ],
                    ])
                    paramsArr.push({
                        id: "stationRegion" + item.value,
                        positionData: {
                            xmin,
                            ymin,
                            xmax,
                            ymax,
                        },
                        name: item.label,
                    })
                })
            } else {
                if (this.currentTableActive == 0) {
                    this.areaList.forEach((item) => {
                        if (item.value == _this.singleStationForm.region) {
                            const { xmin, ymin, xmax, ymax } = getRect([
                                [
                                    item.topLeftLongitude,
                                    item.topLeftLatitude,
                                    0,
                                ],
                                [
                                    item.bottomRightLongitude,
                                    item.bottomRightLatitude,
                                    0,
                                ],
                            ])
                            paramsArr = [
                                {
                                    id:
                                        "stationRegion" +
                                        _this.singleStationForm.region,
                                    positionData: {
                                        xmin,
                                        ymin,
                                        xmax,
                                        ymax,
                                    },
                                    name: item.label,
                                },
                            ]
                        }
                    })
                } else {
                    this.areaList.forEach((item) => {
                        if (item.value == _this.orgionStationForm.region) {
                            const { xmin, ymin, xmax, ymax } = getRect([
                                [
                                    item.topLeftLongitude,
                                    item.topLeftLatitude,
                                    0,
                                ],
                                [
                                    item.bottomRightLongitude,
                                    item.bottomRightLatitude,
                                    0,
                                ],
                            ])
                            paramsArr = [
                                {
                                    id:
                                        "stationRegion" +
                                        _this.orgionStationForm.region,
                                    positionData: {
                                        xmin,
                                        ymin,
                                        xmax,
                                        ymax,
                                    },
                                    name: item.label,
                                },
                            ]
                        }
                    })
                }
            }
            if (this.beyondMap == "right" && this.screenStatus) {
                addRect(
                    window.cesiumViewerR,
                    this.singleStationForm.regionMapName,
                    paramsArr
                )
            } else {
                addRect(
                    window.cesiumViewerL,
                    this.singleStationForm.regionMapName,
                    paramsArr
                )
            }
        },
        //单站点查询
        stationSearch() {
            const _this = this
            console.log(this.menuNum)
            this.singleStationForm.tableLoading = true
            let timer = setTimeout(() => {
                _this.drawRegionMap()
                clearTimeout(timer)
            }, 500)
            let params = {
                current: this.singleStationForm.pages.current,
                size: this.singleStationForm.pages.size,
                specialTopicId: Number(this.menuNum) + 1,
                startTime: this.singleStationForm.startDate,
                endTime: this.singleStationForm.endDate,
                areaId:
                    this.singleStationForm.region == 0
                        ? ""
                        : String(this.singleStationForm.region),
            }
            stationList(params)
                .then(
                    ({
                        data: {
                            total = 0,
                            size = 10,
                            current = 1,
                            records = [],
                        },
                    }) => {
                        _this.singleStationForm.pages.total = total
                        _this.singleStationForm.pages.size = size
                        _this.singleStationForm.pages.current = current
                        _this.singleStationForm.list = records
                        _this.singleStationForm.tableLoading = false
                        let timer = setTimeout(() => {
                            _this.drawSingleStation()
                            clearTimeout(timer)
                        }, 500)
                    }
                )
                .catch((err) => {
                    _this.singleStationForm.tableLoading = false
                })
        },
        // 分页
        handleCurrentChange(val) {
            this.singleStationForm.pages.current = val
            this.stationSearch()
        },
        // 画单站点
        drawSingleStation() {
            const _this = this
            _this.clearStation()
            if (_this.singleStationForm.list.length > 0) {
                if (
                    _this.beyondMap == "right" &&
                    _this.screenStatus &&
                    window.cesiumViewerR
                ) {
                    addStation(
                        window.cesiumViewerR,
                        _this.singleStationForm.list,
                        _this.stationName
                    )
                    window.handlerStationR = new ScreenSpaceEventHandler(
                        window.cesiumViewerR.scene.canvas
                    )
                    window.handlerStationR.setInputAction(function (click) {
                        var pick = window.cesiumViewerR.scene.pick(
                            click.position
                        )
                        if (pick && pick.id && pick.id._id) {
                            _this.singleStationForm.list.forEach((item) => {
                                if (item.id == pick.id._id) {
                                    _this.rowClick({ id: pick.id._id })
                                    _this.$refs.singleStationTable.setCurrentRow(
                                        item
                                    )
                                }
                            })
                        }
                    }, ScreenSpaceEventType.LEFT_CLICK)
                } else {
                    addStation(
                        window.cesiumViewerL,
                        _this.singleStationForm.list,
                        _this.stationName
                    )
                    window.handlerStationl = new ScreenSpaceEventHandler(
                        window.cesiumViewerL.scene.canvas
                    )
                    window.handlerStationl.setInputAction(function (click) {
                        var pick = window.cesiumViewerL.scene.pick(
                            click.position
                        )
                        console.log(pick)
                        if (pick && pick.id && pick.id._id) {
                            _this.singleStationForm.list.forEach((item) => {
                                if (item.id == pick.id._id) {
                                    _this.rowClick({ id: pick.id._id })
                                    _this.$refs.singleStationTable.setCurrentRow(
                                        item
                                    )
                                }
                            })
                        }
                    }, ScreenSpaceEventType.LEFT_CLICK)
                }
            }
        },
        // 清除地图上的单站点信息
        clearStation() {
            const _this = this
            if (_this.beyondMap == "right" && _this.screenStatus) {
                window.cesiumViewerR
                    ? removeEntitiesByName(
                          window.cesiumViewerR,
                          this.stationName
                      )
                    : ""
                if (window.handlerStationR)
                    window.handlerStationR.removeInputAction(
                        ScreenSpaceEventType.LEFT_CLICK
                    )
                window.handlerStationR = null
            } else {
                window.cesiumViewerL
                    ? removeEntitiesByName(
                          window.cesiumViewerL,
                          this.stationName
                      )
                    : ""
                if (window.handlerStationL)
                    window.handlerStationL.removeInputAction(
                        ScreenSpaceEventType.LEFT_CLICK
                    )
                window.handlerStationL = null
            }
        },
        // 点击单站点表格行
        rowClick(row) {
            const _this = this
            if (_this.beyondMap == "right" && _this.screenStatus) {
                stationActive(window.cesiumViewerR, this.stationName, row)
            } else {
                stationActive(window.cesiumViewerL, this.stationName, row)
            }
            this.$emit(
                "showResRightCallback",
                row,
                "singleStation",
                this.beyondMap
            ) // 表格行数据，区分单站点和区域，区分左右屏幕结果
        },
        // 时间选择
        timeSelect(arr) {
            if (this.activeName === "1") {
                //单站点
                this.singleStationForm.startDate = arr[0]
                this.singleStationForm.endDate = arr[1]
                this.singleStationForm.region = ""
                this.singleStationForm.list = []
                this.singleStationForm.pages = {
                    current: 1,
                    size: 10,
                    total: 0,
                }
                this.$emit("showResultCallback", true, this.beyondMap, true)
            } else {
                //区域
                this.orgionStationForm.startDate = arr[0]
                this.orgionStationForm.endDate = arr[1]
                this.orgionStationForm.region = ""
                this.orgionStationForm.list = []
                this.orgionStationForm.pages = {
                    current: 1,
                    size: 10,
                    total: 0,
                }
            }
            this.clearRegionMap()
            this.clearStationRegion()
        },
        // ======================区域=======================================================//
        // 初始化区域
        initRegion() {
            this.orgionStationForm.timeTempSection[0] = dateFormat(
                new Date().getTime(),
                this.orgionStationForm.timeFormat
            )
            this.orgionStationForm.timeTempSection[1] = dateFormat(
                new Date().getTime() + 30 * 24 * 60 * 60 * 1000,
                this.orgionStationForm.timeFormat
            )
            this.orgionStationForm.timeType = "monthrange"
            this.orgionStationForm.startDate =
                this.orgionStationForm.timeTempSection[0]
            this.orgionStationForm.endDate =
                this.orgionStationForm.timeTempSection[1]
        },
        // 应急和常规切换
        typeChange(val) {
            this.reset()

            if (val == 1) {
                this.initRegion()
            } else {
                this.orgionStationForm.timeFormat = "yyyy-MM-dd"
                this.orgionStationForm.timeType = "daterange"
                this.orgionStationForm.timeTempSection[0] = dateFormat(
                    new Date().getTime(),
                    this.orgionStationForm.timeFormat
                )
                this.orgionStationForm.timeTempSection[1] = dateFormat(
                    new Date().getTime() + 30 * 24 * 60 * 60 * 1000,
                    this.orgionStationForm.timeFormat
                )
            }
            this.orgionStationForm.type = val
            this.orgionStationForm.startDate =
                this.orgionStationForm.timeTempSection[0]
            this.orgionStationForm.endDate =
                this.orgionStationForm.timeTempSection[1]
            this.clearRegionMap()
            this.clearStationRegion()
        },
        // select 画区域
        regionSelect() {
            this.orgionStationForm.reportPictureList = []
            this.orgionStationForm.areaReportList = []
            this.clearRegionMap()
            this.drawRegionMap()
        },
        reset() {
            this.orgionStationForm.region = ""
            this.orgionStationForm.type = "1"
            this.orgionStationForm.timeTempSection = []
            this.orgionStationForm.reportPictureList = []
            this.orgionStationForm.areaReportList = []
            this.clearRegionMap()
        },
        // 区域查询
        async regionSearch() {
            const _this = this
            this.$refs.regionForm.validate((valid) => {
                console.log(valid)
                if (!valid) {
                    return false
                }
                this.clearRegionMap()
                let params = {
                    specialTopicId: Number(this.menuNum) + 1,
                    startTime: this.orgionStationForm.startDate,
                    monitorType: this.orgionStationForm.type,
                    endTime: this.orgionStationForm.endDate,
                    areaId:
                        this.orgionStationForm.region == 0
                            ? ""
                            : String(this.orgionStationForm.region),
                }
                areaReport(params).then(({ data }) => {
                    _this.orgionStationForm.areaReportList = data
                    if (_this.orgionStationForm.areaReportList.length > 0) {
                        _this.getReportPicture(
                            _this.orgionStationForm.areaReportList[0]
                        )
                    } else {
                        _this.$notify({
                            title: "温馨提示",
                            message: "暂无数据",
                            iconClass: "errorIcon",
                            duration: 2000,
                        })
                    }
                })
            })
        },
        // 获取影像图
        getReportPicture(item) {
            const _this = this
            this.clearRegionMap()
            this.orgionStationForm.reportType = item.id
            this.orgionStationForm.status = item.status
            this.orgionStationForm.monitorReportUrl = item.monitorReportUrl
            this.orgionStationForm.tableLoading = true
            this.orgionStationForm.reportPictureList = []
            reportPicture({ id: this.orgionStationForm.reportType })
                .then(({ data }) => {
                    _this.orgionStationForm.tableLoading = false
                    _this.orgionStationForm.reportPictureList = data
                })
                .catch((err) => {
                    _this.orgionStationForm.tableLoading = false
                })
        },
        // 打开pdf查看报告
        openMonitorPdf() {
            if (this.orgionStationForm.monitorReportUrl) {
                if (this.beyondMap == "right" && this.screenStatus) {
                    this.$parent.openMonitorPdfR(
                        this.orgionStationForm.monitorReportUrl,
                        this.orgionStationForm.type
                    )
                } else {
                    this.$parent.openMonitorPdfL(
                        this.orgionStationForm.monitorReportUrl,
                        this.orgionStationForm.type
                    )
                }
            }
        },
        // 区域显示站点
        drawStation() {
            const _this = this
            if (this.showStation) {
                reportStation({ id: this.orgionStationForm.reportType }).then(
                    (res) => {
                        if (res.length == 0) {
                            return
                        }
                        if (_this.beyondMap == "right" && _this.screenStatus) {
                            addStation(
                                window.cesiumViewerR,
                                res,
                                _this.stationName
                            )
                        } else {
                            addStation(
                                window.cesiumViewerL,
                                res,
                                _this.stationName
                            )
                        }
                    }
                )
            } else {
                this.addStationClear()
            }
        },
        clearRegionMap() {
            const _this = this
            this.showStation = false
            this.activeIndex = null
            this.addLayerClear()
            this.addStationClear()
            // this.clearStationRegion()
            if (this.beyondMap == "right" && this.screenStatus) {
                this.$parent.closePdfDialog("R")
            } else {
                this.$parent.closePdfDialog("L")
            }
        },
        // 清除gis绘制的图片
        addLayerClear() {
            if (this.beyondMap == "right" && this.screenStatus) {
                this.orgionStationForm.imgPro
                    ? window.cesiumViewerR.imageryLayers.remove(
                          this.orgionStationForm.imgPro
                      )
                    : ""
                this.orgionStationForm.imgPro = null
            } else {
                this.orgionStationForm.imgPro
                    ? window.cesiumViewerL.imageryLayers.remove(
                          this.orgionStationForm.imgPro
                      )
                    : ""
                this.orgionStationForm.imgPro = null
            }
        },
        // 清除gis绘制的站点
        addStationClear() {
            if (this.beyondMap == "right" && this.screenStatus) {
                window.cesiumViewerR
                    ? removeEntitiesByName(
                          window.cesiumViewerR,
                          this.stationName
                      )
                    : ""
            } else {
                window.cesiumViewerL
                    ? removeEntitiesByName(
                          window.cesiumViewerL,
                          this.stationName
                      )
                    : ""
            }
        },
        // 清除gis绘制的站点区域select
        clearStationRegion() {
            if (this.beyondMap == "right" && this.screenStatus) {
                window.cesiumViewerR
                    ? removeEntitiesByName(
                          window.cesiumViewerR,
                          this.singleStationForm.regionMapName
                      )
                    : ""
            } else {
                window.cesiumViewerL
                    ? removeEntitiesByName(
                          window.cesiumViewerL,
                          this.singleStationForm.regionMapName
                      )
                    : ""
            }
        },
        // gis绘制图片
        addLayerActive(item, index) {
            this.activeIndex = index
            // item.topLeftLongitude = 117.577415
            // item.topLeftLatitude = 37.08093
            // item.bottomRightLongitude = 122.45
            // item.bottomRightLatitude = 41.053154
            this.addLayerClear()
            let picUrlImageryProvider = new SingleTileImageryProvider({
                url: item.picUrl,
                rectangle: new Rectangle(
                    Math.toRadians(item.topLeftLongitude),
                    Math.toRadians(item.topLeftLatitude),
                    Math.toRadians(item.bottomRightLongitude),
                    Math.toRadians(item.bottomRightLatitude)
                ),
            })
            if (this.beyondMap == "right" && this.screenStatus) {
                this.orgionStationForm.imgPro =
                    window.cesiumViewerR.imageryLayers.addImageryProvider(
                        picUrlImageryProvider
                    )
            } else {
                this.orgionStationForm.imgPro =
                    window.cesiumViewerL.imageryLayers.addImageryProvider(
                        picUrlImageryProvider
                    )
            }
        },
    },
    destroyed() {
        this.clearStation()
    },
}
</script>
<style lang="scss" scoped>
@import "@/styles/mixin.scss";
@import "@/styles/splitSceen.scss";
@import "./index.scss";
</style>
