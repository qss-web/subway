<template>
    <div class="wholeWrap">
        <img v-if="num==1" src="~assets/other/temp.png" />
        <img v-if="num==2" src="~assets/other/temp2.png" />
        <img v-if="num==3" src="~assets/other/temp.png" />
    </div>
</template>
<script>
    export default {
        data() {
            return {
                num: 1
            };
        },
        created() {
            if(this.$route.query.key) {
                if(this.$route.query.key == "fan") { //风机
                    this.num = 1;
                } else if(this.$route.query.key == "shieldDoor") {  //站台门
                    this.num = 2;
                } else {
                    this.num = 3;
                }
            }
        }
    };
</script>
>
<style scoped lang="less">
    .wholeWrap {
        width: 100%;
        height: 100%;
        img {
            width: 100%;
            height: 100%;
        }
    }
</style>


