<template>
    <div v-bind:class="'g-table-' + other.style">
        <!--title-->
        <ul class="title">
            <li style="width: 4%; cursor: pointer" v-if="other.isCheck" v-on:click="checkAllFn">
                <img v-if="!isAllCkeck" src="../assets/search/check.png" />
                <img v-else src="../assets/search/checked.png" />
            </li>
            <li v-for="(item, index) in label" v-bind:style="{width:item.width+'%'}">{{item.label}}</li>
        </ul>
        <!--content-->

        <dl class="content">
            <dd v-for="(item, index) in listShow">
                <span style="width: 4%!important; cursor: pointer" v-if="other.isCheck" v-on:click="singleCheckFn(index)">
                    <img v-if="!item.isCheck" src="../assets/search/check.png"/>
                    <img v-if="item.isCheck" src="../assets/search/checked.png"/>
                </span>
                <div v-for="(item1, index1) in label" v-bind:style="{width:item1.width+'%'}">
                    <span v-if="item1.value == 'index'" v-bind:style="other.goToNextFn?'cursor: pointer':''" v-on:click="goToNextPageLine(other.goToNextFn,item)">
                        <i v-if="type==1"> {{(currentIndex01.pageSize*(currentIndex01.curPage-1))+(index+1)}}</i>
                        <i v-else-if="type==2"> {{(currentIndex02.pageSize*(currentIndex02.curPage-1))+(index+1)}}</i>
                        <i v-else-if="type==4"> {{(currentIndex04.pageSize*(currentIndex04.curPage-1))+(index+1)}}</i>
                        <i v-else-if="type==5"> {{(currentIndex05.pageSize*(currentIndex05.curPage-1))+(index+1)}}</i>
                        <i v-else-if="type==6"> {{(currentIndex06.pageSize*(currentIndex06.curPage-1))+(index+1)}}</i>
                        <i v-else-if="type==7"> {{(currentIndex07.pageSize*(currentIndex07.curPage-1))+(index+1)}}</i>
                        <i v-else> {{(currentIndex.pageSize*(currentIndex.curPage-1))+(index+1)}}</i>
                    </span>
                    <!-- btnCss 判断按钮的样式，现在有两种按钮的样式 -->
                    <span v-else-if="item1.btn" v-bind:class="other.btnCss?'btnCss':'btn'">
                        <a v-for="(subItem,index) in item1.btn" v-on:click="goToNextPageBtn(subItem.fn,item)" href="javascript:;">{{subItem.name}}</a>
                    </span>
                    <span class="picShow" v-else-if="item1.showPic">
                        <span>
                            {{item1.showPic}}
                            <img v-if="item[item1.value] && (item[item1.value].search('.jpg') != -1||item[item1.value].search('.png') != -1)" v-bind:src="item[item1.value]"/>
                            <i class="hoverShow" v-else>暂无图片</i>
                        </span>
                    </span>
                    <span v-else v-on:click="goToNextPageLine(other.goToNextFn,item)">
                        <a v-if="item1.status&&item1.status=='status'" class="textShow" v-bind:style="other.goToNextFn?'cursor: pointer':''"  v-bind:class="item.status?listStatus[item.status-1] :''" >
                            {{item[item1.value]}}
                            <i class="redDot" v-if="item1.isShowRed && item.type==1"></i>
                        </a>
                        <a v-else class="textShow" v-bind:style="other.goToNextFn?'cursor: pointer':''">
                            {{item[item1.value]}}
                            <i class="redDot" v-if="item1.isShowRed && item.type==1"></i>
                        </a>
                        <i class="hoverShow" v-if="!item1.isShowRed">{{item[item1.value]}}</i>

                        <ul class="hoverShow" v-if="item1.isShowRed && item.type==1" style="left: -1.6rem; width: 4.2rem;">
                            <li class="specialBox" v-for="(itemList,index) in item.gzlist">
                                <i class="row" v-if="itemList.type == 'fault'">故障单：{{itemList.name}}， <a href="javascript:;" v-on:click.stop="showSheetFn(itemList)">单号：{{itemList.status}}</a><i class="time">时间:{{itemList.time}}</i></i>
                                <i class="row" v-if="itemList.type == 'inspect'">巡视巡检：{{itemList.name}}状态：{{itemList.status}}<i class="time">时间:{{itemList.time}}</i></i>
                            </li>
                        </ul>
                    </span>
                </div>
            </dd>
        </dl>
    </div>
