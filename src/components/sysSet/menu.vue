<template>
    <div class="timeManagement">
        <div class="middleKey">
            <v-system-list v-bind:label="info1" v-bind:list="equList.data" v-on:receive="btnFn"></v-system-list>
        </div>
        <div class=" pagination ">
            <el-pagination :page-size=" pageSize " @current-change="changePages " layout="prev, slot, next " :total="equList.total " prev-text="上一页 " next-text="下一页 ">
                <span>1/1</span>
            </el-pagination>
        </div>
        <v-pop-box v-on:save="saveFn" v-on:receive="cancleFn" v-if="isShowPop" v-bind:popData="popData1"></v-pop-box>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                isShowPop: false,
                popData1: {
                    'titleTotal': '编辑菜单名称',
                    'options': [{
                        'status': 1,
                        'title': '菜单名称',
                        'placeholder': '请输入用菜单名称',
                        'val': 'userName'
                    }],
                    popSave(val) { }
                },
                info1: [{
                    'label': '序号',
                    'width': 10,
                    'value': 'index'
                }, {
                    'label': 'ID',
                    'width': 10,
                    'value': 'id'
                }, {
                    'label': '菜单名称',
                    'width': 50,
                    'value': 'menuName'
                }, {
                    'label': '操作',
                    'width': 30,
                    'btn': [{ 'delete': true, 'name': '删除', 'fn': 'deleteFn' }, { 'edit': true, 'name': '编辑', 'fn': 'editFn' }]
                }],
                equList: {
                    total: 9,
                    data: [{
                        num: '0',
                        id: '23',
                        menuName: 'GIS地图'
                    }, {
                        num: '1',
                        id: '23',
                        menuName: '设备状态'
                    }, {
                        num: '2',
                        id: '23',
                        menuName: '实时预警统计'
                    }, {
                        num: '3',
                        id: '23',
                        menuName: '导出WORD'
                    }, {
                        num: '4',
                        id: '23',
                        menuName: '当前运行状态'
                    }, {
                        num: '5',
                        id: '23',
                        menuName: '导出WORD'
                    }, {
                        num: '6',
                        id: '23',
                        menuName: '历史预警统计'
                    }, {
                        num: '7',
                        id: '23',
                        menuName: '导出WORD'
                    }, {
                        num: '8',
                        id: '23',
                        menuName: '测点状态'
                    }, {
                        num: '9',
                        id: '23',
                        menuName: '导出EXCEL'
                    }]
                }
            };
        },
        created() {

        },
        methods: {
            //子组件按钮
            btnFn(val) {
                this[val]();
            },
            //删除操作
            deleteFn() {
                alert(2);
            },
            //编辑操作
            editFn() {
                this.isShowPop = true;
            },
            saveFn() {
                this.isShowPop = false;
            },
            cancleFn() {
                this.isShowPop = false;
            }
        }
    };
</script>
<style lang="less" scoped>
    .timeManagement {
        .middleKey {
            border: 1px solid #71869b;
        }
    }
    .pagination {
        text-align: center;
        padding-top: 0.1rem;
    }
</style>
