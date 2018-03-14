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
                    <el-date-picker v-model="req[item.val]" type="date" v-bind:placeholder="item.placeholder" size="mini"></el-date-picker>
                </li>
                <a class="btn" href="javascript:;"><img src="~assets/other/search.png" /></a>
            </ul>
        </div>
        <a class="exportBtn" href="javascript:;">查看</a>
        <a v-if="searchData.btnShow && searchData.btnShow.export" class="exportBtn" href="javascript:;">导出</a>
        <a v-if="searchData.btnShow && searchData.btnShow.add" class="exportBtn" href="javascript:;">增加</a>
        <a v-if="searchData.btnShow && searchData.btnShow.delete" class="exportBtn" href="javascript:;">删除</a>
        <a v-if="searchData.btnShow && searchData.btnShow.edit" class="exportBtn" href="javascript:;">编辑</a>
        <a v-if="searchData.btnShow && searchData.btnShow.download" class="exportBtn" href="javascript:;">下载</a>
        <a v-if="searchData.btnShow && searchData.btnShow.import" class="exportBtn" href="javascript:;">导入</a>
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

            }
        }
    };
</script>
<style lang="less" scoped>
    .el-input--mini {
        width: 1.6rem;
        background: none;
    }
    .el-select--mini {
        width: 1.6rem;
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
        padding-right: 1.1rem;
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
            a.btn {
                position: absolute;
                width: 0.53rem;
                height: 0.4rem;
                line-height: 0.4rem;
                text-align: center;
                top: 0.04rem;
                right: 0.06rem;
                z-index: 1;
                background: #54596e;
                border-radius: 6px;
                box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.3);
                text-decoration: none;
                img {
                    width: 0.28rem;
                    height: 0.28rem;
                }
            }
        }
    }
    .exportBtn {
        float: left;
        margin-left: 0.1rem;
        width: 1.1rem;
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