</template>
<script>
    import { mapMutations, mapState } from 'vuex';
    export default {
        data() {
            return {
                isAllCkeck: false,
                numLength: 0,
                listCheck: [],
                checkedValue: '',
                //车站状态
                listStatus: ['error', 'warn', 'normal', 'stop', 'offline']
            };
        },
        props: ['list', 'label', 'other', 'curPage', 'tabShow', 'type'],
        computed: {
            ...mapState(['currentIndex', 'currentIndex01', 'currentIndex02', 'currentIndex04', 'currentIndex05', 'currentIndex06', 'currentIndex07']),
            listShow() {
                return this.list;
            }
        },
        watch: {
            list() {
                if(this.numLength == this.listShow.length && this.numLength != 0) {
                    this.isAllCkeck = true;
                } else {
                    this.isAllCkeck = false;
                }
            },
            curPage() {
                this.numLength = 0;
            },
            //有选项卡的时候判断，切换选项卡，全选的值不选中
            tabShow() {
                this.numLength = 0;
            }
        },
        created() {

        },
        methods: {
            ...mapMutations(['_itemObj', '_test', '_setCheckMark']),
            checkAllFn() {
                this.listShow.forEach(item => {
                    if(this.isAllCkeck != item.isCheck) {
                        item.isCheck = item.isCheck;
                    } else {
                        item.isCheck = !item.isCheck;
                    }
                    if(item.isCheck) {
                        this.numLength = this.listShow.length;
                    } else {
                        this.numLength = 0;
                    }
                });
                this.isAllCkeck = !this.isAllCkeck;
                this.checkedValue = '';
                this.listShow.forEach(item => {
                    if(item.isCheck && this.other.pouuid) {
                        this.checkedValue += item.pouuid + ',';
                    } else if(item.isCheck && item.deviceId) {
                        this.checkedValue += item.deviceId + ',';
                    } else if(item.isCheck && item.rowid && this.other.exportParam) {
                        this.checkedValue += item.equuid + ',';
                    } else if(item.isCheck && item.rowid) {
                        this.checkedValue += item.rowid + ',';
                    } else if(item.isCheck && this.other.isAllItem) {
                        this.checkedValue += JSON.stringify(item) + ',';
                    } else if(item.isCheck) {
                        this.checkedValue += item.id + ',';
                    }
                });
                if(this.other.isSetCheckMark) {
                    this._setCheckMark(this.checkedValue.substr(0, this.checkedValue.length - 1));
                } else {
                    this._setCheckMark('');
                }
                this.$emit('ids', this.checkedValue);
            },
            singleCheckFn(index) {
                this.listShow[index].isCheck = !this.listShow[index].isCheck;
                if(this.listShow[index].isCheck) {
                    this.numLength++;
                } else {
                    this.numLength--;
                }
                this.$set(this.listShow, index, this.listShow[index]);
                if(this.numLength == this.listShow.length) {
                    this.isAllCkeck = true;
                } else {
                    this.isAllCkeck = false;
                }
                this.checkedValue = '';
                this.listShow.forEach(item => {
                    if(item.isCheck && this.other.pouuid) {
                        this.checkedValue += item.pouuid + ',';
                    } else if(item.isCheck && item.deviceId) {
                        this.checkedValue += item.deviceId + ',';
                    } else if(item.isCheck && item.rowid && this.other.exportParam) {
                        this.checkedValue += item.equuid + ',';
                    } else if(item.isCheck && item.rowid) {
                        this.checkedValue += item.rowid + ',';
                    } else if(item.isCheck && this.other.isAllItem) {
                        this.checkedValue += JSON.stringify(item) + ',';
                    } else if(item.isCheck) {
                        this.checkedValue += item.id + ',';
                    }
                });
                if(this.other.isSetCheckMark) {
                    this._setCheckMark(this.checkedValue.substr(0, this.checkedValue.length - 1));
                } else {
                    this._setCheckMark('');
                }
                this.$emit('ids', this.checkedValue);
            },
            //按钮点击
            goToNextPageBtn(fn, item) {
                this._itemObj(item);
                this.$emit('receive', fn);
            },
            //整行点击
            goToNextPageLine(fn, item) {
                if(fn) {
                    this._itemObj(item);
                    this.$emit('receive', fn);
                }
            },
            showSheetFn(item) {
                this._itemObj(item);
                this.$emit('isShowSheet', true);
            }
        }
    };
