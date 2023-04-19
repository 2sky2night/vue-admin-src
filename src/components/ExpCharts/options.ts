
export default [
    {
        width: 300,
        height: 300,
        option: {
            title: {
                text: '全勤人数分布',
                left: 'center'
            },
            tooltip: {
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                left: 'left'
            },
            series: [
                {
                    name: 'Access From',
                    type: 'pie',
                    radius: '50%',
                    data: [
                        { value: 1048, name: '科研部' },
                        { value: 735, name: '后勤部' },
                        { value: 580, name: '人事部' },
                        { value: 484, name: '业务部' },
                        { value: 300, name: '前台部' }
                    ],
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        }
    },
    {
        height: 300,
        width: 300,
        option: {
            title: {
                text: '公司本年收入',
                left: 'center'
            },
            xAxis: {
                type: 'category',
                data: Array.from({ length: 12 }).map((ele, index) => `${index + 1}月`)
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: Array.from({ length: 12 }).map(() => Math.random() * 500),
                    type: 'line'
                }
            ]
        }
    },
    {
        height: 300,
        width: 300,
        option: {
            title: {
                text: '产品年收入',
                left: '30'
            },
            legend: {},
            tooltip: {},
            dataset: {
                source: [
                    ['product', '2019', '2020', '2021'],
                    ['懂球帝', 43.3, 85.8, 93.7],
                    ['海蓝之家', 83.1, 73.4, 55.1],
                    ['完美家具', 86.4, 65.2, 82.5],
                    ['超人快递', 72.4, 53.9, 39.1]
                ]
            },
            xAxis: { type: 'category' },
            yAxis: {},
            series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }]
        }
    },
    {
        height: 300,
        width: 300,
        option: {
            title: {
                text: '公司当前效益',
                left: 'center'
            },
            series: [
                {
                    type: 'gauge',
                    startAngle: 180,
                    endAngle: 0,
                    center: ['50%', '75%'],
                    radius: '90%',
                    min: 0,
                    max: 1,
                    splitNumber: 8,
                    axisLine: {
                        lineStyle: {
                            width: 6,
                            color: [
                                [0.25, '#FF6E76'],
                                [0.5, '#FDDD60'],
                                [0.75, '#58D9F9'],
                                [1, '#7CFFB2']
                            ]
                        }
                    },
                    pointer: {
                        icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
                        length: '12%',
                        width: 20,
                        offsetCenter: [0, '-60%'],
                        itemStyle: {
                            color: 'inherit'
                        }
                    },
                    axisTick: {
                        length: 12,
                        lineStyle: {
                            color: 'inherit',
                            width: 2
                        }
                    },
                    splitLine: {
                        length: 20,
                        lineStyle: {
                            color: 'inherit',
                            width: 5
                        }
                    },
                    axisLabel: {
                        color: '#464646',
                        fontSize: 20,
                        distance: -60,
                        rotate: 'tangential',
                        formatter: function (value) {
                            if (value === 0.875) {
                                return '良好';
                            } else if (value === 0.625) {
                                return '一般';
                            } else if (value === 0.375) {
                                return '盈利';
                            } else if (value === 0.125) {
                                return '亏损 ';
                            }
                            return '';
                        }
                    },
                    title: {
                        offsetCenter: [0, '-10%'],
                        fontSize: 20
                    },
                    detail: {
                        fontSize: 30,
                        offsetCenter: [0, '-35%'],
                        valueAnimation: true,
                        formatter: function (value) {
                            return Math.round(value * 100) + '';
                        },
                        color: 'inherit'
                    },
                    data: [
                        {
                            value: Math.random(),
                            name: '效益等级'
                        }
                    ]
                }
            ]
        }
    }
]