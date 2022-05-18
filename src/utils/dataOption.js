// 1-智能警戒潮,2-渔船观测系统,3-综合浮标系统,4-验潮站,5-海洋站,6-风暴潮监测站,7-风暴潮监测点.8-海气浮标
// 海气浮标数据 1001
export const dataOption = {
    // 1、智能警戒潮
    '1': [
        { type: "index", width: "80", prop: "index", align: 'center', label: "序号" },
        { type: "", width: "120", prop: "areaName", label: "分布区" },
        { type: "", width: "160", prop: "stationId", label: "站点代码" },
        { type: "", width: "120", prop: "stationTypeName", label: "站点类型" },
        { type: "", width: "130", prop: "stationName", label: "站点名称" },
        // 要素
        { type: "", width: "140", align: 'center', prop: "waterLevel", label: "实时水位值" },
        // { type: "", width: "140", align: 'center', prop: "waterLevelAddSpeed", label: "水位增速" },
        { type: "", width: "140", align: 'center', prop: "tideWarnLevel", label: "潮位警戒级别" },
        { type: "", width: "140", align: 'center', prop: "tcase", label: "机箱温度" },
        { type: "", width: "140", align: 'center', prop: "cardMemory", label: "内存卡容量", unit: "MB" },
        { type: "", width: "140", align: 'center', prop: "batteryVoltage", label: "电池组电压", unit: 'V' },
    // 时间
    // { type: "", width: "200", prop: "dataTime", label: "监测时间" },
    ],
    // 2：渔船观测系统
    '2': [
        { type: "index", width: "80", prop: "index", align: 'center', label: "序号" },
        { type: "", width: "120", prop: "areaName", label: "分布区" },
        { type: "", width: "160", prop: "stationId", label: "站点代码" },
        { type: "", width: "120", prop: "stationTypeName", label: "站点类型" },
        { type: "", width: "130", prop: "stationName", label: "站点名称" },
        // 要素
        { type: "", width: "140", align: 'center', prop: "windSpeed", label: "风速", unit: 'm/s' },
        { type: "", width: "140", align: 'center', prop: "windDirection", label: "风向", unit: '°' },
        { type: "", width: "140", align: 'center', prop: "longitude", label: "经度" },
        { type: "", width: "140", align: 'center', prop: "latitude", label: "纬度" },
        { type: "", width: "140", align: 'center', prop: "position", label: "方位", unit: "°" },
        { type: "", width: "140", align: 'center', prop: "speed", label: "航速", unit: "m/s" },
        { type: "", width: "140", align: 'center', prop: "airTemperature", label: "空气温度", unit: '℃' },
        { type: "", width: "140", align: 'center', prop: "relativeHumidity", label: "相对湿度", unit: '%RH' },
        { type: "", width: "140", align: 'center', prop: "pressure", label: "大气压", unit: 'hPa' },
        { type: "", width: "140", align: 'center', prop: "tcase", label: "机箱温度", unit: '°' },
        { type: "", width: "140", align: 'center', prop: "cardMemory", label: "内存卡容量", unit: 'Mb' },
        { type: "", width: "140", align: 'center', prop: "batteryVoltage", label: "电池组电压", unit: 'V' },
    // 时间
    // { type: "", width: "200", prop: "dataTime", label: "监测时间" },
    ],
    // 6：风暴潮监测站
    '6': [
        { type: "index", width: "80", prop: "index", align: 'center', label: "序号" },
        { type: "", width: "120", prop: "areaName", label: "分布区" },
        { type: "", width: "160", prop: "stationId", label: "站点代码" },
        { type: "", width: "120", prop: "stationTypeName", label: "站点类型" },
        { type: "", width: "130", prop: "stationName", label: "站点名称" },
        // 要素
        { type: "", width: "140", align: 'center', prop: "windSpeed", label: "风速", unit: 'm/s' },
        { type: "", width: "140", align: 'center', prop: "windDirection", label: "风向", unit: '°' },
        { type: "", width: "140", align: 'center', prop: "extremelyWindSpeed", label: "极大风速", unit: 'm/s' },
        { type: "", width: "140", align: 'center', prop: "extremelyWindDirection", label: "极大风向", unit: '°' },
        { type: "", width: "140", align: 'center', prop: "extremelyWindTime", label: "极大风速出现时间" },
        { type: "", width: "140", align: 'center', prop: "airTemperature", label: "空气温度", unit: '℃' },
        { type: "", width: "140", align: 'center', prop: "relativeHumidity", label: "相对湿度", unit: '%RH' },
        { type: "", width: "140", align: 'center', prop: "pressure", label: "气压", unit: 'hPa' },
        { type: "", width: "140", align: 'center', prop: "waterLevel", label: "水位", unit: 'm' },
        { type: "", width: "140", align: 'center', prop: "averWaveHeight", label: "平均波高", unit: 'm' },
        { type: "", width: "140", align: 'center', prop: "averWavePeriod", label: "平均波周期", unit: 's' },
        { type: "", width: "140", align: 'center', prop: "oneTenthHeight", label: "1/10波高", unit: 'm' },
        { type: "", width: "140", align: 'center', prop: "oneTenthPeriod", label: "1/10波周期", unit: 's' },
        { type: "", width: "140", align: 'center', prop: "oneThirdHeight", label: "1/3波高", unit: 'm' },
        { type: "", width: "140", align: 'center', prop: "oneThirdPeriod", label: "1/3波周期", unit: 's' },
        { type: "", width: "140", align: 'center', prop: "waveOverHeight", label: "总越浪高度", unit: 'm' },
        { type: "", width: "140", align: 'center', prop: "waveOverNumber", label: "总越浪次数"},
        { type: "", width: "140", align: 'center', prop: "averWindSpeed", label: "平均风速", unit: 'm/s' },
        { type: "", width: "140", align: 'center', prop: "averWindDirection", label: "平均风向", unit: '°' },
        { type: "", width: "140", align: 'center', prop: "maxWindSpeed", label: "最大风速", unit: 'm/s' },
        { type: "", width: "140", align: 'center', prop: "maxWindDirection", label: "最大风速风向", unit: '°' },
        { type: "", width: "140", align: 'center', prop: "tideChangeSpeed", label: "潮位变化速度", unit: 'm/min' },
        { type: "", width: "140", align: 'center', prop: "tideChangeAcceleration", label: "潮位变化加速度", unit: 'm/min²' },
        { type: "", width: "140", align: 'center', prop: "averWaveOverAmount", label: "平均越浪量", unit: 'm³/s·m' },
        { type: "", width: "140", align: 'center', prop: "waveRunUpHeight", label: "波浪爬高", unit: 'm' },
        { type: "", width: "140", align: 'center', prop: "tcase", label: "机箱温度", unit: '°' },
        { type: "", width: "140", align: 'center', prop: "cardMemory", label: "存储容量", unit: 'Mb' },
        { type: "", width: "140", align: 'center', prop: "batteryVoltage", label: "电池电压", unit: 'V' },
    // 时间
    // { type: "", width: "200", prop: "dataTime", label: "监测时间" },
    ],
    // 7:风暴潮监测点
    '7': [
        { type: "index", width: "80", prop: "index", align: 'center', label: "序号" },
        { type: "", width: "120", prop: "areaName", label: "分布区" },
        { type: "", width: "160", prop: "stationId", label: "站点代码" },
        { type: "", width: "120", prop: "stationTypeName", label: "站点类型" },
        { type: "", width: "130", prop: "stationName", label: "站点名称" },
        // 要素
        { type: "", width: "140", align: 'center', prop: "waterLevel", label: "实时水位值", unit: 'm' },
        { type: "", width: "140", align: 'center', prop: "rainfall", label: "降雨量", unit: 'mm' },
        // { type: "", width: "140", align: 'center', prop: "addWaterSpeed", label: "增水速度", unit: 'm/s' },
        { type: "", width: "140", align: 'center', prop: "tcase", label: "机箱温度", unit: '°' },
        { type: "", width: "140", align: 'center', prop: "cardMemory", label: "存储容量", unit: 'Mb' },
        { type: "", width: "140", align: 'center', prop: "batteryVoltage", label: "电池电压", unit: 'V' },
        { type: "", width: "140", align: 'center', prop: "tideChangeSpeed", label: "潮位变化速度", unit: 'm/min' },
        { type: "", width: "140", align: 'center', prop: "tideChangeAcceleration", label: "潮位变化加速度", unit: 'm/min²' },
    // { type: "", width: "140", align: 'center', prop: "waveRunUpHeight", label: "波浪爬高", unit: 'm' },
    // 时间
    // { type: "", width: "200", prop: "dataTime", label: "监测时间" },
    ],
    // 8:海气浮标数据
    '1001': [
        { type: "index", width: "80", prop: "index", align: 'center', label: "序号" },
        { type: "", width: "120", prop: "areaName", label: "分布区" },
        { type: "", width: "160", prop: "stationId", label: "站点代码" },
        { type: "", width: "120", prop: "stationTypeName", label: "站点类型" },
        { type: "", width: "130", prop: "stationName", label: "站点名称" },
        // 要素
        { type: "", width: "140", align: 'center', prop: "iridiumLatitude", label: "铱星纬度" },
        { type: "", width: "140", align: 'center', prop: "iridiumLongitude", label: "铱星经度" },
        { type: "", width: "140", align: 'center', prop: "gpsLatitude", label: "GPS纬度" },
        { type: "", width: "140", align: 'center', prop: "gpsLongitude", label: "GPS经度" },
        { type: "", width: "140", align: 'center', prop: "pressure", label: "气压", unit: "hPa" },
        { type: "", width: "140", align: 'center', prop: "airTemperatureOne", label: "气温1", unit: "℃" },
        { type: "", width: "140", align: 'center', prop: "relativeHumidityOne", label: "相对湿度1", unit: '%RH' },
        { type: "", width: "140", align: 'center', prop: "trueWindDirection", label: "真风向", unit: '°' },
        { type: "", width: "140", align: 'center', prop: "trueWindSpeed", label: "真风速", unit: 'm/s' },
        { type: "", width: "140", align: 'center', prop: "relativeWindDirection", label: "相对风向", unit: 'm/s' },
        { type: "", width: "140", align: 'center', prop: "relativeWindSpeed", label: "相对风速", unit: 'm/s' },
        { type: "", width: "140", align: 'center', prop: "airTemperatureTwo", label: "气温2", unit: '℃' },
        { type: "", width: "140", align: 'center', prop: "relativeHumidityTwo", label: "相对湿度2", unit: '%RH' },
        { type: "", width: "140", align: 'center', prop: "waterTemperature", label: "水温", unit: '°C' },
        { type: "", width: "140", align: 'center', prop: "conductivity", label: "电导率", unit: 'mS/cm' },
        { type: "", width: "140", align: 'center', prop: "samplingFrequency", label: "采样频率" },
        { type: "", width: "140", align: 'center', prop: "samplingPoints", label: "采样点数" },
        { type: "", width: "140", align: 'center', prop: "numberOfWaves", label: "波浪个数" },
        { type: "", width: "140", align: 'center', prop: "maxWaveHeight", label: "最大波高", unit: 'cm' },
        { type: "", width: "140", align: 'center', prop: "maxWavePeriod", label: "最大波周期", unit: 's' },
        { type: "", width: "140", align: 'center', prop: "oneTenthHigh", label: "1/10波高", unit: 'cm' },
        { type: "", width: "140", align: 'center', prop: "oneTenthPeriod", label: "1/10波周期", unit: 's' },
        { type: "", width: "140", align: 'center', prop: "oneThirdHigh", label: "1/3波高", unit: 'cm' },
        { type: "", width: "140", align: 'center', prop: "oneThirdPeriod", label: "1/3波周期", unit: 's' },
        { type: "", width: "140", align: 'center', prop: "averageWaveHigh", label: "平局波高", unit: 'cm' },
        { type: "", width: "140", align: 'center', prop: "averageWavePeriod", label: "平均波周期", unit: 's' },
        { type: "", width: "140", align: 'center', prop: "mainWaveDirection", label: "主波向", unit: '°' },
        { type: "", width: "140", align: 'center', prop: "minRollAngle", label: "最小横摇角", unit: '°' },
        { type: "", width: "140", align: 'center', prop: "averageRollAngle", label: "平均横摇角", unit: '°' },
        { type: "", width: "140", align: 'center', prop: "maxRollAngle", label: "最大横摇角", unit: '°' },
        { type: "", width: "140", align: 'center', prop: "minPitchAngle", label: "最小纵摇角", unit: '°' },
        { type: "", width: "140", align: 'center', prop: "averagePitchAngle", label: "平均纵摇角", unit: '°' },
        { type: "", width: "140", align: 'center', prop: "maxPitchAngle", label: "最大纵摇角", unit: '°' },
        { type: "", width: "140", align: 'center', prop: "batteryVoltage", label: "电池组电压", unit: 'V' },
        { type: "", width: "140", align: 'center', prop: "primaryVoltage", label: "一次电电压", unit: 'V' },
        { type: "", width: "140", align: 'center', prop: "secondaryVoltage", label: "二次电电压", unit: 'V' },
        { type: "", width: "140", align: 'center', prop: "chargingVoltage", label: "充电电压", unit: 'V' },
        { type: "", width: "140", align: 'center', prop: "modifyChargingCurrent", label: "充电电流", unit: 'A' },
        { type: "", width: "140", align: 'center', prop: "internalTemperature", label: "内部温度", unit: '°C' },
        { type: "", width: "140", align: 'center', prop: "dataNotSend", label: "系统未发送数据条数" },
        { type: "", width: "140", align: 'center', prop: "workingMode", label: "工作模式" },
        { type: "", width: "140", align: 'center', prop: "buoyNumber", label: "浮标序列号" },
    // { type: "", width: "140", align: 'center', prop: "tcase", label: "机箱温度", unit: '°' },
    // { type: "", width: "140", align: 'center', prop: "cardMemory", label: "内存卡容量", unit: 'Mb' },
    // 时间
    // { type: "", width: "200", prop: "dataTime", label: "监测时间" },
    ],
}

