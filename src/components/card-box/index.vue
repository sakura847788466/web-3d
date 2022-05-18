<!--
 * @Descripttion: card-box
 * @version: 1.0
 * @Author: Ada
 * @Date: 2022-04-07 14:38:35
 * @LastEditors: ada 847788466@qq.com
 * @LastEditTime: 2022-05-10 14:14:47
-->
<template>
    <div class="card-box">
        <div class="card-box-title">
            <img src="../../assets/images/arrow-right.png" alt="">
            <span>{{ title }}</span>
        </div>
        <div class="card-box-list">
            <div v-for="(item,index) in cardParams" :key="index" class="card-box-list-item">
                <div class="item-left">
                    <img :src="changeTypeIcon(item.type)" alt="">
                </div>
                <div class="item-right">
                    <span>{{ item.type | changeCardTypeZn }}</span>
                    <span>{{ item.value || 0 }}{{ item.unit }}</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'CardBox',
    components: {},
    filters:{
        changeCardTypeZn(val) {
            return {
                1:'实时水位值',
                2:'水位变化速度',
                3:'水位变化加速度',
                4:'平均波高',
                5:'平均波周期',
                6:'1/3波高',
                7:'1/3波周期',
                8:'1/10波高',
                9:'1/10波周期',
                10:'总越浪高度',
                11:'总越浪次数',
                12:'波浪爬高',
                13:'平均风速',
                14:'平均风向',
                15:'最大风速',
                16:'最大风向',
                17:'极大风速',
                18:'极大风向',
                19:'空气温度',
                20:'相对湿度',
                21:'气压',
                22:'机箱温度',
                23:'电池电压',
                24:'内存卡容量',
                25:'实时水位值',
                26:'潮位变化速度',
                27:'潮位变化加速度',
                28:'降雨量',
                29:'增水速度',
                30:'增水加速度',
                31:'视像水位',
                50:'平均越浪量'
            }[val]
        }
    },
    props: {
        title:{
            type:String,
            default:()=>{
                return ''
            }
        },
        cardParams:{
            type:Array,
            default:() => {
                return []
            }
        }
    },
    data() {
        return {}
    },
    computed: {},
    created() {},
    mounted() {},
    methods: {
        changeTypeIcon(val) {
            return {
                1:require('../../assets/images/card-item_sign.png'),
                2:require('../../assets/images/sign02.png'),
                3:require('../../assets/images/sign03.png'),
                4:require('../../assets/images/sign04.png'),
                5:require('../../assets/images/sign05.png'),
                6:require('../../assets/images/sign06.png'),
                7:require('../../assets/images/sign07.png'),
                8:require('../../assets/images/sign08.png'),
                9:require('../../assets/images/sign09.png'),
                10:require('../../assets/images/sign10.png'),
                11:require('../../assets/images/sign11.png'),
                50:require('../../assets/images/sign12.png'),
                12:require('../../assets/images/sign50.png'),
                13:require('../../assets/images/sign13.png'),
                14:require('../../assets/images/sign14.png'),
                15:require('../../assets/images/sign15.png'),
                16:require('../../assets/images/sign16.png'),
                17:require('../../assets/images/sign17.png'),
                18:require('../../assets/images/sign18.png'),
                19:require('../../assets/images/sign19.png'),
                20:require('../../assets/images/sign20.png'),
                21:require('../../assets/images/sign21.png'),
                22:require('../../assets/images/sign23.png'),
                23:require('../../assets/images/sign24.png'),
                24:require('../../assets/images/sign25.png'),
                25:require('../../assets/images/card-item_sign.png'),
                26:require('../../assets/images/sign02.png'),
                27:require('../../assets/images/sign03.png'),
                28:require('../../assets/images/sign28.png'),
                29:require('../../assets/images/sign29.png'),
                30:require('../../assets/images/sign30.png'),
                31:require('../../assets/images/sign31.png')
            }[val]
        }
    },
}
</script>
<style lang='scss'>
@import './index.scss'
</style>