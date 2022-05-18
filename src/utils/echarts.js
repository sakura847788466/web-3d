import echarts from 'echarts'
import baseUtil from './base'
let urlLink = ''
// 真风向、风速 相对风向、相对风速
export const renderWindOneEchart = (myChart, data, title, unit) => {
    myChart.clear()
    let dims = {
        time: 0,
        windSpeed: 1,
        R: 2
    }
    let option = {
        color: ['#00A9E6', '#FDB320'],
        title: {
            subtext: 'm/s',
            left: 6,
            top: -15,
            subtextStyle: {
                fontSize: 12,
                color: '#FFFFFF'
            }
        },
        legend: {
            show: true,
            right: 0,
            top: 6,
            // icon: 'rect',
            itemWidth: 24,
            itemHeight: 12,
            data: [{
                name: title[0],
                icon: 'image://../img/windIcon/legend-01.png'
            }],
            textStyle: {
                color: '#9F9FAD'
            }
        },
        tooltip: {
            trigger: 'axis',
            borderColor: 'transparent',
            backgroundColor: 'transparent',
            formatter: function(params) {
                let tooltipHtml = `<div class="tooltip-style">
          <div class="tooltip-title">${echarts.format.formatTime('yyyy/MM/dd hh:mm', params[0].value[dims.time])}</div>
          <div class="tooltip-item">
            <p class="normal-title">${params[0].seriesName}</p>
            <span>${baseUtil.isNumber(params[0].value[dims.windSpeed]) ? params[0].value[dims.windSpeed] : '-'} m/s</span>
            <span>${baseUtil.isNumber(params[0].value[dims.R]) ? baseUtil.windDirectionSwitch(params[0].value[dims.R]) : '-'} </span>
          </div>
        </div>`
                return tooltipHtml
            },
            axisPointer: {
                show: true,
                type: 'line',
                lineStyle: {
                    type: 'dashed',
                    width: 1,
                    color: '#aaa'
                }
            }
        },
        grid: {
            top: 25,
            bottom: 60,
            left: 30,
            right: 16
        },
        xAxis: {
            type: 'time',
            axisLine: {
                lineStyle: {
                    color: '#D6D6D6'
                }
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: ['rgba(221, 251, 255, 0.3882352941176471)'],
                    width: 2,
                    type: 'solid'
                }
            },
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#FFFFFF',
                    fontSize: 12
                }
            }
        },
        yAxis: {
            nameLocation: 'middle',
            axisLine: {
                lineStyle: {
                    color: '#D6D6D6'
                }
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: ['rgba(221, 251, 255, 0.3882352941176471)'],
                    width: 2,
                    type: 'solid'
                }
            },
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#FFFFFF',
                    fontSize: 12
                }
            }
        },
        dataZoom: [{
            type: 'slider',
            height: 6,
            left: 20,
            right: 20,
            bottom: 6,
            textStyle: 'none',
            show: true,
            handleSize: 24,
            fillerColor: '#CBFBFF',
            backgroundColor: '#608594',
            dataBackground: {
                lineStyle: {
                    opacity: 0
                },
                areaStyle: {
                    opacity: 0,
                }
            },
            borderColor: 'none',
            // end: 40,
            handleIcon: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAVCAYAAACg/AXsAAACPklEQVQ4T62UvU9TURjGf+d+lLaB0tgIVmtscANl4R9gkMTERUxKgiwuEI2jBF2UKy6KOBoNJOpSSWiiLiYaGPgHWLAwEtQKgqmVj/SD+3FMb6EEbAkRznhzzy/P+zzPewTHcMS/DCmQQBcKMWAeQTOSBDCBg3tDFP8on70QKUX7Q9RF0Pyg+byodXnEhheZy2NnwYqCNT2IjdgF7UIMqbSFUb1/8FoWfqHgMyVeRUF1HGxdkJcOOW2NbP48+ZllbAzhuLpKmqRoN1DNLD7nFAHHJnT/Mh3nTtCCREdgfkuTHPrMlKKSVn6yrvvJTRvYxdHKkKhBTaNOPR4a3/cxEg7Qsd+v5TUmO8foZ4uVFZO1RYPCLiQm1eYWfLUqJx9c5dqVC4xUC+1jkv6hD7zbtPk1P0eOhLBdJbEJqS4sUKsLTo/2MHDxDDeK3zOZDFKWgggGgyiKQnKJ172veGrqLDU1sZno2oa0G1KzaqizBZGXPdxrjXC9eLFQKJQFeTwehBDMpnh7M85jVZLSCmxMG8JylbT1SV2NEvAoRJ73cLc1Qne1cWZTjN+O82TLIWUvsj4zKsw9EE3j7ItuBnYgq6urOI6bIg0NDe44RcitcYYti+8VIfuV7PjhdkGUgqyqpJonlmWVjdU07WBPqqWTTqfL44RCIXecLz940xdn2JT70uE4elKs/Z7G9vIsXM+lCo2d6hzjTuXGHmJ3vv5m7tEnJg/YHeCwW6yRzQcrbvG28CO/J2UDjvqy/ed7+xehQlIlazn+SgAAAABJRU5ErkJggg=='
        }, {
            type: 'inside'
        }],
        series: [{
            name: title[0],
            type: 'line',
            symbol: 'image://../img/windIcon/arrow-04.png',
            symbolSize: '20',
            encode: {
                x: dims.time,
                y: dims.windSpeed
            },
            lineStyle: {
                normal: {
                    type: 'dashed',
                    shadowColor: 'rgba(57, 136, 255, 0.3)',
                    shadowOffsetX: 0,
                    shadowOffsetY: 0,
                    shadowBlur: 2,
                    color: '#3988FF',
                    width: 1
                }
            },
            smooth: true,
            // data: data[0],
            data:[10,45,34,23,25,12,32,56,21,10],
            z: 1
        }]
    }


    myChart.setOption(option)
}
// 平均风速、平均风向、极大风速、极大风向、最大风速、最大风向
export const renderWindTwoEchart = (myChart, data, title, unit) => {
    myChart.clear()
    let dims = {
        time: 0,
        windSpeed: 1,
        R: 2
    }
    let option = {
        color: ['#00A9E6', '#FDB320'],
        title: {
            subtext: 'm/s',
            left: 6,
            top: -10,
            subtextStyle: {
                fontSize: 12,
                color: '#FFFFFF'
            }
        },
        legend: {
            show: true,
            right: 0,
            top: 6,
            icon: 'rect',
            itemWidth: 24,
            itemHeight: 12,
            data: [{
                name: title[0],
                icon: 'image://../img/windIcon/legend-01.png'
            }, {
                name: title[1],
                icon: 'image://../img/windIcon/legend-02.png'
            }, {
                name: title[2],
                icon: 'image://../img/windIcon/legend-03.png'
            }],
            textStyle: {
                color: '#9F9FAD'
            }
        },
        tooltip: {
            trigger: 'axis',
            borderColor: 'transparent',
            backgroundColor: 'transparent',
            formatter: function(params) {
                let tooltipHtml = `<div class="tooltip-style">
        <div class="tooltip-title">${echarts.format.formatTime('yyyy/MM/dd hh:mm', params[0].value[dims.time])}</div>`
                params.forEach((item, index) => {
                    tooltipHtml += `<div class="tooltip-item">
            <p class="normal-title">${item.seriesName}</p>
            <span>${baseUtil.isNumber(item.value[dims.windSpeed]) ? item.value[dims.windSpeed] : '-'} m/s</span>
            <span>${baseUtil.isNumber(item.value[dims.R]) ? baseUtil.windDirectionSwitch(item.value[dims.R]) : '-'} </span>
          </div>`
                })
                tooltipHtml += '</div>'
                return tooltipHtml
            },
            axisPointer: {
                show: true,
                type: 'line',
                lineStyle: {
                    type: 'dashed',
                    width: 1,
                    color: '#aaa'
                }
            }
        },
        grid: {
            top: 40,
            bottom: 60,
            left: 30,
            right: 16
        },
        xAxis: {
            type: 'time',
            axisLine: {
                lineStyle: {
                    color: '#EAF0F4'
                }
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: ['rgba(221, 251, 255, 0.3882352941176471)'],
                    width: 2,
                    type: 'solid'
                }
            },
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#9F9FAD',
                    fontSize: 8
                }
            }
        },
        yAxis: {
            nameLocation: 'middle',
            axisLine: {
                lineStyle: {
                    color: '#D6D6D6'
                }
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: ['rgba(221, 251, 255, 0.3882352941176471)'],
                    width: 2,
                    type: 'solid'
                }
            },
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#FFFFFF',
                    fontSize: 12
                }
            }
        },
        dataZoom: [{
            type: 'slider',
            // width: ,
            height: 6,
            left: 20,
            right: 10,
            bottom: 6,
            textStyle: 'none',
            show: true,
            handleSize: 24,
            fillerColor: '#CBFBFF',
            backgroundColor: '#608594',
            borderColor: 'none',
            dataBackground: {
                lineStyle: {
                    opacity: 0
                },
                areaStyle: {
                    opacity: 0,
                }
            },
            // end: 40,
            handleIcon: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAVCAYAAACg/AXsAAACPklEQVQ4T62UvU9TURjGf+d+lLaB0tgIVmtscANl4R9gkMTERUxKgiwuEI2jBF2UKy6KOBoNJOpSSWiiLiYaGPgHWLAwEtQKgqmVj/SD+3FMb6EEbAkRznhzzy/P+zzPewTHcMS/DCmQQBcKMWAeQTOSBDCBg3tDFP8on70QKUX7Q9RF0Pyg+byodXnEhheZy2NnwYqCNT2IjdgF7UIMqbSFUb1/8FoWfqHgMyVeRUF1HGxdkJcOOW2NbP48+ZllbAzhuLpKmqRoN1DNLD7nFAHHJnT/Mh3nTtCCREdgfkuTHPrMlKKSVn6yrvvJTRvYxdHKkKhBTaNOPR4a3/cxEg7Qsd+v5TUmO8foZ4uVFZO1RYPCLiQm1eYWfLUqJx9c5dqVC4xUC+1jkv6hD7zbtPk1P0eOhLBdJbEJqS4sUKsLTo/2MHDxDDeK3zOZDFKWgggGgyiKQnKJ172veGrqLDU1sZno2oa0G1KzaqizBZGXPdxrjXC9eLFQKJQFeTwehBDMpnh7M85jVZLSCmxMG8JylbT1SV2NEvAoRJ73cLc1Qne1cWZTjN+O82TLIWUvsj4zKsw9EE3j7ItuBnYgq6urOI6bIg0NDe44RcitcYYti+8VIfuV7PjhdkGUgqyqpJonlmWVjdU07WBPqqWTTqfL44RCIXecLz940xdn2JT70uE4elKs/Z7G9vIsXM+lCo2d6hzjTuXGHmJ3vv5m7tEnJg/YHeCwW6yRzQcrbvG28CO/J2UDjvqy/ed7+xehQlIlazn+SgAAAABJRU5ErkJggg=='
        }, {
            type: 'inside'
        }],
        series: [{
            name: title[0],
            type: 'line',
            symbol: 'image://../img/windIcon/arrow-01.png',
            symbolSize: '14',
            encode: {
                x: dims.time,
                y: dims.windSpeed
            },
            itemStyle: {
                normal: {
                    shadowColor: 'rgba(57, 136, 255, 0.3)',
                    shadowBlur: 3
                }
            },
            lineStyle: {
                normal: {
                    type: 'dashed',
                    shadowColor: 'rgba(57, 136, 255, 0.3)',
                    shadowOffsetX: 0,
                    shadowOffsetY: 0,
                    shadowBlur: 2,
                    color: '#3988FF',
                    width: 1
                }
            },
            //   emphasis: {
            //     itemStyle: {
            //       opacity: 0
            //     }
            //   },
            smooth: true,
            data: data[0],
            z: 1
        }, {
            name: title[1],
            type: 'line',
            symbol: 'image://../img/windIcon/arrow-02.png',
            symbolSize: '14',
            encode: {
                x: dims.time,
                y: dims.windSpeed
            },
            itemStyle: {
                normal: {
                    shadowColor: 'rgba(255, 214, 50, 0.44)',
                    shadowBlur: 2
                }
            },
            lineStyle: {
                normal: {
                    type: 'dashed',
                    shadowColor: 'rgba(255, 214, 50, 0.44)',
                    shadowOffsetX: 0,
                    shadowOffsetY: 0,
                    shadowBlur: 2,
                    color: '#FFD632'
                }
            },
            emphasis: {
                // itemStyle: {
                //   opacity: 0
                // }
            },
            smooth: true,
            data: data[1],
            z: 1
        }, {
            name: title[2],
            type: 'line',
            symbol: 'image://../img/windIcon/arrow-03.png',
            symbolSize: '14',
            encode: {
                x: dims.time,
                y: dims.windSpeed
            },
            itemStyle: {
                normal: {
                    shadowColor: 'rgba(49, 218, 179, 0.44)',
                    shadowBlur: 2
                }
            },
            lineStyle: {
                normal: {
                    type: 'dashed',
                    shadowColor: 'rgba(49, 218, 179, 0.44)',
                    shadowOffsetX: 0,
                    shadowOffsetY: 0,
                    shadowBlur: 2,
                    color: '#31DAB3',
                    width: 1
                }
            },
            //   emphasis: { // 将鼠标经过的点设置为透明
            //     itemStyle: {
            //       opacity: 0
            //     }
            //   },
            smooth: true,
            data: data[2],
            z: 1
        }]
    }
    myChart.setOption(option)
}
// 普通折线图
export const renderLineEchart = (myChart, data, title, unit) => {
    function changeLeftPosition(val) {
      return {
        '水位变化速度':'10%',
        '水位变化加速度':'11%',
        '气压': '11%',
        '增水速度':'10%',
        '增水加速度':'10%'
      }[val]
    }
    myChart.clear()
    let option = {
        color: ['#00A9E6'],
        title: {
            subtext: unit,
            left: 6,
            top: -10,
            subtextStyle: {
                fontSize: 12,
                color: '#ffffff'
            }
        },
        legend: {
            show: true,
            right: 0,
            top: 0,
            itemWidth: 22,
            itemHeight: 6,
            data: [title],
            textStyle: {
                color: 'rgba(195, 245, 255, 0.83)',
                fontSize: 12
            }
        },
        tooltip: {
            trigger: 'axis',
            borderColor: 'transparent',
            backgroundColor: 'transparent',
            formatter: function(params) {
                let tooltipHtml = `<div class="tooltip-style">
          <div class="tooltip-title">${echarts.format.formatTime('yyyy/MM/dd hh:mm', params[0].value[0])}</div>
          <div class="tooltip-item">
            <p class="normal-title">${params[0].seriesName}</p>
            <span>${baseUtil.isNumber(params[0].value[1]) ? params[0].value[1] : '-'} ${unit}</span>
          </div>
        </div>`
                return tooltipHtml
            },
            axisPointer: {
                show: true,
                type: 'line',
                lineStyle: {
                    type: 'dashed',
                    width: 1,
                    color: '#aaa'
                }
            }
        },
        grid: {
            top: 30,
            bottom: 50,
            // left: 30,
            left:changeLeftPosition(title) || 30,
            right: 16
        },
        xAxis: {
            type: 'time',
            axisLine: {
                lineStyle: {
                    color: 'rgba(221, 251, 255, 0.3882352941176471)',
                    width:1
                }
            },
            splitLine: {
                show: false
            },
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#FFFFFF',
                    fontSize: 12
                }
            }
        },
        yAxis: {
            nameLocation: 'middle',
            nameGap: 35,
            axisLine: {
                lineStyle: {
                    color: 'rgba(221, 251, 255, 0.3882352941176471)'
                }
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: ['rgba(221, 251, 255, 0.3882352941176471)'],
                    width: 2,
                    type: 'solid'
                }
            },
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#FFFFFF',
                    fontSize: 12
                }
            }
        },
        dataZoom: [{
            type: 'slider',
            // width: ,
            height: 6,
            left: 20,
            right: 10,
            bottom: 6,
            textStyle: 'none',
            show: true,
            handleSize: 24,
            fillerColor: '#CBFBFF',
            backgroundColor: '#608594',
            borderColor: 'none',
            dataBackground: {
                lineStyle: {
                    opacity: 0
                },
                areaStyle: {
                    opacity: 0,
                }
            },
            // end: 40,
            handleIcon: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAVCAYAAACg/AXsAAACPklEQVQ4T62UvU9TURjGf+d+lLaB0tgIVmtscANl4R9gkMTERUxKgiwuEI2jBF2UKy6KOBoNJOpSSWiiLiYaGPgHWLAwEtQKgqmVj/SD+3FMb6EEbAkRznhzzy/P+zzPewTHcMS/DCmQQBcKMWAeQTOSBDCBg3tDFP8on70QKUX7Q9RF0Pyg+byodXnEhheZy2NnwYqCNT2IjdgF7UIMqbSFUb1/8FoWfqHgMyVeRUF1HGxdkJcOOW2NbP48+ZllbAzhuLpKmqRoN1DNLD7nFAHHJnT/Mh3nTtCCREdgfkuTHPrMlKKSVn6yrvvJTRvYxdHKkKhBTaNOPR4a3/cxEg7Qsd+v5TUmO8foZ4uVFZO1RYPCLiQm1eYWfLUqJx9c5dqVC4xUC+1jkv6hD7zbtPk1P0eOhLBdJbEJqS4sUKsLTo/2MHDxDDeK3zOZDFKWgggGgyiKQnKJ172veGrqLDU1sZno2oa0G1KzaqizBZGXPdxrjXC9eLFQKJQFeTwehBDMpnh7M85jVZLSCmxMG8JylbT1SV2NEvAoRJ73cLc1Qne1cWZTjN+O82TLIWUvsj4zKsw9EE3j7ItuBnYgq6urOI6bIg0NDe44RcitcYYti+8VIfuV7PjhdkGUgqyqpJonlmWVjdU07WBPqqWTTqfL44RCIXecLz940xdn2JT70uE4elKs/Z7G9vIsXM+lCo2d6hzjTuXGHmJ3vv5m7tEnJg/YHeCwW6yRzQcrbvG28CO/J2UDjvqy/ed7+xehQlIlazn+SgAAAABJRU5ErkJggg=='
        }, {
            type: 'inside'
        }],
        series: [{
            name: title,
            type: 'line',
            symbol: 'circle',
            symbolSize: 6,
            connectNulls: true,
            lineStyle: {
                normal: {
                    shadowColor: 'rgba(123, 246, 255, 1)',
                    shadowOffsetX: 0,
                    shadowOffsetY: 0,
                    shadowBlur: 2,
                    color: '#7BF6FF',
                    width: 2
                }
            },
            itemStyle: {
                normal: {
                    color: 'rgba(123, 246, 255, 1)'
                }
            },
            emphasis: {
                itemStyle: {
                    color: '#ffffff',
                    borderColor: '#3988FF'
                }
            },
            areaStyle: {
                //折线图颜色半透明
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                        offset: 0, color: 'rgba(123, 246, 255, 0.34)' // 0% 处的颜色
                    }, {
                        offset: 1, color: 'rgba(123, 246, 255, 0)' // 100% 处的颜色
                    }],
                    global: false // 缺省为 false
                }
            },
            showSymbol: true,
            smooth: true,
            data: data,
            // data:[10,45,34,23,25,12,32,56,21,10,10,45,34,23,25,12,32,56,21,10,10,45,34,23,25,12,32,56,21,10],
            z: 1
        }]
    }
    myChart.setOption(option)
}
// 波高
export const renderWaveHeightEchart = (myChart, data, title, unit) => {
    myChart.clear()
    let option = {
        color: ['#00A9E6'],
        title: {
            subtext: unit,
            left: 6,
            top: -10,
            subtextStyle: {
                fontSize: 12,
                color: '#ffffff'
            }
        },
        legend: {
            show: true,
            right: 0,
            top: 0,
            itemWidth: 22,
            itemHeight: 6,
            data: title,
            textStyle: {
                color: '#C3F5FF',
                fontSize: 12
            }
        },
        tooltip: {
            trigger: 'axis',
            borderColor: 'transparent',
            backgroundColor: 'transparent',
            formatter: function(params) {
                let tooltipHtml = `<div class="tooltip-style">
        <div class="tooltip-title">${echarts.format.formatTime('yyyy/MM/dd hh:mm', params[0].value[0])}</div>`
                params.forEach(item => {
                    tooltipHtml += ` <div class="tooltip-item">
            <p class="normal-title">${item.seriesName}</p>
            <span>${baseUtil.isNumber(item.value[1]) ? item.value[1] : '-'} ${unit}</span>
          </div>`
                })
                tooltipHtml += '</div>'
                return tooltipHtml
            },
            axisPointer: {
                show: true,
                type: 'line',
                lineStyle: {
                    type: 'dashed',
                    width: 1,
                    color: '#aaa'
                }
            }
        },
        grid: {
            top: 30,
            bottom: 50,
            left: 30,
            right: 16
        },
        xAxis: {
            type: 'time',
            axisLine: {
                lineStyle: {
                    color: 'rgba(221, 251, 255, 0.3882352941176471)',
                    width:2,
                }
            },
            splitLine: {
                show: false
            },
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#ffffff',
                    fontSize: 12
                }
            }
        },
        yAxis: {
            nameLocation: 'middle',
            nameGap: 35,
            axisLine: {
                lineStyle: {
                    color: 'rgba(221, 251, 255, 0.3882352941176471)',
                    width:2
                }
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: ['rgba(221, 251, 255, 0.3882352941176471)'],
                    width: 2,
                    type: 'solid'
                }
            },
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#ffffff',
                    fontSize: 12
                }
            }
        },
        dataZoom: [{
            type: 'slider',
            // width: ,
            height: 6,
            left: 20,
            right: 10,
            bottom: 6,
            textStyle: 'none',
            show: true,
            handleSize: 24,
            fillerColor: '#CBFBFF',
            backgroundColor: '#608594',
            borderColor: 'none',
            dataBackground: {
                lineStyle: {
                    opacity: 0
                },
                areaStyle: {
                    opacity: 0,
                }
            },
            // end: 40,
            handleIcon: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAVCAYAAACg/AXsAAACPklEQVQ4T62UvU9TURjGf+d+lLaB0tgIVmtscANl4R9gkMTERUxKgiwuEI2jBF2UKy6KOBoNJOpSSWiiLiYaGPgHWLAwEtQKgqmVj/SD+3FMb6EEbAkRznhzzy/P+zzPewTHcMS/DCmQQBcKMWAeQTOSBDCBg3tDFP8on70QKUX7Q9RF0Pyg+byodXnEhheZy2NnwYqCNT2IjdgF7UIMqbSFUb1/8FoWfqHgMyVeRUF1HGxdkJcOOW2NbP48+ZllbAzhuLpKmqRoN1DNLD7nFAHHJnT/Mh3nTtCCREdgfkuTHPrMlKKSVn6yrvvJTRvYxdHKkKhBTaNOPR4a3/cxEg7Qsd+v5TUmO8foZ4uVFZO1RYPCLiQm1eYWfLUqJx9c5dqVC4xUC+1jkv6hD7zbtPk1P0eOhLBdJbEJqS4sUKsLTo/2MHDxDDeK3zOZDFKWgggGgyiKQnKJ172veGrqLDU1sZno2oa0G1KzaqizBZGXPdxrjXC9eLFQKJQFeTwehBDMpnh7M85jVZLSCmxMG8JylbT1SV2NEvAoRJ73cLc1Qne1cWZTjN+O82TLIWUvsj4zKsw9EE3j7ItuBnYgq6urOI6bIg0NDe44RcitcYYti+8VIfuV7PjhdkGUgqyqpJonlmWVjdU07WBPqqWTTqfL44RCIXecLz940xdn2JT70uE4elKs/Z7G9vIsXM+lCo2d6hzjTuXGHmJ3vv5m7tEnJg/YHeCwW6yRzQcrbvG28CO/J2UDjvqy/ed7+xehQlIlazn+SgAAAABJRU5ErkJggg=='
        }, {
            type: 'inside'
        }],
        series: [{
            name: title[0],
            type: 'line',
            symbol: 'circle',
            symbolSize: 6,
            connectNulls: true,
            lineStyle: {
                normal: {
                    shadowColor: 'rgba(255, 214, 50, 0.44)',
                    shadowOffsetX: 0,
                    shadowOffsetY: 0,
                    shadowBlur: 2,
                    color: '#FFD632',
                    width: 1
                }
            },
            itemStyle: {
                normal: {
                    color: '#FFD632'
                }
            },
            emphasis: {
                itemStyle: {
                    color: '#ffffff',
                    borderColor: '#FFD632'
                }
            },
            showSymbol: true,
            smooth: true,
            data: data[0],
            z: 1
        }, {
            name: title[1],
            type: 'line',
            symbol: 'circle',
            symbolSize: 6,
            connectNulls: true,
            lineStyle: {
                normal: {
                    shadowColor: 'rgba(57, 136, 255, 0.44)',
                    shadowOffsetX: 0,
                    shadowOffsetY: 0,
                    shadowBlur: 2,
                    color: '#3988FF',
                    width: 1
                }
            },
            itemStyle: {
                normal: {
                    color: '#3988FF'
                }
            },
            emphasis: {
                itemStyle: {
                    color: '#ffffff',
                    borderColor: '#3988FF'
                }
            },
            showSymbol: true,
            smooth: true,
            data: data[1],
            z: 1
        }, {
            name: title[2],
            type: 'line',
            symbol: 'circle',
            symbolSize: 6,
            connectNulls: true,
            lineStyle: {
                normal: {
                    shadowColor: 'rgba(49, 218, 179, 0.44)',
                    shadowOffsetX: 0,
                    shadowOffsetY: 0,
                    shadowBlur: 5,
                    color: '#31DAB3',
                    width: 1
                }
            },
            itemStyle: {
                normal: {
                    color: '#31DAB3'
                }
            },
            emphasis: {
                itemStyle: {
                    color: '#ffffff',
                    borderColor: '#31DAB3'
                }
            },

            showSymbol: true,
            smooth: true,
            data: data[2],
            z: 1
        }]
    }
    if (title.length >= 4) {
        option.series.push({
            name: title[3],
            type: 'line',
            symbol: 'circle',
            symbolSize: 6,
            connectNulls: true,
            lineStyle: {
                normal: {
                    shadowColor: 'rgba(255, 156, 27, 0.44)',
                    shadowOffsetX: 0,
                    shadowOffsetY: 0,
                    shadowBlur: 5,
                    color: '#FF9C1B',
                    width: 1
                }
            },
            itemStyle: {
                normal: {
                    color: '#FF9C1B'
                }
            },
            emphasis: {
                itemStyle: {
                    color: '#ffffff',
                    borderColor: '#FF9C1B'
                }
            },
            showSymbol: true,
            smooth: true,
            data: data[3],
            z: 1
        })
    }
    myChart.setOption(option)
}
// 波周期
export const renderWavePeriodEchart = (myChart, data, xAxisData, title, unit) => {
    myChart.clear()
    let option = {
        color: ['#00A9E6'],
        title: {
            subtext: unit,
            left: 6,
            top: -10,
            subtextStyle: {
                fontSize: 12,
                color: '#FFFFFF'
            }
        },
        legend: {
            show: true,
            right: 0,
            top: 0,
            itemWidth: 22,
            itemHeight: 6,
            data: title,
            textStyle: {
                color: '#FFFFFF',
                fontSize: 12
            }
        },
        tooltip: {
            trigger: 'axis',
            borderColor: 'transparent',
            backgroundColor: 'transparent',
            formatter: function(params) {
                let tooltipHtml = `<div class="tooltip-style">
        <div class="tooltip-title">${params[0].name}</div>`
                params.forEach(item => {
                    tooltipHtml += ` <div class="tooltip-item">
            <p class="normal-title">${item.seriesName}</p>
            <span>${item.value || item.value === 0 ? item.value : '-'} ${unit}</span>
          </div>`
                })
                return tooltipHtml
            },
            axisPointer: {
                show: true,
                type: 'line',
                lineStyle: {
                    type: 'dashed',
                    width: 1,
                    color: '#aaa'
                }
            }
        },
        grid: {
            top: 30,
            bottom: 50,
            left: 30,
            right: 16
        },
        xAxis: {
            type: 'category',
            data: xAxisData,
            axisLine: {
                lineStyle: {
                    color: '#EAF0F4'
                }
            },
            splitLine: {
                show: false
            },
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#FFFFFF',
                    fontSize: 12
                }
            }
        },
        yAxis: {
            nameLocation: 'middle',
            nameGap: 35,
            axisLine: {
                lineStyle: {
                    color: '#D6D6D6'
                }
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: ['#EFEFEF'],
                    width: 1,
                    type: 'solid'
                }
            },
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#FFFFFF',
                    fontSize: 12
                }
            }
        },
        dataZoom: [{
            type: 'slider',
            // width: ,
            height: 6,
            left: 20,
            right: 10,
            bottom: 6,
            textStyle: 'none',
            show: true,
            handleSize: 24,
            fillerColor: '#CBFBFF',
            backgroundColor: '#608594',
            borderColor: 'none',
            dataBackground: {
                lineStyle: {
                    opacity: 0
                },
                areaStyle: {
                    opacity: 0,
                }
            },
            // end: 40,
            handleIcon: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAVCAYAAACg/AXsAAACPklEQVQ4T62UvU9TURjGf+d+lLaB0tgIVmtscANl4R9gkMTERUxKgiwuEI2jBF2UKy6KOBoNJOpSSWiiLiYaGPgHWLAwEtQKgqmVj/SD+3FMb6EEbAkRznhzzy/P+zzPewTHcMS/DCmQQBcKMWAeQTOSBDCBg3tDFP8on70QKUX7Q9RF0Pyg+byodXnEhheZy2NnwYqCNT2IjdgF7UIMqbSFUb1/8FoWfqHgMyVeRUF1HGxdkJcOOW2NbP48+ZllbAzhuLpKmqRoN1DNLD7nFAHHJnT/Mh3nTtCCREdgfkuTHPrMlKKSVn6yrvvJTRvYxdHKkKhBTaNOPR4a3/cxEg7Qsd+v5TUmO8foZ4uVFZO1RYPCLiQm1eYWfLUqJx9c5dqVC4xUC+1jkv6hD7zbtPk1P0eOhLBdJbEJqS4sUKsLTo/2MHDxDDeK3zOZDFKWgggGgyiKQnKJ172veGrqLDU1sZno2oa0G1KzaqizBZGXPdxrjXC9eLFQKJQFeTwehBDMpnh7M85jVZLSCmxMG8JylbT1SV2NEvAoRJ73cLc1Qne1cWZTjN+O82TLIWUvsj4zKsw9EE3j7ItuBnYgq6urOI6bIg0NDe44RcitcYYti+8VIfuV7PjhdkGUgqyqpJonlmWVjdU07WBPqqWTTqfL44RCIXecLz940xdn2JT70uE4elKs/Z7G9vIsXM+lCo2d6hzjTuXGHmJ3vv5m7tEnJg/YHeCwW6yRzQcrbvG28CO/J2UDjvqy/ed7+xehQlIlazn+SgAAAABJRU5ErkJggg=='
        }, {
            type: 'inside'
        }],
        series: [{
            name: title[0],
            type: 'line',
            symbol: 'circle',
            symbolSize: 6,
            connectNulls: true,
            lineStyle: {
                normal: {
                    shadowColor: 'rgba(255, 214, 50, 0.44)',
                    shadowOffsetX: 0,
                    shadowOffsetY: 0,
                    shadowBlur: 2,
                    color: '#FFD632',
                    width: 1
                }
            },
            itemStyle: {
                normal: {
                    color: '#FFD632'
                }
            },
            emphasis: {
                itemStyle: {
                    color: '#ffffff',
                    borderColor: '#FFD632'
                }
            },
            showSymbol: true,
            smooth: true,
            data: data[0],
            z: 1
        }, {
            name: title[1],
            type: 'line',
            symbol: 'circle',
            symbolSize: 6,
            connectNulls: true,
            lineStyle: {
                normal: {
                    shadowColor: 'rgba(57, 136, 255, 0.44)',
                    shadowOffsetX: 0,
                    shadowOffsetY: 0,
                    shadowBlur: 2,
                    color: '#3988FF',
                    width: 1
                }
            },
            itemStyle: {
                normal: {
                    color: '#3988FF'
                }
            },
            emphasis: {
                itemStyle: {
                    color: '#ffffff',
                    borderColor: '#3988FF'
                }
            },
            showSymbol: true,
            smooth: true,
            data: data[1],
            z: 1
        }, {
            name: title[2],
            type: 'line',
            symbol: 'circle',
            symbolSize: 6,
            connectNulls: true,
            lineStyle: {
                normal: {
                    shadowColor: 'rgba(49, 218, 179, 0.44)',
                    shadowOffsetX: 0,
                    shadowOffsetY: 0,
                    shadowBlur: 2,
                    color: '#31DAB3',
                    width: 1
                }
            },
            itemStyle: {
                normal: {
                    color: '#31DAB3'
                }
            },
            emphasis: {
                itemStyle: {
                    color: '#ffffff',
                    borderColor: '#31DAB3'
                }
            },

            showSymbol: true,
            smooth: true,
            data: data[2],
            z: 1
        }]
    }
    if (title.length >= 4) {
        option.series.push({
            name: title[3],
            type: 'line',
            symbol: 'circle',
            symbolSize: 6,
            connectNulls: true,
            lineStyle: {
                normal: {
                    shadowColor: 'rgba(255, 156, 27, 0.44)',
                    shadowOffsetX: 0,
                    shadowOffsetY: 0,
                    shadowBlur: 2,
                    color: '#FF9C1B',
                    width: 1
                }
            },
            itemStyle: {
                normal: {
                    color: '#FF9C1B'
                }
            },
            emphasis: {
                itemStyle: {
                    color: '#ffffff',
                    borderColor: '#FF9C1B'
                }
            },
            showSymbol: true,
            smooth: true,
            data: data[3],
            z: 1
        })
    }
    myChart.setOption(option)
}
// 越浪
export const renderOverToppingEchart = (myChart, data, title, unit) => {
    myChart.clear()
    let option = {
        color: ['#00A9E6'],
        legend: {
            show: true,
            right: 40,
            top: 0,
            itemWidth: 22,
            itemHeight: 6,
            data: title,
            textStyle: {
                color: '#FFFFFF',
                fontSize: 12
            }
        },
        tooltip: {
            trigger: 'axis',
            borderColor: 'transparent',
            backgroundColor: 'transparent',
            formatter: function(params) {
                let tooltipHtml = `<div class="tooltip-style">
        <div class="tooltip-title">${echarts.format.formatTime('yyyy/MM/dd hh:mm', params[0].value[0])}</div>`
                params.forEach((item, index) => {
                    tooltipHtml += ` <div class="tooltip-item">
            <p class="normal-title">${item.seriesName}</p>
            <span>${item.value[1] ? item.value[1] : '-'} ${item.seriesName === '总越浪高度' ? 'm' : '个'}</span>
          </div>`
                })
                return tooltipHtml
            },
            axisPointer: {
                show: true,
                type: 'line',
                lineStyle: {
                    type: 'dashed',
                    width: 1,
                    color: '#aaa'
                }
            }
        },
        grid: {
            top: 30,
            bottom: 50,
            left: 30,
            right: 30
        },
        xAxis: [{
            type: 'time',
            axisLine: {
                lineStyle: {
                    color: '#EAF0F4'
                }
            },
            splitLine: {
                show: false
            },
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#FFFFFF',
                    fontSize: 12
                }
            }
        }],
        yAxis: [{
            name: 'm',
            nameTextStyle: {
                color: '#FFFFFF'
            },
            position: 'left',
            axisLine: {
                lineStyle: {
                    color: 'rgba(221, 251, 255, 0.39)'
                }
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: ['rgba(221, 251, 255, 0.39)'],
                    width: 1,
                    type: 'solid'
                }
            },
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#FFFFFF',
                    fontSize: 12
                }
            }
        }, {
            name: '个',
            position: 'right',
            nameTextStyle: {
                color: '#FFFFFF',
                fontSize: 12
            },
            axisLine: {
                lineStyle: {
                    color: '#D6D6D6'
                }
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: ['#EFEFEF'],
                    width: 1,
                    type: 'solid'
                }
            },
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#FFFFFF',
                    fontSize: 12
                }
            }
        }],
        dataZoom: [{
            type: 'slider',
            // width: ,
            height: 6,
            left: 20,
            right: 10,
            bottom: 6,
            textStyle: 'none',
            show: true,
            handleSize: 24,
            fillerColor: '#CBFBFF',
            backgroundColor: '#608594',
            borderColor: 'none',
            dataBackground: {
                lineStyle: {
                    opacity: 0
                },
                areaStyle: {
                    opacity: 0,
                }
            },
            // end: 40,
            handleIcon: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAVCAYAAACg/AXsAAACPklEQVQ4T62UvU9TURjGf+d+lLaB0tgIVmtscANl4R9gkMTERUxKgiwuEI2jBF2UKy6KOBoNJOpSSWiiLiYaGPgHWLAwEtQKgqmVj/SD+3FMb6EEbAkRznhzzy/P+zzPewTHcMS/DCmQQBcKMWAeQTOSBDCBg3tDFP8on70QKUX7Q9RF0Pyg+byodXnEhheZy2NnwYqCNT2IjdgF7UIMqbSFUb1/8FoWfqHgMyVeRUF1HGxdkJcOOW2NbP48+ZllbAzhuLpKmqRoN1DNLD7nFAHHJnT/Mh3nTtCCREdgfkuTHPrMlKKSVn6yrvvJTRvYxdHKkKhBTaNOPR4a3/cxEg7Qsd+v5TUmO8foZ4uVFZO1RYPCLiQm1eYWfLUqJx9c5dqVC4xUC+1jkv6hD7zbtPk1P0eOhLBdJbEJqS4sUKsLTo/2MHDxDDeK3zOZDFKWgggGgyiKQnKJ172veGrqLDU1sZno2oa0G1KzaqizBZGXPdxrjXC9eLFQKJQFeTwehBDMpnh7M85jVZLSCmxMG8JylbT1SV2NEvAoRJ73cLc1Qne1cWZTjN+O82TLIWUvsj4zKsw9EE3j7ItuBnYgq6urOI6bIg0NDe44RcitcYYti+8VIfuV7PjhdkGUgqyqpJonlmWVjdU07WBPqqWTTqfL44RCIXecLz940xdn2JT70uE4elKs/Z7G9vIsXM+lCo2d6hzjTuXGHmJ3vv5m7tEnJg/YHeCwW6yRzQcrbvG28CO/J2UDjvqy/ed7+xehQlIlazn+SgAAAABJRU5ErkJggg=='
        }, {
            type: 'inside'
        }],
        series: [{
            name: title[0],
            type: 'bar',
            barWidth: 20,
            yAxisIndex: 1,
            itemStyle: {
                normal: {
                    color: '#3988FF'
                }
            },
            data: data[0]
        }, {
            name: title[1],
            type: 'line',
            symbol: 'circle',
            symbolSize: 6,
            connectNulls: true,
            lineStyle: {
                normal: {
                    shadowColor: 'rgba(255, 156, 27, 0.44)',
                    shadowOffsetX: 0,
                    shadowOffsetY: 0,
                    shadowBlur: 5,
                    color: '#FF9C1B',
                    width: '2'
                }
            },
            itemStyle: {
                normal: {
                    color: '#FF9C1B'
                }
            },
            emphasis: {
                itemStyle: {
                    color: '#ffffff',
                    borderColor: '#FF9C1B'
                }
            },
            showSymbol: true,
            smooth: true,
            data: data[1],
        }]
    }
    myChart.setOption(option)
}
// 气温与相对湿度
export const renderTempHumidity = (myChart, data, title, unit) => {
    myChart.clear()
    let option = {
        color: ['#00A9E6'],
        title: {
            subtext: unit,
            left: 6,
            top: -10,
            subtextStyle: {
                fontSize: 12,
                color: '#FFFFFF'
            }
        },
        legend: {
            show: true,
            right: 40,
            top: 0,
            itemWidth: 22,
            itemHeight: 6,
            data: title,
            textStyle: {
                color: '#C3F5FF',
                fontSize: 12
            }
        },
        tooltip: {
            trigger: 'axis',
            borderColor: 'transparent',
            backgroundColor: 'transparent',
            formatter: function(params) {
                let tooltipHtml = `<div class="tooltip-style">
        <div class="tooltip-title">${echarts.format.formatTime('yyyy/MM/dd hh:mm', params[0].value[0])}</div>`
                params.forEach((item, index) => {
                    tooltipHtml += ` <div class="tooltip-item">
            <p class="normal-title">${item.seriesName}</p>
            <span>${baseUtil.isNumber(item.value[1]) ? item.value[1] : '-'} ${item.seriesName.indexOf('气温') !== -1 ? '℃' : '%RH'}</span>
          </div>`
                })
                return tooltipHtml
            },
            axisPointer: {
                show: true,
                type: 'line',
                lineStyle: {
                    type: 'dashed',
                    width: 1,
                    color: '#aaa'
                }
            }
        },
        grid: {
            top: 30,
            bottom: 50,
            left: 30,
            right: 30
        },
        xAxis: {
            type: 'time',
            axisLine: {
                lineStyle: {
                    color: '#EAF0F4'
                }
            },
            splitLine: {
                show: false
            },
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#fffffff',
                    fontSize: 12
                }
            }
        },
        yAxis: [{
            name: '℃',
            nameTextStyle: {
                color: '#ffffff'
            },
            position: 'left',
            axisLine: {
                lineStyle: {
                    color: '#D6D6D6'
                }
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: ['#EFEFEF'],
                    width: 1,
                    type: 'solid'
                }
            },
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#ffffff',
                    fontSize: 12
                }
            }
        }, {
            name: '%RH',
            position: 'right',
            nameTextStyle: {
                color: '#ffffff',
                fontSize: 12
            },
            axisLine: {
                lineStyle: {
                    color: '#D6D6D6'
                }
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: ['#EFEFEF'],
                    width: 1,
                    type: 'solid'
                }
            },
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#ffffff',
                    fontSize: 12
                }
            }
        }],
        dataZoom: [{
            type: 'slider',
            // width: ,
            height: 6,
            left: 20,
            right: 10,
            bottom: 6,
            textStyle: 'none',
            show: true,
            handleSize: 24,
            fillerColor: '#CBFBFF',
            backgroundColor: '#608594',
            borderColor: 'none',
            dataBackground: {
                lineStyle: {
                    opacity: 0
                },
                areaStyle: {
                    opacity: 0,
                }
            },
            // end: 40,
            handleIcon: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAVCAYAAACg/AXsAAACPklEQVQ4T62UvU9TURjGf+d+lLaB0tgIVmtscANl4R9gkMTERUxKgiwuEI2jBF2UKy6KOBoNJOpSSWiiLiYaGPgHWLAwEtQKgqmVj/SD+3FMb6EEbAkRznhzzy/P+zzPewTHcMS/DCmQQBcKMWAeQTOSBDCBg3tDFP8on70QKUX7Q9RF0Pyg+byodXnEhheZy2NnwYqCNT2IjdgF7UIMqbSFUb1/8FoWfqHgMyVeRUF1HGxdkJcOOW2NbP48+ZllbAzhuLpKmqRoN1DNLD7nFAHHJnT/Mh3nTtCCREdgfkuTHPrMlKKSVn6yrvvJTRvYxdHKkKhBTaNOPR4a3/cxEg7Qsd+v5TUmO8foZ4uVFZO1RYPCLiQm1eYWfLUqJx9c5dqVC4xUC+1jkv6hD7zbtPk1P0eOhLBdJbEJqS4sUKsLTo/2MHDxDDeK3zOZDFKWgggGgyiKQnKJ172veGrqLDU1sZno2oa0G1KzaqizBZGXPdxrjXC9eLFQKJQFeTwehBDMpnh7M85jVZLSCmxMG8JylbT1SV2NEvAoRJ73cLc1Qne1cWZTjN+O82TLIWUvsj4zKsw9EE3j7ItuBnYgq6urOI6bIg0NDe44RcitcYYti+8VIfuV7PjhdkGUgqyqpJonlmWVjdU07WBPqqWTTqfL44RCIXecLz940xdn2JT70uE4elKs/Z7G9vIsXM+lCo2d6hzjTuXGHmJ3vv5m7tEnJg/YHeCwW6yRzQcrbvG28CO/J2UDjvqy/ed7+xehQlIlazn+SgAAAABJRU5ErkJggg=='
        }, {
            type: 'inside'
        }],
        series: [{
            name: title[0],
            type: 'line',
            symbol: 'circle',
            symbolSize: 6,
            connectNulls: true,
            lineStyle: {
                normal: {
                    shadowColor: 'rgba(57, 136, 255, 0.44)',
                    shadowOffsetX: 0,
                    shadowOffsetY: 0,
                    shadowBlur: 2,
                    color: '#3988FF',
                    width: '2'
                }
            },
            itemStyle: {
                normal: {
                    color: '#3988FF'
                }
            },
            emphasis: {
                itemStyle: {
                    color: '#ffffff',
                    borderColor: '#3988FF'
                }
            },
            showSymbol: true,
            smooth: true,
            data: data[0]
        }, {
            name: title[1],
            type: 'line',
            symbol: 'circle',
            symbolSize: 6,
            connectNulls: true,
            lineStyle: {
                normal: {
                    shadowColor: 'rgba(255, 156, 27, 0.44)',
                    shadowOffsetX: 0,
                    shadowOffsetY: 0,
                    shadowBlur: 5,
                    color: '#FF9C1B',
                    width: '2'
                }
            },
            itemStyle: {
                normal: {
                    color: '#FF9C1B'
                }
            },
            emphasis: {
                itemStyle: {
                    color: '#ffffff',
                    borderColor: '#FF9C1B'
                }
            },
            showSymbol: true,
            smooth: true,
            yAxisIndex: 1,
            data: data[1],
        }]
    }
    myChart.setOption(option)
}