// 0： 普通图表 1：波高、波周期  2：越浪 3：气温湿度 4：风向
export const echartLineNameList = {
    'waterLevelRespList': { element: 'waterLevel', name: '实时水位值', unit: 'm', type: 0 },
    // 'tideChangeSpeedRespList': { element: 'tideChangeSpeed', name: '潮位变化速度曲线', unit: 'm/min', type: 0 },
    // 'tideChangeAccelerationRespList': { element: 'tideChangeAcceleration', name: '潮位变化加速度曲线', unit: 'm/min²', type: 0 },
    'stormStationWaveHeightRespList': { name: '平均波高、1/3波高、1/10波高', unit: 'm', type: 1 },
    'stormStationWavePeriodRespList': { name: '平均波周期、1/3波周期、1/10波周期', unit: '个', type: 1 },
    'stormStationWaveOverRespList': { name: '总越浪高度、总越浪次数', unit: '', type: 2 },
    'stormStationAverWaveOverAmountRespList': { element: 'averWaveOverAmount', name: '平均越浪量', unit: 'm²/s', type: 0 },
    'waveRunUpHeightRespList': { element: 'waveRunUpHeight', name: '波浪爬高', unit: 'm', type: 0},
    'windRespList': { name: '平均风速风向、极大风速风向、最大风速风向', unit: 'm/s', type: 4},
    'pressureRespList': { element: 'pressure', name: '气压', unit: 'hPa', type: 0},
    'airTemperatureAndRelativeHumidityRespList': { name: '气温、相对湿度', unit: '', type: 3},
    'tcaseRespList': { element: 'tcase', name: '机箱温度', unit: '℃', type: 0},
    'batteryVoltageRespList': { element: 'batteryVoltage', name: '电池电压', unit: 'V', type: 0 },
    'rainfallRespList': { element: 'rainfall', name: '降雨量', unit: 'mm', type: 0},
    'addWaterAccelerationRespList':{element: 'addWaterAcceleration', name: '水位变化加速度', unit: 'm/min²', type: 0},
    'addWaterSpeedRespList':{element: 'addWaterSpeed', name: '水位变化速度', unit: 'm/min', type: 0},
    'sxWaterLevelRespList':{element: 'sxWaterLevel', name: '视像水位', unit: 'm', type: 0},


    // 海气浮标
    'waterTemperatureRespList': { element: 'waterTemperature', name: '水温', unit: '℃', type: 0},
    'conductivityRespList': { element: 'conductivity', name: '电导率', unit: 'mS/cm', type: 0},
    'numberOfWavesRespList': { element: 'numberOfWaves', name: '波浪个数', unit: '个', type: 0},
    'airSeaBuoyWaveHighRespList': { name: '平均波高、1/3波高、1/10波高、最大波高', unit: 'cm', type: 1},
    'airSeaBuoyWavePeriodRespList': { name: '平均波周期、1/3波周期、1/10波周期、最大波周期', unit: '个', type: 1},
    'mainWaveDirectionRespList': { element: 'mainWaveDirection', name: '主波向', unit: '°', type: 0},
    'airTemperatureAndRelativeHumidityOneRespList': { name: '气温1、相对湿度1', unit: '', type: 3},
    'airTemperatureAndRelativeHumidityTwoRespList': { name: '气温2、相对湿度2', unit: '', type: 3},
    'airSeaBuoyTrueWindRespList': { name: '真风速风向', unit: '°', type: 4},
    'airSeaBuoyRelativeWindRespList': { name: '相对风速风向', unit: 'm/s', type: 4},
    'internalTemperatureRespList': { element: 'internalTemperature', name: '内部温度', unit: '℃', type: 0},
}

