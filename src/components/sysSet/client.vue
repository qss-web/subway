<template>
    <div class="timeManagement">
        <div class="searchWrap">
            <el-upload class="upload-demo" :action="uploadUrl" :show-file-list="false" :on-progress="uploadFn" :on-success="successFn">
                <button class="upload" v-if="isShowClient">上传</button>
                <span v-if="isUpload.isShow" class="title">{{isUpload.title}}</span>
                <span v-if="isUpload.isShow" class="progress">{{isUpload.progress}}</span>
            </el-upload>
            <!-- <v-sub-search v-bind:searchData="searchData"></v-sub-search> -->
        </div>
        <div class="middleKey">
            <v-system-list v-bind:label="info1" v-bind:other="otherInfo" v-bind:list="equList" v-on:receive="btnFn"></v-system-list>
        </div>
        <div class=" pagination ">
            <el-pagination :page-size=" pageSize " @current-change="changePages" :current-page="currentPage" layout="prev, slot, next " :total="pageNumber" prev-text="上一页 " next-text="下一页 ">
                <span>{{currentPage}}/{{totalPage}}</span>
            </el-pagination>
        </div>
    </div>
</template>
<script>
    import { mapActions, mapMutations, mapState } from 'vuex';
    import { formatDate } from '../../utils';
    export default {
        data() {
            return {
                currentPage: 1, //当前页数
                pageSize: 9, //每页显示数量
                totalPage: 0,//总页数
                pageNumber: 0,//总条目数
                uploadUrl: '', //上传的地址
                isUpload: {
                    isShow: false,
                    title: '',
                    progress: '0'
                },
                otherInfo: {
                    isCheck: false //是否显示多选框
                },
                info1: [{
                    'label': '序号',
                    'width': 10,
                    'value': 'index'
                }, {
                    'label': '文件名',
                    'width': 25,
                    'value': 'fileName'
                }, {
                    'label': '上传时间',
                    'width': 25,
                    'value': 'uploadTime'
                }, {
                    'label': '版本号',
                    'width': 20,
                    'value': 'version'
                }, {
                    'label': '操作',
                    'width': 20,
                    'btn': [{ 'delete': true, 'name': '删除', 'fn': 'deleteFn' }]
                }],
                equList: [],
                isShowClient: true
            };
        },
        computed: {
            ...mapState(['isPowerShow'])
        },
        created() {
            this.uploadUrl = 'http://' + window.location.host + '/bjdt/common/uploadWeb';
            // this.uploadUrl = "http://bhxz.net:48092/bjdt/common/uploadWeb";
            // this.uploadUrl = "http://192.168.0.159:8080/bjdt/common/uploadWeb";
            this.getClientListFn();

            if(this.isPowerShow && this.isPowerShow.length > 3) {
                this.powerControl = eval(this.isPowerShow)[5];
                //是否有权限上传客户端
                if(!this.powerControl[0].flag) {
                    this.isShowClient = false;
                }
            }
        },
        methods: {
            ...mapActions(['_getList', '_getInfo']),
            ...mapMutations(['_currentIndex']),
            uploadFn(event, file) {
                this.isUpload.isShow = true;
                this.isUpload.title = file.name;
                this.isUpload.progress = parseInt(event.percent) + '%';
            },
            successFn(res, file) {
                this._getInfo({
                    ops: {
                        "fileName": file.name,
                        "fileUrl": res.body.url,
                        "uploadTime": formatDate('', '2')
                    },
                    api: 'clientAdd',
                    callback: () => {
                        this.getClientListFn();
                        this.isUpload.isShow = false;
                    }

                });
            },
            getClientListFn() {
                const ops = {
                    'curPage': this.currentPage,
                    'pageSize': this.pageSize
                };

                this._currentIndex(ops);
                this._getList({
                    ops: ops,
                    api: 'clientList',
                    callback: res => {
                        this.equList = res.rows;
                        this.totalPage = res.total;
                        this.pageNumber = res.records;
                    }
                });
            },
            //改变当前页数
            changePages(val) {
                this.currentPage = val;
                this.getClientListFn();
            },
            //子组件按钮
            btnFn(val) {
                this[val.fn](val.id, val.item);
            },
            //删除操作
            deleteFn(id) {
                this._getList({
                    ops: { ids: id.toString() },
                    api: 'clientDel',
                    callback: () => {
                        this.$message.success('删除成功!');
                        this.getClientListFn();
                    }
                });
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
