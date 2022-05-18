<!--
 * @Descripttion: 系统主页
 * @version: 1.0
 * @Author: Ada
 * @Date: 2021-11-01 10:05:04
 * @LastEditors: ada 847788466@qq.com
 * @LastEditTime: 2022-05-13 13:37:01
-->
<template>
  <div class="login-container">
    <div id="map-container">
      <dawn-map
        :map-options="mapOptions"
        :provider="['TiandituMap.Satellite.Map', 'TiandituMap.Normal.Annotion']"
      ></dawn-map>
      <!-- 左侧面板 -->
      <div v-if="pannelStatus" class="left-pannel-box">
        <div class="pannel-title">
          <img src="../../assets/images/arrow-right.png" alt />
          <span>{{ currentSiteName }}</span>
          <img src="../../assets/images/arrow-left.png" alt />
        </div>
        <div class="time-sign">
          {{ currentUpdateTime }}
        </div>
        <div class="pannel-list">
          <div
            v-for="(item, index) in pannelList"
            :key="index"
            :class="{
              'pannel-list-item': true,
              isActivePannel: index === currentDataType
            }"
            @click="changeTabs(index)"
          >
            {{ item.text }}
          </div>
        </div>
        <div class="card-sign">
          <img src="../../assets/images/pennel-sign.png" alt />
        </div>
        <div v-if="currentDataType === 0" class="ele-box newData">
          <card-box title="水文数据" :card-params="waterParams" />
          <card-box title="气象数据" :card-params="weatherData" />
          <card-box title="设备数据" :card-params="equipmentData" />
        </div>
        <div v-if="currentDataType === 1" class="ele-box">
          <div class="time-select-history">
            <span>时间范围</span>
            <el-select v-model="selectTime" placeholder="请选择" @change="selectTimeEchart">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <div class="ecahrt-collapse">
            <el-collapse v-model="activeNames">
              <el-collapse-item name="水文数据">
                <template slot="title">
                  <img src="../../assets/images/arrow-right.png" alt />水文数据
                </template>
                <div class="echart-list">
                  <div
                    v-for="(item, index) in echartLineElement.waterElement"
                    :id="`${item}Echart`"
                    :key="index"
                    class="echart-item"
                  ></div>
                </div>
              </el-collapse-item>
              <el-collapse-item name="气象数据">
                <template slot="title">
                  <img src="../../assets/images/arrow-right.png" alt />气象数据
                </template>
                <div class="echart-list">
                  <div
                    v-for="(item, index) in echartLineElement.atmosphereElement"
                    :id="`${item}Echart`"
                    :key="index"
                    class="echart-item"
                  ></div>
                </div>
              </el-collapse-item>
              <el-collapse-item v-if="echartLineElement.statusElement.length > 0" name="设备状态">
                <template slot="title">
                  <img src="../../assets/images/arrow-right.png" alt />设备状态
                </template>
                <div class="echart-list">
                  <div
                    v-for="(item, index) in echartLineElement.statusElement"
                    :id="`${item}Echart`"
                    :key="index"
                    class="echart-item"
                  ></div>
                </div>
              </el-collapse-item>
            </el-collapse>
          </div>
        </div>
      </div>
      <!-- 左侧面板 -->

      <!-- 右侧面板 -->
      <div v-if="pannelStatus" class="right-pannel-box">
        <div class="right-pannel-box-top">
          <ErrorSiteBox
            ref="errorSite"
            type="site"
            title="站点列表"
            :error-params="[]"
            @moveToPopup="moveToPopup"
            @getCurrentSiteInfo="getCurrentSiteInfo"
          />
        </div>
        <div class="right-pannel-box-bottom">
          <ErrorSiteBox
            type="error"
            title="告警信息"
            :is-no-more-warn="isNoMoreWarn"
            :error-params="errorHistoryList"
            @checkMoreWarnMessage="checkMoreWarnMessage"
          />
        </div>
      </div>
      <!-- 右侧面板 -->
      <!-- bottom-nav -->
      <div class="nav-list">
        <div
          v-for="(item, index) in navList"
          :key="index"
          :class="{
            'nav-list-item': true,
            isActive: index === cardCurrentIndex
          }"
          @click="changeCardType(item, index)"
        >
          {{ item.text }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createOverlayComponent } from '@wushi/map-utils'