</script>
<style lang="less" scoped>
    i {
        font-style: normal;
    }
    .textShow {
        cursor: default;
        display: block !important;
        width: 100% !important;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .specialBox {
        i.row {
            font-style: normal;
            a {
                color: #2f4554;
                text-decoration: underline;
            }
            i.time {
                display: block;
                font-style: normal;
                color: rgb(116, 113, 113);
                line-height: 0.28rem;
                margin-bottom: 0.1rem;
            }
        }
    }
    .picShow {
        span {
            // color: #fff;
            text-decoration: underline;
            position: relative;
            display: block;
            img {
                display: none;
                position: absolute;
                bottom: 0.2rem;
                left: -0.4rem;
                width: 0.9rem !important;
                height: 1.2rem !important;
                z-index: 1;
            }
        }
    }
    .picShow {
        span:hover {
            img {
                display: block;
            }
        }
    }
    div span {
        display: block;
        width: 100% !important;
        position: relative;

        i.hoverShow {
            display: none;
            font-style: normal;
            position: absolute;
            bottom: 0.4rem;
            left: 0;
            line-height: 0.2rem;
            background: rgba(255, 255, 255, 0.8);
            color: #000;
            border-radius: 4px;
            padding: 0.05rem 0.1rem;
            border: 1px solid #e1e1e1;
            box-shadow: 1px 1px 2px #ccc;
        }
        ul.hoverShow {
            display: none;
            font-style: normal;
            position: absolute;
            width: 3rem;
            bottom: 0.4rem;
            left: 0;
            background: rgba(255, 255, 255, 0.8);
            border-radius: 4px;
            padding: 0.05rem 0.1rem;
            border: 1px solid #e1e1e1;
            box-shadow: 1px 1px 2px #ccc;
            li {
                font-weight: normal;
                line-height: 0.26rem;
                color: #000;
                font-size: 0.16rem;
                text-align: left;
            }
        }
    }
    div span:hover {
        i.hoverShow {
            display: block;
        }
        ul.hoverShow {
            display: block;
        }
    }
    .redDot {
        display: inline-block;
        width: 0.08rem;
        height: 0.08rem;
        background: red;
        border-radius: 100%;
        box-shadow: 0px 0px 8px 2px red;
        margin-left: 0.1rem;
        position: relative;
        .list {
            position: fixed;
            width: 3rem;
            z-index: 1;
            top: 0;
            right: 0;
            border: 1px solid red;
        }
    }
    .btn {
        a {
            min-width: 0.28rem;
            line-height: 0.28rem;
            display: inline-block;
            background: #7c8298;
            color: #fff;
            font-size: 0.16rem;
            margin-right: 0.1rem;
            padding: 0 0.2rem;
        }
        a:last-child {
            margin-right: 0;
        }
    }
    .btnCss {
        a {
            display: inline-block;
            color: #fff;
            font-size: 0.16rem;
            margin-right: 0.1rem;
            text-decoration: underline;
        }
        a:last-child {
            margin-right: 0;
        }
    }
    .g-table-1 {
        width: 100%;
        border-top: 1px solid #343740;
        box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.35);
        ul {
            display: flex;
            -webkit-flex-flow: row wrap;
            justify-content: space-around;
            text-align: center;
            border-bottom: 1px solid #abaeb5;
            color: #fff;
            background: url('../assets/search/sub_title_bg.png') repeat-x;
            font-size: 0.2rem;
            line-height: 0.38rem;
            font-weight: bold;
            li {
                img {
                    width: 0.24rem;
                    height: 0.24rem;
                    vertical-align: top;
                    margin-top: 0.075rem;
                }
            }
        }
        .content {
            dd {
                display: flex;
                -webkit-flex-flow: row wrap;
                justify-content: space-around;
                text-align: center;
                img {
                    width: 0.24rem;
                    height: 0.24rem;
                    vertical-align: top;
                    margin-top: 0.16rem;
                }
                span {
                    line-height: 0.56rem;
                    font-size: 0.18rem;
                    color: #fff;
                }
                span:first-child {
                    width: 4%;
                }
            }
            dd:nth-child(2n-1) {
                background: #414455;
            }
            dd:nth-child(2n) {
                background: #4d505f;
            }
        }
    }
    .g-table-2 {
        width: 100%;
        border-top: 1px solid #caccce;
        box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.35);
        ul {
            display: flex;
            -webkit-flex-flow: row wrap;
            justify-content: space-around;
            text-align: center;
            color: #0e0e0e;
            background: #d7d9db;
            font-size: 0.2rem;
            line-height: 0.52rem;
            font-weight: bold;
            li {
                img {
                    width: 0.24rem;
                    height: 0.24rem;
                    vertical-align: top;
                    margin-top: 0.14rem;
                }
            }
        }
        .content {
            dd {
                display: flex;
                -webkit-flex-flow: row wrap;
                justify-content: space-around;
                text-align: center;
                img {
                    width: 0.24rem;
                    height: 0.24rem;
                    vertical-align: top;
                    margin-top: 0.16rem;
                }
                span {
                    line-height: 0.56rem;
                    font-size: 0.2rem;
                    color: #fff;
                }
                span:first-child {
                    width: 4%;
                }
            }
            dd:nth-child(2n-1) {
                background: #3c3f46;
            }
            dd:nth-child(2n) {
                background: #45484f;
            }
        }
    }
    .g-table-3 {
        width: 100%;
        border-top: 1px solid #caccce;
        box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.35);
        border-left: 1px solid #587386;
        border-right: 1px solid #587386;
        ul {
            display: flex;
            -webkit-flex-flow: row wrap;
            justify-content: space-around;
            text-align: center;
            color: #1c1e2a;
            background: #c5cbe3;
            font-size: 0.2rem;
            line-height: 0.52rem;
            font-weight: bold;
            li {
                img {
                    width: 0.24rem;
                    height: 0.24rem;
                    vertical-align: top;
                    margin-top: 0.14rem;
                }
            }
        }
        .content {
            dd {
                display: flex;
                -webkit-flex-flow: row wrap;
                justify-content: space-around;
                text-align: center;
                img {
                    width: 0.24rem;
                    height: 0.24rem;
                    vertical-align: top;
                    margin-top: 0.14rem;
                }
                span {
                    line-height: 0.52rem;
                    font-size: 0.2rem;
                    color: #2f4554;
                }
                span:first-child {
                    width: 4%;
                }
            }
            dd:nth-child(2n-1) {
                background: #e5e8f7;
            }
            dd:nth-child(2n) {
                background: #c5cbe3;
            }
        }
    }
    .g-table-4 {
        width: 100%;
        ul {
            display: flex;
            -webkit-flex-flow: row wrap;
            justify-content: space-around;
            text-align: center;
            color: #1c1e2a;
            background: #c5cbe3;
            font-size: 0.16rem;
            line-height: 0.4rem;
            font-weight: bold;
            li {
                img {
                    width: 0.24rem;
                    height: 0.24rem;
                    vertical-align: top;
                    margin-top: 0.08rem;
                }
            }
        }
        .content {
            dd {
                display: flex;
                -webkit-flex-flow: row wrap;
                justify-content: space-around;
                text-align: center;
                background: #404455;
                img {
                    width: 0.24rem;
                    height: 0.24rem;
                    vertical-align: top;
                    margin-top: 0.14rem;
                }
                span {
                    line-height: 0.52rem;
                    font-size: 0.16rem;
                    color: #fff;
                }
                span:first-child {
                    width: 4%;
                }
            }
        }
    }
    .g-table-5 {
        padding: 0.2rem 0;
        width: 100%;
        ul {
            display: flex;
            -webkit-flex-flow: row wrap;
            justify-content: space-around;
            text-align: center;
            border: 1px solid #1d1c24;
            border-bottom: 1px solid rgba(255, 255, 255, 0.35);
            color: #fff;
            background: url('../assets/other/sub_title_bg.png') repeat-x;
            font-size: 0.16rem;
            line-height: 0.38rem;
            margin: 0 0.04rem;
            font-weight: bold;
            li {
                img {
                    width: 0.24rem;
                    height: 0.24rem;
                    vertical-align: top;
                    margin-top: 0.075rem;
                }
            }
        }
        .content {
            dd {
                display: flex;
                -webkit-flex-flow: row wrap;
                justify-content: space-around;
                text-align: center;
                background: #404455;
                img {
                    width: 0.24rem;
                    height: 0.24rem;
                    vertical-align: top;
                    margin-top: 0.14rem;
                }
                span {
                    line-height: 0.52rem;
                    font-size: 0.16rem;
                    color: #fff;
                }
                span:first-child {
                    width: 4%;
                }
            }
        }
    }
    .g-table-6 {
        width: 100%;
        ul {
            display: flex;
            -webkit-flex-flow: row wrap;
            justify-content: space-around;
            text-align: center;
            color: #1c1e2a;
            background: #c5cbe3;
            font-size: 0.2rem;
            line-height: 0.52rem;
            font-weight: bold;
            li {
                img {
                    width: 0.24rem;
                    height: 0.24rem;
                    vertical-align: top;
                    margin-top: 0.14rem;
                }
            }
        }
        .content {
            dd {
                display: flex;
                -webkit-flex-flow: row wrap;
                justify-content: space-around;
                text-align: center;
                img {
                    width: 0.24rem;
                    height: 0.24rem;
                    vertical-align: top;
                    margin-top: 0.14rem;
                }
                span {
                    line-height: 0.52rem;
                    font-size: 0.2rem;
                    color: #2f4554;
                }
                span:first-child {
                    width: 4%;
                }
            }
            dd:nth-child(2n-1) {
                background: #e5e8f7;
            }
            dd:nth-child(2n) {
                background: #d4d9ed;
            }
        }
    }
    .g-table-7 {
        width: 100%;
        ul {
            display: flex;
            -webkit-flex-flow: row wrap;
            justify-content: space-around;
            text-align: center;
            color: #1c1e2a;
            background: #e5e8f7;
            font-size: 0.2rem;
            line-height: 0.52rem;
            font-weight: bold;
            li {
                img {
                    width: 0.24rem;
                    height: 0.24rem;
                    vertical-align: top;
                    margin-top: 0.14rem;
                }
            }
        }
        .content {
            dd {
                display: flex;
                -webkit-flex-flow: row wrap;
                justify-content: space-around;
                text-align: center;
                img {
                    width: 0.24rem;
                    height: 0.24rem;
                    vertical-align: top;
                    margin-top: 0.14rem;
                }
                span {
                    line-height: 0.52rem;
                    font-size: 0.2rem;
                    color: #2f4554;
                }
                span:first-child {
                    width: 4%;
                }
            }
            dd:nth-child(2n-1) {
                background: #dadff2;
            }
            dd:nth-child(2n) {
                background: #cfd5eb;
            }
        }
    }
    .g-table-8 {
        width: 100%;
        ul {
            display: flex;
            -webkit-flex-flow: row wrap;
            justify-content: space-around;
            text-align: center;
            color: #2f4554;
            background: #e4e8f7;
            font-size: 0.18rem;
            line-height: 0.36rem;
            font-weight: bold;
            li {
                img {
                    width: 0.24rem;
                    height: 0.24rem;
                    vertical-align: top;
                    margin-top: 0.06rem;
                }
            }
        }
        .content {
            dd {
                display: flex;
                -webkit-flex-flow: row wrap;
                justify-content: space-around;
                text-align: center;
                img {
                    width: 0.24rem;
                    height: 0.24rem;
                    vertical-align: top;
                    margin-top: 0.06rem;
                }
                span {
                    font-size: 0.18rem;
                    line-height: 0.36rem;
                    color: #2f4554;
                }
                span:first-child {
                    width: 4%;
                }
            }
            dd:nth-child(2n-1) {
                background: #d7dae9;
            }
            dd:nth-child(2n) {
                background: #e4e8f7;
            }
        }
    }
    .g-table-9 {
        width: 100%;
        ul {
            display: flex;
            -webkit-flex-flow: row wrap;
            justify-content: space-around;
            text-align: center;
            color: #2f4554;
            background: #bcc2da;
            font-size: 0.16rem;
            line-height: 0.36rem;
            font-weight: bold;
            li {
                img {
                    width: 0.24rem;
                    height: 0.24rem;
                    vertical-align: top;
                    margin-top: 0.06rem;
                }
            }
        }
        .content {
            dd {
                display: flex;
                -webkit-flex-flow: row wrap;
                justify-content: space-around;
                text-align: center;
                img {
                    width: 0.24rem;
                    height: 0.24rem;
                    vertical-align: top;
                    margin-top: 0.06rem;
                }
                span {
                    font-size: 0.16rem;
                    line-height: 0.36rem;
                    color: #2f4554;
                }
                span:first-child {
                    width: 4%;
                }
            }
            dd:nth-child(2n-1) {
                background: #d7dae9;
            }
            dd:nth-child(2n) {
                background: #e4e8f7;
            }
        }
    }
</style>
