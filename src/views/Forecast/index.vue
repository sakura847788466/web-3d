<template>
  <div class="forecast">
    <dawn-map
      class="map-view"
      :provider="['TiandituMap.Satellite.Map', 'TiandituMap.Normal.Annotion']"
    ></dawn-map>
    <img class="legend" src="./assets/legend.png" />
    <img class="restart" src="./assets/restart.png" @click="onReplay" />
    <lethe-play-strip
      ref="playStrip"
      :play-config="playConfig"
      :play-list="playList"
      class="play-strip"
    ></lethe-play-strip>
  </div>
</template>

<script>
import { createOverlayComponent } from '@wushi/map-utils'
import { format } from '@wushi/date-fns'
import { getPredictionAnimation } from '@/api'
import ForecastDialog from '@/components/forecast-dialog/index'

export default {
  name: 'Forecast',
  data() {
    return {
      playList: []
    }
  },
  computed: {
    playConfig() {
      const len = this.playList.length
      const step = Math.ceil(len / 4)
      const steps = Array.from({ length: 4 }, (_, i) => i * step)

      return {
        loop: false,
        methodNames: ['addImages'],
        methodOptions: [
          {
            loop: false,
            lazy: 1,
            autoPlay: false,
            crossOrigin: true,
            bounds: [
              [23.344501164506, 115.910684308712],
              [20.2973186946321, 111.861049936731]
            ]
          }
        ],
        layerIds: ['img'],
        textFormatter: (item, index) => {
          return steps.includes(index) || index === len - 1 ? format(item.time, 'MM-DD') : ''
        },
        activeTextFormatter: 'MM-DD HH:mm',
        load: async item => {
          return [[{ url: item.kmzUrl }]]
        }
      }
    }
  },
  async mounted() {
    this.$map.flyTo([22.53, 115.3], 6)
    this.playList = (await getPredictionAnimation()).data

    // 注册点击事件
    const onClick = e => {
      const { lat, lng } = e.latlng
      const layer = this.$map.layer.get('dot-layer').clearLayers()
      layer.addMarkers(
        [{ lat, lng }],
        {
          options: {
            type: 'div',
            html: '<img src="./img/forecast/dot.png"/>',
            size: [40, 39],
            offset: [10, -15]
          }
        },
        marker => {
          const overlay = createOverlayComponent(ForecastDialog, {
            latlng: { lat, lon: lng }
          })
          overlay.on('closeForecast', () => {
            this.$map.layer.get('dot-layer').clearLayers()
          })
          marker.bindPopup(overlay.getContent(), {
            offset: [20, -100],
            className: 'pale-popup'
          })
          marker.openPopup()
        }
      )
    }
    this.$map.on('click', onClick)
    this.$on('hook:beforeDestroy', () => {
      this.$map.off('click', onClick)
    })

    // 初始化播放
    await this.$nextTick()
    this.$refs.playStrip.changeTo(0)
  },
  methods: {
    onReplay() {
      const { playStrip } = this.$refs
      playStrip && playStrip.changeTo(0)
    }
  }
}
</script>

<style lang="scss">
// reset popup empty
.pale-popup {
  background: none;
  padding: 0;
  .dawn-popup-content {
    margin: 0;
    width: auto !important;
  }
  .dawn-tip-content {
    display: none;
  }
}
</style>

<style lang="scss" scoped>
.forecast {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  .map-view {
    position: relative;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
  .legend {
    position: absolute;
    bottom: 39px;
    left: 57px;
  }
  .restart {
    height: 38px;
    width: 42px;
    position: absolute;
    bottom: 39px;
    left: 38%;
  }
  .play-strip {
    position: absolute;
    bottom: 39px;
    left: 40%;
    background: transparent;
    ::v-deep .lethe-play-strip__play-btn {
      color: aliceblue;
      width: 40px;
      height: 40px;
      background-color: transparent;
      border: 1px solid #fff;
      margin-right: 20px;
      .lethe-icon {
        width: 15px;
        height: 15px;
      }
    }
    ::v-deep .lethe-play-strip__progress-wrap {
      .lethe-play-strip__progress-bar {
        background: #8c918f;
        .lethe-play-strip__track {
          background: #f9fefd;
          .lethe-play-strip__focus {
            background: #03a1fe;
            height: 10px;
            width: 10px;
            border: 2px solid #f9fefd;
            &::before {
              background-color: transparent;
            }
          }
          .lethe-play-strip__focus-text {
            background-color: #000013;
            border-radius: 0;
            color: #f9fefd;
          }
        }
      }
    }
  }
}
</style>
