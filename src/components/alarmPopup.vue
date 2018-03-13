<template>
    <div class="popup-wrapper">
        <div class="mask"></div>
        <div class="popup-content">
            <span>[减速箱地脚震动3Ha 辅游标 2017/10/7 14:48:42.651 1.08m/s2]</span>
            <span>[减速箱地脚震动3Ha 辅游标 2017/10/26 06:33:10.995 1.08m/s2]</span>
        </div>
    </div>
</template>

<style lang="less" scoped>
    .popup-wrapper {
        .mask {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
        .popup-content {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    }
</style>
