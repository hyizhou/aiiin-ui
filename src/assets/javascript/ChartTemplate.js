// 统计图数据结构模板

import {ref} from "vue";

let dataTemplate = {  //模板数据
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [  // 此处只留一个数据
        {
            label: "内存",
            backgroundColor: '#7d79f8',
            data: [40, 39, 10, 40, 39, 80, 40],
            tension: 0.3,   // 平滑度
            fill: {         //填充
                target: 'stack',
                above: '#c5f879'
            },
            pointRadius:2,  // 点大小像素
            pointStyle:"circle" // 点样式，默认圆点，false隐藏点
        }
    ]
}
let optionsTemplate = {  // 模板数据
    responsive: true,  // 宽度响应式
    maintainAspectRatio: false,  // 高度响应式
    scales: {
        y: {
            display: true,
            suggestedMin: 0, // Y 轴建议最小值
            suggestedMax: 50, // Y 轴建议最大值
            title: {
                display: true,
                text: '长度/kb'
            },
            min: 0,
            max: 50  // Y 轴最大值最小值
        }
    },
    plugins: {
        title: {  // 标题
            text:"标题",
            display: true,
            position: 'top',
            align: 'start'
        },
        legend:{  // 关闭图例
            display: false,
        }
    },
    // events: ['click']
}

/**
 * 生成折线统计图的数据
 */
export function generateLineChartData(
    dataList,  // 数据, [1,2,5,4]
    labels,  // x 轴显示的内容，应和数据个数对应 ['手机','电脑'...]
    label,  //标题
    ySuggested,  // Y轴显示范围，不一定生效 [0,100]
    color,  // 显示颜色
    title,  //标题
    oldObj = null  // 频繁修改时使用老对象节省内存
){
    let data;
    let options;
    if (oldObj === null){
        data = JSON.parse(JSON.stringify(dataTemplate))
        options = JSON.parse(JSON.stringify(optionsTemplate))
    }else {
        data = oldObj.data
        options = oldObj.options
    }
    // 这里使用直接将原始数据对象后续修改会产生递归过多的错误
    data.datasets[0].data = JSON.parse(JSON.stringify(dataList))
    data.labels = labels
    data.datasets[0].label = label
    options.scales.y.suggestedMin = ySuggested[0]
    options.scales.y.suggestedMax= ySuggested[1]
    data.datasets[0].backgroundColor = color
    options.plugins.title.text = JSON.parse(JSON.stringify(title))

    return {dataObj: data, options: options}
}
