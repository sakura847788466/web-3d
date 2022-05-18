/**
 * @Author: zhuxuxi
 * @Date:   2021-11-18 11:36:08
 * @Last Modified by:   Your name
 * @Last Modified time: 2021-12-01 11:31:27
 */
import * as Cesium from "cesium/Cesium";
import "cesium/Widgets/widgets.css";

/** 
 * 返回最大最小值
 * @param layer
 */
 export const getRect = function (points) {
  let xmin, ymin, xmax, ymax
  for (let i in points) {
    const coordinates = points[i]
    const x = coordinates[0]
    const y = coordinates[1]
    if (!xmin) {
      xmin = x
    } else {
      if (x < xmin) {
        xmin = x
      }
    }

    if (!ymin) {
      ymin = y
    } else {
      if (y < ymin) {
        ymin = y
      }
    }

    if (!xmax) {
      xmax = x
    } else {
      if (x > xmax) {
        xmax = x
      }
    }
    if (!ymax) {
      ymax = y
    } else {
      if (y > ymax) {
        ymax = y
      }
    }
  }
  return {
    xmin,
    ymin,
    xmax,
    ymax
  }
}

/** 
 * 增加标点
 * @param layer
 */
 export const addLine = function (map,name,params) {

  // if (params.lon === undefined || params.lat === undefined) {
  //   alert('请提供经纬度!');
  //   return;
  // }
  //地理坐标（弧度）转经纬度坐标
 
 map.entities.add({
    id: name+params.id, //添加边线 
    name: name,
    height:100,
    polyline: {
      show: true,
      positions:Cesium.Cartesian3.fromDegreesArray([
        params.positionData.xmin,params.positionData.ymin,
        params.positionData.xmin,params.positionData.ymax,
        params.positionData.xmax,params.positionData.ymax,
        params.positionData.xmax,params.positionData.ymin,
        params.positionData.xmin, params.positionData.ymin
      ]),
      width: 3,
      material: Cesium.Color.fromCssColorString('#02CCFE').withAlpha(0.5),
      clampToGround:false,
      followSurface: false
    },
    // position: Cesium.Cartesian3.fromDegrees(params.positionData.xmin,params.positionData.ymin),
    // label:{
    //   text:name,
    //   scale:1
    // }
  });
 

}

/** 
 * 增加标点
 * @param layer
 */
export const addPoint = function (map, params) {
  console.log(params);
  if (params.lon === undefined || params.lat === undefined) {
    alert('请提供经纬度!');
    return;
  }
  //地理坐标（弧度）转经纬度坐标
  map.entities.add({
    id: params.id,
    name: params.billboardName,
    show: true,
    position: Cesium.Cartesian3.fromDegrees(params.lon / Math.PI * 180, params.lat / Math.PI * 180, params.height),
    billboard: {
      image: 'static/images/icon-blue-position.png',
      width: 18,
      height: 20,
      scale: 1,
    },
    info: {
      name: params.billboardName,
      lon: params.lon,
      lat: params.lat
    },
    billboardName: params.billboardName
  });
}

/** 
 * 增加站点
 * @param layer
 */
export const addStation = function (map, stationData, name) {
  //地理坐标（弧度）转经纬度坐标
  for (let index = 0; index < stationData.length; index++) {
    const item = stationData[index];
    map.entities.add({
      id: item.id,
      name: name,
      show: true,
      position: Cesium.Cartesian3.fromDegrees(item.longitude, item.latitude),
      billboard: {
        image: `static/images/icon-${item.status==1?'green':'red'}-position.png`,
        width: 18,
        height: 20,
        scale: 1,
      },
      info: {
        name: name,
        lon: item.longitude,
        lat: item.latitude
      },
      rectangle: new Cesium.Rectangle(
        Cesium.Math.toRadians(117.577415),
        Cesium.Math.toRadians(37.08093),
        Cesium.Math.toRadians(122.45),
        Cesium.Math.toRadians(41.053154)
      ),
      billboardName: item.status,
    });
  }
}

/** 
 * 激活点
 * @param map
 */
