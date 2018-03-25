<template>
    <div>
        <v-search></v-search>
        <dl class="middleSort clearfix">
            <dd v-on:click="currentList(1)" v-bind:class="indexed == 1 ?'active':''">
                <p>设备档案 <span>{{equList.amount1}}份</span></p>
                <img v-if="indexed!=1" src="../assets/search/sort01_gray.png" />
                <img v-if="indexed==1" src="../assets/search/sort01_orange.png" />
            </dd>
            <dd v-on:click="currentList(2)" v-bind:class="indexed == 2 ?'active':''">
                <p>预警信息 <span>{{equList.amount2}}份</span></p>
                <img v-if="indexed!=2" src="../assets/search/sort02_gray.png" />
                <img v-if="indexed==2" src="../assets/search/sort02_orange.png" />
            </dd>
            <dd v-on:click="currentList(3)" v-bind:class="indexed == 3 ?'active':''">
                <p>故障报修单 <span>{{equList.amount3}}份</span></p>
                <img v-if="indexed!=3" src="../assets/search/sort03_gray.png" />
                <img v-if="indexed==3" src="../assets/search/sort03_orange.png" />
            </dd>
            <dd v-on:click="currentList(4)" v-bind:class="indexed == 4 ?'active':''">
                <p>图片 <span>{{equList.amount4}}张</span></p>
                <img v-if="indexed!=4" src="../assets/search/sort04_gray.png" />
                <img v-if="indexed==4" src="../assets/search/sort04_orange.png" />
            </dd>
            <dd v-on:click="currentList(5)" v-bind:class="indexed == 5 ?'active':''">
                <p>其它</p>
                <img v-if="indexed!=5" src="../assets/search/sort05_gray.png" />
                <img v-if="indexed==5" src="../assets/search/sort05_orange.png" />
            </dd>
        </dl>
        <v-search-list v-if="indexed==1" v-bind:label="equLabel" v-bind:other="otherInfo1" v-bind:list="equList.data"></v-search-list>
        <v-search-list v-if="indexed==2" v-bind:label="equLabe2" v-bind:other="otherInfo" v-bind:list="equList.data"></v-search-list>
        <v-search-list v-if="indexed==3" v-on:isPop="isPopFn" v-bind:label="equLabe3" v-bind:other="otherInfo2" v-bind:list="equList.data"></v-search-list>
        <div class="showPic" v-if="indexed==4">
            <img class="border-bg" src="../assets/other/footer-border.png" />
            <ul class="flex">
                <li>
                    <img src="../assets/search/pic01.png" />
                    <p>故障图片201803201020</p>
                </li>
                <li>
                    <img src="../assets/search/pic02.png" />
                    <p>故障图片201803201020</p>
                </li>
                <li>
                    <img src="../assets/search/pic03.png" />
                    <p>故障图片201803201020</p>
                </li>
                <li>
                    <img src="../assets/search/pic02.png" />
                    <p>故障图片201803201020</p>
                </li>
                <li>
                    <img src="../assets/search/pic01.png" />
                    <p>故障图片201803201020</p>
                </li>
            </ul>
        </div>
        <!-- <v-search-list v-bind:label="equLabe4" v-bind:other="otherInfo" v-bind:list="equList.data"></v-search-list> -->
        <div class="others" v-if="indexed==5">
            <ul class="title">
                <li v-on:click="subOther=true" v-bind:class="{active:subOther==true}">巡视巡检</li>
                <li v-on:click=" subOther=false " v-bind:class="{active:subOther==false}">故障库</li>
            </ul>
            <v-search-list v-if="subOther " v-bind:label="equLabe5 " v-bind:other="otherInfo " v-bind:list="equList.data "></v-search-list>
            <v-search-list v-if="!subOther " v-bind:label="equLabe4 " v-bind:other="otherInfo " v-bind:list="equList.data "></v-search-list>
        </div>
        <div v-bind:class="indexed==5? 'pagination5': 'pagination' ">
            <el-pagination :page-size=" pageSize " @current-change="changePages " layout="prev, slot, next " :total="equList.total " prev-text="上一页 " next-text="下一页 ">
                <span>{{currentPage}}/{{Math.ceil(equList.total / pageSize)}}</span>
            </el-pagination>
        </div>
        <v-maintenance-sheet v-if="isPop" v-on:isPop="isPopFn"></v-maintenance-sheet>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                isPop: false,
                indexed: 1,
                currentPage: 1, //当前页数
                pageSize: 8, //每页显示数量
                otherInfo: {
                    isCheck: true, //是否显示多选框
                    style: 1 // 列表共有三种样式，1 搜索模块的样式, 2预警信息列表的样式，3其它
                },
                otherInfo1: {
                    isCheck: true, //是否显示多选框
                    style: 1, // 列表共有三种样式，1 搜索模块的样式, 2预警信息列表的样式，3其它
                    isEquInfo: true, //是否查看设备详情
                    isClick: true
                },
                otherInfo2: {
                    isCheck: true, //是否显示多选框
                    style: 1, // 列表共有三种样式，1 搜索模块的样式, 2预警信息列表的样式，3其它
                    isSheet: true, //是否查看设备详情
                    isClick: true
                },
                subOther: true, //其它子菜单二选一
                equLabel: [{
                    'label': '序号',
                    'width': 8,
                    'value': 'num'
                }, {
                    'label': '线路',
                    'width': 11,
                    'value': 'line'
                }, {
                    'label': '车站',
                    'width': 11,
                    'value': 'station'
                }, {
                    'label': '设备编号',
                    'width': 11,
                    'value': 'company'
                }, {
                    'label': '设备名称',
                    'width': 11,
                    'value': 'equName'
                }, {
                    'label': '设备系统',
                    'width': 11,
                    'value': 'equSystem'
                }, {
                    'label': '生产厂家',
                    'width': 11,
                    'value': 'factory'
                }, {
                    'label': '安装地点',
                    'width': 11,
                    'value': 'address'
                }, {
                    'label': '规格型号',
                    'width': 11,
                    'value': 'standard'
                }
                    // {
                    //     'label': '项目部',
                    //     'width': 8,
                    //     'value': 'project'
                    // }, {
                    //     'label': '安装合同编号',
                    //     'width': 8,
                    //     'value': 'contract'
                    // }, {
                    //     'label': '品牌',
                    //     'width': 8,
                    //     'value': 'brand'
                    // }
                ],
                equLabe2: [{
                    'label': '序号',
                    'width': 5,
                    'value': 'num'
                }, {
                    'label': '车站',
                    'width': 15,
                    'value': 'company'
                }, {
                    'label': '设备名称',
                    'width': 21,
                    'value': 'company'
                }, {
                    'label': '时间',
                    'width': 15,
                    'value': 'project'
                }, {
                    'label': '预警事件',
                    'width': 15,
                    'value': 'line'
                }, {
                    'label': '状态',
                    'width': 10,
                    'value': 'station'
                }],
                equLabe3: [{
                    'label': '序号',
                    'width': 8,
                    'value': 'num'
                }, {
                    'label': '故障单号',
                    'width': 9,
                    'value': 'company'
                }, {
                    'label': '线路',
                    'width': 8,
                    'value': 'station'
                }, {
                    'label': '车站',
                    'width': 8,
                    'value': 'equSystem'
                }, {
                    'label': '设备安装位置',
                    'width': 9,
                    'value': 'contract'
                }, {
                    'label': '设备编号',
                    'width': 9,
                    'value': 'address'
                }, {
                    'label': '故障系统',
                    'width': 9,
                    'value': 'brand'
                }, {
                    'label': '故障现象',
                    'width': 9,
                    'value': 'line'
                }, {
                    'label': '修复时间',
                    'width': 9,
                    'value': 'factory'
                }, {
                    'label': '维修人员',
                    'width': 9,
                    'value': 'standard'
                },


                // {
                //     'label': '运行公司',
                //     'width': 8,
                //     'value': 'project'
                // },
                {
                    'label': '修复确认',
                    'width': 9,
                    'value': 'equName'
                }],
                equLabe4: [{
                    'label': '序号',
                    'width': 5,
                    'value': 'company'
                }, {
                    'label': '设备类型编码',
                    'width': 10,
                    'value': 'company'
                }, {
                    'label': '设备类型',
                    'width': 10,
                    'value': 'company'
                }, {
                    'label': '故障部位编码',
                    'width': 10,
                    'value': 'company'
                }, {
                    'label': '故障部位',
                    'width': 10,
                    'value': 'company'
                }, {
                    'label': '故障原因编码',
                    'width': 10,
                    'value': 'company'
                }, {
                    'label': '故障原因',
                    'width': 10,
                    'value': 'company'
                }, {
                    'label': '维修策略编码',
                    'width': 10,
                    'value': 'company'
                }, {
                    'label': '维修建议',
                    'width': 10,
                    'value': 'project'
                }],
                equLabe5: [{
                    'label': '序号',
                    'width': 9,
                    'value': 'company'
                }, {
                    'label': '线路',
                    'width': 13,
                    'value': 'line'
                }, {
                    'label': '安装车站',
                    'width': 13,
                    'value': 'line'
                }, {
                    'label': '设备编号',
                    'width': 13,
                    'value': 'num'
                }, {
                    'label': '日期',
                    'width': 13,
                    'value': 'company'
                }, {
                    'label': '到达时间',
                    'width': 13,
                    'value': 'project'
                }, {
                    'label': '巡视巡检情况记录',
                    'width': 13,
                    'value': 'line'
                }, {
                    'label': '执行人',
                    'width': 13,
                    'value': 'line'
                }],
                equList: {
                    total: 9,
                    amount1: 39,
                    amount2: 87,
                    amount3: 16,
                    amount4: 57,
                    data: [{
                        num: '1',
                        company: '测试',
                        project: '测试',
                        line: '测试',
                        station: '测试',
                        equSystem: '测试',
                        equName: '测试',
                        contract: '测试',
                        address: '测试',
                        brand: '测试',
                        factory: '测试',
                        standard: '测试'
                    }, {
                        num: '1',
                        company: '测试',
                        project: '测试',
                        line: '测试',
                        station: '测试',
                        equSystem: '测试',
                        equName: '测试',
                        contract: '测试',
                        address: '测试',
                        brand: '测试',
                        factory: '测试',
                        standard: '测试'
                    }, {
                        num: '1',
                        company: '测试',
                        project: '测试',
                        line: '测试',
                        station: '测试',
                        equSystem: '测试',
                        equName: '测试',
                        contract: '测试',
                        address: '测试',
                        brand: '测试',
                        factory: '测试',
                        standard: '测试'
                    }, {
                        num: '1',
                        company: '测试',
                        project: '测试',
                        line: '测试',
                        station: '测试',
                        equSystem: '测试',
                        equName: '测试',
                        contract: '测试',
                        address: '测试',
                        brand: '测试',
                        factory: '测试',
                        standard: '测试'
                    }, {
                        num: '1',
                        company: '测试',
                        project: '测试',
                        line: '测试',
                        station: '测试',
                        equSystem: '测试',
                        equName: '测试',
                        contract: '测试',
                        address: '测试',
                        brand: '测试',
                        factory: '测试',
                        standard: '测试'
                    }, {
                        num: '1',
                        company: '测试',
                        project: '测试',
                        line: '测试',
                        station: '测试',
                        equSystem: '测试',
                        equName: '测试',
                        contract: '测试',
                        address: '测试',
                        brand: '测试',
                        factory: '测试',
                        standard: '测试'
                    }, {
                        num: '1',
                        company: '测试',
                        project: '测试',
                        line: '测试',
                        station: '测试',
                        equSystem: '测试',
                        equName: '测试',
                        contract: '测试',
                        address: '测试',
                        brand: '测试',
                        factory: '测试',
                        standard: '测试'
                    }, {
                        num: '1',
                        company: '测试',
                        project: '测试',
                        line: '测试',
                        station: '测试',
                        equSystem: '测试',
                        equName: '测试',
                        contract: '测试',
                        address: '测试',
                        brand: '测试',
                        factory: '测试',
                        standard: '测试'
                    }]
                }
            };
        },
        methods: {
            currentList(index) {
                this.indexed = index;
            },
            //改变当前页数
            changePages(val) {
                this.currentPage = val;
                // this.list();
            },
            isPopFn(value) {
                this.isPop = value;
            }
        }
    };
