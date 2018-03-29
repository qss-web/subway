<template>
    <div class="g-table">
        <ul class="title">
            <li v-for="(item, index) in label" v-bind:style="{width:item.width+'%'}">{{item.label}}</li>
        </ul>
        <dl class="content">
            <dd v-for="(item, index) in listShow">
                <div v-for="(item1, index1) in label" v-bind:class="item1.status == 'status' ?'font-color-' + item.status:''" v-bind:style="{width:item1.width+'%'}">
                    <span v-if="item1.value">{{item[item1.value]}}</span>
                    <span v-if="item1.value == 'index'">{{index+1}}</span>
                    <span v-if="item1.btn">
                        <a v-for="(subItem,index) in item1.btn" class="btn" v-on:click="goToNextPage(subItem.fn)" href="javascript:;">{{subItem.name}}</a>
                    </span>
                    <select v-if="item1.select">
                        <option value="1">未设置</option>
                        <option value="2">手动操作</option>
                        <option value="3">自动同步</option>
                        <option value="4">默认未设置</option>
                    </select>
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
                numLength: 0,
                options: [{
                    value: '1',
                    label: '未设置'
                }, {
                    value: '2',
                    label: '手动操作'
                }, {
                    value: '3',
                    label: '自动同步'
                }, {
                    value: '4',
                    label: '默认未设置'
                }],
                value: ''
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
            goToNextPage(fn) {
                this.$emit('receive', fn);
            }
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
                        min-width: 0.28rem;
                        height: 0.28rem;
                        line-height: 0.28rem;
                        display: inline-block;
                        background: #7c8298;
                        color: #fff;
                        font-size: 0.16rem;
                        margin-right: 0.1rem;
                        padding: 0 0.2rem;
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