import CardBox from '../../components/card-box/index'
import ErrorSiteBox from '../../components/error-card/index'
// import MyEchart from "../../components/myEchart/index"
import { getBeforeDate } from '../../utils/date'
import { echartLineNameList, echartLineElementType } from '../../utils/dataOption'
import echarts from 'echarts'

import {
  getAreaList,
  getSiteListByAreaId,
  getNearEleInfo,
  getHistoryInfoList,
  getHistoryEchart
} from '../../api/index'
import PopupPanel from '../components/PopupPanel/index.vue'
import {
  renderWindOneEchart,
  renderWindTwoEchart,
  renderLineEchart,
  renderWavePeriodEchart,
  renderWaveHeightEchart,
  renderOverToppingEchart,
  renderTempHumidity
} from '../../utils/echarts'
// import { delete } from 'vue/types/umd'
export default {
  name: 'Login',
  components: { CardBox, ErrorSiteBox },
  data() {
    return {
      activeNames: ['水文数据', '气象数据', '设备状态'],
      currentPart: null, //当前操作对象
      cardCurrentIndex: null,
      pannelStatus: false,
      currentDataType: 0, //old history report
      isActiveTabs: 0, //tabs默认值
      selectTime: '24',
      waterParams: [],
      weatherData: [],
      equipmentData: [],
      siteHistoryList: [], //站点列表
      errorHistoryList: [], //历史告警列表
      currentSelectTime: {},
      echartLineData: {},
      currentSiteName: '',
      currentUpdateTime: '',
      waterData: [],
      warnCurrentPage: 1,
      pageSize: 10,
      isNoMoreWarn: false,
      options: [
        {
          value: '24',
          label: '过去24小时'
        },
        {
          value: '48',
          label: '过去48小时'
        },
        {
          value: '72',
          label: '过去72小时'
        }
      ],
      navList: [],
      pannelList: [
        {
          text: '最新数据',
          value: 0
        },
        {
          text: '历史数据',
          value: 1
        },
        {
          text: '预报水位',
          value: 2
        }
      ],
      echartLineElement: {
        waterElement: [],
        atmosphereElement: [],
        statusElement: []
      },
      zhongShanSite: [],
      zhuHaiSite: [],
      nanShaSite: [],
      jiangMenSite: [],
      AllEchartName: [],
      monitorData: {}, //左侧面板数据
      stationTypeId: '',
      stationId: '',
      currentStationId: ''
    }
  },
  computed: {
    mapOptions() {
      return {
        zoom: 2,
        maxZoom: 17.5
      }
    }
  },
  async mounted() {
    getAreaList().then(res => {
      res.data.forEach((item, index) => {
        let navItem = {
          text: item.name,
          id: item.id,
          lng: item.longitude,
          lat: item.latitude
        }
        this.navList.push(navItem)
      })
    })
    this.apiData = (await getSiteListByAreaId({})).data
    this.changeSiteType(this.apiData)
    this.$map.sunLight = true
    this.$map.skyAtmosphere = true
    this.$map.scene.screenSpaceCameraController.tiltEventTypes = [
      Cesium.CameraEventType.MIDDLE_DRAG,
      Cesium.CameraEventType.PINCH,
      Cesium.CameraEventType.RIGHT_DRAG,
      {
        eventType: Cesium.CameraEventType.LEFT_DRAG,
        modifier: Cesium.KeyboardEventModifier.CTRL
      }
    ]
    this.$map.scene.screenSpaceCameraController.zoomEventTypes = [
      Cesium.CameraEventType.WHEEL,
      Cesium.CameraEventType.PINCH
    ]
    this.$map.layer.get('terrain-layer').addTerrain()

    setTimeout(async () => {
      this.$map.setPosition([21.847833, 112.672156], {
        zoom: 10,
        heading: 37.821137,
        pitch: -25,
        roll: 0,
        duration: 3000,
        animate: true,
        offset: [1000, -2200]
      })
      const apiData = (await getSiteListByAreaId({})).data
      this.drawIdentify(apiData)
    }, 3000)
  },
  methods: {
    async changeCardType(obj, index) {
      this.$map.setPosition(obj, {
        zoom: 16,
        onlyPanTo: true,
        heading: 37.821137,
        pitch: -25,
        offset: [2500, -2200],
        animate: false
      })
      this.cardCurrentIndex = index
      // 查找对应区域站点
      await getSiteListByAreaId({ areaId: obj.id }).then(res => {
        // TODO //存储vuex
        this.$store.dispatch('saveSiteList', res.data)
        const areasbyId = res.data
        areasbyId.forEach(item => {
          if (item.typeId === '6') {
            this.moveToPopup([item.latitude, item.longitude], item.stationId)
          }
        })
        // 默认显示监测站数据
        let currentSite = res.data.filter(item => item.typeId === '6')
        this.stationId = currentSite[0].stationId
        this.stationTypeId = currentSite[0].typeId
        this.getCurrentSiteInfo(this.stationId, this.stationTypeId)
      })
    },
    // 更新 站点
    updateSiteList(id) {
      getSiteListByAreaId({ areaId: id }).then(res => {
        if (res.code == 200) {
          this.$store.dispatch('saveSiteList', res.data)
        }
      })
    },
    // 站点分类
    changeSiteType(arr) {
      let areaList = ['中山', '珠海', '南沙', '江门']
      this.zhongShanSite = arr.filter(item => item.name.includes('中山'))
      this.zhuHaiSite = arr.filter(item => item.name.includes('珠海'))
      this.nanShaSite = arr.filter(item => item.name.includes('南沙'))
      this.jiangMenSite = arr.filter(item => item.name.includes('江门'))
    },
    // 查找站点所属区域高亮区域
    findSIteInArea(name) {
      if (name.includes('中山') && this.zhongShanSite.findIndex(item => item.name === name)) {
        this.cardCurrentIndex = 0
      }
      if (name.includes('珠海') && this.zhuHaiSite.findIndex(item => item.name === name)) {
        this.cardCurrentIndex = 1
      }
      if (name.includes('南沙') && this.nanShaSite.findIndex(item => item.name === name)) {
        this.cardCurrentIndex = 2
      }
      if (name.includes('江门') && this.zhuHaiSite.findIndex(item => item.name === name)) {
        this.cardCurrentIndex = 3
      }
    },
    // 绘制 标志点
    drawIdentify(apiData) {
      const layer = this.$map.layer.get('station-layer').clearLayers()

      const data = apiData
        .filter(v => v.typeId === '6' || v.typeId === '7')
        .map(v => {
          return {
            lat: v.latitude,
            lng: v.longitude,
            stationId: v.stationId,
            stationTypeId: v.typeId,
            areaId: v.areaId,
            name: v.name
          }
        })
      this.stationGroup = data.reduce(
        (obj, v) => ((obj[v.stationId] = { stationTypeId: v.stationTypeId }), obj),
        {}
      )
      // 绘制 文本框
      layer.addMarkers(
        data.map(v => ({ ...v, alt: 100 })),
        (item, index) => {
          const panel = createOverlayComponent(PopupPanel, {
            content: item.name,
            active: item.stationId === this.stationId ? true : false
          })
          this.stationGroup[item.stationId].divOverlay = panel
          const offset = item.stationTypeId=='6'? [-80, -180]:[-85,-150]
          return {
            options: {
              type: 'div',
              html: panel.getContent(),
              size: [12, 14],
              offset: offset
            }
          }
        },
        (marker, data) => {
          marker.on('click', async () => {
            this.stationId = data.stationId
            this.stationTypeId = data.stationTypeId
            this.pannelStatus = true
            this.currentSelectTime = getBeforeDate(1, '') //默认24小时
            this.getCurrentEleInfo()
            this.errorHistoryList = []
            this.getSiteHistoryInfo(data.stationId, data.stationTypeId, this.warnCurrentPage)
            this.getHistoryEchartInfo()
            this.findSIteInArea(data.name)
            this.updateSiteList(data.areaId)
            this.$nextTick(() => {
              setTimeout(() => {
                this.$refs.errorSite.changeCurrentIndex(data.name)
              }, 500)
            })
            this.$map.setPosition([data.lat, data.lng], {
              zoom: 16,
              heading: 37.821137,
              pitch: -25,
              roll: 0,
              offset: [2500, -2200]
            })
            this.changeActive(data.stationId)
          })
        }
      )

      // 绘制 图标
      layer.addMarkers(
        data,
        item => {
          return {
            options: {
              type: 'image',
              src: `./img/main/indicate-icon${item.stationTypeId === '6' ? '1' : '2'}.png`,
              size: [41, 66],
              offset: [0, -19],
              maxZoom: 15
            }
          }
        },
        (marker, item) => {
          this.stationGroup[item.stationId].marker = marker
          marker.on('click', async () => {
            this.stationId = item.stationId
            this.stationTypeId = item.stationTypeId
            this.pannelStatus = true
            this.currentSelectTime = getBeforeDate(1, '') //默认24小时
            this.getCurrentEleInfo()
            this.errorHistoryList = []
            this.getSiteHistoryInfo(item.stationId, item.stationTypeId, this.warnCurrentPage)
            this.getHistoryEchartInfo()
            this.findSIteInArea(data.name)
            this.updateSiteList(item.areaId)
            this.$nextTick(() => {
              setTimeout(() => {
                this.$refs.errorSite.changeCurrentIndex(item.name)
              }, 500)
            })
            this.$map.setPosition([item.lat, item.lng], {
              zoom: 16,
              heading: 37.821137,
              pitch: -25,
              roll: 0,
              offset: [2500, -2200]
            })
            this.changeActive(item.stationId)
          })
          // 绘制 模型
          layer.addModel(item, {
            url:
              item.stationTypeId === '6'
                ? './model/风暴潮监测站模型.glb'
                : './model/内涝监测点模型.glb',
            scale: 50,
            minZoom: 15
          })
        }
      )

      // 绘制 底部光圈
      layer.addCircles(
        data,
        item => {
          return {
            options: {
              radius: 150,
              minZoom: 15,
              stroke: false,
              material: new Cesium.ImageMaterialProperty({
                image: './img/main/circle.png'
              })
            }
          }
        },
        (circle, item) => {
          this.stationGroup[item.stationId].circle = circle
        }
      )
    },
    changeTabs(index) {
      this.isActiveTabs = index
      this.currentDataType = index
      if(index == 0) {
        this.getCurrentEleInfo()
      }
      if (index == 1) {
        // 历史数据折线图
        this.currentSelectTime = getBeforeDate(1, '') //默认24小时
        this.getHistoryEchartInfo()
      }
    },
    getCurrentSiteInfo(stationId, stationTypeId) {
      this.stationId = stationId
      this.stationTypeId = stationTypeId
      this.pannelStatus = true
      this.currentSelectTime = getBeforeDate(1, '') //默认24小时
      this.getCurrentEleInfo()
      this.errorHistoryList = []
      this.getSiteHistoryInfo(stationId, stationTypeId, this.warnCurrentPage)
      if(this.isActiveTabs == 1) {
         this.getHistoryEchartInfo()
      }
    },
    getCurrentEleInfo() {
      getNearEleInfo({
        stationId: this.stationId,
        stationTypeId: this.stationTypeId
      }).then(res => {
        this.currentSiteName = res.data.stationName
        this.currentUpdateTime = res.data.dataTime
        this.monitorData = res.data
        if (res.data.stationTypeId == '6') {
          // type:1:实时水位值(m)
          this.waterParams = [
            {
              value: res.data.waterLevel,
              type: 1,
              isWarn: res.data.waterLevelIsWarn,
              unit: 'm'
            },
           // 水位变化速度
            {
              value: res.data.addWaterSpeed,
              type: 2,
              isWarn: false,
              unit: 'm/min'
            },
            {
              value: res.data.addWaterAcceleration,
              type: 3,
              isWarn: false,
              unit: 'm/min²'
            },
            {
              value: res.data.waveOverHeight,
              type: 10,
              isWarn: res.data.waveOverHeightIsWarn,
              unit: 'm'
            },
            {
              value: res.data.waveOverNumber,
              type: 11,
              isWarn: res.data.waveOverNumberIsWarn,
              unit: '次'
            },
            {
              value: res.data.averWaveOverAmount,
              type: 50, //平均越浪量
              isWarn: res.data.averWaveOverAmountIsWarn,
              unit: 'm³/s·m'
            },
            {
              value: res.data.waveRunUpHeight,
              type: 12,
              isWarn: res.data.waveRunUpHeightIsWarn,
              unit: 'm'
            },
            
          ]

          // 气象数据
          this.weatherData = [
            {
              value: res.data.averWindSpeed,
              type: 13,
              isWarn: res.data.averWindSpeedIsWarn,
              unit: 'm/s'
            },
            {
              value: res.data.averWindDirection,
              type: 14,
              isWarn: res.data.averWindDirectionIsWarn,
              unit: '°'
            },
            {
              value: res.data.maxWindSpeed,
              type: 15,
              isWarn: res.data.maxWindSpeedIsWarn,
              unit: 'm/s'
            },
            {
              value: res.data.maxWindDirection,
              type: 16,
              isWarn: res.data.maxWindDirectionIsWarn,
              unit: '°'
            },
            {
              value: res.data.extremelyWindSpeed,
              type: 17,
              isWarn: res.data.extremelyWindSpeedIsWarn,
              unit: 'm/s'
            },
            {
              value: res.data.extremelyWindDirection,
              type: 18,
              isWarn: res.data.extremelyWindDirectionIsWarn,
              unit: '°'
            },
            {
              value: res.data.airTemperature,
              type: 19,
              isWarn: res.data.airTemperatureIsWarn,
              unit: '°C'
            },
            {
              value: res.data.relativeHumidity,
              type: 20,
              isWarn: res.data.relativeHumidityIsWarn,
              unit: '%'
            },
            {
              value: res.data.pressure,
              type: 21,
              isWarn: res.data.pressureIsWarn,
              unit: 'hPa'
            }
          ]

          // 设备数据
          this.equipmentData = [
            {
              value: res.data.tcase,
              type: 22,
              isWarn: res.data.tcaseIsWarn,
              unit: '°'
            },
            {
              value: res.data.batteryVoltage,
              type: 23,
              isWarn: res.data.batteryVoltageIsWarn,
              unit: 'V'
            },
            {
              value: res.data.cardMemory,
              type: 24,
              isWarn: res.data.cardMemoryIsWarn,
              unit: 'Mb'
            }
          ]
        } else if (res.data.stationTypeId == '7') {
          //内涝监测点
          this.waterParams = [
            {
              value: res.data.waterLevel,
              type: 25,
              isWarn: res.data.waterLevelIsWarn,
              unit: 'm'
            },
            // 水位变化速度
            {
              value: res.data.addWaterSpeed,
              type: 2,
              isWarn: false,
              unit: 'm/min'
            },
            {
              value: res.data.addWaterAcceleration,
              type: 3,
              isWarn: false,
              unit: 'm/min²'
            },
             {
              value: res.data.sxWaterLevel,
              type: 31,
              isWarn: false,
              unit: 'm'
            }
          ]

          // 气象数据
          this.weatherData = [
            {
              value: res.data.rainfall,
              type: 28,
              isWarn: res.data.rainfallIsWarn,
              unit: 'mm'
            }
          ]

          this.equipmentData = [
            {
              value: res.data.tcase,
              type: 22,
              isWarn: res.data.tcaseIsWarn,
              unit: '°'
            },
            {
              value: res.data.batteryVoltage,
              type: 23,
              isWarn: res.data.batteryVoltageIsWarn,
              unit: 'V'
            },
            {
              value: res.data.cardMemory,
              type: 24,
              isWarn: res.data.cardMemoryIsWarn,
              unit: 'Mb'
            }
          ]
        }
      })
    },
    //获取站点历史告警数据
    getSiteHistoryInfo(stationId, stationTypeId, currentPage) {
      getHistoryInfoList({
        stationId: stationId,
        stationTypeId: stationTypeId,
        current: currentPage,
        size: 10
      }).then(res => {
        if (res.code == 200) {
          this.errorHistoryList = [...this.errorHistoryList, ...res.data.records]
          res.data.pages <= currentPage ? (this.isNoMoreWarn = true) : (this.isNoMoreWarn = false)
        }
      })
    },
    // 获取折线图数据
    getHistoryEchartInfo() {
      getHistoryEchart({
        stationId: this.stationId,
        stationTypeId: this.stationTypeId,
        startTime: this.currentSelectTime.passTime,
        endTime: this.currentSelectTime.nowTime
      }).then(res => {
        this.echartLineData = res.data
        // 删除潮位速度、加速度、波高、波周期
        delete this.echartLineData.tideChangeSpeedRespList
        delete this.echartLineData.tideChangeAccelerationRespList
        delete this.echartLineData.stormStationWaveHeightRespList
        delete this.echartLineData.stormStationWavePeriodRespList
        let echartLineElementKey = Object.keys(this.echartLineData)
        this.echartLineElement = {
          waterElement: [],
          atmosphereElement: [],
          statusElement: []
        }
        // 数据分类
        echartLineElementKey.forEach((item, index) => {
          if (echartLineElementType.statusElement.indexOf(item) !== -1) {
            this.echartLineElement.statusElement.push(item)
          } else if (echartLineElementType.atmosphereElement.indexOf(item) !== -1) {
            this.echartLineElement.atmosphereElement.push(item)
          } else {
            this.echartLineElement.waterElement.push(item)
          }
        })
        this.AllEchartName = [
          ...this.echartLineElement.waterElement,
          ...this.echartLineElement.atmosphereElement,
          ...this.echartLineElement.statusElement
        ]
        this.AllEchartName.forEach((item, index) => {
          this.refreshEchartItemShow(item)
        })
      })
    },
    refreshEchartItemShow(activeNames) {
      this.$nextTick(() => {
        // 普通
        if (document.getElementById(`${activeNames}Echart`)) {
          if (echartLineNameList[activeNames].type === 0) {
            let echartData = []
            if (this.echartLineData[activeNames]) {
              this.echartLineData[activeNames].forEach((item, index) => {
                echartData.push([item.dataTime, item[echartLineNameList[activeNames].element]])
              })
            }
            renderLineEchart(
              echarts.init(document.getElementById(`${activeNames}Echart`)),
              echartData,
              echartLineNameList[activeNames].name,
              echartLineNameList[activeNames].unit
            )
            // }

            // 波高 波周期
          } else if (echartLineNameList[activeNames].type === 1) {
            let echartData = [[], [], [], []]
            let echartLegend = echartLineNameList[activeNames].name.split('、')
            let echartXAxis = []
            if (this.echartLineData[activeNames]) {
              this.echartLineData[activeNames].forEach((item, index) => {
                // 周期
                if (activeNames.includes('Period')) {
                  echartXAxis.push(item.timeRange)
                  echartData[0].push(item.averWaveNum)
                  echartData[1].push(item.oneThirdNum)
                  echartData[2].push(item.oneTenthNum)
                  if (echartLegend.length >= 4) {
                    echartData[3].push(item.maxWaveNum)
                  }
                } else {
                  if (this.monitorData.stationTypeId == 1001) {
                    echartData[0].push([item.dataTime, item.averageWaveHigh])
                    echartData[1].push([item.dataTime, item.oneThirdHigh])
                    echartData[2].push([item.dataTime, item.oneTenthHigh])
                    if (echartLegend.length >= 4) {
                      echartData[3].push([item.dataTime, item.maxWaveHeight])
                    }
                  } else {
                    echartData[0].push([item.dataTime, item.averWaveHeight])
                    echartData[1].push([item.dataTime, item.oneThirdHeight])
                    echartData[2].push([item.dataTime, item.oneTenthHeight])
                    // if (echartLegend.length >= 4) {
                    //   echartData[3].push([item.dataTime, item.maxWaveHeight])
                    // }
                  }
                }
              })
            }
            // 波周期
            if (activeNames.includes('Period')) {
              renderWavePeriodEchart(
                echarts.init(document.getElementById(`${activeNames}Echart`)),
                echartData,
                echartXAxis,
                echartLegend,
                echartLineNameList[activeNames].unit
              )
              // 波高
            } else {
              renderWaveHeightEchart(
                echarts.init(document.getElementById(`${activeNames}Echart`)),
                echartData,
                echartLegend,
                echartLineNameList[activeNames].unit
              )
            }
            // 温度、湿度
          } else if (echartLineNameList[activeNames].type === 3) {
            let echartData = [[], []]
            let echartLegend = echartLineNameList[activeNames].name.split('、')
            if (this.echartLineData[activeNames]) {
              this.echartLineData[activeNames].forEach((item, index) => {
                echartData[0].push([item.dataTime, item.airTemperature])
                echartData[1].push([item.dataTime, item.relativeHumidity])
              })
            }
            renderTempHumidity(
              echarts.init(document.getElementById(`${activeNames}Echart`)),
              echartData,
              echartLegend
            )
            // 越浪
          } else if (echartLineNameList[activeNames].type === 2) {
            let echartData = [[], []]
            let echartLegend = echartLineNameList[activeNames].name.split('、')
            if (this.echartLineData[activeNames]) {
              this.echartLineData[activeNames].forEach((item, index) => {
                echartData[0].push([item.dataTime, item.waveOverHeight])
                echartData[1].push([item.dataTime, item.waveOverNumber])
              })
            }
            renderOverToppingEchart(
              echarts.init(document.getElementById(`${activeNames}Echart`)),
              echartData,
              echartLegend
            )
            // 风速风向
          } else if (echartLineNameList[activeNames].type === 4) {
            let echartData = [[], [], [], []]
            let echartLegend = echartLineNameList[activeNames].name.split('、')
            // 真风速 真风向：windSpeed	windDirection 相对风速、相对风向
            // 平均风速、平均风向，极大风速、极大风向，最大风速、最大风向:
            // averWindSpeed averWindDirection extremelyWindSpeed extremelyWindDirection
            // maxWindSpeed maxWindDirection
            if (this.echartLineData[activeNames]) {
              this.echartLineData[activeNames].forEach((item, index) => {
                if (echartLegend.length === 1) {
                  echartData[0].push({
                    value: [item.dataTime, item.windSpeed, item.windDirection],
                    symbolRotate: 180 - item.windDirection
                  })
                  // echartLegend = [echartLineNameList[activeNames].name]
                } else {
                  echartData[0].push({
                    value: [item.dataTime, item.averWindSpeed, item.averWindDirection],
                    symbolRotate: 180 - item.averWindDirection
                  })
                  echartData[1].push({
                    value: [item.dataTime, item.extremelyWindSpeed, item.extremelyWindDirection],
                    symbolRotate: 180 - item.extremelyWindDirection
                  })
                  echartData[2].push({
                    value: [item.dataTime, item.maxWindSpeed, item.maxWindDirection],
                    symbolRotate: 180 - item.maxWindDirection
                  })
                  // echartLegend = echartLineNameList[activeNames].name.split('、')
                }
              })
            }
            if (echartLegend.length === 1) {
              renderWindOneEchart(
                echarts.init(document.getElementById(`${activeNames}Echart`)),
                echartData,
                echartLegend,
                'm/s'
              )
            } else {
              renderWindTwoEchart(
                echarts.init(document.getElementById(`${activeNames}Echart`)),
                echartData,
                echartLegend,
                'm/s'
              )
            }
          }
        }
      })
    },
    // 查看更多历史告警信息
    checkMoreWarnMessage() {
      this.warnCurrentPage += 1
      this.getSiteHistoryInfo(this.stationId, this.stationTypeId, this.warnCurrentPage)
    },
    selectTimeEchart(val) {
      if (val == '24') {
        this.currentSelectTime = getBeforeDate(1, '')
      } else if (val == '48') {
        this.currentSelectTime = getBeforeDate(2, '')
      } else if (val == '72') {
        this.currentSelectTime = getBeforeDate(3, '')
      }
      this.getHistoryEchartInfo()
    },
    // 移动至某点
    moveToPopup(latlng, stationId) {
      this.stationId = stationId
      this.changeActive(stationId)
      this.$map.setPosition(latlng, {
        zoom: 16,
        heading: 37.821137,
        pitch: -25,
        roll: 0,
        offset: [2500, -2200]
      })
    },
    changeActive(id) {
      if (this.currentStationId.length) {
        const { divOverlay, marker, stationTypeId, circle } =
          this.stationGroup[this.currentStationId]
        divOverlay.set('active', false)
        marker.setStyle({
          image: `./img/main/indicate-icon${stationTypeId === '6' ? '1' : '2'}.png`
        })
        circle.geometry.polygon.material.image = './img/main/circle.png'
      }
      // this.stationGroup[this.currentStationId].circle.setStyle('active', false)

      const { divOverlay, marker, stationTypeId, circle } = this.stationGroup[id]

      this.currentStationId = id
      divOverlay.set('active', true)
      marker.setStyle({
        image: `./img/main/indicate-active-icon${stationTypeId === '6' ? '1' : '2'}.png`
      })
      if (circle.geometry.polygon.material) {
        circle.geometry.polygon.material.image = './img/main/circle-active.png'
      } else {
        circle.options.material.image = './img/main/circle-active.png'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