</script>

<style scoped lang="less">
    .showPic {
        position: relative;
        .border-bg {
            position: absolute;
            top: 0;
            left: 50%;
            transform: translate(-50%, -50%);
        }
        ul {
            padding: 0.82rem 0.48rem 0.2rem 0.48rem;
            background: #4d505f;

            li {
                flex: 1;
                margin: 0 0.22rem;
                img {
                    width: 3.1rem;
                    height: 3.1rem;
                }
                p {
                    font-size: 0.2rem;
                    height: 0.78rem;
                    line-height: 0.78rem;
                    color: #fff;
                    text-align: center;
                }
            }
        }
    }
    .others {
        .title {
            padding-top: 0.03rem;
            background: #414455;
            overflow: hidden;
            padding-left: 1.8rem;
            li {
                width: 2.22rem;
                height: 0.39rem;
                line-height: 0.39rem;
                font-size: 0.2rem;
                float: left;
                text-align: center;
                background: #4a4d5e;
                color: #ffffff;
                border-radius: 8px 8px 0px 0px;
                margin-left: 0.04rem;
                cursor: pointer;
            }
            li.active {
                background: #7c8298;
            }
        }
    }
    .middleSort {
        font-size: 0.24rem;
        width: 16.5rem;
        margin: 0.37rem auto 0.5rem auto;
        dd {
            width: 2.18rem;
            height: 2.2rem;
            background: rgba(0, 0, 0, 0.28);
            border-radius: 3px;
            border: 1px solid rgba(255, 255, 255, 0.4);
            text-align: center;
            float: left;
            margin-right: 1.4rem;
            box-shadow: 2px 10px 30px rgba(0, 0, 0, 0.18);
            cursor: pointer;
            p {
                height: 0.68rem;
                line-height: 0.68rem;
                color: #3c3f46;
            }
            img {
                width: 1.2rem;
                height: 1.2rem;
            }
        }
        dd.active {
            p {
                color: #fff;
                span {
                    color: #ffba00;
                }
            }
        }
        dd:last-child {
            margin-right: 0;
        }
    }
    .pagination {
        background: #414455;
        height: 1.08rem;
        text-align: center;
        margin-top: 0.05rem;
        .el-pagination {
            padding-top: 0.3rem;
            color: #fff;
        }
    }
    .pagination5 {
        background: #414455;
        height: 0.66rem;
        text-align: center;
        margin-top: 0.05rem;
        .el-pagination {
            padding-top: 0.15rem;
            color: #fff;
        }
    }
</style>