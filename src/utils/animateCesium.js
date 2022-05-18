/*
 * @Descripttion: commonVueTemplate
 * @version: 1.0
 * @Author: Ada
 * @Date: 2021-11-01 14:24:31
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-11-04 17:55:04
 */
import * as Cesium from 'cesium/Cesium'

var GoogleMap = ImageryProviderWebExtendTool.createGoogleMapsByUrl (Cesium, {
  url: 'http://mt1.google.cn/vt/lyrs=s&hl=zh-CN&x={x}&y={y}&z={z}',
});

var viewerL = new Cesium.Viewer ('cesiumContainerL', {
  imageryProvider: GoogleMap,

  creditContainer: 'creditContainerL',

  selectionIndicator: true,

  animation: true,

  baseLayerPicker: false,

  geocoder: false,

  timeline: true,

  sceneModePicker: true,

  navigationHelpButton: false,

  infoBox: true,

  fullscreenButton: true,
});

var viewerR = new Cesium.Viewer ('cesiumContainerR', {
  imageryProvider: GoogleMap,

  creditContainer: 'creditContainerR',

  selectionIndicator: true,

  animation: true,

  baseLayerPicker: false,

  geocoder: false,

  timeline: true,

  sceneModePicker: true,

  navigationHelpButton: false,

  infoBox: true,

  fullscreenButton: true,
});

var sceneL = viewerL.scene;

var sceneR = viewerR.scene;

var handlerL = new Cesium.ScreenSpaceEventHandler (sceneL.canvas);

var ellipsoidL = sceneL.globe.ellipsoid;

var handlerR = new Cesium.ScreenSpaceEventHandler (sceneR.canvas);

var ellipsoidR = sceneR.globe.ellipsoid;

handlerL.setInputAction (function (movement) {
  isLeftTrigger = true;

  isRightTrigger = false;
}, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

handlerR.setInputAction (function (movement) {
  isLeftTrigger = false;

  isRightTrigger = true;
}, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

var isLeftTrigger = false;

var isRightTrigger = false;

var syncViewerL = function () {
  if (isLeftTrigger) {
    viewerR.camera.flyTo ({
      destination: viewerL.camera.position,

      orientation: {
        heading: viewerL.camera.heading,

        pitch: viewerL.camera.pitch,

        roll: viewerL.camera.roll,
      },

      duration: 0.0,
    });
  }
};

viewerL.camera.changed.addEventListener (syncViewerL);

viewerL.scene.preRender.addEventListener (syncViewerL);

var syncViewerR = function () {
  if (isRightTrigger) {
    viewerL.camera.flyTo ({
      destination: viewerR.camera.position,

      orientation: {
        heading: viewerR.camera.heading,

        pitch: viewerR.camera.pitch,

        roll: viewerR.camera.roll,
      },

      duration: 0.0,
    });
  }
};

viewerL.camera.changed.addEventListener (syncViewerR);

viewerL.scene.preRender.addEventListener (syncViewerR);
