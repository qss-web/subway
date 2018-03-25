<template>
    <div class="search clearfix">
        <div class="searchWidth left">
            <ul v-for="(item,index) in searchData.options" :key="index">
                <li v-if="item.status == 1">
                    <span>{{item.title}}：</span>
                    <el-input v-model="req[item.val]" size="mini" v-bind:placeholder="item.placeholder"></el-input>
                </li>
                <li v-if="item.status == 2">
                    <span>{{item.title}}：</span>
                    <el-select v-model="req[item.val]" v-bind:placeholder="item.placeholder" size="mini">
                        <el-option key="0" label="全部" value="0">
                        </el-option>
                        <el-option v-for="itemSel in item.list" :key="itemSel.value" :label="itemSel.label" :value="itemSel.value">
                        </el-option>
                    </el-select>
                </li>
                <li v-if="item.status == 3">
                    <span>{{item.title}}：</span>
                    <el-date-picker v-model="req[item.val1]" type="date" v-bind:placeholder="item.placeholderS" size="mini"></el-date-picker>
                    <i>至</i>
                    <el-date-picker v-model="req[item.val2]" type="date" v-bind:placeholder="item.placeholderE" size="mini"></el-date-picker>
                </li>
                <li v-if="item.status == 4">
                    <span>{{item.title}}：</span>
                    <el-date-picker v-model="req[item.val1]" type="month" v-bind:placeholder="item.placeholderS" size="mini"></el-date-picker>
                    <i>至</i>
                    <el-date-picker v-model="req[item.val2]" type="month" v-bind:placeholder="item.placeholderE" size="mini"></el-date-picker>
                </li>
            </ul>
        </div>
        <a class="exportBtn" href="javascript:;">查询</a>
        <a v-if="searchData.btnShow && searchData.btnShow.export" class="exportBtn" href="javascript:;">导出</a>
        <a v-if="searchData.btnShow && searchData.btnShow.add" v-on:click="testPop" class="exportBtn" href="javascript:;">增加</a>
        <a v-if="searchData.btnShow && searchData.btnShow.delete" class="exportBtn" href="javascript:;">删除</a>
        <a v-if="searchData.btnShow && searchData.btnShow.synchronization" class="exportBtn" href="javascript:;">同步</a>
        <a v-if="searchData.btnShow && searchData.btnShow.edit" class="exportBtn" href="javascript:;">编辑</a>
        <a v-if="searchData.btnShow && searchData.btnShow.download" class="exportBtn" href="javascript:;">下载</a>
        <a v-if="searchData.btnShow && searchData.btnShow.import" class="exportBtn" href="javascript:;">导入</a>
        <a v-if="searchData.btnShow && searchData.btnShow.save" class="exportBtn" href="javascript:;">保存</a>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                req: {
                    // lines: '',
                    // stations: '',
                    // equSys: '',
                    // equSort: '',
                    // startTime: '',
                    // endTime: ''
                }
            };
        },
        props: ['searchData'],
        methods: {
            onSubmit() {

            },
            testPop() {
                this.$emit('receive', true);
            }
        }
    };
</script>
<style lang="less" scoped>
    .el-input--mini {
        width: 1.4rem;
        background: none;
    }
    .el-select--mini {
        width: 1.4rem;
        background: none;
    }
    .el-date-editor.el-input,
    .el-date-editor.el-input__inner {
        width: 1.4rem;
        vertical-align: top;
    }
    .searchWidth {
        overflow: hidden;
        padding-left: 0.33rem;
        padding-right: 0.2rem;
        border-radius: 10px;
        background: url('~assets/other/title_bg.png') repeat;
        position: relative;
        ul {
            float: left;
            li {
                overflow: hidden;
                color: #fff;
                padding: 0.015rem 0;
                span {
                    float: left;
                    font-size: 0.2rem;
                    height: 0.46rem;
                    line-height: 0.46rem;
                }
                i {
                    font-size: 0.2rem;
                    height: 0.46rem;
                    line-height: 0.46rem;
                    font-style: normal;
                }
            }
        }
    }
    .exportBtn {
        float: left;
        margin-left: 0.1rem;
        width: 0.8rem;
        height: 0.42rem;
        line-height: 0.42rem;
        text-align: center;
        background: #54596e;
        font-size: 0.2rem;
        color: #ffffff;
        border-radius: 5px;
        margin-top: 0.04rem;
        box-shadow: 1px 3px 1px rgba(0, 0, 0, 0.3);
        text-decoration: none;
    }
</style>