export const stationActive = function (map,name,row) {
  for (let j = 0; j < map.entities.values.length; j++) {
    if(map.entities.values[j].name === name){
      if(map.entities.values[j]._billboardName!=1){
        map.entities.values[j]._billboard._image._value = 'static/images/icon-red-position.png'
      }else{
        map.entities.values[j]._billboard._image._value = 'static/images/icon-green-position.png'
      }
      if (map.entities.values[j].id == row.id) {
        map.entities.values[j]._billboard._image._value = 'static/images/icon-blue-position.png'
      }
    }
    
  }
 
}

/** 
 * 绘制矩型 监听开始和结束
 * @param map
 */

//  经纬度保存保存框选范围
window.savePosition = [
  [],
  [],
]
/** 
 * 绘制矩型面
 * @param layer
 */
export const addAreaRect = function (map, name,areaHandle) {
  const _this = this
  let pointsArr = [
    [],
    [],
  ];


  //鼠标左键单击画点
  areaHandle.setInputAction(function (click) {
    let cartographicStart = Cesium.Cartographic.fromCartesian(map.camera.pickEllipsoid(
      click.position,
      map.scene.globe.ellipsoid
    )); 
    if (map._container.style.cursor == "") { // 开始点击
      removeEntitiesByName(map, name)
      map._container.style.cursor = "crosshair"
      savePosition[0] = []
      pointsArr[0] = []
      savePosition[0].push(Cesium.Math.toDegrees(cartographicStart.longitude), Cesium.Math.toDegrees(cartographicStart.latitude))
      pointsArr[0].push(Cesium.Math.toDegrees(cartographicStart.longitude), Cesium.Math.toDegrees(cartographicStart.latitude), 0)
    } else { //结束点击
      map._container.style.cursor = ""
      savePosition[1] = []
      savePosition[1].push(Cesium.Math.toDegrees(cartographicStart.longitude), Cesium.Math.toDegrees(cartographicStart.latitude))
    }

    if (map._container.style.cursor == "crosshair") {
      //鼠标移动
      areaHandle.setInputAction(function (movement) {
        let cartographicEnd = Cesium.Cartographic.fromCartesian(map.camera.pickEllipsoid(
          movement.endPosition,
          map.scene.globe.ellipsoid
        ));
        pointsArr[1] = []
        pointsArr[1].push(Cesium.Math.toDegrees(cartographicEnd.longitude), Cesium.Math.toDegrees(cartographicEnd.latitude), 0)
        const {
          xmin,
          ymin,
          xmax,
          ymax
        } = getRect(
          pointsArr
        )
        removeEntitiesByName(map, name)
        // console.log(name);
        // console.log(click);
        let params = [
          {
            id:'rectClick' + movement.endPosition.x,
            positionData:{
              xmin,
              ymin,
              xmax,
              ymax
            },
            name:'',
          }
        ]
        addRect(map,name,params)
        // addPolygons(map, params,name,Cesium.Color.WHITE.withAlpha(0.2),Cesium.Color.fromCssColorString('#02CCFE'))
      }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
    } else {
      // 移除移动监听
      // addRect(map,name,params)
      areaHandle.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE)
    }
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
}

/** 
 * 绘制矩型
 * @param layer
 */
export const addRect = function (map, name,params) {

  params.forEach(item => {
    map.entities.add({
      id: item.id,
      name: name,
      show: true,
      position: Cesium.Cartesian3.fromDegrees(parseFloat((item.positionData.xmin+item.positionData.xmax)/2), parseFloat((item.positionData.ymax+item.positionData.ymin)/2)),
      label: {
        text : item.name,
        show: true,
        font : '80px',
        style: Cesium.LabelStyle.FILL_AND_OUTLINE,
        outlineWidth : 20,
        verticalOrigin : Cesium.VerticalOrigin.CENTER,
        pixelOffset : new Cesium.Cartesian2(0, -9)
    },
      rectangle: new Cesium.RectangleGraphics({
        coordinates: new Cesium.Rectangle(Cesium.Math.toRadians(item.positionData.xmin), Cesium.Math.toRadians(item.positionData.ymin), Cesium.Math.toRadians(item.positionData.xmax), Cesium.Math.toRadians(item.positionData.ymax)),
        outline: false,
        fill: true,
        show: true,
        followSurface: false, //是否贴着地表
        material: new Cesium.ImageMaterialProperty ({
          color:Cesium.Color.WHITE.withAlpha(0.1),
          transparent:true,
        })
      }, )
    });
    addLine(map,name,item)
  }); 
}

/** 
 * 多边型
 * @param layer
 */
 export const addPolygons = function (map, paramsArr,name,colorFill=null,lineColor=null) {
  //画面
  if(map){
  for (let index = 0; index < paramsArr.length; index++) {
    const params = paramsArr[index];
    if (params.positionData.length < 2) return;
    map.entities.add({
      id: params.id,
      name: name,
      show: true,
      polygon: {
        // zIndex:0,
        height:0,
        hierarchy: new Cesium.Cartesian3.fromDegreesArray(params.positionData),
        perPositionHeight: true,
        fill:true,// 是否被材质填充
        material: new Cesium.ImageMaterialProperty ({
          color:colorFill || Cesium.Color.WHITE.withAlpha(0.4),
          transparent:false,
        }),
        outline:true,
        outlineColor:lineColor || Cesium.Color.YELLOW 
      }
    });
  }
}
}

/** 
 * 根据激活面
 * @param polygon red
 */
export const polygonHover = function (map, id) {

  for (let j = 0; j < map.entities.values.length; j++) {
    map.entities.values[j].polygon? map.entities.values[j].polygon.outlineColor = Cesium.Color.YELLOW :''
  }
  map.entities.getById(id).polygon.outlineColor = Cesium.Color.RED
}


/** 
 * 根据latlon 定位
 * @param layer
 */
export const mapFlyTo = function (map, LonLat) {
  map.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(LonLat[0],LonLat[1],LonLat[2]),
  });
}

