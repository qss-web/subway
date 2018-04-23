<template>
    <div class="qualification">
        <img class="axis" src="~assets/mine/icon_axis.png" />
        <div class="chart">
            <div class="circle low" style="border:1px solid red">
                <div class="circle middle">
                    <div class="circle high">
                    </div>
                </div>
                <!--低-->
                <span class="item01" style="left:1.7rem;bottom:1.8rem">F01</span>
                <span class="item02" style="left:1.5rem;bottom:0.4rem;">F02</span>
                <span class="item03" style="left:1.8rem;bottom:0.8rem;">F03</span>
                <!--中-->
                <span class="item01" style="left:1rem;bottom:0.5rem;">F04</span>
                <span class="item02" style="left:1.2rem;bottom:1rem;">F05</span>
                <!--高-->
                <span class="item01" style="left:0.5rem;bottom:1.2rem;">F06</span>
            </div>
        </div>
        <ul class="legend">
            <li><span class="">高区</span><span class="icon high"></span></li>
            <li><span class="">中区</span><span class="icon middle"></span></li>
            <li><span class="">低区</span><span class="icon low"></span></li>
        </ul>
    </div>
</template>
<script>
    import { mapActions } from 'vuex';
    export default {
        data() {
            return {
            };
        },
        created() {
            this.getMineRateFn();
        },
        methods: {
            ...mapActions(['_getList']),
            getMineRateFn() {
                this._getList({
                    ops: {},
                    api: 'mineRate',
                    callback: () => {
                    }
                });
            }
        }
    };
</script>

<style lang="less" scoped>
    .qualification {
        border: 1px solid #aaa;
        position: absolute;
        top: 0;
        left: 0.1rem;
        right: 0.1rem;
        bottom: 0.1rem;
        background-color: #85919a;
        .axis {
            position: absolute;
            width: 0.43rem;
            height: 2.03rem;
            top: 50%;
            transform: translateY(-50%);
            left: 0.2rem;
        }
        .chart {
            position: absolute;
            top: 50%;
            left: 1rem;
            .circle {
                border-radius: 50%;
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                left: 0;
            }
            .low {
                width: 2.33rem;
                height: 2.33rem;
                background-color: #0e6881;
                z-index: 1;
                box-shadow: -0.01rem 0;
            }
            .middle {
                width: 1.64rem;
                height: 1.64rem;
                background-color: #9fa818;
                z-index: 2;
            }
            .high {
                width: 1.02rem;
                height: 1.02rem;
                background-color: #9f0f18;
                z-index: 3;
            }
            .item01 {
                font-size: 0.12rem;
                position: absolute;
                z-index: 5;
                &:before {
                    content: '';
                    width: 0.06rem;
                    height: 0.06rem;
                    background: #000;
                    display: inline-block;
                    vertical-align: middle;
                    border-radius: 50%;
                    margin-right: 0.02rem;
                }
            }
            .item02 {
                font-size: 0.12rem;
                position: absolute;
                z-index: 5;
                &:before {
                    content: '';
                    width: 0.06rem;
                    height: 0.06rem;
                    background: #000;
                    display: inline-block;
                    vertical-align: middle;
                    margin-right: 0.02rem;
                }
            }
            .item03 {
                font-size: 0.12rem;
                position: absolute;
                z-index: 5;
                &:before {
                    content: '';
                    display: inline-block;
                    vertical-align: middle;
                    margin-right: 0.02rem;
                    width: 0;
                    height: 0;
                    border-left: 0.04rem solid transparent;
                    border-right: 0.04rem solid transparent;
                    border-bottom: 0.07rem solid #000;
                }
            }
        }
        .legend {
            position: absolute;
            right: 0.1rem;
            bottom: 0.1rem;
            width: 0.7rem;
            li {
                padding: 0.08rem;
                font-size: 0.14rem;
                color: #fff;
                .icon {
                    width: 0.16rem;
                    height: 0.16rem;
                    border-radius: 50%;
                    float: right;
                    margin-left: 0.1rem;
                }
                .low {
                    background-color: #0e6881;
                }
                .middle {
                    background-color: #9fa818;
                }
                .high {
                    background-color: #9f0f18;
                }
            }
        }
    }
</style>
