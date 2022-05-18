export const calcDate = (date1, date2) => {
    const date3 = date2 - date1

    const days = Math.floor(date3 / (24 * 3600 * 1000))

    const leave1 = date3 % (24 * 3600 * 1000) // 计算天数后剩余的毫秒数
    const hours = Math.floor(leave1 / (3600 * 1000))

    const leave2 = leave1 % (3600 * 1000) // 计算小时数后剩余的毫秒数
    const minutes = Math.floor(leave2 / (60 * 1000))

    const leave3 = leave2 % (60 * 1000) // 计算分钟数后剩余的毫秒数
    const seconds = Math.round(date3 / 1000)
    return {
        leave1,
        leave2,
        leave3,
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds
    }
}
// 获取指定天数时间
export function getBeforeDate(num, time) {
    let n = num
    let d = ''
    if (time) {
        d = new Date(time)
    } else {
        d = new Date()
    }
    let year = d.getFullYear()
    let mon = d.getMonth() + 1
    let day = d.getDate()
    let hours = d.getHours()
    let dd = d.getMinutes()
    let ss = d.getSeconds()
    const nowData =
  year +
  '-' +
  (mon < 10 ? '0' + mon : mon) +
  '-' +
  (day < 10 ? '0' + day : day) +
  ' ' +
  hours +
  ':' +
  (dd < 10 ? '0' + dd : dd) +
  ':' +
  (ss < 10 ? '0' + ss : ss)
    if (day <= n) {
        if (mon > 1) {
            mon = mon - 1
        } else {
            year = year - 1
            mon = 12
        }
    }
    d.setDate(d.getDate() - n)
    year = d.getFullYear()
    mon = d.getMonth() + 1
    day = d.getDate()
    let s =
  year +
  '-' +
  (mon < 10 ? '0' + mon : mon) +
  '-' +
  (day < 10 ? '0' + day : day) +
  ' ' +
  hours +
  ':' +
  (dd < 10 ? '0' + dd : dd) +
  ':' +
  (ss < 10 ? '0' + ss : ss)
    let timeParams = {
        nowTime: nowData,
        passTime: s
    }
    return timeParams
}
/**
 * 日期格式化
 */
export function dateFormat(date, format) {
    format = format || 'yyyy-MM-dd hh:mm:ss'
    if (date !== 'Invalid Date') {
        const o = {
            'M+': date.getMonth() + 1, // month
            'd+': date.getDate(), // day
            'h+': date.getHours(), // hour
            'm+': date.getMinutes(), // minute
            's+': date.getSeconds(), // second
            'q+': Math.floor((date.getMonth() + 3) / 3), // quarter
            S: date.getMilliseconds() // millisecond
        }
        if (/(y+)/.test(format)) {
            format = format.replace(
                RegExp.$1,
                (date.getFullYear() + '').substr(4 - RegExp.$1.length)
            )
        }
        for (const k in o) {
            if (new RegExp('(' + k + ')').test(format)) {
                format = format.replace(
                    RegExp.$1,
                    RegExp.$1.length === 1
                        ? o[k]
                        : ('00' + o[k]).substr(('' + o[k]).length)
                )
            }
        }
        return format
    }
    return ''
}

// 格式化日期
export function formatDate(date, format) {
    if (!format) format = 'yyyy-MM-dd HH:mm'
    if (format === '/') format = 'yyyy/MM/dd HH:mm'
    date = new Date(date)
    var dict = {
        yyyy: date.getFullYear(),
        M: date.getMonth() + 1,
        d: date.getDate(),
        H: date.getHours(),
        m: date.getMinutes(),
        s: date.getSeconds(),
        MM: ('' + (date.getMonth() + 101)).substr(1),
        dd: ('' + (date.getDate() + 100)).substr(1),
        HH: ('' + (date.getHours() + 100)).substr(1),
        mm: ('' + (date.getMinutes() + 100)).substr(1),
        ss: ('' + (date.getSeconds() + 100)).substr(1)
    }
    return format.replace(/(yyyy|MM?|dd?|HH?|ss?|mm?)/g, function() {
        return dict[arguments[0]]
    })
}

