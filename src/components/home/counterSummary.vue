<template>
    <div class="counter-summary">
        <div class="tabs flex">
            <p class="tab" v-on:click="goListFn">车站运行情况</p>
        </div>
        <div class="tables">
            <v-table-small :title="['综合排名','线路','车站','状态']" :list="failureCount" :widths="[20,30,30,20]"></v-table-small>
        </div>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';
    import { formatDate } from '../../utils';
    export default {
        data() {
            return {
                failureCount: []
            };
        },
        created() {
            this.getListFn();
        },
        methods: {
            ...mapActions(['_getList']),
            goListFn() {
                this.$router.push('/stationStaffList');
            },
            getListFn() {
                const ops = {
                    curPage: '1',
                    pageSize: '6',
                    month: formatDate('', 5),
                    year: formatDate('', 6)
                };

                this._getList({
                    ops: ops,
                    api: 'stationList',
                    callback: res => {
                        res.rows.forEach(item => {
                            this.failureCount.push({
                                sequence: item.rank,
                                name: item.line,
                                station: item.station,
                                state: item.state
                            });
                        });
                    }
                });
            }
        }
    };
</script>

<style lang="less" scoped>
    .counter-summary {
        width: 4.3rem;
        height: 100%;
        flex-direction: column;
        .tabs {
            height: 0.3rem;
            width: 100%;
            align-items: flex-end;
            padding-left: 0.2rem;
            .tab {
                background-color: #525667;
                color: #fff;
                height: 0.28rem;
                border-radius: 0.1rem 0.1rem 0 0;
                padding: 0 0.1rem;
                margin: 0 0.02rem;
                line-height: 0.28rem;
                cursor: pointer;
            }
        }
        .tables {
            width: 100%;
            height: 3.4rem;
        }
    }
</style>


