<template>
    <div class="timeManagement">
        <div class="searchWrap">
            <v-sub-search v-bind:searchData="searchData"></v-sub-search>
        </div>
        <div class="middleKey">
            <v-system-list v-bind:label="info1" v-bind:list="equList.data"></v-system-list>
        </div>
        <div class=" pagination ">
            <el-pagination :page-size=" pageSize " @current-change="changePages " layout="prev, slot, next " :total="equList.total " prev-text="上一页 " next-text="下一页 ">
                <span>1/1</span>
            </el-pagination>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                searchData: {
                    'btnShow': {
                        'add': true,
                        'export': false,
                        'delete': false,
                        'edit': false,
                        'download': false,
                        'import': false,
                        'save': false
                    },
                    popSave() { }
                },
                info1: [{
                    'label': '排序',
                    'width': 10,
                    'value': 'num'
                }, {
                    'label': 'id',
                    'width': 10,
                    'value': 'id'
                }, {
                    'label': '菜单名称',
                    'width': 50,
                    'value': 'menuName'
                }, {
                    'label': '操作',
                    'width': 30,
                    'btn': { 'delete': true, 'edit': true, 'childMenu': true }
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
                        menuName: '实时报警统计'
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
                        menuName: '历史报警统计'
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
        }
    };
</script>
<style lang="less" scoped>
    .timeManagement {
        .searchWrap {
            padding-bottom: 0.14rem;
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
