<!--
 * @Author: your name
 * @Date: 2022-04-15 10:13:46
 * @LastEditTime: 2022-05-16 17:17:58
 * @LastEditors: ada 847788466@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \web-3d\src\components\forecast-dialog\index.vue
-->
<template>
  <div class="forecast-echart" :style="{ top: offset.left + 'px', left: offset.top + 20 + 'px' }">
    <div class="forecast-echart-title">
      <div
        v-for="(item, index) in tabsList"
        :key="index"
        :class="{
          'title-item': true,
          isActivePannel: index == currentActive
        }"
        @click="changeTabs(index)"
      >
        {{ item.text }}
      </div>
    </div>
    <div class="forecast-echart-content">
      <template v-if="!currentActive">
        <div id="echart-box"></div>
        <div class="latlng-sign">
          <div class="latlng-sign-item">
            <img src="../../assets/images/lat-sign.png" alt="" />
            <span>点位纬度:</span>
            <span>{{ latlng.lat }}</span>
          </div>
          <div class="latlng-sign-item">
            <img src="../../assets/images/lat-sign.png" alt="" />
            <span>点位经度:</span>
            <span>{{ latlng.lon }}</span>
          </div>
        </div>
      </template>
      <template v-else>
        <MyTable
          size="mini"
          :is-selection="false"
          :is-index="isIndex"
          :is-pagination="false"
          :is-handle="true"
          :is-border="false"
          :table-data="tableData"
          :table-cols="tableCols"
        />
      </template>
    </div>
    <div class="close_dialog">
      <img src="../../assets/images/close.png" @click="closeDialog" />
    </div>
  </div>
</template>
<script>
import { getDisasterInfo } from '@/api'
import echarts from 'echarts'
import MyTable from '../../components/myTable/myTable'
import { bigFaceEchart } from '@/utils/echarts'

export default {
  name: '',
  props: {
    latlng: {
      type: Object,
      default: () => {
        return {}
      }
    },
    offset: {
      type: Object,
      default: () => {
        return {}
      }
    },
    isForecastShow: {
      type: Boolean,
      default: () => {
        return false
      }
    }
  },
  components: { MyTable },
  watch: {
    isForecastShow: {
      immediate: true,
      handler(val) {
        this.isDialog = val
      }
    },
    latlng: {
      deep: true,
      immediate: true,
      handler(val) {
        this.getDisasterEchart(val)
      }
    }
  },
  data() {
    return {
      isIndex: {
        isShow: false,
        width: 132
      },
      currentActive: 0,
      isDialog: false,
      myChart: null,
      tabsList: [
        {
          text: '过程图'
        },
        {
          text: '报表'
        }
      ],
      tableData: [],
      tableCols: [
        {
          label: '时间',
          prop: 'predictionTime'
        },
        {
          label: '预测水位(m)',
          prop: 'predictionWaterLevel'
        },
        {
          label: '天文潮(m)',
          prop: 'astronomicalTide'
        },
        {
          label: '风暴增水(m)',
          prop: 'stormAddWater'
        }
      ]
    }
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    // 获取大面积预报数据
    async getDisasterEchart(params) {
      console.log(params)
      let echartData = (await getDisasterInfo(params)).data
      this.tableData = echartData
      if (echartData.length > 0) {
        this.$nextTick(() => {
          this.myChart = echarts.init(document.getElementById('echart-box'))
          bigFaceEchart(this.myChart, echartData)
        })
      }
    },
    changeTabs(index) {
      this.currentActive = index
      if (!index) {
        this.$nextTick(() => {
          bigFaceEchart(echarts.init(document.getElementById('echart-box')), this.tableData)
        })
      }
    },
    closeDialog() {
      // this.isDialog = false
      this.$emit('closeForecast', false)
    }
  }
}
</script>
<style lang="scss">
.forecast-echart {
  width: 775px;
  height: 440px;
  position: absolute;
  // top: 300px;
  // right: 100px;
  background: url('../../assets/images/echart-bg.png') no-repeat center/100% 100%;
  padding: 32px 12px 20px 16px;
  box-sizing: border-box;
  &-title {
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 14px;
    .title-item {
      width: 104px;
      height: 40px;
      text-align: center;
      line-height: 40px;
      font-size: 16px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #ffffff;
      cursor: pointer;
      background: url('../../assets/images/card-type_defalut.png') no-repeat center/100% 100%;
    }
    .title-item:nth-child(1) {
      margin-right: 34px;
    }
    .isActivePannel {
      background-image: url('../../assets/images/card-type_isactive.png');
    }
  }
  &-content {
    height: calc(100% - 54px);
    width: 100%;
    #echart-box {
      width: 100%;
      height: calc(100% - 53px);
    }
    .latlng-sign {
      height: 19px;
      width: 100%;
      display: flex;
      align-items: center;
      margin-top: 15px;
      &-item {
        height: 19px;
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        line-height: 19px;
        color: #ffffff;
        img {
          margin-right: 6px;
        }
        span {
          display: inline-block;
          margin-right: 16px;
        }
      }
      &-item:nth-child(1) {
        margin-right: 48px;
      }
    }
  }
  .close_dialog {
    position: absolute;
    top: 12px;
    right: 12px;
    cursor: pointer;
  }
}
</style>
