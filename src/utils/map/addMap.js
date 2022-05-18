/*
 * @Descripttion: hqx
 * @version: 1.0.0
 * @Author: zhuxuxi
 * @Date: 2021-10-19 16:21:13
 * @LastEditTime: 2022-04-07 12:24:50
 */
import {
    Ion,
    Cartesian3,
    ScreenSpaceEventHandler,
    ScreenSpaceEventType,
    WebMercatorTilingScheme,
    UrlTemplateImageryProvider,
    Math,
    Color,
    ArcGisMapServerImageryProvider,
    GeoJsonDataSource,
    FeatureDetection,
    Viewer,
    WebMapTileServiceImageryProvider
} from "cesium/Cesium"
import "cesium/Widgets/widgets.css"


/**
 * 地图实例化
 *
 * @param {dom} idDom
 * @return {Object} 
 */
function addMap(idDom) {

    Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJkZWMzODQ1MC1mYzhiLTQ5NGEtYmRkMi1mMDY0ZGQ3MTA3NGUiLCJpZCI6NzM4MjYsImlhdCI6MTYzNzIxMzYwMH0.nobuyHHFgU4_13uITsxc_g0JGB7hD3ZrsoEriiQou0I'
    let viewer = new Viewer(idDom, {
        navigationHelpButton: false, // 是否显示右上角的帮助按钮
        infoBox: false, // 是否显示信息框,是否显示点击要素之后显示的信息
        homeButton: false, // 是否显示Home按钮
        selectionIndicator: false, // 是否显示选取指示器组件
        sceneModePicker: false, // 是否显示3D/2D选择器
        baseLayerPicker: false, // 是否显示图层选择器
        geocoder: false, // 是否显示geocoder小器件，右上角查询按钮
        fullscreenButton: false, // 是否显示全屏按钮
        shouldAnimate: true,
    // requestVertexNormals: true // 光照
    })
    /* 去除大气层效果 */
    viewer.scene.globe.showGroundAtmosphere = false
    // 更亮的星空
    viewer.scene.highDynamicRange = false
    /* 去除Cesium图标 */
    viewer._cesiumWidget._creditContainer.style.display = "none"
    /* 隐藏timeline和animation */
    viewer.timeline.container.style.visibility = "hidden"
    viewer.timeline.container.style.display = "none"
    viewer.animation.container.style.visibility = "hidden"
    viewer.animation.container.style.display = "none"

    let canvas = viewer.scene.canvas
    let handler = new ScreenSpaceEventHandler(canvas)
    // let ellipsoid = viewer.scene.globe.ellipsoid;

    /* 初始化图层 */
    viewer.imageryLayers.removeAll()
    // 服务负载子域
    let subdomains = ["0", "1", "2", "3", "4", "5", "6", "7"]
    // 服务域名
    let tdtUrl = "https://t{s}.tianditu.gov.cn/"
    window.token = "f50c5a9a2a952f5df773fbc0ff6c5aec"
    // 天地图底图
    let shadedReliefTianditu = new UrlTemplateImageryProvider({
        url: tdtUrl + "DataServer?T=img_w&x={x}&y={y}&l={z}&tk=" + window.token,
        subdomains: subdomains,
        tilingScheme: new WebMercatorTilingScheme(),
        maximumLevel: 18,
    })
    viewer.imageryLayers.addImageryProvider(shadedReliefTianditu, 0)
    /**
   * 鼠标双击事件清除跟随实体
   */
    viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(
        ScreenSpaceEventType.LEFT_DOUBLE_CLICK
    )

    let shadedReliefZhuji = new WebMapTileServiceImageryProvider({
        url: "http://t0.tianditu.gov.cn/cva_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cva&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default.jpg&tk=" +
      window.token,
        layer: "tdtAnnoLayer",
        style: "default",
        format: "tiles",
        tileMatrixSetID: "GoogleMapsCompatible",
        show: false,
    })
    viewer.imageryLayers.addImageryProvider(shadedReliefZhuji)

    // 添加行政边界
    // viewer.dataSources.add(
    //     GeoJsonDataSource.load("static/data/liaoning_line.json", {
    //         clampToGround: true, 
    //         height:0,
    //         name:'辽宁省',
    //         stroke: Color.fromCssColorString("#e6cb8d"),
    //         strokeWidth: 3,
    //     })
    // )

    // Cartesian 方式确定位置
    viewer.camera.setView({
        destination: Cartesian3.fromDegrees(103.486138, 30.465411, 21000000.0),
        orientation: {
            // 视角
            pitch: Math.toRadians(-90),
            roll: 0.0
        }
    })
    // viewer.camera.flyTo({
    //     destination: Cartesian3.fromDegrees(120.9598881, 40.1210911, 800000.0),
    // })

    return viewer

}

export default addMap