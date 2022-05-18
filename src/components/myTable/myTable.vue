<!--表格组件 -->
<template>
    <section class="ces-table-page common-table">
        <!-- 表格操作按钮 -->
        <!-- 数据表格 -->
        <section class="ces-table">
            <el-table
                ref="cesTable"
                v-loading="loading"
                fit
                :data="tableData"
                :size="size"
                style="width:100%"
                height="100%"
                :border="isBorder"
                :class="isPadding"
                :row-class-name="tableRowClassName"
                :default-selections="defaultSelections"
                @select="select"
                @select-all="selectAll"
            >
                <el-table-column v-if="isSelection" type="selection" align="center" />
                <el-table-column
                    v-if="isIndex.isShow"
                    type="index"
                    :label="indexLabel"
                    align="center"
                    :width="isIndex.width"
                />
                <!-- 数据栏 -->
                <el-table-column
                    v-for="item in tableCols"
                    :key="item.id"
                    :prop="item.prop"
                    :label="item.label"
                    :show-overflow-tooltip="item.showTooltip"
                    :width="item.width"
                    :min-width="item.minWidth"
                    :class-name="item.className"
                    :align="item.align"
                    :render-header="item.require ? renderHeader : null"
                >
                    <template slot-scope="scope">
                        <!-- html -->
                        <div v-if="item.type === 'Html'" class="option-html">
                            <div>
                                <div v-for="(subItem, subIndex) in item.htmlList" :key="subIndex">
                                    <span v-if="subItem.isShow" @click="subItem.handle(scope.row,scope.$index)">
                                        <img :src="subItem.url" :class="{'img0':subIndex==0,'img1':subIndex == 1}" alt />
                                        <p>{{ subItem.label }}</p>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <!-- 默认 -->
                        <span>{{ scope.row[item.prop] || '---' }}</span>
                    </template>
                </el-table-column>
                <template slot="empty">
                    <div class="empty_img" />
                    <span>暂无数据</span>
                </template>
            </el-table>
        </section>
    </section>
</template>

<script>
export default {
    name: "Mytable",
    filters: {},
    props: {
        isPadding: { type: String, default: "" },
        // 表格型号：mini,medium,small
        size: { type: String, default: "medium" },
        isBorder: { type: Boolean, default: true },
        loading: { type: Boolean, default: false },
        // 表格操作
        isHandle: { type: Boolean, default: false },
        // 表格数据
        tableData: { type: Array, default: () => [] },
        // 表格列配置
        tableCols: { type: Array, default: () => [] },
        // 是否显示表格复选框
        isSelection: { type: Boolean, default: false },
        defaultSelections: { type: [Array, Object], default: () => null },
        // 是否显示表格索引
        isIndex: { type: Object, default: () => {} },
        indexLabel: { type: String, default: "序号" },
        // 是否显示分页
        isPagination: { type: Boolean, default: true },
        // 分页数据
        pagination: {
            type: Object,
            default: () => ({ pageSize: 10, pageNum: 1, total: 0 })
        }
    },
    data() {
        return {}
    },
    watch: {
        defaultSelections(val) {
            this.$nextTick(function() {
                if (Array.isArray(val)) {
                    val.forEach(row => {
                        this.$refs.cesTable.toggleRowSelection(row)
                    })
                } else {
                    this.$refs.cesTable.toggleRowSelection(val)
                }
            })
        }
    },
    methods: {
    // 表格勾选
        select(rows, row) {
            this.$emit("select", rows, row)
        },
        // 全选
        selectAll(rows) {
            this.$emit("select", rows)
        },
        // 全选表格设置
        handleCurrentChange(val) {
            this.pagination.pageNum = val
            this.$emit("refresh")
        },
        renderHeader(h, obj) {
            return h("span", { class: "ces-table-require" }, obj.column.label)
        },
        tableRowClassName({ row, rowIndex }) {
            if (rowIndex % 2 == 1) {
                return "warning-row"
            } else {
                return "success-row"
            }
        }
    }
}
</script>
<style lang="scss" scoped>
@import "./myTable.scss";
.ces-table-require::before {
  content: "*";
  color: red;
}
</style>
