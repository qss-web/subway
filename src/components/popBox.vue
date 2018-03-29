<template>
    <div>
        <div class="mask"></div>
        <div class="popContent">
            <h3>{{popData.titleTotal}}</h3>
            <div class="content">
                <div class="subContent clearfix">
                    <ul v-for="(item,index) in popData.options" :key="index">
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
                            <el-date-picker v-model="req[item.val1]" type="month" v-bind:placeholder="item.placeholderS" size="mini"></el-date-picker>
                            <i>至</i>
                            <el-date-picker v-model="req[item.val2]" type="month" v-bind:placeholder="item.placeholderE" size="mini"></el-date-picker>
                        </li>
                    </ul>
                </div>
                <div class="btn">
                    <a href="javascript:;" v-on:click="onSubmit">确定</a>
                    <a href="javascript:;" v-on:click="onCancle">取消</a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                req: {
                }
            };
        },
        props: ['popData'],
        methods: {
            onSubmit() {
                this.$emit('save', this.req);
            },
            onCancle() {
                this.$emit('receive', false);
            }
        }
    };
</script>
<style lang="less" scoped>
    .mask {
        position: fixed;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        background: rgba(0, 0, 0, 0.5);
        z-index: 5;
    }
    .popContent {
        position: fixed;
        background: #fff;
        width: 8rem;
        left: 0;
        right: 0;
        top: 2rem;
        margin: 0 auto;
        z-index: 6;
        border-radius: 8px;
        overflow: hidden;
        h3 {
            height: 0.58rem;
            line-height: 0.58rem;
            background: #2f4553;
            color: #fff;
            font-size: 0.18rem;
            text-indent: 1em;
            font-weight: normal;
        }
        .content {
            padding: 0.3rem 0;
            background: #cfd6f3;
            .subContent {
                overflow: hidden;
                ul {
                    float: left;
                    width: 50%;
                    li {
                        padding-left: 0.26rem;
                        color: #2f4553;
                        margin-bottom: 0.2rem;
                        span {
                            float: left;
                            font-size: 0.2rem;
                            height: 0.46rem;
                            line-height: 0.46rem;
                            width: 1rem;
                        }
                    }
                }
            }
            .btn {
                text-align: center;
                margin-top: 0.1rem;
                a {
                    display: inline-block;
                    width: 1.2rem;
                    height: 0.38rem;
                    line-height: 0.38rem;
                    background: #2f4553;
                    color: #fff;
                    text-align: center;
                    border-radius: 5px;
                    box-shadow: 1px 3px 1px rgba(0, 0, 0, 0.3);
                }
                a:hover {
                    text-decoration: none;
                }
                a:nth-child(1) {
                    margin-right: 0.8rem;
                }
            }
        }
    }

    // // 分割线
    .el-input--mini {
        width: 2.4rem;
        background: #fff;
        border-radius: 5px;
        text-indent: 1em;
    }
    .el-select--mini {
        width: 2.4rem;
        background: #fff;
        border-radius: 5px;
        text-indent: 1em;
    }
    .el-date-editor.el-input,
    .el-date-editor.el-input__inner {
        width: 2.4rem;
        vertical-align: top;
        border-radius: 5px;
    }
</style>
<style>
    .el-input__inner {
        color: #2f4553 !important;
    }
</style>
