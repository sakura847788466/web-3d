<!--
 * @Descripttion: 站点告警组件
 * @version: 1.0
 * @Author: Ada
 * @Date: 2022-04-07 15:29:00
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-04-11 14:33:53
-->
<template>
  <div class="error-site-box">
    <div class="title">
      <span>{{ title }}</span>
    </div>
    <div class="error-site-list">
      <template v-if="type === 'site'">
        <div
          v-for="(item, index) in siteList"
          :key="index"
          :class="{ 'error-site-list-item': true, 'site-isActive': index == siteCurrentActive }"
          @click="clickSite(item, index)"
        >
          {{ item.name }}
          <div v-if="index == siteCurrentActive" class="error-site-sign">
            <img src="../../assets/images/site-isActive_sign.png" alt="" />
          </div>
        </div>
      </template>
      <template v-if="type === 'error'">
        <div v-for="(item, index) in errorParams" :key="index" class="error_item">
          <div class="error_item-left">
            <span>{{ item.stationName }}</span>
            <span>{{ item.warnType }}</span>
            <span>{{ item.warnTime }}</span>
          </div>
          <div class="error_item-right">
            <span>{{ item.warnValue }}m</span>
            <span>{{ item.ingredientName }}</span>
          </div>
        </div>
        <div v-if="isNoMoreWarn || !errorParams.length" class="no_more">
          <img src="../../assets/images/empty_list.png" alt="" />
        </div>
        <div v-else class="check-more" @click="checkMoreWarnMessage">查看更多</div>
      </template>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ErrorSiteBox',
  components: {},
  props: {
    title: {
      type: String,
      default: () => {
        return ''
      }
    },
    type: {
      type: String,
      default: () => {
        return ''
      }
    },
    errorParams: {
      type: Array,
      default: () => {
        return []
      }
    },
    isNoMoreWarn: {
      type: Boolean,
      require: true
    }
  },
  data() {
    return {
      siteCurrentActive: 0
    }
  },
  computed: {
    siteList() {
      return this.$store.state.user.siteList
    }
  },
  watch: {
    siteList: {
      immediate: true,
      handler(val) {
        this.siteCurrentActive = val.findIndex(item => item.typeId === '6')
      }
    }
  },
  created() {},
  mounted() {},
  methods: {
    checkMoreWarnMessage() {
      this.$emit('checkMoreWarnMessage')
    },
    clickSite(obj, index) {
      this.siteCurrentActive = index
      this.$emit('moveToPopup', [obj.latitude, obj.longitude], obj.stationId)
      this.$emit('getCurrentSiteInfo', obj.stationId, obj.typeId)
    },
    changeCurrentIndex(name) {
      this.siteCurrentActive = this.siteList.findIndex(item => item.name == name)
    }
  }
}
</script>
<style lang="scss">
@import './index.scss';
</style>
