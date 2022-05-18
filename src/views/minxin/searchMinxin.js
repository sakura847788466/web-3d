/**
 * @Author: zhuxuxi
 * @Date:   2021-11-18 10:28:36
 * @Last Modified by:   Your name
 * @Last Modified time: 2021-11-29 15:04:26
 */

const searchMixin = {
    data() {
        return {
            pickerOptions: {
                shortcuts: [
                    {
                        text: "最近一天",
                        onClick(picker) {
                            const end = new Date()
                            const start = new Date()
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 1)
                            picker.$emit("pick", [start, end])
                        }
                    },
                    {
                        text: "最近三天",
                        onClick(picker) {
                            const end = new Date()
                            const start = new Date()
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 3)
                            picker.$emit("pick", [start, end])
                        }
                    },
                    {
                        text: "最近一周",
                        onClick(picker) {
                            const end = new Date()
                            const start = new Date()
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
                            picker.$emit("pick", [start, end])
                        }
                    },
                    {
                        text: "最近十五天",
                        onClick(picker) {
                            const end = new Date()
                            const start = new Date()
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 15)
                            picker.$emit("pick", [start, end])
                        }
                    },
                    {
                        text: "最近一个月",
                        onClick(picker) {
                            const end = new Date()
                            const start = new Date()
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
                            picker.$emit("pick", [start, end])
                        }
                    },
                    {
                        text: "最近三个月",
                        onClick(picker) {
                            const end = new Date()
                            const start = new Date()
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
                            picker.$emit("pick", [start, end])
                        }
                    },
                    {
                        text: "最近一年",
                        onClick(picker) {
                            const end = new Date()
                            const start = new Date()
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 365)
                            picker.$emit("pick", [start, end])
                        }
                    },
                    {
                        onPick: obj => {
                            this.minDate = obj.minDate // 选中的时间较小的一个
                            this.maxDate = obj.maxDate // 选中的时间较大的一个
                            // if (obj.maxDate) {
                            //   _this.$emit('endCallBack', obj, _this.timeId)
                            // }
                        },
                        disabledDate: time => {
                            // 设置禁用状态，参数为当前日期，要求返回 Boolean 返回为true禁用
                            const nowDate = new Date().getTime()
                            // 能查看几年前的时间 单位是年 （当前是10年）
                            const maxTimeYear = 365 * 5 * 24 * 3600 * 1000
                            // 最小时间的时间戳
                            const minTime = nowDate - maxTimeYear
                            // 时间跨度 当前是6个月
                            //   const month = 7 * 24 * 3600 * 1000
                            // 当前的23点59分59秒
                            const nowLast = new Date(
                                new Date(new Date().getTime()).setHours(23, 59, 59, 999)
                            ).getTime()
                            if (this.minDate) {
                                return (
                                    time.getTime() > nowLast || time.getTime() < minTime
                                //   ||
                                //   time > new Date(this.minDate.getTime() + month) ||
                                //   time < new Date(this.minDate.getTime() - month)
                                )
                            }
                            return time.getTime() > Date.now() || time.getTime() < minTime
                        }
                    }
                ]
            },
        }
    },
    methods: {
    
    },
    destroyed() {
    
    },
}

export default searchMixin