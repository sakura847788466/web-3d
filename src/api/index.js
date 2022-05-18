/*
 * @Descripttion: api
 * @version: 1.0
 * @Author: Ada
 * @Date: 2022-04-07 11:17:08
 * @LastEditors: Ada
 * @LastEditTime: 2022-04-10 19:21:17
 */
import ajax from "@/utils/request"

// 获取区域信息
export const getAreaList = () => ajax(`/screen/area/list`, "GET")

// 根据区域获取站点列表
export const getSiteListByAreaId = (data) =>
    ajax(`/screen/station/list`, data, "POST")

// 获取最新要素的数据
export const getNearEleInfo = (data) =>
    ajax(`/screen/station/monitor/data`, data, "POST")

// 获取获取大面积预报播放动画的数据
export const getPredictionAnimation = () =>
    ajax(`/screen/area/prediction/animation`, "GET")

//分页获取历史数据
export const getHistoryInfoList = (data) =>
    ajax(`/screen/warn/history/list`, data, "POST")

// 获取历史折线图数据
export const getHistoryEchart = (data) =>
    ajax(`/screen/station/history/data/line`, data, "POST")

//获取大面预报数据
export const getDisasterInfo = (data) => ajax('/screen/area/prediction/chart', data, "POST")