<template>
    <div class="search clearfix">
        <ul class="searchWidth left">
            <li>
                <span>线路：</span>
                <el-select v-model="req.lines" placeholder="请选择" size="mini">
                    <el-option v-for="item in linesOpts" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </li>
            <li>
                <span>车站：</span>
                <el-select v-model="req.stations" placeholder="请选择" size="mini">
                    <el-option v-for="item in stationsOpts" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </li>
            <li>
                <span>设备系统：</span>
                <el-select v-model="req.equSty" placeholder="请选择" size="mini">
                    <el-option v-for="item in equStyOpts" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </li>
            <li>
                <span>设备类型：</span>
                <el-select v-model="req.equSort" placeholder="请选择" size="mini">
                    <el-option v-for="item in equSortOpts" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </li>
            <li>
                <span>时间：</span>
                <el-date-picker size="mini" v-model="req.startTime" type="date" placeholder="选择开始日期"></el-date-picker>
                <i>至</i>
                <el-date-picker v-model="req.endTime" type="date" placeholder="选择结束日期"></el-date-picker>
            </li>
            <a class="btn" href="javascript:;"><img src="~assets/other/search.png" /></a>
        </ul>
        <a class="exportBtn" href="javascript:;">查看</a>
        <a class="exportBtn" href="javascript:;">导出</a>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                req: {
                    lines: '',
                    stations: '',
                    equSty: '',
                    equSort: '',
                    startTime: '',
                    endTime: ''
                },
                linesOpts: [{
                    value: '1',
                    label: '6号线'
                }],
                stationsOpts: [{
                    value: '1',
                    label: '金安桥站'
                }, {
                    value: '2',
                    label: '苹果园站'
                }, {
                    value: '3',
                    label: '苹果园南路站'
                }, {
                    value: '4',
                    label: '西黄村站'
                }, {
                    value: '5',
                    label: '唐宫庄站'
                }, {
                    value: '6',
                    label: '田村站'
                }],
                equStyOpts: [{
                    value: '1',
                    label: '设备系统一'
                }, {
                    value: '1',
                    label: '设备系统二'
                }],
                equSortOpts: [{
                    value: '1',
                    label: '设备类型一'
                }, {
                    value: '2',
                    label: '测试类型二'
                }]
            };
        },
        methods: {
            onSubmit() {
                console.log('submit!');
            }
        }
    };
</script>
<style lang="less" scoped>
    .el-select--mini {
        width: 1.6rem;
        background: none;
    }
    .el-date-editor.el-input,
    .el-date-editor.el-input__inner {
        width: 1.4rem;
    }
    .searchWidth {
        overflow: hidden;
        padding-left: 0.33rem;
        padding-right: 1.1rem;
        border-radius: 10px;
        background: url('~assets/other/title_bg.png') repeat;
        position: relative;
        li {
            overflow: hidden;
            color: #fff;
            float: left;
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
            top: 0.06rem;
            right: 0.06rem;
            z-index: 1;
            background: #54596e;
            border-radius: 6px;
            box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.3);
            text-decoration: none;
        }
    }
    .exportBtn {
        float: left;
        margin-left: 0.22rem;
        width: 1.1rem;
        height: 0.42rem;
        line-height: 0.42rem;
        text-align: center;
        background: #54596e;
        font-size: 0.2rem;
        color: #ffffff;
        border-radius: 5px;
        margin-top: 0.05rem;
        box-shadow: 1px 3px 1px rgba(0, 0, 0, 0.3);
        text-decoration: none;
    }
</style>
