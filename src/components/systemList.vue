<template>
    <div class="g-table">
        <ul class="title">
            <li v-for="(item, index) in label" v-bind:style="{width:item.width+'%'}">{{item.label}}</li>
        </ul>
        <dl class="content">
            <dd v-for="(item, index) in listShow">
                <div v-for="(item1, index) in label" v-bind:class="item1.status == 'status' ?'font-color-' + item.status:''" v-bind:style="{width:item1.width+'%'}">
                    <span v-if="item1.value">{{item[item1.value]}}</span>
                    <span v-else>
                        <a class="btn" href="javascript:;" v-if="item1.btn.delete">删除</a>
                        <a class="btn" href="javascript:;" v-if="item1.btn.edit">编辑</a>
                    </span>
                </div>
            </dd>
        </dl>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                isAllCkeck: false,
                listShow: [],
                numLength: 0
            };
        },
        props: ['list', 'label'],
        created() {
            this.listShow = this.list;
            this.listShow.forEach(item => {
                item.isCheck = false;
            });
        },
        methods: {
        }
    };
</script>
<style lang="less" scoped>
    .g-table {
        width: 100%;
        box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.35);
        ul {
            display: flex;
            -webkit-flex-flow: row wrap;
            justify-content: space-around;
            text-align: center;
            background: #d8dbe9;
            li {
                color: #fff;
                font-size: 0.18rem;
                height: 0.58rem;
                line-height: 0.58rem;
                color: #2f4554;
                border-right: 1px solid #bbbfcc;
                font-weight: bold;
            }
            li:last-child {
                border-right: none;
            }
        }
        .content {
            dd {
                display: flex;
                -webkit-flex-flow: row wrap;
                justify-content: space-around;
                text-align: center;
                img {
                    width: 0.29rem;
                    height: 0.29rem;
                    vertical-align: top;
                    margin-top: 0.165rem;
                }
                div {
                    height: 0.56rem;
                    line-height: 0.56rem;
                    font-size: 0.18rem;
                    color: #2f4554;
                    border-right: 1px solid #bbbfcc;
                }
                div:last-child {
                    border-right: none;
                    text-align: center;
                    .btn {
                        width: 0.68rem;
                        height: 0.28rem;
                        line-height: 0.28rem;
                        display: inline-block;
                        background: #7c8298;
                        color: #fff;
                        font-size: 0.16rem;
                        margin-right: 0.1rem;
                    }
                    .btn:hover {
                        text-decoration: none;
                    }
                    .btn:last-child {
                        margin-right: 0;
                    }
                }
            }
            dd:nth-child(2n-1) {
                background: #e5e8f7;
            }
            dd:nth-child(2n) {
                background: #d8dbea;
            }
        }
    }
</style>