// 折线图要素类型
export const echartLineElementType = {
    // 水文数据
    'waterElement': [
        'waterLevelRespList',
        // 'tideChangeSpeedRespList',
        // 'tideChangeAccelerationRespList',
        'stormStationWaveHeightRespList',
        'stormStationWavePeriodRespList',
        'stormStationWaveOverRespList',
        'stormStationAverWaveOverAmountRespList',
        'waveRunUpHeightRespList',
        'addWaterAccelerationRespList',
        'addWaterSpeedRespList',
        'sxWaterLevelRespList',//视像水位

        // 海气浮标
        'waterTemperatureRespList',
        'conductivityRespList',
        'numberOfWavesRespList',
        'airSeaBuoyWaveHighRespList',
        'airSeaBuoyWavePeriodRespList',
        'mainWaveDirectionRespList'
    ],
    // 气象数据
    'atmosphereElement': [
        'windRespList',
        'pressureRespList',
        'airTemperatureAndRelativeHumidityRespList',
        'rainfallRespList',
        // 海气浮标
        'pressureRespList',
        'airTemperatureAndRelativeHumidityOneRespList',
        'airTemperatureAndRelativeHumidityTwoRespList',
        'airSeaBuoyTrueWindRespList',
        'airSeaBuoyRelativeWindRespList'
    ],
    // 状态数据
    'statusElement': [
        'tcaseRespList',
        // 海气
        'internalTemperatureRespList',
        'batteryVoltageRespList'
    ]
}