// 时间处理 如果为同一天则后买你设置时间为23时59分
export function getDayLastTime(date) {
    var startTime = date.split(' - ')[0]
    var endTime = date.split(' - ')[1]
    if (startTime.substring(0, 10) === endTime.substring(0, 10)) {
        endTime = endTime.replace('00:00', '23:59')
    }
    date = startTime + ' - ' + endTime
    return date
}

// 获取实时到小时
export function getHourScope() {
    var now = new Date()
    var year = now.getFullYear()
    var month = now.getMonth() + 1
    var day = now.getDate()
    var hour = now.getHours()
    const str1 = year + '-' + month + '-' + day + ' ' + hour + ':00:00'
    return str1
}

// 获取今日
export function getDayScope() {
    var now = new Date()
    var year = now.getFullYear()
    var month = now.getMonth() + 1
    var day = now.getDate()
    const str1 = year + '-' + month + '-' + day
    return str1
}

// 获取本周
export function getWeekScope() {
    // 获取本周开始及结束时间时间戳
    const now = new Date()
    // 本周开始时间
    now.setDate(now.getDate() - now.getDay() + 1)
    const weekStartTime = new Date(
        `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()} 00:00:00`
    )
    // 本周结束时间
    now.setDate(now.getDate() + 6)
    const weekEndTime = new Date(
        `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()} 23:59:59`
    )

    return (
        dateFormat(weekStartTime, 'yyyy-MM-dd') +
    ' - ' +
    dateFormat(weekEndTime, 'yyyy-MM-dd')
    )
}

// 获取本月
export function getMonthScope() {
    // 本月开始时间
    const monthStartTime = new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        1
    )
    // 本月结束时间
    const monthEndTime = new Date(
        new Date().getFullYear(),
        new Date().getMonth() + 1,
        0,
        23,
        59,
        59
    )

    return (
        dateFormat(monthStartTime, 'yyyy-MM-dd') +
    ' - ' +
    dateFormat(monthEndTime, 'yyyy-MM-dd')
    )
}

// 获取全年
export function getYearScope() {
    // 获取本年开始及结束时间时间戳
    // 本年开始时间
    const yearStartTime = new Date(new Date().getFullYear(), 0, 1)
    // 本年结束时间
    const yearEndTime = new Date(new Date().getFullYear(), 11, 31, 23, 59, 59)
    return (
        dateFormat(yearStartTime, 'yyyy-MM-dd') +
    ' - ' +
    dateFormat(yearEndTime, 'yyyy-MM-dd')
    )
}

// 获取当前时间
export function getNowScope() {
    var now = new Date()
    var year = now.getFullYear()
    var month = now.getMonth() + 1
    var day = now.getDate()
    const str1 = year + '-' + month + '-' + day
    return str1
}

// 获取当前三天前时间
export function getThrScope() {
    var now = new Date()
    var year = now.getFullYear()
    var month = now.getMonth() + 1
    var day = now.getDate()
    const str1 = year + '-' + month + '-' + day
    return str1
}
// 末尾时间设置
export function timeSet(value) {
    var date = new Date(value) // new Date(value*1000);根据时间戳格式进行选择乘1000或否,mao
    var timeDate, Y, M, D, h, m, s
    Y = date.getFullYear() + '-'
    M =
    (date.getMonth() + 1 < 10
        ? '0' + (date.getMonth() + 1)
        : date.getMonth() + 1) + '-'
    D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
    h = 23 + ':'
    m = 59 + ':'
    s = 59
    timeDate = Y + M + D + h + m + s
    return new Date(timeDate).getTime()
}

// 参数过滤
export function filterParams(obj) {
    const _newPar = {}
    for (const key in obj) {
        if (
            (obj[key] === 0 || obj[key]) &&
      obj[key].toString().replace(/(^\s*)|(\s*$)/g, '') !== ''
        ) {
            _newPar[key] = obj[key]
        }
    }
    return _newPar
}

