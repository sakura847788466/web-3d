/**
 * @Author: zhuxuxi
 * @Date:   2021-11-17 09:11:29
 * @Last Modified by:   Your name
 * @Last Modified time: 2021-11-29 16:57:09
 */

/**
 * 是否是空json对象
 * @param obj
 * @returns {boolean}
 */
 export function isEmptyObject(obj) {
  return !obj || Object.keys(obj).length === 0
}

/**
* 检验url是否合法
* @param str_url
* @returns {boolean}
*/
export function isUrl(strUrl) {
  // ftp的user@
  /* eslint-disable no-useless-escape */
  let strRegex = '^((https|http|ftp|rtsp|mms)?://)' + "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" +
      // IP形式的URL- 199.194.52.184
      '(([0-9]{1,3}\.){3}[0-9]{1,3}' +
      // 允许IP和DOMAIN（域名）
      '|' +
      // 域名- www.
      "([0-9a-z_!~*'()-]+\.)*" +
      // 二级域名
      '([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\.' +
      // first level domain- .com or .museum
      '[a-z]{2,6})' +
      // 端口- :80
      '(:[0-9]{1,4})?' +
      // a slash isn't required if there is no file name
      '((/?)|' +
      "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$"
  let re = new RegExp(strRegex)
  return re.test(strUrl)
}

/**
* 从拼接字段获取pageId,跳转
* @param url
* @returns {string}
*/
export function redirectByPageIdOrUrl(url, isNav = false) {
  let pageUrl = concatPagePath(url)
  if (pageUrl !== '') {
      if (isUrl(url)) {
          location.href = pageUrl
      } else {
          if (!isNav) {
              location.hash = pageUrl
          } else {
              location.replace(`#${pageUrl}`)
          }
      }
  }
}

/**
* 从拼接字段获取pageId
* @param url
* @returns {string}
*/
export function concatPagePath(url) {
  if (url) {
      if (isUrl(url)) {
          return url
      } else {
          let urlArr = url.split('://')
          if (urlArr.length > 1) {
              let route = urlArr[1].split('_')
              let pageId = route[route.length - 1]
              return `/page${pageId}`
          }
      }
  }
  return ''
}

/**
* 获取连接上面参数
* @param name
* @returns {*}
*/
export function getQueryString(name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  var r = window.location.search.substr(1).match(reg)
  if (r != null) return unescape(r[2])
  return null
}

function version(ver) {
  return (ver.split('_')[2]).replace(/\./g, '')
}

/*
* 获取时间差（天数）
* */
export function timeDiff(startTime, endTime) {
  startTime = startTime || new Date()
  endTime = endTime || new Date()
  // ios不支持yyyy-mm-dd格式，转换
  if (String(startTime).split('').includes('-')) {
      startTime = new Date(startTime.replace(/-/g, '/'))
  }
  if (String(endTime).split('').includes('-')) {
      endTime = new Date(endTime.replace(/-/g, '/'))
  }
  return parseInt((endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60 * 24))
}

//度转度°分′秒″
export function ToDegrees(val) {
  if (typeof (val) == "undefined" || val == "") {
      return "";
  }
  if (typeof (val) != "string") {
    val =val.toString()
}
  var i = val.indexOf('.');
  var strDu = i < 0 ? val : val.substring(0, i);//获取度
  var strFen = 0;
  var strMiao = 0;
  if (i > 0) {
      var strFen = "0" + val.substring(i);
      strFen = strFen * 60 + "";
      i = strFen.indexOf('.');
      if (i > 0) {
          strMiao = "0" + strFen.substring(i);
          strFen = strFen.substring(0, i);//获取分
          strMiao = strMiao * 60 + "";
          i = strMiao.indexOf('.');
          strMiao = strMiao.substring(0, i + 4);//取到小数点后面三位
          strMiao = parseFloat(strMiao).toFixed(0);//精确小数点后面两位
      }
  }
  let stringVal = null
  if(strMiao==0 || strFen ==0){
    if(strMiao==0 && strFen ==0){
      stringVal = strDu + "°"
    }else{
      if(strMiao==0) stringVal = strDu + "°" + strFen + "′"
    }
  }else{
    stringVal = strDu + "°" + strFen + "′" + strMiao+"″";
  }
  return stringVal
}
//度°分′秒″转度
export function ToDigital(strDu, strFen, strMiao, len) {
  len = (len > 6 || typeof (len) == "undefined") ? 6 : len;//精确到小数点后最多六位   
  strDu = (typeof (strDu) == "undefined" || strDu == "") ? 0 : parseFloat(strDu);
  strFen = (typeof (strFen) == "undefined" || strFen == "") ? 0 : parseFloat(strFen) / 60;
  strMiao = (typeof (strMiao) == "undefined" || strMiao == "") ? 0 : parseFloat(strMiao) / 3600;
  var digital = strDu + strFen + strMiao;
  if (digital == 0) {
      return "";
  } else {
      return digital.toFixed(len);
  }
}