/** 
 * 显影标注
 * @param layer
 */
export const zhujiShow = function (map, show) {
  for (let i = 0; i < map.scene.imageryLayers.length; i++) {
    let shadedImagery = map.scene.imageryLayers.get(i);
    if (
      shadedImagery.imageryProvider &&
      shadedImagery.imageryProvider._layer &&
      shadedImagery.imageryProvider._layer === "tdtAnnoLayer"
    ) {
      shadedImagery.show = show
    }
  }
}

/** 
 * 根据layer删除图层
 * @param layer
 */
export const removeImageryProviderByLayer = function (map, layer) {
  if (map.scene.imageryLayers.length > 0) {
    for (var j = 0; j < map.scene.imageryLayers.length; j++) {
      var shadedImagery = map.scene.imageryLayers.get(j);
      if (
        shadedImagery.imageryProvider &&
        shadedImagery.imageryProvider._layer &&
        shadedImagery.imageryProvider._layer === layer
      ) {
        map.scene.imageryLayers.remove(shadedImagery);
        j--;
      }
    }
  }
}

/** 
 * 根据name 删除实体
 * @param name 
 */
export const removeEntitiesByName = function (map, name) {
  if (map && map.entities && map.entities.values.length > 0) {
    for (let j = 0; j < map.entities.values.length; j++) {
      let shadedEntity = map.entities.values[j];
      if (
        shadedEntity &&
        shadedEntity.name &&
        shadedEntity.name === name
      ) {
        map.entities.remove(shadedEntity);
        j--;
      }
    }
  }

}


/**
 * 设置图层选择器
 * @param {string} imagery 切换的图层：电子地图、遥感地图
 */
export const setImageryViewModels = function (map, imagery) {
  if (imagery === "电子地图") {
    let isAdd = true;
    for (let i = 0; i < map.scene.imageryLayers.length; i++) {
      let shadedImagery = map.scene.imageryLayers.get(i);
      if (
        shadedImagery.imageryProvider &&
        shadedImagery.imageryProvider._layer &&
        shadedImagery.imageryProvider._layer === "tdtVecBasicLayer"
      ) {
        isAdd = false;
      }
    }
    if (isAdd) {
      let shadedRelief = map.imageryLayers.addImageryProvider(
        new Cesium.WebMapTileServiceImageryProvider({
          url: "http://t0.tianditu.gov.cn/vec_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=vec&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=" +
            window.token,
          layer: "tdtVecBasicLayer",
          style: "default",
          format: "image/jpeg",
          tileMatrixSetID: "GoogleMapsCompatible",
          show: false,
        }),
        1
      );
    }
  }
  if (imagery === "遥感地图") {
    removeImageryProviderByLayer(map, "tdtVecBasicLayer");
  }
}

