/**
 * @Author: zhuxuxi
 * @Date:   2021-11-18 10:28:36
 * @Last Modified by:   Your name
 * @Last Modified time: 2021-11-29 15:04:26
 */
import {
    Cartesian3,
    VerticalOrigin,
    HorizontalOrigin,
    ScreenSpaceEventHandler,
    ScreenSpaceEventType,
    Color,
    Ellipsoid
} from 'cesium/Cesium'
import 'cesium/Widgets/widgets.css'
import addMap from '@/utils/map/addMap'
import {
    removeEntitiesByName,
    zhujiShow
} from '@/utils/map'

import {
    measureDistance,
    measureAreaSpace
} from '@/utils/map/measureDistance'
const mapMixin = {
    data() {
        return {
            distanceViewL: null, //测距
            // areaViewL: null, //测面
            screenStatus: false, //分屏
            toolMarkerL: true, //注记
            toolMarkerR: true, //注记
            toolCeju: false, //测距
            toolCeArea: false, //测面
            leftSearchShow: true, //左边查询modal
            rightSearchShow: false, //右边查询modal
            // leftStatus: false, //左边结果modal
            // rightStatus: false, //右边结果modal
            id: null, // tool工具
            defaluctActive: '0',
        }
    },
    watch: {
    // toolMarker: function (val) {
    //   if (!val) {
    //     // removeEntitiesByName(window.cesiumViewerL, '标注');
    //   } else {
    //     this.toolCeju = false;
    //     this.toolCeArea = false;
    //   }
    // },
        toolCeju: function(val) {
            if (!val) {
                removeEntitiesByName(window.cesiumViewerL, '测距')
                window.billboards.removeAll()
                window.billboards = null
                document.getElementById(this.id).innerHTML = ''
                document.getElementById(this.id).style.display = 'none'
            } else {
                this.toolCeArea = false
            }
        },
        toolCeArea: function(val) {
            if (!val) {
                //清除s
                removeEntitiesByName(window.cesiumViewerL, '多边形面积')
            } else {
                this.toolCeju = false
            }
        },
    },
    mounted() {
        document.body.addEventListener('clear-distance', this.clearMeasureDistanceBtn.bind(this))
    },
    methods: {
        initCesiumL(id) {
            window.cesiumViewerL = addMap(id)
        },
        initCesiumR(id) {
            window.cesiumViewerR = addMap(id)
        },
        // 测距
        ceju(id) {
            if(window.areaHandleL) return //框区域
            this.id = id
            this.clearToolHandler(null)
            // this.toolMarker = false;
            this.toolCeArea = false
            this.toolCeju = !this.toolCeju
            if (this.toolCeju) {
                this.distanceViewL = new measureDistance(window.cesiumViewerL, id)
            }
        },
        // 清除测距
        clearMeasureDistanceBtn() {
            this.toolCeju =false
        },
        // 测面
        ceArea(id) {
            if(window.areaHandleL) return //框区域
            this.clearToolHandler(id)
            this.toolCeArea = !this.toolCeArea
            if (this.toolCeArea) {
                new measureAreaSpace(
                    window.cesiumViewerL,
                    id
                )
            }
        },
        addMarkerAll(){
            this.toolMarkerL = !this.toolMarkerL
            this.toolMarkerR = !this.toolMarkerR
            zhujiShow(window.cesiumViewerL,this.toolMarkerL)
            zhujiShow(window.cesiumViewerR,this.toolMarkerR)
        },
        addMarker() {
            /* 加载全球影像中文注记服务 */
            this.toolMarkerL = !this.toolMarkerL
            zhujiShow(window.cesiumViewerL,this.toolMarkerL)

            // this.clearToolHandler();
      
            // if (this.toolMarker) {
            //   if (!window.handlerL) {
            //     window.handlerL = new ScreenSpaceEventHandler(
            //       window.cesiumViewerL.scene.canvas
            //     );
            //   }
        // window.handlerL.setInputAction(function (click) {
        //   let cartographicLine = null;
        //   let position1 = null;
        //   let ray = window.cesiumViewerL.scene.camera.getPickRay(
        //     click.position
        //   );
        //   if (ray) {
        //     position1 = window.cesiumViewerL.scene.globe.pick(
        //       ray,
        //       window.cesiumViewerL.scene
        //     );
        //   }
        //   if (position1) {
        //     cartographicLine = Ellipsoid.WGS84.cartesianToCartographic(
        //       position1
        //     );
        //   }
        //   var height = window.cesiumViewerL.scene.globe.getHeight(
        //     cartographicLine
        //   );
            // 处理鼠标按下事件
            // let params = {
            //   id: 'mapClick' + click.position.x,
            //   billboardName: '标注',
            //   lon: cartographicLine.longitude,
            //   lat: cartographicLine.latitude,
            //   height: height,
            // };
            // 地球点击
        //   addPoint(window.cesiumViewerL, params);
        // }, ScreenSpaceEventType.LEFT_CLICK);
            // }
        },
        // 分屏
        splitScreenClick() {
            this.screenStatus = true
            if(this.toolMarkerL){
                this.addMarker() 
            }
            // this.toolMarkerL = true //注记
            this.toolMarkerR = false //注记
            this.toolCeArea = false
            this.toolCeju = false
            this.addMarkerAll()
            this.clearToolHandler(null)

            if (!window.cesiumViewerR) return
            this.initHandler()
        },
        // 退出分屏
        exitSplitScreen() {
            this.screenStatus = false
            this.clearHandler()
            // this.toolMarker = false;
        },
        // 双球联动
        initHandler() {
            // flag
            let isLeftTrigger = false
            let isRightTrigger = false

            // 左边地图移动，联动右边
            window.handlerL = new ScreenSpaceEventHandler(
                window.cesiumViewerL.scene.canvas
            )
            window.handlerL.setInputAction(function(movement) {
                isLeftTrigger = true
                isRightTrigger = false
            }, ScreenSpaceEventType.MOUSE_MOVE)
            let syncViewerL = function() {
                if (isLeftTrigger) {
                    window.cesiumViewerR.camera.flyTo({
                        destination: window.cesiumViewerL.camera.position,
                        orientation: {
                            heading: window.cesiumViewerL.camera.heading,
                            pitch: window.cesiumViewerL.camera.pitch,
                            roll: window.cesiumViewerL.camera.roll,
                        },
                        duration: 0.0,
                    })
                }
            }
            window.cesiumViewerL.camera.changed.addEventListener(syncViewerL)
            window.cesiumViewerL.scene.preRender.addEventListener(syncViewerL)

            //  右边地图移动，联动左边的
            window.handlerR = new ScreenSpaceEventHandler(
                window.cesiumViewerR.scene.canvas
            )
            window.handlerR.setInputAction(function(movement) {
                isLeftTrigger = false
                isRightTrigger = true
            }, ScreenSpaceEventType.MOUSE_MOVE)
            let syncViewerR = function() {
                if (isRightTrigger) {
                    window.cesiumViewerL.camera.flyTo({
                        destination: window.cesiumViewerR.camera.position,
                        orientation: {
                            heading: window.cesiumViewerR.camera.heading,
                            pitch: window.cesiumViewerR.camera.pitch,
                            roll: window.cesiumViewerR.camera.roll,
                        },
                        duration: 0.0,
                    })
                }
            }
            window.cesiumViewerR.camera.changed.addEventListener(syncViewerR)
            window.cesiumViewerR.scene.preRender.addEventListener(syncViewerR)
        },
        // 释放监听事件
        clearHandler() {
            if (window.handlerR)
                window.handlerR.removeInputAction(ScreenSpaceEventType.MOUSE_MOVE)
            if (window.handlerL)
                window.handlerL.removeInputAction(ScreenSpaceEventType.MOUSE_MOVE)
        },
        clearToolHandler(id) {
            if (window.handlerL) {
                window.handlerL.removeInputAction(ScreenSpaceEventType.LEFT_CLICK)
                window.handlerL.removeInputAction(ScreenSpaceEventType.MOUSE_MOVE)
                window.handlerL.removeInputAction(
                    ScreenSpaceEventType.LEFT_DOUBLE_CLICK
                )
            }
            if (window.areaViewL) {
                window.areaViewL.removeInputAction(ScreenSpaceEventType.RIGHT_CLICK)
                window.areaViewL.removeInputAction(ScreenSpaceEventType.LEFT_CLICK)
                window.areaViewL.removeInputAction(ScreenSpaceEventType.MOUSE_MOVE)
                window.areaViewL =  null
                if(id){
                    document.getElementById(id).style.display = 'none'
                }
            }
            if (this.distanceViewL) {
                this.distanceViewL.removeInputAction(ScreenSpaceEventType.LEFT_CLICK)
                this.distanceViewL.removeInputAction(ScreenSpaceEventType.MOUSE_MOVE)
                this.distanceViewL.removeInputAction(
                    ScreenSpaceEventType.LEFT_DOUBLE_CLICK
                )
                this.distanceViewL = null
            }
        },
        // 打开
        // arrowOpen() {
        //   this.leftStatus = !this.leftStatus;
        // },
        // arrowOpenRight() {
        //   this.rightStatus = !this.rightStatus;
        // },
        changeNav(type,index) {
            this.defaluctActive = index.toString()
            if(index === 4) {
                window.open('https://earth.nullschool.net/','_blank')
            }
            this.clearResult()
        },
        getClickInfo(val) {
            this.stationInfo = val
        },
        // 获取一个元素在数组中的下标
        getArrayIndex(arr, obj) {
            var i = arr.length
            while (i--) {
                if (arr[i] === obj) {
                    return i
                }
            }
            return -1
        },
        //清除所有Entity和ImageryLayers
        clearHandle() {
            //移除所有实体Entity
            window.cesiumViewerL.entities.removeAll()
        },
        // 地图坐标转换 屏幕坐标转世界地图坐标
        getPointFromWindowPoint(point) {
            if (
                window.cesiumViewerL.scene.terrainProvider.constructor.name ==
        'EllipsoidTerrainProvider'
            ) {
                return window.cesiumViewerL.camera.pickEllipsoid(
                    point,
                    window.cesiumViewerL.scene.globe.ellipsoid
                )
            } else {
                var ray = window.cesiumViewerL.scene.camera.getPickRay(point)
                return window.cesiumViewerL.scene.globe.pick(
                    ray,
                    window.cesiumViewerL.scene
                )
            }
        },
        // 添加矩形图片
        addAreaImage(lng, lat, lh, url) {
            window.cesiumViewerL.entities.add({
                position: Cartesian3.fromDegrees(lng, lat, lh),
                billboard: {
                    // 图像地址，URI或Canvas的属性
                    image: url,
                    // 设置颜色和透明度
                    color: Color.WHITE.withAlpha(0.8),
                    // 高度（以像素为单位）
                    height: 50,
                    // 宽度（以像素为单位）
                    width: 50,
                    // 逆时针旋转
                    // rotation: 20,
                    // 大小是否以米为单位
                    sizeInMeters: false,
                    // 相对于坐标的垂直位置
                    verticalOrigin: VerticalOrigin.CENTER,
                    // 相对于坐标的水平位置
                    horizontalOrigin: HorizontalOrigin.LEFT,
                    // 该属性指定标签在屏幕空间中距此标签原点的像素偏移量
                    // pixelOffset: Cartesian2(10, 0),
                    // 应用于图像的统一比例。比例大于会1.0放大标签，而比例小于会1.0缩小标签。
                    scale: 1.0,
                    // 是否显示
                    show: true
                }
            })
        }
    },
    destroyed() {
        this.clearHandler()
        window.cesiumViewerL && window.cesiumViewerL.destroy() ?
            (window.cesiumViewerL = null) :
            ''
        window.cesiumViewerR && window.cesiumViewerR.destroy() ?
            (window.cesiumViewerR = null) :
            ''
        window.handlerL ? (window.handlerL = null) : ''
        window.handlerR ? (window.handlerR = null) : ''
        this.distanceViewL ? (this.distanceViewL = null) : ''
        window.areaViewL?(window.areaViewL=null):''
    },
}

export default mapMixin