//大面预报
export const bigFaceEchart = (ele, data) => {
  
    const forecastWater = [] //预测水位
    const forecastWind = [] //风暴增水
    const forecastAstronomicalTide = [] //天文潮
    const timeLine = [] //时间轴
    data.forEach ((item, index) => {
        forecastWater.push (item.predictionWaterLevel)
        forecastWind.push (item.stormAddWater)
        forecastAstronomicalTide.push (item.astronomicalTide)
        timeLine.push (item.predictionTime)
    })
    if (ele) {
        ele.clear ()
        let option = {
            title: {
                text: '',
            },
            color: ['#02A2FF', '#CBFBFF', '#FFDC4A'],
            tooltip: {
                trigger: 'axis',
                backgroundColor: '#fff', //背景色
                padding: [5, 0, 5, 15], //边距
                borderColor: '#F3F5FD', //边框颜色
                borderWidth: 1, //边框线宽度
                boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',
                textStyle: {
                    //文字样式
                    color: '#6A6A6A',
                    decoration: 'none',
                    fontFamily: 'Verdana, sans-serif',
                },
                axisPointer: {
                    type: 'line',
                    lineStyle: {
                        type: 'dashed',
                        color: '#3850D5',
                        width: 1,
                    },
                },
                extraCssText: 'text-align: left;',
                formatter: function(params) {
                    //格式化函数
                    let html = `<div class="tooltip-box" 
                   >
                        <div class="title" style="width:100%;display:flex;font-size:14px;
                        color:#0F1B41;font-weight:bold;">${params[0].axisValue
        .split (' ')[0]
        .split (
            '-'
        )[1] + '-' + params[0].axisValue
        .split (' ')[0]
        .split (
            '-'
        )[2]}<p style="margin-left:5px;">${params[0].axisValue
    .split (' ')[1]
    .split (
        ':'
    )[0] + ':' + params[0].axisValue
    .split (' ')[1]
    .split (':')[1]}</p></div>
                        <div class="container">
                              <ul style="display:flex;">`
                    params.forEach ((item, index) => {
                        html += `<li  style="justify-content: center;align-items: center;display: flex;flex-direction: column;margin-right:20px;">
                                  <span style="font-size:16px;color:#0F1B41;font-weight:bold;display:inline-block;text-align:center;margin-bottom:4px;">${item.value.toFixed (3) ? item.value.toFixed (3) : '-'}</span>
                                  <span style="font-size:10px;color:#95979C;display:inline-block;text-align:center;">${item.seriesName}(m)</span>
                                  </li>`
                    });
                    `</ul>
                              </div>`
                    html += '</div>'
                    return html
                },
            },
            legend: {
                show: true,
                data: [
                    {
                        name: '预测水位',
                        textStyle: {
                            color: '#02A2FF',
                            fontSize: '14',
                            padding: 15,
                        },
                    },
                    {
                        name: '天文潮',
                        textStyle: {
                            color: '#CBFBFF',
                            fontSize: '14',
                            padding: 15,
                        },
                    },
                    {
                        name: '风暴增水',
                        textStyle: {
                            color: '#FFDC4A',
                            fontSize: '12',
                            padding: 15,
                        },
                    },
                ],
                orient: 'horizontal',
                top: '1%',
                right: '1%',
            },
            //横向滚动条
            dataZoom: [{
                type: 'slider',
                // width: ,
                height: 6,
                left: 20,
                right: 10,
                bottom: 6,
                textStyle: 'none',
                show: true,
                handleSize: 24,
                fillerColor: '#CBFBFF',
                backgroundColor: '#608594',
                borderColor: 'none',
                dataBackground: {
                    lineStyle: {
                        opacity: 0
                    },
                    areaStyle: {
                        opacity: 0,
                    }
                },
                end: 40,
                handleIcon: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAVCAYAAACg/AXsAAACPklEQVQ4T62UvU9TURjGf+d+lLaB0tgIVmtscANl4R9gkMTERUxKgiwuEI2jBF2UKy6KOBoNJOpSSWiiLiYaGPgHWLAwEtQKgqmVj/SD+3FMb6EEbAkRznhzzy/P+zzPewTHcMS/DCmQQBcKMWAeQTOSBDCBg3tDFP8on70QKUX7Q9RF0Pyg+byodXnEhheZy2NnwYqCNT2IjdgF7UIMqbSFUb1/8FoWfqHgMyVeRUF1HGxdkJcOOW2NbP48+ZllbAzhuLpKmqRoN1DNLD7nFAHHJnT/Mh3nTtCCREdgfkuTHPrMlKKSVn6yrvvJTRvYxdHKkKhBTaNOPR4a3/cxEg7Qsd+v5TUmO8foZ4uVFZO1RYPCLiQm1eYWfLUqJx9c5dqVC4xUC+1jkv6hD7zbtPk1P0eOhLBdJbEJqS4sUKsLTo/2MHDxDDeK3zOZDFKWgggGgyiKQnKJ172veGrqLDU1sZno2oa0G1KzaqizBZGXPdxrjXC9eLFQKJQFeTwehBDMpnh7M85jVZLSCmxMG8JylbT1SV2NEvAoRJ73cLc1Qne1cWZTjN+O82TLIWUvsj4zKsw9EE3j7ItuBnYgq6urOI6bIg0NDe44RcitcYYti+8VIfuV7PjhdkGUgqyqpJonlmWVjdU07WBPqqWTTqfL44RCIXecLz940xdn2JT70uE4elKs/Z7G9vIsXM+lCo2d6hzjTuXGHmJ3vv5m7tEnJg/YHeCwW6yRzQcrbvG28CO/J2UDjvqy/ed7+xehQlIlazn+SgAAAABJRU5ErkJggg=='
            }, {
                type: 'inside'
            }],
            grid: {
                left: 30,
                right: 30,
                bottom: 60,
            },
            xAxis: {
                type: 'category',
                color: '#919191',
                scale: true,
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#43425D',
                        width: 1,
                        type: 'solid',
                        opacity: 1,
                    },
                },
                axisTick: {
                    show: false,
                    interval: 'auto',
                    lineStyle: {},
                },
                axisLabel: {
                    // margin: 4,
                    color: '#ffffff',
                    fontSize: 12,
                    fontWeight: 'bold',
                    fontFamily: 'Microsoft YaHei',
                    formatter: function(value) {
                        value =value.split (' ')[1]+' '+
              value.split (' ')[0].split ('-')[1] +
              '-' +
              value.split (' ')[0].split ('-')[2]
                        var str = ''
                        var num = 6 //每行显示字数
                        var valLength = value.length //该项x轴字数
                        var rowNum = Math.ceil (valLength / num) // 行数
                        if (rowNum > 1) {
                            for (var i = 0; i < rowNum; i++) {
                                var temp = ''
                                var start = i * num
                                var end = start + num

                                temp = value.substring (start, end) + '\n'
                                str += temp
                            }
                            return str
                        } else {
                            return value
                        }
                    },
                },
                data: timeLine,
            },
            yAxis: {
                type: 'value',
                name: '',
                axisLine: {
                    lineStyle: {
                        color: '#43425D',
                        width: 1,
                        type: 'solid',
                        opacity: 0.5,
                    },
                },
                axisTick: {
                    show: false,
                },
                axisLabel: {
                    color: '#ffffff',
                    fontSize: 12,
                    fontWeight: '400',
                    fontFamily: 'Microsoft YaHei',
                },
            },
            series: [
                {
                    name: '预测水位',
                    type: 'line',
                    symbolSize: 8, //拐点圆的大小
                    symbol: 'circle',
                    data: forecastWater,
                },
                {
                    name: '天文潮',
                    type: 'line',
                    symbolSize: 8, //拐点圆的大小
                    symbol: 'circle',
                    data: forecastAstronomicalTide,
                },
                {
                    name: '风暴增水',
                    type: 'line',
                    symbolSize: 8, //拐点圆的大小
                    symbol: 'circle',
                    data: forecastWind,
                },
            ],
        }
        ele.setOption (option)
        window.addEventListener ('resize', function() {
            ele.resize ()
        })
    }
}