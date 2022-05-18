/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: zhuxuxi
 * @Date: 2021-09-16 09:53:46
 * @LastEditTime: 2021-11-02 18:29:23
 */

'use strict'

/**
 * 日期格式化  
 * 
 * @param {string} value
 * @param {string} format
 * @return {string} 
 * @export
 */

export function dateFormat(value, format) {
    if(typeof value =='string' && value.indexOf('-')>-1){
      value = value.replaceAll('-','/')
    }
    var t = new Date(value)

    var o = {
        'M+': t.getMonth() + 1, // month
        'd+': t.getDate(), // day
        'h+': t.getHours(), // hour
        'm+': t.getMinutes(), // minute
        's+': t.getSeconds(), // second
        'q+': Math.floor((t.getMonth() + 3) / 3), // quarter
        'S': t.getMilliseconds() // millisecond
    }

    if (/(y+)/.test(format)) {//yyyy-MM-dd hh:mm
        format = format.replace(RegExp.$1, (t.getFullYear() + '').substr(4 - RegExp.$1.length))
        
    }
    
    for (var k in o) {
        if (new RegExp('(' + k + ')').test(format)) {
            
            format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : (o[k].toString().length === 1 ? ('0' + o[k]) : (o[k].toString()).substr(0)))
            // format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : (o[k].toString().length === 1 ? (o[k]) : (o[k].toString()).substr(0)))
        }
    }
    return format
}

/**
 * 要素类型
 * @param {Number} Number
 */
export function elemType(val) {
  return {
      1:'海水',
      2:'浮游植物',      
      3:'气象',      
      4:'海冰',
      5:'水文气象',
      6:'水体环境',
      7:'叶绿素a',
      8:'浮游动物',
      9:'小型水母',
      10:'大型水母'    
  }[val]
}
