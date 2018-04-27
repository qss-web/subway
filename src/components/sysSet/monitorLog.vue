<template>
    <dl class="monitorLog">
        <dd>
            <span>{{disk}}</span>
            <p>硬盘总大小</p>
        </dd>
        <dd>
            <span>{{cpuUsage}}</span>
            <p>CPU使用率</p>
        </dd>
        <dd>
            <span>{{memUsage}}</span>
            <p>内存使用率</p>
        </dd>
        <dd>
            <span>{{diskUsage}}</span>
            <p>硬盘使用率</p>
        </dd>
    </dl>
</template>
<script>
    import { mapActions } from 'vuex';
    export default {
        data() {
            return {
                disk: '',
                cpuUsage: '',
                memUsage: '',
                diskUsage: ''
            };
        },
        created() {
            this.getMonitorLogFn();
        },
        methods: {
            ...mapActions(['_getInfo']),
            getMonitorLogFn() {
                this._getInfo({
                    ops: {},
                    api: 'getMonitorLog',
                    callback: res => {
                        this.disk = res.disk;
                        this.cpuUsage = res.cpuUsage;
                        this.memUsage = res.memUsage;
                        this.diskUsage = res.diskUsage;
                    }
                });
            }
        }
    };
</script>
<style lang="less" scoped>
    .monitorLog {
        overflow: hidden;
        padding: 1rem 2.6rem;
        dd {
            width: 48.5%;
            min-height: 1.4rem;
            float: left;
            background: #fff;
            text-align: center;
            border-radius: 10px;
            box-shadow: 3px 3px 10px #888888;
            padding: 0.7rem 0;
            color: #2f4554;
            span {
                font-size: 0.22rem;
                display: block;
                height: 0.3rem;
                line-height: 0.3rem;
            }
            p {
                font-size: 0.2rem;
                line-height: 0.4rem;
            }
        }
        dd:nth-child(2n-1) {
            margin-right: 3%;
        }
        dd:nth-child(1) {
            margin-bottom: 0.5rem;
        }
        dd:nth-child(2) {
            margin-bottom: 0.5rem;
        }
    }
</style>
