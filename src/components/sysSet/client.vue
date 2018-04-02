<template>
    <div class="timeManagement">
        <div class="searchWrap">
            <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-progress="uploadFn">
                <button class="upload">上传</button>
                <span v-if="isUpload.isShow" class="title">{{isUpload.title}}</span>
                <span v-if="isUpload.isShow" class="progress">{{isUpload.progress}}</span>
            </el-upload>
            <!-- <v-sub-search v-bind:searchData="searchData"></v-sub-search> -->
        </div>
        <div class="middleKey">
            <v-system-list v-bind:label="info1" v-bind:list="equList.data"></v-system-list>
        </div>
        <div class=" pagination ">
            <el-pagination :page-size=" pageSize " @current-change="changePages " layout="prev, slot, next " :total="pageNumber" prev-text="上一页 " next-text="下一页 ">
                <span>{{currentPage}}/{{totalPage}}</span>
            </el-pagination>
        </div>
    </div>
</template>
<script>
    import { mapActions } from 'vuex';
    export default {
        data() {
            return {
                currentPage: 1, //当前页数
                pageSize: 9, //每页显示数量
                totalPage: 0,//总页数
                pageNumber: 0,//总条目数
                isUpload: {
                    isShow: false,
                    title: '',
                    progress: '0'
                },
                info1: [{
                    'label': '序号',
                    'width': 10,
                    'value': 'index'
                }, {
                    'label': '名称',
                    'width': 30,
                    'value': 'num'
                }, {
                    'label': '类型',
                    'width': 30,
                    'value': 'num'
                }, {
                    'label': '修改日期',
                    'width': 30,
                    'value': 'num'
                }],
                equList: {
                    total: 9,
                    data: [{
                        num: '测试',
                        ipAddress: '192.168.1.23',
                        port: '8000',
                        type: 'A类',
                        attendedMode: '连接方式'
                    }, {
                        num: '测试',
                        ipAddress: '192.168.1.23',
                        port: '8000',
                        type: 'A类',
                        attendedMode: '连接方式'
                    }, {
                        num: '测试',
                        ipAddress: '192.168.1.23',
                        port: '8000',
                        type: 'A类',
                        attendedMode: '连接方式'
                    }, {
                        num: '测试',
                        ipAddress: '192.168.1.23',
                        port: '8000',
                        type: 'A类',
                        attendedMode: '连接方式'
                    }, {
                        num: '测试',
                        ipAddress: '192.168.1.23',
                        port: '8000',
                        type: 'A类',
                        attendedMode: '连接方式'
                    }, {
                        num: '测试',
                        ipAddress: '192.168.1.23',
                        port: '8000',
                        type: 'A类',
                        attendedMode: '连接方式'
                    }, {
                        num: '测试',
                        ipAddress: '192.168.1.23',
                        port: '8000',
                        type: 'A类',
                        attendedMode: '连接方式'
                    }, {
                        num: '测试',
                        ipAddress: '192.168.1.23',
                        port: '8000',
                        type: 'A类',
                        attendedMode: '连接方式'
                    }, {
                        num: '测试',
                        ipAddress: '192.168.1.23',
                        port: '8000',
                        type: 'A类',
                        attendedMode: '连接方式'
                    }]
                }
            };
        },
        created() {
            this.getClientListFn();
        },
        methods: {
            ...mapActions(['_getList']),
            uploadFn(event, file, fileList) {
                this.isUpload.isShow = true;
                this.isUpload.title = file.name;
                this.isUpload.progress = parseInt(event.percent) + '%';
            },
            getClientListFn() {
                this._getList({
                    ops: {},
                    api: 'clientList',
                    callback: () => {

                    }
                });
            },
            //改变当前页数
            changePages(val) {
                this.currentPage = val;
                // this.getUserList();
            }
        }
    };
</script>
<style lang="less" scoped>
    .timeManagement {
        .searchWrap {
            padding-bottom: 0.14rem;
            .upload {
                width: 0.88rem;
                height: 0.38rem;
                line-height: 0.38rem;
                background: #7c8298;
                color: #fff;
                margin-left: 0.1rem;
            }
            .title {
                color: #2f4554;
            }
            .progress {
                color: red;
            }
        }
        .middleKey {
            border: 1px solid #71869b;
        }
    }
    .pagination {
        text-align: center;
        padding-top: 0.1rem;
    }
</style>
