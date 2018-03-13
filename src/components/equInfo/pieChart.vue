<template>
    <div class="txt-center">
        <v-chart v-bind:id="id" :option="option" :styleObject="styleObject"></v-chart>
    </div>
</template>

<script>
    export default {
        props: ['id', 'title', 'time'],
        data() {
            return {
                styleObject: {
                    width: '2.6rem',
                    height: '1.6rem'
                },
                option: {
                    chart: {
                        type: 'pie',
                        plotBackgroundColor: null,
                        plotBackgroundImage: null,
                        plotBorderWidth: 0,
                        plotShadow: false
                        // backgroundColor: 'transparent'
                    },
                    credits: {
                        enabled: false //去掉地址
                    },
                    title: {
                        text: '' //指定图表标题
                    },
                    legend: {
                        layout: 'vertical',
                        floating: true,
                        align: 'right',
                        verticalAlign: 'top',
                        squareSymbol: true,
                        x: 20,
                        y: 15,


                        // align: 'right',
                        backgroundColor: '#FCFFC5',
                        borderColor: '#C98657',
                        borderWidth: 1,
                        // verticalAlign: 'bottom',
                        symbolPadding: 5,
                        symbolWidth: 30
                    },
                    xAxis: {
                        // categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                    },
                    series: [{
                        name: '故障维修',
                        data: [{ name: '驱动电机', color: '#c23531', y: 29.9 },
                        { name: '齿轮箱', color: '#2f4554', y: 70 },
                        { name: '主驱动轮', color: '#61a0a8', y: 45 },
                        { name: '从驱动轮', color: '#d48265', y: 69 },
                        { name: '扶手带', color: '#749f83', y: 19 }]
                    }],
                    plotOptions: {
                        series: {
                            allowPointSelect: false,
                            borderColor: 'none'
                        },
                        pie: {
                            allowPointSelect: true,
                            cursor: 'pointer',
                            dataLabels: {
                                enabled: false
                            },
                            showInLegend: true
                        }
                    }
                }
            };
        }
    };
</script>

<style lang="less" scoped>
    .title {
        text-align: center;
        color: #fff;
        font-size: 0.18rem;
    }
</style>

