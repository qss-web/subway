<template>
    <div>
        <div id="childBox">

        </div>
        <!-- 下载或更新控件提示框 -->
        <v-control-box v-on:receive="closeFn" v-bind:msg="controlMsg" v-bind:type="download" v-if="isControl"></v-control-box>
    </div>
</template>

<script>
    var lstrRet = 0;
    var G_Login = 0;
    var G_bMainWindowShowCalled = false;
    var G_bMainWindowCreated = 0;
    var G_oObject, obj, loContainer, ii, gg;
    var ClientVar = {
        "midwareOnlineGroup": "",
        "midwareOnLine": "",
        "G_NONE_MIDWAR": false
    };


    import { mapActions, mapState, mapMutations } from 'vuex';
    export default {
        data() {
            return {
                equList: [],
                // isDownloadControl: false,
                download: 'download',
                checkList: '',
                curVer: '',
                getVer: [],
                controlMsg: {},
                isControl: false,
                companyId: "",
                factoryId: "",
                equipmentId: ""
            };
        },
        mounted() {
            this.getVersionFn();
        },
        computed: {
            ...mapState(['itemObj', 'deviceInfo'])
        },
        created() {
            if(ii || gg) {
                clearTimeout(ii);
                clearTimeout(gg);
                window.location.reload();
            }
        },
        methods: {
            ...mapActions(['_getList']),
            closeFn(val) {
                this.isControl = val;
                clearTimeout(ii);
                clearTimeout(gg);
            },
            //获取最后一次上传的客户端url和版本号
            getVersionFn() {
                this._getList({
                    ops: {},
                    api: 'getVersion',
                    callback: res => {
                        this.controlMsg.url = res.url;
                        this.controlMsg.newVersion = res.version;
                        this.getVer = res.version.split('.');
                        this.checkedStrFn();
                    }
                });
            },
            //获取系统功能组设置的项
            checkedStrFn() {
                this._getList({
                    ops: {},
                    api: 'groupconfigList',
                    callback: res => {
                        this.checkListShow = res;
                        this.checkListShow[1].forEach(item => {
                            if(item.flag == 1) {
                                // 1==选中
                                this.checkList += item.name + ',';
                            }
                        });
                        this.checkListShow[2].forEach(item => {
                            if(item.flag == 1) {
                                // 1==选中
                                this.checkList += item.name + ',';
                            }
                        });
                        this.checkList = this.checkList.substr(0, this.checkList.length - 1);
                        this.getSysList();
                    }
                });
            },
            //获取ip列表
            getSysList() {
                const ops = {
                    'curPage': '1',
                    'pageSize': '100'
                };

                this._getList({
                    ops: ops,
                    api: 'sysList',
                    callback: res => {
                        this.equList = res.rows;
                        this.getEquMsg();
                    }
                });
            },
            getEquMsg() {
                this._getList({
                    ops: {
                        equipmentUuid: this.itemObj.rowid || this.deviceInfo.deviceUuid
                    },
                    api: 'getEquipment',
                    callback: res => {
                        if(res != 'null' && res != null && res.companyId) {
                            this.companyId = res.companyId;
                            this.factoryId = res.factoryId;
                            this.equipmentId = res.equipmentId;
                        }
                        this.checkData();
                    }
                });
            },
            //初始化加载客户端
            checkData() {
                loContainer = document.getElementById('childBox');
                G_oObject = document.getElementById('DrawingControl');
                if(!this.sinadotIsValidObject(G_oObject)) {
                    var size = this.getClientPaintSize();
                    var lnHeight = size.height;
                    var lnWidth = size.width;

                    obj = document.createElement("object");
                    obj.setAttribute("width", "100%");
                    obj.setAttribute("height", "" + (lnHeight));
                    obj.setAttribute("codeBase", "BHClient.CAB#version=1,0,0,001");
                    obj.setAttribute("classid", "CLSID:38C9B0EC-68CD-4C30-AC74-B1A1FE18841A");
                    obj.id = "DrawingControl";
                    loContainer.appendChild(obj);
                    window.setTimeout(this.checkData, 200);
                    return false;
                }
                var lstrRet = 0;

                try {
                    lstrRet = G_oObject.GetParameter("inited");
                    G_oObject.SetAppMode(1);
                } catch(e) {
                    //判断提示下载框
                    // this.$message.error('客户端初始化失败，请确认是否正确安装客户端插件');
                    this.isControl = true;
                    this.download = 'download';
                    return false;
                }
                //获取版本号
                var comActiveX = new ActiveXObject('KD5000.ComServer.1');

                this.curVer = comActiveX.GetVersion();
                this.controlMsg.oldVersion = comActiveX.GetVersion();
                this.curVer.split('.').forEach((item, index) => {
                    if(item != this.getVer[index]) {
                        //判断提示更新框
                        // this.$message.error('请更新客户端插件');
                        this.isControl = true;
                        this.download = 'update';
                        // this.isDownloadControl = true;
                        return false;
                    }
                });

                //进行登陆操作
                if(lstrRet == 1) {
                    if(!G_Login) {
                        this.clientLogin();
                        return;
                    }
                    //插件的创建登陆完成，进入渲染过程
                    window.setTimeout(this.CheckMainWindowStatus, 100);
                } else {
                    ii = window.setTimeout(this.checkData, 200);
                }
            },
            //检测对象是否存在
            sinadotIsValidObject(aObj) {

                if(typeof (aObj) == "undefined" || aObj == null) {
                    return false;
                }

                return true;
            },
            getClientPaintSize() {

                var lnHeight = (document.documentElement.clientHeight == 0) ? document.body.clientHeight : document.documentElement.clientHeight;
                var lnWidth = (document.documentElement.clientWidth == 0) ? document.body.clientWidth : document.documentElement.clientWidth;

                lnHeight = parseFloat((lnHeight / 100 - 0.85) * 100).toFixed(2);

                return {
                    'width': lnWidth,
                    'height': lnHeight
                };
            },
            //监测系统代码开始
            CheckMainWindowStatus() {
                if(!G_bMainWindowShowCalled) {
                    G_bMainWindowShowCalled = true;
                    G_oObject.ShowMainWindow();
                }

                if(this.sinadotIsValidObject(G_oObject)) {


                    lstrRet = G_oObject.GetParameter("MainWindowCreated");

                    if(lstrRet != 1) {
                        gg = window.setTimeout(this.CheckMainWindowStatus, 200);
                        return;

                    }

                    G_bMainWindowCreated = 1;
                    G_oObject.ShowSpecPlant(8);//设置显示的设备分类
                    G_oObject.SwitchPlant3(this.companyId, this.factoryId, this.equipmentId, "机组概貌图", "", "", "", "", "", "", "");

                    //显示客户端
                    try {
                        G_oObject.ShowWindowEx(1);
                    } catch(e) {

                    }


                    if(G_bMainWindowCreated) {

                        var lbLoginRet = 0;

                        try {

                            if(astrCompany != "" && astrFactory != "" && astrPlant != "" && astrPoint != "" && startTime != "" && endTime != "") {
                                G_oObject.SwitchPlant4(astrCompany, astrFactory, astrPlant, astrPoint, "报警查询", startTime, endTime);
                            }

                        } catch(e) {

                        }

                        lbLoginRet = G_oObject.SetFocus();
                    }
                } else {
                    window.setTimeout(this.checkData(), 200);
                }
            },
            /**
             * 客户端登陆
             * 只验证后台配置的第一个在线中间件
             */

            clientLogin() {
                // "系统,自动扶梯专用图谱,风机专用图谱,屏蔽门专用图谱"
                G_oObject.SetParameter("Online_Category", this.checkList); //在线功能组

                var userName = "mgr";
                var pass = 111;

                G_oObject.SetParameter("ip", "" + this.equList[0].ip + "," + this.equList[0].port + "/TCP");

                //遍历设置在线中间件
                for(var i = 0; i < this.equList.length; i++) {
                    G_oObject.SetOnlineInfo("" + this.equList[i].ip + "," + this.equList[i].port + "/TCP", userName, pass, this.equList[i].type);
                }

                //发送登陆指令
                G_Login = G_oObject.Login(userName, pass);

                window.setTimeout(this.checkData, 200);
            }
        }
    };
</script>

<style scoped lang="less">
</style>