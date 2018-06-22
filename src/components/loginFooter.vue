<template>
    <div class="footer">
        <!-- <span><i>C</i>opyright ©2018 [北京地铁] Powered By [机电设备运维服务智能监控系统] Version 1.0.0 </span>
        <span>联系人：张** </span>
        <span>联系电话：18800000000 </span> -->
        <span>北京市地铁运营有限公司</span>
        <span>北京市轨道交通设计研究院有限公司</span>
        <span>北京博华信智科技股份有限公司提供技术支持 服务热线：400-6858-525</span>
        <div id="qrCode"></div>
    </div>
</template>
<script>
    export default {
        mounted() {
            setTimeout(() => {
                var qrcode = new QRCode(document.getElementById("qrCode"), {
                    width: 110,//设置宽高
                    height: 110
                });

                qrcode.makeCode('http://bhxz.net:48092/app/app-release.apk');
            }, 0);

        }
    };
</script>
<style lang="less" scoped>
    .footer {
        position: relative;
        width: 100%;
        padding: 0.16rem 0;
        // height: 0.74rem;
        // line-height: 0.74rem;
        line-height: 0.3rem;
        position: fixed;
        bottom: 0;
        left: 0;
        background: #474b5c;
        text-align: center;
        font-size: 0.18rem;
        color: #fff;
        z-index: 10001;
        span {
            display: block;
            // margin-right: 0.4rem;
            i {
                font-size: 0.2rem;
            }
        }
        #qrCode {
            position: absolute;
            right: 0.5rem;
            top: 0.06rem;
            z-index: 3;
        }
    }
</style>
